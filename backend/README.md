# QRify Backend

Django REST API backend for QRify - A modern QR code generator with device-based history tracking.

## Features

- 🚀 RESTful API for QR code generation
- 📊 Device-based history tracking (no user accounts)
- 🖼️ Automatic QR code image generation
- 📈 Scan count tracking
- 🔄 CORS enabled for frontend integration
- 💾 SQLite database (PostgreSQL ready)

## Tech Stack

- **Framework**: Django 5.0
- **API**: Django REST Framework
- **Database**: SQLite (PostgreSQL ready)
- **QR Generation**: qrcode[pil]
- **CORS**: django-cors-headers

## Setup Instructions

### 1. Prerequisites

- Python 3.8+
- pip
- Virtual environment (recommended)

### 2. Installation

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env file with your settings
nano .env
```

Required environment variables:
- `SECRET_KEY`: Django secret key (generate a new one for production)
- `DEBUG`: Set to False in production
- `ALLOWED_HOSTS`: Comma-separated list of allowed hosts
- `CORS_ALLOWED_ORIGINS`: Frontend URLs

### 4. Database Setup

```bash
# Run migrations
python manage.py migrate

# Create superuser (optional, for admin access)
python manage.py createsuperuser
```

### 5. Run Development Server

```bash
python manage.py runserver
```

The API will be available at `http://localhost:8000/api/`

## API Endpoints

### QR Code Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/qr-codes/` | Generate new QR code |
| GET | `/api/qr-codes/` | List all QR codes for device |
| GET | `/api/qr-codes/{id}/` | Get specific QR code |
| DELETE | `/api/qr-codes/{id}/` | Delete QR code |
| GET | `/api/qr-codes/history/` | Get paginated history |
| GET | `/api/qr-codes/stats/` | Get statistics |
| POST | `/api/qr-codes/{id}/increment_scan/` | Increment scan count |

### Request Headers

All requests must include:
```
X-Device-Id: <device-fingerprint>
```

### Example API Usage

#### Generate QR Code

```bash
curl -X POST http://localhost:8000/api/qr-codes/ \
  -H "Content-Type: application/json" \
  -H "X-Device-Id: your-device-id" \
  -d '{
    "data": "https://example.com",
    "device_id": "your-device-id"
  }'
```

#### Get History

```bash
curl -X GET http://localhost:8000/api/qr-codes/history/ \
  -H "X-Device-Id: your-device-id"
```

## Database Models

### QRCode Model

```python
class QRCode(models.Model):
    id = UUIDField (primary key)
    data = TextField (URL or text to encode)
    device_id = CharField (device fingerprint)
    qr_image = ImageField (generated QR image)
    scan_count = IntegerField (number of scans)
    created_at = DateTimeField
    updated_at = DateTimeField
```

## Migrating to PostgreSQL

To switch from SQLite to PostgreSQL:

1. Install PostgreSQL adapter:
```bash
pip install psycopg2-binary
```

2. Update `settings.py`:
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

## Production Deployment

### Security Checklist

- [ ] Set `DEBUG=False`
- [ ] Generate new `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up proper CORS origins
- [ ] Use PostgreSQL instead of SQLite
- [ ] Configure static file serving
- [ ] Set up HTTPS
- [ ] Enable database backups

### Recommended Settings

```python
DEBUG = False
ALLOWED_HOSTS = ['your-domain.com']
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

## Admin Panel

Access the Django admin at `http://localhost:8000/admin/`

Features:
- View all QR codes
- Filter by device ID and date
- Search QR codes
- View scan statistics

## Development

### Running Tests

```bash
python manage.py test
```

### Creating Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Collecting Static Files

```bash
python manage.py collectstatic
```

## Troubleshooting

### CORS Errors

Ensure `CORS_ALLOWED_ORIGINS` in settings includes your frontend URL:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
]
```

### Database Errors

Reset database:
```bash
rm db.sqlite3
python manage.py migrate
```

### Missing Dependencies

```bash
pip install -r requirements.txt
```

## License

MIT License - see LICENSE file for details
