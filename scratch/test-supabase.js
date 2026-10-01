const { createClient } = require('@supabase/supabase-js');

const url = "https://riqlqnqyenolgpqdijml.supabase.co";
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpcWxxbnF5ZW5vbGdwcWRpam1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA2ODAwODgsImV4cCI6MjEwNjI1NjA4OH0.Eox8pAaQS604vwn1ZB1WyA7W6bJBi1CFPXS6QjHqMXw";

const supabase = createClient(url, key);

async function test() {
  console.log("--- TEST QUERY FROM PAGE.TSX ---");
  const res = await supabase
    .from("events")
    .select("*")
    .neq("is_visible", false)
    .order("created_at", { ascending: false });
  console.log("Res:", JSON.stringify(res, null, 2));
}

test();
