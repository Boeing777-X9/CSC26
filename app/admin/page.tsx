import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome {user?.email}</p>
    </div>
  );
}
