# Database Setup Guide

## Step 1: Run Migration in Supabase

1. Go to your Supabase Dashboard
2. Click on **SQL Editor** in the left sidebar
3. Click **New Query**
4. Copy the entire contents of `migrations/0001_initial_schema.sql`
5. Paste into the SQL editor
6. Click **Run** (or press Cmd/Ctrl + Enter)
7. You should see "Success. No rows returned"

## Step 2: Verify Tables Were Created

1. In Supabase, click **Table Editor** in the left sidebar
2. You should see these tables:
   - `users`
   - `problems`
   - `admin_users`
   - `admin_actions`
   - `problem_moderation`

## Step 3: Get Your DATABASE_URL

1. In Supabase, go to **Settings** → **Database**
2. Scroll down to **Connection string**
3. Select **URI** tab
4. Copy the connection string
5. Replace `[YOUR-PASSWORD]` with your actual database password
6. Add to `.env.local`:
   ```
   DATABASE_URL=your-connection-string-here
   ```

## Step 4: Test Connection

Run this command to test your database connection:
```bash
npm run db:studio
```

If you see "Drizzle Studio is running", you're all set!

## Next Steps

Once your database is set up:
1. Run the development server: `npm run dev`
2. Navigate to `/admin/setup` to create your first admin user
3. Save the generated admin ID securely!
