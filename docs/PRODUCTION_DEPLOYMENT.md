# DSA Magna — Production Deployment & Operations Guide

This manual serves as the single source of truth for deploying, configuring, securing, and maintaining **DSA Magna** in real-world production environments.

---

## 1. System Architecture

```
                                    +-----------------------------------------+
                                    |               End Users                 |
                                    +-----------------------------------------+
                                                         |
                                                         v
                                    +-----------------------------------------+
                                    |             Edge DNS / CDN              |
                                    |         (Custom Domain / Vercel)        |
                                    +-----------------------------------------+
                                                         |
                                                         v
                                    +-----------------------------------------+
                                    |          Vercel Serverless &            |
                                    |             Edge Runtime                |
                                    |  - Next.js 15 App Router                |
                                    |  - Static Assets & SSR Pages            |
                                    |  - API Route Handlers (/api/*)          |
                                    +-----------------------------------------+
                                          /                          \
                                         /                            \
                                        v                              v
            +-------------------------------------+      +-----------------------------------------+
            |         Supabase Managed Cloud      |      |     Dedicated Judge Sandbox Cluster     |
            | - PostgreSQL 15 + Row Level Security|      |         (Judge0 / Piston on VM)         |
            | - Supabase Auth (JWT & OAuth)       |      | - Linux cgroups, namespaces, seccomp    |
            | - Realtime & Automated Triggers     |      | - Ephemeral unprivileged containers     |
            +-------------------------------------+      | - Network-isolated user execution       |
                                                         +-----------------------------------------+
```

### Components
1. **Frontend & API Gateway (Vercel)**:
   - Next.js 15 App Router with TypeScript and Tailwind CSS.
   - Hosts static landing, curriculum navigation, problem catalogs, and serverless API endpoints.
   - Enforces HTTP security headers (`X-Frame-Options`, `X-Content-Type-Options`, `Strict-Transport-Security`, `Permissions-Policy`).
2. **Database & Identity (Supabase)**:
   - Managed PostgreSQL database with strict Row Level Security (RLS) on all user-owned tables.
   - Supabase Auth handles email/password, session restoration, Google/GitHub OAuth, and password recovery.
3. **External AI Engine (Google Gemini)**:
   - Server-side integration via `GEMINI_API_KEY` for adaptive mentoring and algorithmic explanation hints.
4. **Code Execution / Judge Engine (External Sandbox Cluster — MANDATORY FOR PROD)**:
   - **Current status: BLOCKED for public hosting**.
   - Requires a dedicated external Judge0 or Piston cluster running in an isolated network with kernel-level sandboxing (cgroups v2, namespaces, seccomp filters, CPU/memory quotas, no host network).

---

## 2. Environment Variables Inventory

| Variable Name | Classification | Target Scope | Description |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_APP_NAME` | Public | Local, Preview, Prod | Branding string (`DSA Magna`). |
| `NEXT_PUBLIC_VERSION` | Public | Local, Preview, Prod | Application release version (e.g. `1.0.0`). |
| `NEXT_PUBLIC_SITE_URL` | Public | Local, Preview, Prod | Canonical base URL (`http://localhost:3000` or `https://yourdomain.com`). |
| `NEXT_PUBLIC_APP_URL` | Public | Local, Preview, Prod | Application root for auth redirects. |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Local, Preview, Prod | Public Supabase project API gateway. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Local, Preview, Prod | Public anonymous JWT for client-side Supabase SDK. |
| `NEXT_PUBLIC_AI_PROVIDER` | Public | Local, Preview, Prod | AI backend preference (`gemini` or `openai`). |
| `NODE_ENV` | Server Only | Local, Preview, Prod | Node environment (`development` \| `production` \| `test`). |
| `SUPABASE_SERVICE_ROLE_KEY` | Server Only | Preview, Prod | Admin service-role key for backend DB tasks and tests. |
| `DATABASE_URL` | Server Only | Local, Preview, Prod | PostgreSQL connection string for migrations. |
| `GEMINI_API_KEY` | Server Only | Local, Preview, Prod | Google AI Studio API key for server-side AI Mentor. |
| `JUDGE0_URL` | Server Only | Preview, Prod | Dedicated Judge0 execution endpoint. |
| `PISTON_URL` | Server Only | Preview, Prod | Dedicated Piston execution endpoint. |

---

## 3. Local Development Setup

1. **Clone repository & install dependencies**:
   ```bash
   git clone https://github.com/saidevaharsha07-art/DSA-MASTER.git
   cd DSA-MASTER
   npm install
   ```

2. **Configure local environment**:
   ```bash
   cp .env.example .env.local
   ```
   Populate `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` with your development Supabase project keys.

