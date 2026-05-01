"use client";

import { createBrowserClient } from "@supabase/ssr";
import { supabaseAnonKey } from "./env";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    supabaseAnonKey(),
  );
}
