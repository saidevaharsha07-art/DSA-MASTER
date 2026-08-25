/**
 * CodeChef DSA Mission Control — Kingdoms
 * Re-exports codechefKingdoms from codechef_excel_db.ts
 */

import { codechefKingdoms } from './codechef_excel_db';
import { CodeChefKingdomDef } from '../types';

export const CODECHEF_KINGDOMS: ReadonlyArray<CodeChefKingdomDef> = codechefKingdoms;


