# QRify Backend - Render Deployment Setup

## ⚠️ Important: Database Migration Required

Your Render backend is running but the database tables haven't been created yet.

## Steps to Fix Your Render Backend

### 1. Run Database Migrations

In your Render dashboard:

1. Go to your service: https://dashboard.render.com
2. Click on your **qrify** service
3. Go to **Shell** tab (or SSH into your service)
4. Run these commands:

```bash
python manage.py migrate
python manage.py createsuperuser  # Optional: for admin access
```

### 2. Configure Environment Variables

In Render Dashboard → Environment:

```env
SECRET_KEY=your-secret-key-here-generate-a-strong-one
DEBUG=False
ALLOWED_HOSTS=qrify-hmvy.onrender.com
CORS_ALLOWED_ORIGINS=http://localhost:5173,https://qrify0.netlify.app,https://your-custom-domain.com
DATABASE_URL=<automatically-set-by-render-if-using-postgres>
```

### 3. Update CORS Settings

Your backend needs to allow requests from:
- `http://localhost:5173` (local development)
- `https://qrify0.netlify.app` (your Netlify deployment)
- Any other domains you'll use

The backend is already configured to read from environment variables, so just update `CORS_ALLOWED_ORIGINS` in Render.

### 4. Enable Static Files

Make sure your `render.yaml` or build command includes:

```bash
python manage.py collectstatic --noinput && python manage.py migrate
```

## Testing Your Backend

After migration, test these endpoints:

```bash
# API Root
curl https://qrify-hmvy.onrender.com/api/

# QR Codes endpoint (needs device ID header)
curl -X GET https://qrify-hmvy.onrender.com/api/qr-codes/ \
  -H "X-Device-Id: test-device-123"

# Create QR Code
curl -X POST https://qrify-hmvy.onrender.com/api/qr-codes/ \
  -H "Content-Type: application/json" \
  -H "X-Device-Id: test-device-123" \
  -d '{"data": "https://example.com", "device_id": "test-device-123"}'
```

## Current Status

✅ Backend URL: https://qrify-hmvy.onrender.com/api/
✅ API Root: Working
❌ Database: Not migrated yet (OperationalError)
⚠️ CORS: Needs configuration for Netlify domain

## Quick Fix Checklist

- [ ] Run `python manage.py migrate` on Render
- [ ] Set `CORS_ALLOWED_ORIGINS` environment variable
- [ ] Set `SECRET_KEY` environment variable  
- [ ] Set `ALLOWED_HOSTS` to include `qrify-hmvy.onrender.com`
- [ ] Run `python manage.py collectstatic --noinput`
- [ ] Test API endpoints
- [ ] Update frontend `.env` with backend URL (already done!)

## Once Backend is Fixed

Your frontend is already configured to use:
```env
VITE_API_URL=https://qrify-hmvy.onrender.com/api
```

Just rebuild and redeploy to Netlify:
```bash
cd frontend
npm run build
netlify deploy --prod --dir=dist
```
