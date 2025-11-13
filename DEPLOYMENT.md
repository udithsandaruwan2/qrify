# QRify Deployment Guide

## Frontend Deployment to Netlify

### Method 1: Netlify CLI (Recommended)

1. **Install Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Build the project**
```bash
cd frontend
npm run build
```

3. **Deploy to Netlify**
```bash
netlify deploy --prod
```

### Method 2: Git Integration (Automatic)

1. **Push your code to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Netlify**
   - Go to https://app.netlify.com
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
     - **Base directory**: `frontend`

3. **Set Environment Variables**
   In Netlify dashboard → Site settings → Environment variables:
   - `VITE_API_URL` = Your backend API URL (e.g., `https://your-backend.railway.app/api`)

### Method 3: Manual Drag & Drop

1. **Build locally**
```bash
cd frontend
npm run build
```

2. **Deploy**
   - Go to https://app.netlify.com/drop
   - Drag and drop the `dist` folder

---

## Backend Deployment to Railway

### Using Railway CLI

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login to Railway**
```bash
railway login
```

3. **Deploy**
```bash
cd backend
railway init
railway up
```

4. **Set Environment Variables**
```bash
railway variables set SECRET_KEY=your-secret-key
railway variables set DEBUG=False
railway variables set ALLOWED_HOSTS=your-domain.railway.app
railway variables set DATABASE_URL=your-postgres-url
```

### Using Railway Dashboard

1. **Push to GitHub**
2. **Go to https://railway.app**
3. **Create New Project** → "Deploy from GitHub"
4. **Select your repository**
5. **Set environment variables** in Railway dashboard
6. **Set start command**: `gunicorn qrify_backend.wsgi --bind 0.0.0.0:$PORT`

---

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.railway.app/api
```

### Backend (.env)
```env
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-backend.railway.app
CORS_ALLOWED_ORIGINS=https://your-frontend.netlify.app
DATABASE_URL=postgresql://user:password@host:port/database
```

---

## Important Configuration

### Update Backend CORS Settings

Make sure your backend allows requests from your Netlify domain:

In `backend/qrify_backend/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "https://your-frontend.netlify.app",
    "http://localhost:5173",  # Keep for local development
]
```

### Update Frontend API URL

In `frontend/.env`:
```env
VITE_API_URL=https://your-backend.railway.app/api
```

---

## Post-Deployment Checklist

- [ ] Backend is accessible at your Railway URL
- [ ] Frontend is accessible at your Netlify URL
- [ ] CORS is configured correctly
- [ ] Environment variables are set
- [ ] Database migrations are run
- [ ] Static files are served correctly
- [ ] QR code generation works
- [ ] History tracking works
- [ ] Theme toggle works

---

## Troubleshooting

### "MIME type error" on Netlify
- Make sure `netlify.toml` is in the frontend folder
- Ensure build command is `npm run build`
- Verify publish directory is `dist`

### CORS errors
- Check CORS_ALLOWED_ORIGINS in backend settings
- Verify frontend is using correct API URL
- Check browser console for exact error

### API connection failed
- Verify VITE_API_URL in Netlify environment variables
- Check backend is running on Railway
- Test API endpoint directly in browser

---

## Quick Deploy Commands

**Build and test locally:**
```bash
# Backend
cd backend
source venv/bin/activate
python manage.py runserver

# Frontend (new terminal)
cd frontend
npm run build
npm run preview  # Test production build locally
```

**Deploy to production:**
```bash
# Commit changes
git add .
git commit -m "Deploy to production"
git push origin main

# Netlify will auto-deploy frontend
# Railway will auto-deploy backend (if configured)
```

---

For more details, see:
- Netlify Docs: https://docs.netlify.com
- Railway Docs: https://docs.railway.app
