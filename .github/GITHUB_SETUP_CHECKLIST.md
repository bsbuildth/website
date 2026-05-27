# GitHub Deployment Setup Checklist

Use this checklist to ensure all components are properly configured for deployment.

## 1. GitHub Repository Setup

- [ ] Repository is public (for GitHub Pages to work)
- [ ] `main` branch is the default branch
- [ ] `.github/workflows/` directory exists with deployment files
- [ ] All dependencies are committed in `app/` and `api/` directories

**Commands to verify:**
```bash
git branch -a  # Check you have main branch
git log main -1  # Verify commits are on main
```

## 2. GitHub Secrets Configuration

Go to **Settings → Secrets and variables → Actions** and add these secrets:

### Essential Secrets:
```
✅ REACT_APP_API_URL
   Value: https://api.yourdomain.com
   or: https://your-railway-service.up.railway.app
   
   Purpose: Frontend uses this to call backend API
   Used in: .github/workflows/deploy-frontend.yml
```

### Optional Secrets (if using Railway):
```
☐ RAILWAY_TOKEN
   Get from: https://railway.app/account/tokens
   Purpose: Authenticate GitHub Actions with Railway
   
☐ RAILWAY_SERVICE_ID
   Get from: Railway dashboard > Service > Settings > Service ID
   Purpose: Identify which service to deploy
   
☐ CUSTOM_DOMAIN
   Value: yourdomain.com
   Purpose: Configure custom domain for GitHub Pages
   Leave empty if using default GitHub Pages domain
```

## 3. Frontend Configuration

### 3.1 GitHub Pages Setup
```
Location: Settings → Pages
- [ ] Source: Deploy from branch
- [ ] Branch: gh-pages
- [ ] Folder: / (root)
- [ ] Custom domain: yourdomain.com (if applicable)
```

### 3.2 Files Created/Updated
```
- [ ] .github/workflows/deploy-frontend.yml ✅ (created)
- [ ] app/.env.production ✅ (created)
- [ ] app/.gitignore ✅ (updated)
- [ ] Vite build script in app/package.json (already configured)
```

### 3.3 Environment Variables
```
File: app/.env.production
- [ ] REACT_APP_API_URL is set to backend API URL
```

### 3.4 First Deploy
```bash
# Ensure code is up to date
git add .
git commit -m "Setup GitHub deployment infrastructure"
git push origin main

# Watch progress
# Go to GitHub → Actions tab
# Click on "Deploy Frontend to GitHub Pages" workflow
# Wait for green checkmark (1-2 minutes)
```

**Access:** 
- Default: https://username.github.io/repo-name
- Custom: https://yourdomain.com

## 4. Backend Configuration

### 4.1 Files Created/Updated
```
- [ ] .github/workflows/deploy-backend.yml ✅ (created)
- [ ] api/.env.example ✅ (created)
- [ ] api/server.js ✅ (updated for environment variables)
- [ ] api/package.json ✅ (updated with start script)
- [ ] api/.gitignore (already configured)
```

### 4.2 Environment Variables
```
File: api/.env (local development)
- [ ] NODE_ENV=development
- [ ] PORT=3000
- [ ] EMAIL_USER=your-gmail
- [ ] EMAIL_PASSWORD=your-app-password
- [ ] LINE_CHANNEL_ACCESS_TOKEN
- [ ] LINE_CHANNEL_SECRET
- [ ] SESSION_SECRET

File: Railway Dashboard (for production)
- [ ] All above environment variables set in Railway service
- [ ] FRONTEND_PRODUCTION_URL set to your frontend domain
```

## 5. Railway Backend Setup (Recommended)

### 5.1 Create Railway Service
```
- [ ] Go to https://railway.app
- [ ] Sign up with GitHub
- [ ] Create new project from GitHub repo
- [ ] Select 'api' folder
- [ ] Note the public URL (e.g., https://api-xyz.up.railway.app)
```

### 5.2 Configure Environment Variables in Railway
```
Go to: Railway Dashboard → Service → Variables

- [ ] NODE_ENV=production
- [ ] PORT=3000
- [ ] HOST=0.0.0.0
- [ ] FRONTEND_PRODUCTION_URL=https://yourdomain.com
- [ ] EMAIL_USER=your-gmail@gmail.com
- [ ] EMAIL_PASSWORD=<app-specific-password>
- [ ] LINE_CHANNEL_ACCESS_TOKEN=<token>
- [ ] LINE_CHANNEL_SECRET=<secret>
- [ ] SESSION_SECRET=<long-random-string>
```

### 5.3 Enable Auto-Deploy
```
- [ ] Deployment: Automatic (Railway default)
- [ ] Verify webhook is configured
```

### 5.4 Copy Backend URL
```
- [ ] Get from Railway: Service → Settings → Public URL
- [ ] Example: https://api-xyz.up.railway.app
- [ ] Add to GitHub secret: REACT_APP_API_URL
```

## 6. Domain Configuration (Optional)

### 6.1 Custom Domain Registration
```
- [ ] Domain registered (Namecheap, GoDaddy, Route53, etc.)
- [ ] Domain registrar access available
- [ ] DNS management accessible
```