3. **Run local development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000`.

---

## 4. Preview Deployment (Vercel)

1. Connect the GitHub repository to Vercel.
2. Under **Project Settings -> Environment Variables**, configure Preview variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GEMINI_API_KEY`
   - Leave `NEXT_PUBLIC_SITE_URL` blank so Vercel dynamic `VERCEL_URL` preview domains auto-resolve.
3. Every pull request or non-main branch push generates an isolated preview deployment.

---

## 5. Production Deployment (Vercel)

1. Under **Project Settings -> Environment Variables**, configure Production variables:
   - `NEXT_PUBLIC_SITE_URL`: `https://yourdomain.com`
   - `NEXT_PUBLIC_APP_URL`: `https://yourdomain.com`
   - `NEXT_PUBLIC_SUPABASE_URL`: Production Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Production Anon Key
   - `SUPABASE_SERVICE_ROLE_KEY`: Production Service Role Key
   - `GEMINI_API_KEY`: Production Gemini Key
   - `JUDGE0_URL`: Dedicated Judge0 production instance URL
2. Promote deployment to Production via GitHub merge to `main` or `vercel --prod`.

---

## 6. Vercel Configuration

- **Framework Preset**: Next.js
- **Node.js Version**: 20.x or 22.x
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Headers**: Configured in `next.config.ts` (nosniff, sameorigin, strict-transport-security).

---

## 7. Supabase Configuration

