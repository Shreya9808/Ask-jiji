#Learn with Jiji – Backend Service

Backend API powering Jiji’s search & respond flow for VeidaLabs hiring assignment.
Built using Node.js (Express) and Supabase (DB, Auth, RLS).

This service:

Accepts a user query

Stores it in Supabase

Fetches relevant learning resources

Returns a structured response (answer + PPT / video links)

Uses mocked AI responses


#Tech Stack

Node.js + Express

Supabase (PostgreSQL + Auth + Storage/External links)

dotenv



# Setup & Run Locally
1.  Clone Repository
git clone <your-github-repo-url>
cd learn-with-jiji-backend

2️. Install Dependencies
npm install,npm install nodemon,npm install express,npm install @supabase/supabase-js,npm install dotenv


3️. Environment Variables

Create a .env file using .env.example.

SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_TEST_EMAIL=
SUPABASE_TEST_PASSWORD=
PORT=4000


⚠️ Do not commit your real .env file.





# API Endpoint
POST /ask
Request Body
{
  "question": "What is RAG?"
}

Response
{
  "answer": "Mocked explanation for: What is RAG",
  "resources": [
    {
      "id": "uuid",
      "title": "RAG Explained - YouTube Video",
      "type": "video",
      "url": "https://www.youtube.com/..."
    }
  ]
}

# API Endpoint
POST /ask
Request Body
{
  "question": "What is RAG?"
}

Response
{
  "answer": "Mocked explanation for: What is RAG",
  "resources": [
    {
      "id": "uuid",
      "title": "RAG Explained - YouTube Video",
      "type": "video",
      "url": "https://www.youtube.com/..."
    }
  ]
}

#Basic Workflow

This service exposes a single endpoint:

POST /ask

The request follows this flow:

1️⃣ Validate input
2️⃣ Authenticate using a mocked Supabase user
3️⃣ Retrieve authenticated user
4️⃣ Insert query into the queries table
5️⃣ Fetch matching resources from the resources table
6️⃣ Return structured response (answer + links)

#Database Schema

SQL definitions and Row Level Security policies are included in:

/sql/schema.sql

Tables

profiles – user profile data

queries – user questions

resources – learning content links (PPT / video)

# Authentication

Authentication is mocked using a Supabase test account for demonstration purposes.

The authenticated user ID is used for database operations protected by Row Level Security.

#Row Level Security (RLS)

RLS policies are implemented as follows:

profiles(user can insert, read, and update own row)

queries(user can insert and read own rows)

resources(user read-only access)

# Learning Resources

Learning resources are represented using:

PPT URLs

YouTube video links (placeholders)

These satisfy the assignment requirement for sample learning content.


#One Improvement With More Time

Given more time, I would:

Implement vector embeddings for semantic search

Add full-text indexing

Replace mocked authentication with real client-side auth

Introduce pagination and ranking

Add monitoring and logging

🎥 Demo Video

[Add demo video link here]:https://bit.ly/3O4idOK

👤 Author

Shreya Lakhera
LinkedIn: https://www.linkedin.com/in/shreya-lakhera-7895ab28b/
GitHub: https://github.com/Shreya9808

✅ This version is now perfectly aligned with:

✔ backend-only scope
✔ VeidaLabs requirements
✔ Supabase focus
✔ API clarity
✔ security awareness

