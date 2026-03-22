import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Singleton pattern — ensures only ONE client instance ever exists in the app
let supabaseInstance = null;

function getSupabaseClient() {
  if (supabaseInstance) return supabaseInstance;
  supabaseInstance = createClient(supabaseUrl, supabaseKey);
  return supabaseInstance;
}

export const supabase = getSupabaseClient();
