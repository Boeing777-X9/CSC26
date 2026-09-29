"use client";

import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const handleGoogleLogin = async () => {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=/admin`,
      },
    });
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
}
