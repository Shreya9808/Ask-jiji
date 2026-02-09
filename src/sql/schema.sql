Database Schema & RLS

#PROFILLES CREATION( RLS ENABLED WITH POLICY RULES)

create table if not exists profiles (
  id uuid primary key,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  updated_at timestamp with time zone default now()
);

alter table profiles enable row level security;

-- insert own profile
create policy "Users can insert own profile"
on profiles
for insert
with check (auth.uid() = id);

-- read own profile
create policy "Users can read own profile"
on profiles
for select
using (auth.uid() = id);

-- update own profile
create policy "Users can update own profile"
on profiles
for update
using (auth.uid() = id);



#QUERIES CREATION( RLS ENABLED WITH POLICY RULES)
create table if not exists queries (
  id uuid primary key,
  user_id uuid references auth.users(id),
  question text not null,
  created_at timestamp with time zone default now()
);

alter table queries enable row level security;

-- insert own queries
create policy "Users can insert own queries"
on queries
for insert
with check (auth.uid() = user_id);

-- read own queries
create policy "Users can read own queries"
on queries
for select
using (auth.uid() = user_id);



#RESOURCES CREATION( RLS ENABLED WITH POLICY RULES)
create table if not exists resources (
  id uuid primary key,
  user_id uuid references auth.users(id),
  query_id uuid references queries(id),
  answer text not null,
  created_at timestamp with time zone default now()
);

alter table resources enable row level security;

-- anyone can read learning resources
create policy "Public can read resources"
on resources
for select
using (true);
