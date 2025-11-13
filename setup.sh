# QRify Setup Script
# This script helps set up both backend and frontend

echo "🎯 QRify Setup Script"
echo "====================="
echo ""

# Check if we're in the project root
if [ ! -d "backend" ] || [ ! -d "frontend" ]; then
    echo "❌ Error: Please run this script from the project root directory"
    exit 1
fi

echo "📦 Setting up Backend..."
echo "------------------------"

# Backend setup
cd backend

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Create virtual environment
echo "Creating virtual environment..."
python3 -m venv venv

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update .env with your settings"
fi

# Run migrations
echo "Running database migrations..."
python manage.py migrate

# Create superuser prompt
echo ""
read -p "Do you want to create a superuser? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    python manage.py createsuperuser
fi

cd ..

echo ""
echo "📦 Setting up Frontend..."
echo "------------------------"

# Frontend setup
cd frontend

# Check if Node is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

# Install dependencies
echo "Installing Node dependencies..."
npm install

# Copy environment file if it doesn't exist
if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
fi

cd ..

echo ""
echo "✅ Setup Complete!"
echo "=================="
echo ""
echo "To start the application:"
echo ""
echo "Backend:"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python manage.py runserver"
echo ""
echo "Frontend (in a new terminal):"
echo "  cd frontend"
echo "  npm run dev"
echo ""
echo "Then visit http://localhost:5173"
echo ""
