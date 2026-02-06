# Deployment Guide

## Quick Start: Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   cd /Users/jameskim/airport-codes
   git init
   git add .
   git commit -m "Initial commit: Airport Codes Database"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Done! Your site will be live at `your-project.vercel.app`

## Alternative: Manual Static Export

The project is configured for static export (`output: 'export'` in `next.config.mjs`).

### Build Static Files

```bash
npm run build
```

This creates an `/out` directory with all static HTML files.

### Deploy to Any Static Host

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=out
```

**AWS S3:**
```bash
# Build first
npm run build

# Upload to S3 bucket
aws s3 sync out/ s3://your-bucket-name --delete

# Configure bucket for static website hosting in AWS Console
```

**GitHub Pages:**
```bash
# Build
npm run build

# Push out/ folder to gh-pages branch
git subtree push --prefix out origin gh-pages
```

**Cloudflare Pages:**
- Connect your GitHub repo
- Set build command: `npm run build`
- Set output directory: `out`

## Environment Variables

No environment variables are required for the MVP.

For future features (AdSense, Analytics), add them in your hosting platform:

**Vercel:**
1. Go to Project Settings → Environment Variables
2. Add variables like `NEXT_PUBLIC_ADSENSE_CLIENT_ID`

**Netlify:**
1. Site Settings → Environment Variables
2. Add your variables

## Custom Domain Setup

### Vercel
1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as shown

### Netlify
1. Domain Settings → Add custom domain
2. Update your DNS provider with Netlify nameservers

## Post-Deployment Checklist

- [ ] Verify homepage loads correctly
- [ ] Test search functionality
- [ ] Check 5-10 random airport pages
- [ ] Check 3-5 country pages
- [ ] Test mobile responsiveness
- [ ] Verify SEO meta tags (view page source)
- [ ] Test 404 page
- [ ] Check site performance (PageSpeed Insights)
- [ ] Add to Google Search Console
- [ ] Submit sitemap (optional, but recommended)

## Adding AdSense

After deployment:

1. Sign up for Google AdSense
2. Get your AdSense code
3. Replace placeholder comments in:
   - `/app/page.tsx` (homepage)
   - `/app/airport/[code]/page.tsx` (airport pages)
4. Rebuild and redeploy

## Monitoring & Analytics

Recommended tools:
- **Google Analytics**: Add GA4 tracking code to layout.tsx
- **Vercel Analytics**: Built-in, enable in dashboard
- **Google Search Console**: Monitor search performance
- **Plausible/Fathom**: Privacy-friendly alternatives

## Performance Optimization

The site is already optimized:
- ✅ Static generation (all pages pre-rendered)
- ✅ Tailwind CSS (minimal CSS bundle)
- ✅ No images (text-only for fast loading)
- ✅ TypeScript (type safety)

For further optimization:
- Add Content-Delivery Network (CDN) - Vercel includes this
- Enable compression on your server
- Add cache headers for static assets

## Updating Content

To add new airports or modify data:

1. Edit `/data/airports.json`
2. Run `npm run build`
3. Deploy updated `/out` directory (or push to GitHub for auto-deploy)

## Troubleshooting

**Build fails:**
- Check TypeScript errors: `npx tsc --noEmit`
- Verify JSON syntax in data files

**Pages not generating:**
- Ensure airport/country codes are lowercase in URLs
- Check `generateStaticParams()` functions

**Search not working:**
- Client-side component issue - check browser console
- Verify SearchBox component is marked with 'use client'

## Support

For issues, check:
1. Build logs in your hosting platform
2. Browser console for client-side errors
3. Next.js documentation: https://nextjs.org/docs
