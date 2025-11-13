# QRify - Quick Start Guide

Welcome to QRify! Follow these steps to get your QR code generator up and running.

## 🚀 One-Line Setup (Linux/Mac)

```bash
chmod +x setup.sh && ./setup.sh
```

## 📋 Manual Setup

### Step 1: Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Run migrations
python manage.py migrate

# (Optional) Create admin user
python manage.py createsuperuser

# Start backend server
python manage.py runserver
```

✅ Backend running at: http://localhost:8000

### Step 2: Frontend Setup (New Terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start frontend server
npm run dev
```

✅ Frontend running at: http://localhost:5173

## 🎯 You're Ready!

Open your browser and visit: **http://localhost:5173**

## 🔧 Common Issues

### Backend won't start?
- Make sure Python 3.8+ is installed: `python3 --version`
- Activate virtual environment first
- Check if port 8000 is available

### Frontend won't start?
- Make sure Node.js 18+ is installed: `node --version`
- Delete `node_modules` and run `npm install` again
- Check if port 5173 is available

### CORS errors?
- Make sure backend is running on port 8000
- Check `backend/.env` has correct CORS_ALLOWED_ORIGINS
- Check `frontend/.env` has correct VITE_API_URL

## 📱 Using the App

1. **Generate QR Code**
   - Enter any URL or text
   - Click "Generate QR Code"
   - Download, copy, or share your QR

2. **View History**
   - Click "History" in the header
   - See all your generated QR codes
   - View stats and manage codes

3. **Theme Toggle**
   - Click moon/sun icon in header
   - Switch between light and dark modes
   - Theme preference is saved

## 🚢 Next Steps

- Read the full [README.md](README.md)
- Check [backend/README.md](backend/README.md) for API docs
- Check [frontend/README.md](frontend/README.md) for component docs
- Deploy to production (see deployment guides)

## 💡 Tips

- No user account needed - history is device-based
- Your data stays private on your device
- QR codes are generated instantly
- Download QR codes as high-quality PNG images

---

**Need help?** Open an issue on GitHub!
