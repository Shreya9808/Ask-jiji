import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY 
);

async function login() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: "user@example.com",
    password: "shreya@12345"
  });

  if (error) {
    console.error("Login error:", error.message);
    return;
  }

  console.log("✅ Access Token:");
  console.log(data.session.access_token);
}

login();
