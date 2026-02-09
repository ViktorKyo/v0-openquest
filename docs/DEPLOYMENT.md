# Deployment Guide

## Vercel (Recommended)

Vercel provides the best deployment experience for Next.js applications.

### Prerequisites

- GitHub account with the repository
- Vercel account (free tier available)
- Supabase project with PostgreSQL database
- Resend account for email (optional but recommended)

### Step-by-Step Deployment

#### 1. Prepare Your Repository

Ensure your code is pushed to GitHub:
```bash
git add -A
git commit -m "Prepare for deployment"
git push origin main
```

#### 2. Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Select "Import Git Repository"
4. Choose your `v0-openquest` repository
5. Click "Import"

#### 3. Configure Environment Variables

In the Vercel project settings, add these environment variables:

| Variable | Value | Notes |
|----------|-------|-------|
| `DATABASE_URL` | Your Supabase connection string | Get from Supabase Dashboard > Settings > Database |
| `JWT_SECRET` | 32+ character random string | `openssl rand -base64 32` |
| `ADMIN_JWT_SECRET` | Different 32+ character string | `openssl rand -base64 32` |
| `RESEND_API_KEY` | Your Resend API key | From resend.com/api-keys |
| `EMAIL_FROM` | `noreply@yourdomain.com` | Must be verified in Resend |
| `NEXT_PUBLIC_APP_URL` | `https://your-app.vercel.app` | Your production URL |

#### 4. Deploy

Click "Deploy" and wait for the build to complete.

#### 5. Verify Deployment

1. Visit your deployment URL
2. Check that pages load correctly
3. Test the admin login at `/admin/login`

### Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Configure DNS as instructed
4. Update `NEXT_PUBLIC_APP_URL` environment variable
5. Update `EMAIL_FROM` if using your domain for email

### Automatic Deployments

Vercel automatically deploys:
- **Production**: When you push to `main` branch
- **Preview**: When you open a Pull Request

## Database Setup (Supabase)

### Creating a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Choose organization and region
4. Set a secure database password
5. Wait for project to be created (~2 minutes)

### Getting Connection String

1. Go to Project Settings > Database
2. Copy the "Connection string" (URI format)
3. Replace `[YOUR-PASSWORD]` with your database password

### Initializing Schema

After setting `DATABASE_URL` in Vercel:

```bash
# Locally, with DATABASE_URL pointing to production
pnpm db:push
```

Or use Supabase SQL Editor to run the schema manually.

## Email Setup (Resend)

### Creating Resend Account

1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email
3. Add and verify your sending domain (or use their test domain)

### Getting API Key

1. Go to API Keys in Resend dashboard
2. Create a new API key
3. Copy and save it (shown only once)
4. Add to Vercel environment variables

### Domain Verification

For production email:
1. Add your domain in Resend
2. Add the DNS records they provide
3. Wait for verification (can take up to 48 hours)

## Admin Setup

### First-Time Admin Creation

1. Visit `/admin/setup` on your deployed app
2. Enter an admin ID (memorable, like `viktor123`)
3. Click "Create Admin"
4. Save the admin ID securely

### Admin Login

1. Go to `/admin/login`
2. Enter your admin ID
3. You'll be logged in (passwordless)

## Monitoring

### Vercel Analytics

1. Enable Analytics in Vercel project settings
2. View traffic, performance, and errors

### Function Logs

1. Go to Vercel Dashboard > Deployments
2. Click on a deployment
3. View "Functions" tab for API logs

### Database Monitoring

Use Supabase dashboard:
- Database usage and connections
- Query performance
- Storage usage

## Troubleshooting

### Build Fails

Check the build logs in Vercel for specific errors. Common issues:

**TypeScript errors:**
```bash
pnpm build  # Run locally to see errors
```

**Missing environment variables:**
- Ensure all required variables are set in Vercel

### Database Connection Issues

- Verify `DATABASE_URL` is correct
- Check Supabase project is active (not paused)
- Ensure IP is not blocked (Supabase allows all by default)

### Email Not Sending

- Verify `RESEND_API_KEY` is set
- Check domain is verified in Resend
- Check Resend dashboard for delivery logs

### Admin Login Not Working

- Ensure admin user exists in database
- Check `ADMIN_JWT_SECRET` is set
- Clear cookies and try again

## Security Checklist

Before going live:

- [ ] Strong, unique JWT secrets (not copied from .env.example)
- [ ] Database password is secure
- [ ] Resend API key has limited scope
- [ ] Admin IDs are not guessable
- [ ] `.env.local` is in `.gitignore`
- [ ] No secrets in repository

## Updating Production

```bash
# Make changes locally
git add -A
git commit -m "feat: your changes"
git push origin main
# Vercel automatically deploys
```

For urgent fixes:
1. Push to a branch
2. Open PR
3. Verify preview deployment works
4. Merge to main

## Rollback

If a deployment breaks:
1. Go to Vercel Dashboard > Deployments
2. Find the last working deployment
3. Click "..." > "Promote to Production"
