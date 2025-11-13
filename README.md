# QRify 🎯

A modern, minimalist QR code generator with device-based history tracking. Built with Django REST API backend and React frontend.

![QRify Banner](https://img.shields.io/badge/QRify-QR%20Code%20Generator-black?style=for-the-badge)

## ✨ Features

- ⚡ **Instant QR Generation** - Create QR codes in seconds
- 🎨 **Dual Theme System** - Beautiful black & white themes
- 🔒 **Privacy First** - No user accounts, device-based tracking
- 📊 **History Tracking** - Access your QR codes anytime
- 📱 **Responsive Design** - Works on all devices
- 🖼️ **High Quality** - Download QR codes as PNG
- 📈 **Scan Tracking** - Monitor QR code usage
- 🚀 **Modern Stack** - Django + React + Vite

## 🏗️ Project Structure

```
qrify/
├── backend/              # Django REST API
│   ├── qrify_backend/   # Django project settings
│   ├── qr_api/          # QR code API app
│   ├── requirements.txt # Python dependencies
│   └── README.md        # Backend documentation
├── frontend/            # React frontend
│   ├── src/            # Source code
│   ├── public/         # Static assets
│   ├── package.json    # Node dependencies
│   └── README.md       # Frontend documentation
└── README.md           # This file
```

## 🚀 Quick Start

### Prerequisites

- **Backend**: Python 3.8+, pip
- **Frontend**: Node.js 18+, npm

### Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file
cp .env.example .env

# Run migrations
python manage.py migrate

# Start server
python manage.py runserver
```

Backend will run on `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Start development server
npm run dev
```

Frontend will run on `http://localhost:5173`

## 🎯 Usage

1. **Open the app** at `http://localhost:5173`
2. **Enter URL or text** in the input field
3. **Click "Generate QR Code"** to create your QR
4. **Download, copy, or share** your QR code
5. **View history** to see all your generated QR codes

## 📸 Screenshots

### Light Theme
Clean, minimalist design with black accents on white background.

### Dark Theme
Futuristic dark mode with white accents on black background.

## 🛠️ Tech Stack

### Backend
- **Django 5.0** - Web framework
- **Django REST Framework** - API toolkit
- **qrcode[pil]** - QR code generation
- **django-cors-headers** - CORS support
- **SQLite** - Database (PostgreSQL ready)

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client
- **qrcode.react** - QR rendering
- **Framer Motion** - Animations
- **FingerprintJS** - Device identification
- **Lucide React** - Icons

## 📡 API Documentation

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/qr-codes/` | Generate new QR code |
| GET | `/api/qr-codes/` | List all QR codes |
| GET | `/api/qr-codes/{id}/` | Get specific QR code |
| DELETE | `/api/qr-codes/{id}/` | Delete QR code |
| GET | `/api/qr-codes/history/` | Get paginated history |
| GET | `/api/qr-codes/stats/` | Get statistics |
| POST | `/api/qr-codes/{id}/increment_scan/` | Increment scan count |

### Authentication

No traditional authentication required. All requests must include:

```
X-Device-Id: <unique-device-fingerprint>
```

The frontend automatically generates and manages device IDs using FingerprintJS.

## 🎨 Themes

### Light Mode
- Background: Pure white (#ffffff)
- Surface: Light gray (#f5f5f5)
- Primary: Black
- Text: Dark gray tones

### Dark Mode
- Background: Deep black (#0a0a0a)
- Surface: Dark gray (#1a1a1a)
- Primary: White
- Text: Light gray tones

Toggle themes using the moon/sun icon in the header.

## 🔒 Privacy

- **No User Accounts** - No sign-up or login required
- **Device-Based** - History tracked by browser fingerprint
- **Local Storage** - Device ID stored locally
- **No Cloud Sync** - Data stays on your device
- **Open Source** - Transparent codebase

## 📦 Database Migration

Currently using SQLite for development. To migrate to PostgreSQL:

1. Install PostgreSQL adapter:
```bash
pip install psycopg2-binary
```

2. Update `backend/qrify_backend/settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'qrify',
        'USER': 'your-username',
        'PASSWORD': 'your-password',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
```

3. Run migrations:
```bash
python manage.py migrate
```

## 🚢 Deployment

### Backend (Django)

**Recommended platforms:**
- Railway
- Render
- Heroku
- DigitalOcean

**Steps:**
1. Set environment variables
2. Configure PostgreSQL
3. Run migrations
4. Collect static files
5. Start gunicorn server

### Frontend (React)

**Recommended platforms:**
- Vercel (recommended)
- Netlify
- Cloudflare Pages

**Steps:**
1. Build production bundle: `npm run build`
2. Deploy `dist/` folder
3. Configure environment variables

## 📝 Environment Variables

### Backend (.env)

```env
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=your-domain.com
CORS_ALLOWED_ORIGINS=https://your-frontend.com
```

### Frontend (.env)

```env
VITE_API_URL=https://your-backend-api.com/api
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Django** - Amazing web framework
- **React** - Powerful UI library
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **FingerprintJS** - Browser fingerprinting
- **QRCode** - QR code generation library

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ using Django and React**