### 6.2 DNS Configuration
```
For Frontend (GitHub Pages):
- [ ] Add CNAME record: yourdomain.com → username.github.io
  OR
- [ ] Add A records pointing to GitHub's servers
      185.199.108.153
      185.199.109.153
      185.199.110.153
      185.199.111.153

For Backend (Railway):
- [ ] Get DNS target from Railway service settings
- [ ] Add CNAME: api.yourdomain.com → <Railway DNS target>
```

### 6.3 GitHub Pages Configuration
```
- [ ] Settings → Pages → Custom domain: yourdomain.com
- [ ] Enable HTTPS (automatic with GitHub Pages)
```

### 6.4 Update Configuration
```
- [ ] GitHub secret REACT_APP_API_URL: https://api.yourdomain.com
- [ ] Railway variable FRONTEND_PRODUCTION_URL: https://yourdomain.com
- [ ] Test CORS by accessing frontend and submitting API request
```

## 7. Test Deployment

### 7.1 Frontend Deployment Test
```bash
# Trigger workflow
git add .
git commit -m "Test deployment"
git push origin main

# Expected results:
- [ ] GitHub Actions workflow completes successfully
- [ ] Website loads at GITHUB_PAGES_URL or custom domain
- [ ] No 404 errors on pages
- [ ] CSS and images display correctly
- [ ] No console errors in browser DevTools
```

### 7.2 Backend Deployment Test
```bash
# Check Railway logs
- [ ] Railway shows "Server running on port 3000"

# Test API endpoint
curl https://api.yourdomain.com/health
- [ ] Request returns a response (200, 404, or any response means API is running)

# Test from frontend
- [ ] Make API call from calculator or form
- [ ] Check browser console for response
- [ ] Verify data is processed correctly
```

### 7.3 Full End-to-End Test
```bash
- [ ] Access frontend at domain
- [ ] Load calculator page
- [ ] Submit calculator form
- [ ] Verify API response shows in console
- [ ] Check form submission works
- [ ] Test any file uploads
- [ ] Verify database data is saved
- [ ] Check no CORS errors in console
```

## 8. CI/CD Pipeline Test

### 8.1 Frontend Pipeline
```bash
# Make a change to frontend
cd app
echo "// test comment" >> src/App.jsx

# Commit and push
git add app/src/App.jsx
git commit -m "Test CI/CD pipeline"
git push origin main

# Watch GitHub Actions
- [ ] Workflow triggers automatically
- [ ] Build completes successfully
- [ ] Deployment completes successfully
- [ ] Changes appear live within 2-3 minutes
```

### 8.2 Backend Pipeline
```bash
# Make a change to backend
cd api
echo "// test comment" >> server.js

# Commit and push
git add api/server.js
git commit -m "Test backend CI/CD"
git push origin main

# Watch both:
- [ ] GitHub Actions workflow triggers
- [ ] Railway deployment starts (if connected)
- [ ] Both complete successfully
```

## 9. Monitoring & Maintenance

### 9.1 Regular Checks
```
Monthly:
- [ ] Review GitHub Actions logs for any failures
- [ ] Check Railway logs for errors
- [ ] Verify frontend and backend are accessible
- [ ] Test API functionality

On code changes:
- [ ] Verify workflow triggers correctly
- [ ] Confirm successful deployment
- [ ] Test changes in production
```

### 9.2 Access Points
```
Frontend:
- [ ] GitHub Pages: https://username.github.io/repo-name
  OR: https://yourdomain.com

Backend:
- [ ] API endpoint: https://api.yourdomain.com
  OR: https://api-xyz.up.railway.app

GitHub:
- [ ] Actions: https://github.com/username/repo/actions
- [ ] Secrets: https://github.com/username/repo/settings/secrets/actions

Railway:
- [ ] Dashboard: https://railway.app/dashboard
- [ ] Service logs: Railway → Service → Logs
```

## 10. Troubleshooting Reference

| Problem | Solution | Checklist |
|---------|----------|-----------|
| Frontend not deploying | Check GitHub Actions logs, verify all secrets | [ ] |
| Frontend can't find backend API | Verify REACT_APP_API_URL secret is correct | [ ] |
| Backend not deploying | Check Railway logs, verify environment variables | [ ] |
| CORS errors | Update FRONTEND_PRODUCTION_URL in Railway | [ ] |
| Custom domain not working | Verify DNS records, check GitHub Pages settings | [ ] |
| API endpoint returning 500 | Check Railway logs, verify environment variables | [ ] |

---

## Summary Checklist

```
Quick Status Check:
- [ ] GitHub Actions workflows are running
- [ ] Frontend is deployed and accessible
- [ ] Backend is running on Railway/hosting platform
- [ ] Frontend can communicate with backend API
- [ ] Custom domain (if configured) is working
- [ ] Automated deployments trigger on git push
- [ ] All environment variables are configured
- [ ] No CORS or 404 errors in production
```

---

## Reference Files

Created/Updated files for deployment:
```
.github/
├── workflows/
│   ├── deploy-frontend.yml (NEW)
│   └── deploy-backend.yml (NEW)
└── GITHUB_SETUP_CHECKLIST.md (THIS FILE)

api/
├── .env.example (NEW)
├── server.js (UPDATED - CORS, env variables)
└── package.json (UPDATED - start script)

app/
├── .env.production (NEW)
└── .gitignore (UPDATED)

DEPLOYMENT.md (NEW - Full guide)
```

---

**Last Updated:** 2026-05-28
**Status:** Ready for deployment
**Next Step:** Follow checklist items in order, starting with GitHub Secrets
