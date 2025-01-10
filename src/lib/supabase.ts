import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please click "Connect to Supabase" button to set up the connection.');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  },
  global: {
    fetch: fetch.bind(globalThis),
    headers: { 'x-client-info': 'supabase-js' }
  }
});

// Add connection check function
export async function checkSupabaseConnection() {
  try {
    const { data, error } = await supabase.from('agents').select('count');
    if (error) throw error;
    return true;
  } catch (err) {
    console.error('Supabase connection error:', err);
    return false;
  }
}