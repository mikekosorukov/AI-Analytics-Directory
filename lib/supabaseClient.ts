import { createClient } from "@supabase/supabase-js";
import { mockSupabase } from "./localDataService";

const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_DATA === 'true';

// Only require Supabase credentials if not using mock data
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let realSupabase: any = null;

if (!useMockData) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables! Set NEXT_PUBLIC_USE_MOCK_DATA=true to use local mock data instead.");
  }
  realSupabase = createClient(supabaseUrl, supabaseKey);
}

// Export the appropriate client based on environment
export const supabase = useMockData ? mockSupabase : realSupabase;
