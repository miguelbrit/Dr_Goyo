import { createClient } from '@supabase/supabase-js';

// Support both prefixed (Vite/Local) and non-prefixed (Supabase-Vercel Integration) variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || import.meta.env.SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || import.meta.env.SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey || supabaseUrl === 'PLACEHOLDER_SUPABASE_URL') {
  console.warn('Supabase credentials are not set correctly');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
