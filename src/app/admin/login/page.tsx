"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [message, setMessage] = useState("");

  async function signIn(formData: FormData) {
    if (!hasSupabaseEnv()) {
      setMessage("Add Supabase env vars first, then admin auth will work.");
      return;
    }
    const supabase = createClient();
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
    else window.location.href = "/admin";
  }

  return (
    <section className="mx-auto max-w-md px-4 py-12">
      <form action={signIn} className="grid gap-4 rounded-lg border border-[#dfe8df] bg-white p-5">
        <h1 className="text-3xl font-black text-[#101513]">Admin login</h1>
        <input name="email" type="email" placeholder="Admin email" className="rounded-lg border border-[#dfe8df] px-3 py-3" />
        <input name="password" type="password" placeholder="Password" className="rounded-lg border border-[#dfe8df] px-3 py-3" />
        <Button>Sign in</Button>
        {message ? <p className="text-sm font-semibold text-[#5c675f]">{message}</p> : null}
      </form>
    </section>
  );
}
