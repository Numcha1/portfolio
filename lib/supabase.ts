import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  "";

export const isSupabaseConfigured = supabaseUrl.length > 0 && supabaseKey.length > 0;

let hasWarnedMissingConfig = false;

const createSupabaseBrowserClient = () => {
  if (!isSupabaseConfigured) {
    if (process.env.NODE_ENV !== "production" && !hasWarnedMissingConfig) {
      console.warn(
        "[Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY/NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY. Falling back to sample projects."
      );
      hasWarnedMissingConfig = true;
    }

    return null;
  }

  return createClient(supabaseUrl, supabaseKey);
};

export const supabase = createSupabaseBrowserClient();
