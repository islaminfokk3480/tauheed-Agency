# Tauheed Estate Agency

A luxurious, high-end real estate web application built with React, Vite, Tailwind CSS, and Framer Motion. Features a premium dark luxury visual design, search functionality, interactive mortgage calculator, property filtering, and beautiful virtual tour simulations.

## Deployment on Vercel

This project is fully configured for seamless, one-click deployment on [Vercel](https://vercel.com).

### Easy Deployment Steps

1. **Push to GitHub / GitLab / Bitbucket**:
   Ensure your code is pushed to a remote repository.

2. **Import to Vercel**:
   - Go to your Vercel Dashboard.
   - Click **Add New** > **Project**.
   - Import your repository.

3. **Configure Project Settings**:
   Vercel will automatically detect the **Vite** framework preset. Double-check the following defaults:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build` (or `vite build`)
   - **Output Directory**: `dist`

4. **Deploy**:
   Click **Deploy**. Your premium application will be live in seconds!

### Included Configuration (`vercel.json`)

To ensure client-side routing works beautifully when users refresh custom URLs or direct links, we've included a `/vercel.json` configuration file:

```json
{
  "version": 2,
  "cleanUrls": true,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

This guarantees all deep links properly route back to your React SPA's `index.html`.
