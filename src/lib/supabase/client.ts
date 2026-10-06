import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://riqlqnqyenolgpqdijml.supabase.co";
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcWxxbnF5ZW5vbGdwcWRpam1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2ODAwODgsImV4cCI6MjEwNjI1NjA4OH0.Eox8pAaQS604vwn1ZB1WyA7W6bJBi1CFPXS6QjHqMXw";

  return createBrowserClient(url, key);
}
