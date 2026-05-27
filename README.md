# 🏢 Construction & Interior Design Portfolio Website

A beautiful, fully-functional portfolio website for construction and interior design business. Features project showcase, quotation calculator, contact management with email and LINE notifications.

---

## ✨ Features

✅ **Responsive Design** - Works perfectly on desktop, tablet, and mobile  
✅ **Project Showcase** - Display portfolio projects with images and details  
✅ **Interactive Calculator** - Quotation calculator for different project types  
✅ **Contact Management** - Contact form with email and LINE notifications  
✅ **Client Reviews** - Display customer testimonials  
✅ **Admin Dashboard** - Manage projects, prices, reviews, and content  
✅ **Beautiful UI** - Modern, professional design  

---

## 🚀 Quick Start (3 Steps to Full Functionality)

### Current Status
- ✅ Frontend: Live and working on GitHub Pages
- ✅ Backend: Complete and tested locally
- ⏳ **Backend Deployment**: Required to complete the system

### Step 1: Deploy Backend (Choose One)

**Option A: Glitch (Easiest - Recommended)**
```
https://glitch.com/import/github/songyos2528/website
```

**Option B: Vercel**
```
https://vercel.com/import/project?repo=https://github.com/songyos2528/website
```

**Option C: Railway**
```
https://railway.app/
```

### Step 2: Update GitHub Secret
1. Go to: https://github.com/songyos2528/website/settings/secrets/actions
2. Create new secret:
   - **Name**: `VITE_API_URL`
   - **Value**: (paste the URL from Step 1)

### Step 3: Frontend Rebuilds (Automatic)
The frontend will automatically rebuild and connect to your backend.

---

## 📂 Project Structure

```
website/
├── app/                    # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app
│   ├── public/            # Static assets
│   └── package.json       # Frontend dependencies
│
├── api/                    # Node.js backend
│   ├── server.js          # Express server
│   └── package.json       # Backend dependencies
│
├── .github/
│   └── workflows/         # GitHub Actions CI/CD
│
└── Documentation files:
    ├── SYSTEM_STATUS.md              # Current system status
    ├── FINAL_SETUP_CHECKLIST.md      # Complete setup guide
    ├── DEPLOY_NOW.md                 # Quick deployment guide
    └── DEPLOYMENT_FINAL_STEP.md      # Detailed deployment steps
```

---

## 🛠️ Technology Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool (fast development)
- **CSS3** - Responsive styling
- **GitHub Pages** - Hosting

### Backend
- **Node.js** - Runtime
- **Express.js** - Web framework
- **Nodemailer** - Email notifications
- **@line/bot-sdk** - LINE messaging
- Multiple deployment options (Glitch, Vercel, Railway, etc.)

---

## 📋 Documentation

### For Deployment
1. **[SYSTEM_STATUS.md](./SYSTEM_STATUS.md)** - Current system status and readiness
2. **[FINAL_SETUP_CHECKLIST.md](./FINAL_SETUP_CHECKLIST.md)** - Detailed setup with all options
3. **[DEPLOY_NOW.md](./DEPLOY_NOW.md)** - Quick one-click deployment guide
4. **[DEPLOYMENT_FINAL_STEP.md](./DEPLOYMENT_FINAL_STEP.md)** - Step-by-step Render setup

### For Development
- **[GLITCH_AUTO_DEPLOY.md](./GLITCH_AUTO_DEPLOY.md)** - Glitch deployment details
- **[VERCEL_AUTO_DEPLOY.md](./VERCEL_AUTO_DEPLOY.md)** - Vercel deployment details
- **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - Master setup guide

### For Testing
```bash
# Run backend tests
node TEST_BACKEND.js

# Start backend locally
cd api && npm start

# Start frontend locally
cd app && npm run dev
```

---

## 🎨 Features in Detail

### Project Showcase
- Display portfolio projects with images
- Filter by category (interior, renovation, etc.)
- Click to view detailed project information
- Beautiful responsive grid layout

### Quotation Calculator
- Select project type
- Enter dimensions
- Automatic price calculation
- Request quotation via form

### Contact Management
- Contact form in footer
- Email notifications to admin
- LINE notifications to admin
- Auto-reply to customer

### Admin Dashboard
- Login system for admin
- Manage projects (create, edit, delete)
- Manage calculator types and pricing
- Manage reviews and testimonials
- Manage content and settings

---

## 🔗 Live Demo

**Website**: https://songyos2528.github.io/website/

(Backend must be deployed for full functionality)

---

## 📧 Notifications Setup

### Email Notifications
Set environment variables:
```
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

### LINE Notifications
Set environment variables:
```
LINE_CHANNEL_ACCESS_TOKEN=your-line-token
```

---

## 🚀 Deployment Options

### Glitch (Recommended)
- Zero configuration
- Click and deploy
- Free hosting 24/7
- Real-time editor

### Vercel
- Automatic GitHub sync
- Global edge deployment
- Free tier available
- Very fast

### Railway
- Generous free tier
- Auto-deploy on push
- Clear dashboard
- $5-20/month typical

### Fly.io
- Global deployment
- Flexible pricing
- Docker-native

### Render
- Free tier available
- Easy GitHub integration
- Simple dashboard

---

## ✅ Verification Checklist

After deployment, verify:
- [ ] Frontend loads at https://songyos2528.github.io/website/
- [ ] Projects display with images
- [ ] Project details load when clicked
- [ ] Calculator works correctly
- [ ] Contact form submits successfully
- [ ] Email notification received
- [ ] LINE notification received
- [ ] No console errors

---

## 💬 Support & Troubleshooting

### Frontend shows "Failed to load projects"
- ✓ Backend URL in GitHub Secret is incorrect
- ✓ Backend is not deployed yet
- **Fix**: Check VITE_API_URL secret and verify backend deployment

### Email notifications not sending
- ✓ EMAIL_USER or EMAIL_PASSWORD not set in backend
- ✓ Gmail requires app-specific password
- **Fix**: Set up email credentials in backend environment

### LINE notifications not sending
- ✓ LINE_CHANNEL_ACCESS_TOKEN not configured
- **Fix**: Get token from LINE Developers Console

### Build fails on GitHub Actions
- ✓ Check GitHub Actions logs
- ✓ Verify all environment variables are set
- **Fix**: Review error message in Actions tab

---

## 📝 License

This project is for personal/commercial use.

---

## 🎯 Next Steps

1. **Click one deployment link** above (Glitch, Vercel, or Railway)
2. **Add GitHub Secret** with backend URL
3. **Done!** Website becomes fully functional

---

## 📞 Quick Links

| Link | Purpose |
|------|---------|
| [Frontend](https://songyos2528.github.io/website/) | Live website |
| [GitHub Repository](https://github.com/songyos2528/website) | Source code |
| [GitHub Secrets](https://github.com/songyos2528/website/settings/secrets/actions) | Configuration |
| [GitHub Actions](https://github.com/songyos2528/website/actions) | Build status |
| [Glitch Import](https://glitch.com/import/github/songyos2528/website) | Deploy to Glitch |
| [Vercel Import](https://vercel.com/import/project?repo=https://github.com/songyos2528/website) | Deploy to Vercel |
| [Railway](https://railway.app/) | Deploy to Railway |

---

**Status**: ✅ Ready for deployment  
**Last Updated**: May 28, 2026  
**All Systems Go** 🚀

---

## 🎉 You're Almost There!

Everything is built, tested, and ready. Just deploy the backend and your beautiful website will be fully operational!

**Take the next step → Choose a deployment option above!**
