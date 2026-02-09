import express from 'express';
import { createClient } from '@supabase/supabase-js';
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { question } = req.body;
    const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);

  
const { data, error } = await supabase.auth.signInWithPassword({
  email: process.env.SUPABASE_TEST_EMAIL,
  password: process.env.SUPABASE_TEST_PASSWORD
});
if (error) {
  console.error("Login error:", error.message);
  return;
}
  console.log("Access Token: is generated", data.session.access_token);
    const { data: userData, error: authError } = await supabase.auth.getUser();
    if (authError) {
      return res.status(401).json({ error: "Invalid auth token" });
    }
    console.log("User Data:", userData);

    const userId = userData?.user?.id;

    // save query to supabase
    const { data: queryRow, error: insertError } = await supabase
      .from("queries")
      .insert({ user_id: userId, question })
      .select()
      .single();

    if (insertError) throw insertError;

    // -----------------------------
// Fetch matching resources
// -----------------------------
const keyword = question.split(" ").pop(); // gets "RAG"

const { data: resources, error: resourceError } = await supabase
  .from("resources")
  .select("id, title, content, url")
  .or(
    `title.ilike.%${keyword}%,content.ilike.%${keyword}%`
  );

if (resourceError) throw resourceError;


// -----------------------------
// Format resources
// -----------------------------
const formattedResources = resources.map((r) => ({
  id: r.id,
  title: r.title,
  description: r.content,
  type:
    r.url.includes("youtube.com") || r.url.includes("youtu.be")
      ? "video"
      : "ppt",
  url: r.url,
}));

// -----------------------------
// Final Response
// -----------------------------
res.json({
  answer: `Mocked explanation for: ${question}`,
  resources: formattedResources,
});


   
  
  } catch (err) {
    // ✅ This catch handles all errors in the try block
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