1. Log in to [Supabase Console](https://supabase.com/dashboard).
2. Create a new project (e.g. `dsa-magna-prod`).
3. Under **SQL Editor**, execute `supabase/schema.sql`:
   - Creates all tables: `profiles`, `progress`, `submissions`, `drafts`, `activities`, `memory_progress`, `settings`, `user_onboarding`.
   - Enables RLS on all 8 tables.
   - Applies strict `auth.uid() = user_id` policies for SELECT, INSERT, UPDATE, DELETE.
   - Installs `handle_new_user` trigger with `SECURITY DEFINER SET search_path = public`.

---

## 8. OAuth Configuration (Google & GitHub)

1. **Google OAuth**:
   - Go to Google Cloud Console -> APIs & Services -> Credentials.
   - Create OAuth 2.0 Client ID (Web Application).
   - Authorized Javascript origins: `https://yourdomain.com`.
   - Authorized redirect URI: `https://<your-supabase-project-id>.supabase.co/auth/v1/callback`.
   - In Supabase Dashboard -> Authentication -> Providers -> Google: paste Client ID and Secret.
2. **GitHub OAuth**:
   - GitHub Developer Settings -> OAuth Apps -> New OAuth App.
   - Homepage URL: `https://yourdomain.com`.
   - Authorization callback URL: `https://<your-supabase-project-id>.supabase.co/auth/v1/callback`.
   - In Supabase Dashboard -> Authentication -> Providers -> GitHub: paste Client ID and Secret.

---

## 9. Email Configuration

1. In Supabase Dashboard -> Authentication -> Email Templates:
   - Customize "Confirm your signup" template with DSA Magna branding.
   - Customize "Reset password" template.
2. In Supabase Dashboard -> Authentication -> URL Configuration:
   - **Site URL**: `https://yourdomain.com`
   - **Redirect URLs**:
     - `https://yourdomain.com/auth/callback`
     - `https://yourdomain.com/**`
     - `http://localhost:3000/**` (for local dev)
3. For reliable email delivery, connect a custom SMTP provider (Resend / SendGrid / Postmark).

---

## 10. Custom Domain Configuration (DNS)

1. In Vercel -> Project -> Settings -> Domains:
   - Add `yourdomain.com` and `www.yourdomain.com`.
2. In your DNS Provider (Cloudflare / Namecheap / Route53):
   - Apex record (`@`): `A` record pointing to `76.76.21.21` (or CNAME to `cname.vercel-dns.com` where ALIAS/ANAME is supported).
   - Subdomain (`www`): `CNAME` pointing to `cname.vercel-dns.com`.
3. Wait for SSL certificate provisioning (automatic via Let's Encrypt in Vercel).

---

## 11. Database Migrations

- The canonical production schema resides in `supabase/schema.sql`.
- When updating schemas:
  - Do NOT modify existing historical columns destructively.
  - Apply backward-compatible migrations via SQL editor or Supabase CLI (`supabase db push`).
  - Always verify that new user-owned tables have `ALTER TABLE public.<table_name> ENABLE ROW LEVEL SECURITY;` and policies for `SELECT`, `INSERT`, `UPDATE`, `DELETE`.

---

## 12. Security Checklist

- [x] All user tables enforce Row Level Security (`auth.uid() = user_id`).
- [x] No `NEXT_PUBLIC_*` variable contains service secrets or database passwords.
- [x] API routes (`/api/db/sync`, `/api/judge/run`, `/api/judge/submit`, `/api/ai/generate`) validate payloads and enforce authentication.
- [x] Security headers active: `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security: max-age=31536000`, `Referrer-Policy: strict-origin-when-cross-origin`.
- [x] Robots.txt blocks search engines from crawling `/dashboard`, `/settings`, `/profile`, `/api/*`.
- [x] No hardcoded preview URLs in authentication callbacks.
- [ ] **External isolated judge connected (MANDATORY BLOCKER)**.

---

## 13. Code Execution Architecture & Security Blocker

### The Critical Issue
The current code execution implementation in `src/services/judge/sandbox/runner.ts` executes user-submitted code by spawning local processes (`child_process.spawn`) on the host running the Next.js application.

### Why Production Launch is BLOCKED for Public Code Execution:
1. **Server Secret Exposure**: The spawned process inherits `...process.env`, allowing user code to inspect environment variables, database credentials, and Supabase keys.
2. **Lack of Isolation**: Processes run directly under the host operating system with no container boundary, no memory quota, no disk quota, and unrestricted network access.
3. **Vercel Serverless Incompatibility**: Vercel Serverless Function instances do NOT include compiler and runtime toolchains for `javac`, `g++`, `gcc`, or `python3`. Running spawn calls on Vercel fails with `ENOENT` or execution timeouts.

### Required Architecture for Production Unblocking:
1. **Dedicated Isolated Sandbox (e.g. Judge0 or Piston)**:
   - Deploy Judge0 or Piston on a dedicated VM (AWS EC2 / Hetzner / DigitalOcean) or container cluster.
   - Run inside Docker/runc containers with:
     - Linux kernel `cgroups v2` (strict CPU and memory limits, e.g. 256MB RAM).
     - Network namespace set to `none` (zero internet or intranet access).
     - Read-only root filesystem with ephemeral, sized `tmpfs` mounts.
     - `seccomp` filters restricting dangerous syscalls (preventing `fork` bombs, ptrace, socket calls).
     - Non-root unprivileged execution user.
2. **Next.js Integration**:
   - Next.js API routes (`/api/judge/run`, `/api/judge/submit`) forward requests to `JUDGE0_URL` with token authentication.
   - If `JUDGE0_URL` is unavailable, return structured fallback responses with clear user messaging ("Judge cluster temporarily offline for maintenance") rather than crashing.

---

## 14. Monitoring & Observability

- **Application Performance & Errors**:
  - Install Sentry for Next.js (`@sentry/nextjs`) to capture client and server runtime exceptions without logging PII.
  - Enable Vercel Web Analytics and Speed Insights for Core Web Vitals monitoring.
- **Supabase Metrics**:
  - Monitor database connections, API error rates, and query latency in Supabase Dashboard -> Reports.
- **Judge Health**:
  - Monitor dedicated judge queue depth, error rates, and worker memory via Prometheus/Grafana.

---

## 15. Backups & Disaster Recovery

1. **Supabase Backups**:
   - Supabase automatically takes daily backups (Point-in-Time Recovery available on Pro plan).
   - Periodic logical backup: run `supabase db dump -f backup.sql` weekly and store encrypted in cold storage.
2. **Recovery Procedure**:
   - Restore database snapshot via Supabase Console -> Backups.
   - Re-deploy Next.js production build from git commit hash.

---

## 16. Production Smoke Test

Run the automated smoke test before and after production release:
```bash
npx playwright test tests/e2e/production-smoke.spec.ts
```
Covers:
- Public landing, Journey, Practice, Interview, Study Plan
- Authentication UI (Login, Signup, Forgot Password)
- Protected route redirection
- Core learning drill-downs
- Multi-viewport layout (375x812 mobile, 1440x900 desktop)
- Light & dark theme rendering

---

## 17. Rollback Procedure

1. **Immediate Vercel Rollback**:
   - In Vercel Dashboard -> Deployments: Find the previous stable deployment and click **"Promote to Production"**.
   - Instant (<5 seconds) traffic switch at the edge.
2. **Git Rollback**:
   - `git revert HEAD`
   - `git push origin main`

---

## 18. Launch Checklist

- [ ] Supabase production project created and `schema.sql` applied.
- [ ] OAuth provider credentials verified in Supabase Dashboard.
- [ ] Vercel production environment variables populated from `.env.example`.
- [ ] Custom domain DNS propagated and SSL certificate issued.
- [ ] Dedicated isolated judge runner provisioned and `JUDGE0_URL` configured.
- [ ] `npx playwright test tests/e2e/production-smoke.spec.ts` passes against production URL.
- [ ] Sentry error tracking verified.
