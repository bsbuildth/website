# GitHub Secrets Template

Use this file to understand what secrets to add to GitHub.

**Location:** GitHub → Settings → Secrets and variables → Actions

---

## Required Secrets

### REACT_APP_API_URL ⚠️ MUST HAVE

```
Name: REACT_APP_API_URL
Value: https://your-railway-service.up.railway.app
```

**What it does:** 
- Frontend uses this URL to make API calls
- Example response in browser console: API responses from this URL

**Where to get it:**
1. Go to Railway dashboard
2. Select your service
3. Copy the "Public URL" (looks like: https://something.up.railway.app)

**When to update:**
- After Railway deploys your backend service
- If you set up custom domain, change to: https://api.yourdomain.com

---

## Optional Secrets

### CUSTOM_DOMAIN

```
Name: CUSTOM_DOMAIN
Value: yourdomain.com
```

**What it does:**
- Configures GitHub Pages to use your custom domain
- GitHub will create CNAME file automatically

**Where to get it:**
- Your domain registrar (Namecheap, GoDaddy, etc.)

**When to add:**
- Only if you have a custom domain
- Leave empty/don't add if using default GitHub Pages domain

**Important:**
- Must configure DNS records first
- CNAME record: yourdomain.com → username.github.io

---

### RAILWAY_TOKEN

```
Name: RAILWAY_TOKEN
Value: [copy from Railway account]
```

**What it does:**
- Allows GitHub Actions to authenticate with Railway
- Used by deployment workflow to update Railway service

**Where to get it:**
1. Go to https://railway.app/account/tokens
2. Create new token
3. Copy the full token

**When to add:**
- Only if using Railway for backend
- Not needed if using Render, Heroku, or other platforms

---

### RAILWAY_SERVICE_ID

```
Name: RAILWAY_SERVICE_ID
Value: [copy from Railway service]
```

**What it does:**
- Identifies which Railway service to deploy

**Where to get it:**
1. Go to Railway dashboard
2. Select your service
3. Go to Settings → Service ID
4. Copy the ID

**When to add:**
- Only if using Railway for backend
- Pair with RAILWAY_TOKEN for auto-deployment

---

## How to Add Secrets to GitHub

### Method 1: Web UI (Easiest)

1. Go to your GitHub repository
2. Click **Settings** (top menu)
3. Click **Secrets and variables** (left sidebar)
4. Click **Actions** (in case there are multiple)
5. Click **New repository secret** (green button)
6. **Name:** Type the secret name (e.g., REACT_APP_API_URL)
7. **Value:** Paste the secret value
8. Click **Add secret**

### Method 2: GitHub CLI

```bash
# Install GitHub CLI if needed
# Then run:

gh secret set REACT_APP_API_URL --body "https://your-railway-service.up.railway.app"
gh secret set RAILWAY_TOKEN --body "your_railway_token_here"
gh secret set RAILWAY_SERVICE_ID --body "your_service_id_here"
gh secret set CUSTOM_DOMAIN --body "yourdomain.com"
```

---

## Secrets Checklist

### Minimum for Deployment
- [ ] REACT_APP_API_URL (required for frontend to call backend)

### For Railway Backend
- [ ] RAILWAY_TOKEN (to deploy to Railway)
- [ ] RAILWAY_SERVICE_ID (which service to deploy)

### For Custom Domain
- [ ] CUSTOM_DOMAIN (your registered domain)

### All Optional
- [ ] Additional API keys (if needed)
- [ ] Custom configuration values

---

## Security Best Practices

❌ **Don't:**
- Share secrets in public repositories
- Hardcode secrets in code files
- Commit .env files with real values
- Share secret values in messages or emails

✅ **Do:**
- Use GitHub Secrets for all sensitive data
- Rotate tokens and passwords regularly
- Use app-specific passwords (for Gmail, etc.)
- Keep .env.example with placeholder values

---

## Testing Secrets

After adding secrets, verify they work:

```bash
# Push a change to trigger workflow
git add .
git commit -m "Test secrets"
git push origin main

# Check GitHub Actions:
# If workflow succeeds → secrets are correct
# If workflow fails → check secret names and values
```

Watch the logs:
1. GitHub → Actions tab
2. Click the workflow run
3. Click "Build" or "Deploy" job
4. Check logs for any error messages

---

## Rotating/Updating Secrets

If you need to update a secret:

1. GitHub → Settings → Secrets → Actions
2. Click the secret name
3. Click **Update**
4. Paste new value
5. Click **Save**

The next workflow run will use the updated value.

---

## Reference Table

| Secret | Required | Used For | Example |
|--------|----------|----------|---------|
| REACT_APP_API_URL | ✅ YES | Frontend API calls | https://api.up.railway.app |
| RAILWAY_TOKEN | ❌ NO | Railway auth | ey... (long string) |
| RAILWAY_SERVICE_ID | ❌ NO | Which service | abc123... |
| CUSTOM_DOMAIN | ❌ NO | GitHub Pages domain | yourdomain.com |

---

## Troubleshooting

**Q: Where do I find my Railway token?**
A: https://railway.app/account/tokens

**Q: Where do I find my Railway Service ID?**
A: Railway dashboard → Service → Settings → Service ID

**Q: Can I share my GitHub token?**
A: No! It auto-generates when needed. Never copy or share it.

**Q: What if I forget a secret value?**
A: You can't view existing secrets. You must generate a new one or get it from the original source.

**Q: How often should I rotate secrets?**
A: Every 90 days is recommended. Immediately if compromised.

---

## Next Steps

1. ✅ Add REACT_APP_API_URL secret
2. ✅ Set up Railway and get its public URL
3. ✅ Add RAILWAY_TOKEN and RAILWAY_SERVICE_ID secrets
4. ✅ Push code to trigger workflows
5. ✅ Verify deployment succeeds
6. ✅ Test frontend can call backend API

See `QUICK_START_DEPLOYMENT.md` for quick start guide.
