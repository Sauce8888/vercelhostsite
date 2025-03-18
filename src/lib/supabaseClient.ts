import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Validate if we have a proper URL before creating the client
export const supabase = (supabaseUrl !== 'your_supabase_url' && supabaseUrl) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null; 