# Frontend Production Checklist

## Performance Optimization

### 1. Code Splitting
- Routes are lazy loaded with React.lazy()
- Components should be code-split for large bundles

### 2. Image Optimization
- Compress all images
- Use WebP format with fallbacks
- Implement lazy loading

### 3. Bundle Size
Run before deployment:
```bash
npm run build
# Check dist folder size
du -sh dist/
```

### 4. Caching Strategy
Set in Nginx/server config:
```
# Cache static assets for 1 year
location ~* \.(js|css|png|jpg|jpeg|gif|svg)$ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}

# Don't cache HTML
location / {
  add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

## SEO Optimization

### 1. Meta Tags
Add to public/index.html:
```html
<meta name="description" content="HR Recruitment SaaS Platform">
<meta name="keywords" content="HR, Recruitment, ATS, Job Management">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta property="og:title" content="HR Recruitment SaaS">
<meta property="og:description" content="Streamline your recruitment process">
<meta property="og:image" content="og-image.png">
```

### 2. Sitemap & Robots
Create public/sitemap.xml and public/robots.txt

## Monitoring Frontend

### 1. Error Tracking (Sentry)
```bash
npm install @sentry/react @sentry/tracing
```

```javascript
// src/main.jsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: import.meta.env.MODE,
  tracesSampleRate: 1.0,
});
```

### 2. Analytics
Consider:
- Google Analytics
- Mixpanel
- Amplitude

### 3. Web Vitals
```bash
npm install web-vitals
```

## Testing

### Unit Tests
```bash
npm install --save-dev vitest @testing-library/react
```

### E2E Tests
```bash
npm install --save-dev playwright
```

## CI/CD Pipeline

### GitHub Actions Example
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run test
      - name: Deploy to Vercel
        uses: vercel/action@master
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
```

