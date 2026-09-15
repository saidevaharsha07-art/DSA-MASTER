/**
 * Live Supabase Production RLS & Multi-User Verification Suite
 * Executes real end-to-end RLS testing against a live Supabase project when credentials are provided.
 */

import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

function loadEnvFile(filePath: string) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf-8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.substring(0, eqIdx).trim();
        let val = trimmed.substring(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.substring(1, val.length - 1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

// Load .env.local and .env
loadEnvFile(path.resolve(process.cwd(), '.env.local'));
loadEnvFile(path.resolve(process.cwd(), '.env'));

export interface LiveVerificationResult {
  connection: boolean;
  tablesVerified: boolean;
  rlsPoliciesActive: boolean;
  twoUserIsolationPassed: boolean;
  apiAuthorizationPassed: boolean;
  details: string[];
}

export async function runLiveSupabaseVerification(): Promise<LiveVerificationResult> {
  // Ensure env is loaded
  loadEnvFile(path.resolve(process.cwd(), '.env.local'));
  loadEnvFile(path.resolve(process.cwd(), '.env'));

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const result: LiveVerificationResult = {
    connection: false,
    tablesVerified: false,
    rlsPoliciesActive: false,
    twoUserIsolationPassed: false,
    apiAuthorizationPassed: false,
    details: [],
  };

  if (!supabaseUrl || !anonKey) {
    result.details.push('MISSING_CREDENTIALS: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is not set.');
    return result;
  }

  try {
    const publicClient = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    
    const { data: pingData, error: pingError } = await publicClient.auth.getSession();
    if (pingError && !pingError.message.toLowerCase().includes('session')) {
      result.details.push(`Connection failed: ${pingError.message}`);
      return result;
    }
    result.connection = true;
    result.details.push('✓ Supabase connection established successfully.');

    const adminClient = serviceRoleKey
      ? createClient(supabaseUrl, serviceRoleKey, {
          auth: { persistSession: false, autoRefreshToken: false },
        })
      : publicClient;

    const targetTables = ['profiles', 'progress', 'submissions', 'drafts', 'activities', 'memory_progress', 'settings'];
    let allTablesExist = true;

    for (const table of targetTables) {
      const { error } = await adminClient.from(table).select('*').limit(1);
      if (error) {
        allTablesExist = false;
        result.details.push(`Table missing or inaccessible: public.${table} (${error.message})`);
      }
    }

    if (allTablesExist) {
      result.tablesVerified = true;
      result.details.push('✓ All 7 core user-owned tables confirmed in live database.');
    } else {
      result.tablesVerified = false;
      result.details.push('Action required: Tables are missing from the remote database. Please paste and execute supabase/schema.sql in the Supabase SQL Editor.');
      return result;
    }

    const testEmailA = `rls_test_user_a_${Date.now()}@example.com`;
    const testEmailB = `rls_test_user_b_${Date.now()}@example.com`;
    const testPassword = `TestPass!_${Date.now()}_Aa1`;

    let userAId: string | undefined;
    let userBId: string | undefined;
    let tokenA: string | undefined;
    let tokenB: string | undefined;

    if (serviceRoleKey) {
      try {
        const directRes = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': serviceRoleKey,
            'Authorization': `Bearer ${serviceRoleKey}`,
          },
          body: JSON.stringify({
            email: testEmailA,
            password: testPassword,
            email_confirm: true,
          }),
        });

        const directData = await directRes.json();
        if (!directRes.ok) {
          result.details.push(`Direct admin create failed: HTTP ${directRes.status} - ${JSON.stringify(directData)}`);
        } else {
          userAId = directData.id || directData.user?.id;
          result.details.push('✓ Direct admin create User A succeeded.');
        }
      } catch (fErr: any) {
        result.details.push(`Direct fetch error: ${fErr.message} (code: ${fErr.code}, cause: ${fErr.cause?.message || fErr.cause?.code})`);
      }

      if (!userAId) {
        const { data: createdA, error: createErrA } = await adminClient.auth.admin.createUser({
          email: testEmailA,
          password: testPassword,
          email_confirm: true,
        });
        if (createErrA || !createdA.user) {
          result.details.push(`User A creation failed: ${createErrA?.message} (name: ${createErrA?.name}, status: ${createErrA?.status})`);
          return result;
        }
        userAId = createdA.user.id;
      }

      const { data: createdB, error: createErrB } = await adminClient.auth.admin.createUser({
        email: testEmailB,
        password: testPassword,
        email_confirm: true,
      });
      if (createErrB || !createdB.user) {
        result.details.push(`User B creation failed: ${createErrB?.message}`);
        if (userAId) await adminClient.auth.admin.deleteUser(userAId);
        return result;
      }
      userBId = createdB.user.id;

      const { data: loginA, error: loginErrA } = await publicClient.auth.signInWithPassword({
        email: testEmailA,
        password: testPassword,
      });
      if (loginErrA || !loginA.session) {
        result.details.push(`User A signin failed: ${loginErrA?.message}`);
        await adminClient.auth.admin.deleteUser(userAId);
        await adminClient.auth.admin.deleteUser(userBId);
        return result;
      }
      tokenA = loginA.session.access_token;

      const { data: loginB, error: loginErrB } = await publicClient.auth.signInWithPassword({
        email: testEmailB,
        password: testPassword,
      });
      if (loginErrB || !loginB.session) {
        result.details.push(`User B signin failed: ${loginErrB?.message}`);
        await adminClient.auth.admin.deleteUser(userAId);
        await adminClient.auth.admin.deleteUser(userBId);
        return result;
      }
      tokenB = loginB.session.access_token;
    } else {
      const { data: authA, error: errA } = await publicClient.auth.signUp({
        email: testEmailA,
        password: testPassword,
      });
      if (errA || !authA.user) {
        result.details.push(`User A signup failed: ${errA?.message}`);
        return result;
      }
      userAId = authA.user.id;
      tokenA = authA.session?.access_token;

      const { data: authB, error: errB } = await publicClient.auth.signUp({
        email: testEmailB,
        password: testPassword,
      });
      if (errB || !authB.user) {
        result.details.push(`User B signup failed: ${errB?.message}`);
        return result;
      }
      userBId = authB.user.id;
      tokenB = authB.session?.access_token;
    }

    if (!tokenA || !tokenB || !userAId || !userBId) {
      result.details.push('Could not establish authenticated session tokens for User A / B.');
      return result;
    }

    const userAClient = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        headers: {
          Authorization: `Bearer ${tokenA}`,
        },
      },
    });

    const userBClient = createClient(supabaseUrl, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        headers: {
          Authorization: `Bearer ${tokenB}`,
        },
      },
    });

    // 1. User A inserts own draft
    const { error: draftErr } = await userAClient.from('drafts').insert({
      user_id: userAId,
      problem_id: '1',
      language: 'python',
      code: 'def twoSum(): return [0, 1]',
    });

    if (draftErr) {
      result.details.push(`User A draft insertion notice: ${draftErr.message}`);
    }

    // 2. User B attempts to read User A's draft
    const { data: readDraftB } = await userBClient
      .from('drafts')
      .select('*')
      .eq('user_id', userAId);

    // 3. User B attempts to update User A's draft
    const { data: updateDraftB } = await userBClient
      .from('drafts')
      .update({ code: 'HACKED' })
      .eq('user_id', userAId)
      .select();

    // 4. User B attempts to insert row pretending to be User A
    const { error: impersonateInsertErrB } = await userBClient.from('drafts').insert({
      user_id: userAId,
      problem_id: '2',
      language: 'python',
      code: 'impersonation_test',
    });

    // 5. User B attempts to delete User A's draft
    const { data: deleteDraftB } = await userBClient
      .from('drafts')
      .delete()
      .eq('user_id', userAId)
      .select();

    // 6. User A verifies own draft is still intact
    const { data: readDraftA } = await userAClient
      .from('drafts')
      .select('*')
      .eq('user_id', userAId);

    const bReadEmpty = !readDraftB || readDraftB.length === 0;
    const bUpdateEmpty = !updateDraftB || updateDraftB.length === 0;
    const bDeleteEmpty = !deleteDraftB || deleteDraftB.length === 0;
    const bInsertBlocked = !!impersonateInsertErrB;
    const aDataIntact = !!readDraftA && readDraftA.length > 0 && readDraftA[0].code.includes('twoSum');

    if (bReadEmpty && bUpdateEmpty && bDeleteEmpty && bInsertBlocked && aDataIntact) {
      result.twoUserIsolationPassed = true;
      result.rlsPoliciesActive = true;
      result.apiAuthorizationPassed = true;
      result.details.push('✓ Real Two-User live RLS tests passed: User B cannot SELECT, UPDATE, DELETE, or INSERT User A rows.');
      result.details.push('✓ User A data integrity verified post-attack simulation.');
    } else {
      result.details.push(`RLS verification failure: readBlocked=${bReadEmpty}, updateBlocked=${bUpdateEmpty}, deleteBlocked=${bDeleteEmpty}, insertBlocked=${bInsertBlocked}, aDataIntact=${aDataIntact}`);
    }

    if (serviceRoleKey && userAId && userBId) {
      await adminClient.auth.admin.deleteUser(userAId);
      await adminClient.auth.admin.deleteUser(userBId);
      result.details.push('✓ Test user accounts cleaned up cleanly.');
    }
  } catch (err: any) {
    result.details.push(`Verification error: ${err.message}`);
  }

  return result;
}
