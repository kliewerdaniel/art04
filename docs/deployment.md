# Deployment Guide

This guide explains how to deploy the Art01 platform frontend to Netlify free tier.

## Frontend Deployment (Next.js to Netlify)

### Prerequisites
- Netlify account (free tier available)
- GitHub repository with the project

### Build Configuration
- **Build command**: `cd apps/web && pnpm build`
- **Publish directory**: `apps/web/.next`
- **Node version**: 18 or higher
- **Package manager**: pnpm

### Environment Variables
Set these in Netlify dashboard under Site settings > Environment variables:

```env
NEXTAUTH_URL=https://your-netlify-site.netlify.app
NEXTAUTH_SECRET=your-nextauth-secret-here
EMAIL_SERVER=smtp://username:password@smtp.example.com:587
EMAIL_FROM=noreply@example.com
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
DATABASE_URL="file:./dev.db"
ENCRYPTION_KEY=your-encryption-key-here
```

### Deployment Steps

#### Option 1: Deploy via Netlify Dashboard (Recommended)
1. Push your code to GitHub
2. Go to [Netlify](https://app.netlify.com/)
3. Click "New site from Git"
4. Connect your GitHub repository
5. Set build settings:
   - Branch to deploy: `main`
   - Build command: `cd apps/web && pnpm build`
   - Publish directory: `apps/web/.next`
6. Click "Deploy site"
7. Netlify will build and deploy your site

#### Option 2: Deploy via CLI
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize in project root
cd apps/web
netlify init

# Follow CLI prompts to configure deployment
# Build command: pnpm build
# Publish directory: ./.next
```

## Local Services

### Database (SQLite)
The database remains local. Run database operations locally.

### ML Service (Optional)
The FastAPI ML service can be run locally alongside the frontend:

```bash
# Run ML service
cd ml-service
docker build -t art01-ml .
docker run -p 8000:8000 art01-ml

# Or run locally with Python
pip install -r requirements.txt
uvicorn app:app --reload
```

To include ML features, configure frontend to point to local ML service in development or a cloud deployment.

## Artist Site Export

Export individual artist portfolios as static sites:

```bash
# Export artist profile as static HTML
node scripts/export-artist.js --artistId abc123 --output static-sites/artist123

# Export as ZIP for download
node scripts/export-artist.js --artistId abc123 --output files/artist.zip --format zip
```

Use these generated sites for portfolio sharing or deploy to any static hosting.

## Post-Deployment Checklist

- [ ] Verify authentication flow works
- [ ] Test API routes
- [ ] Check charts load with real data
- [ ] Verify artist export functionality
- [ ] Test responsive design on mobile
- [ ] Configure email service for magic links
- [ ] Set up monitoring and error logging

## Additional Configuration

### Custom Domain
In Netlify dashboard, go to Site settings > Domain management to add a custom domain.

### Analytics
Add Google Analytics or other tracking by adding the script to `app/layout.tsx`.

### Security Headers
Configure security headers in `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
      ],
    },
  ],
}

module.exports = nextConfig
```

## Troubleshooting

### Build Failing
- Ensure `pnpm` is installed globally on Netlify (can be done via build hooks)
- Check logs in Netlify dashboard for specific errors
- Verify all dependencies are listed in `apps/web/package.json`

### Authentication Issues
- Ensure `NEXTAUTH_URL` matches your deployed URL
- Check email service configuration
- Verify database connectivity locally

### API Routes Not Working
- API routes work in production if server components are used
- Test API endpoints locally before deployment
- Ensure environment variables are set correctly

For more Netlify-specific help, see the [Next.js deployment documentation](https://docs.netlify.com/integrate/frameworks/next/).
