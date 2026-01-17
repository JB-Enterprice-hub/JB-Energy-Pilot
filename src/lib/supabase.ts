import { createClient } from '@supabase/supabase-js';

// --- CONFIGURATION ---
// These will be filled by the user later via the Setup Guide
const PROJECT_URL = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// --- CLIENT ---
export const supabase = createClient(PROJECT_URL, ANON_KEY);

// --- HELPER TYPES ---
export type DbProfile = {
    id: string; // UUID of the user
    wallet_balance: number;
    plan_type: 'STANDARD' | 'SUBSCRIPTION';
    grid_fee: number;
};
