# QRify Frontend

Modern, minimalist React frontend for QRify - A QR code generator with device-based history tracking.

## Features

- ⚡ Lightning-fast QR code generation
- 🎨 Beautiful black & white theme system
- 📱 Fully responsive design
- 🔒 Privacy-first (no user accounts)
- 📊 Device-based history tracking
- 💾 Local storage for device fingerprinting
- 🎭 Smooth animations with Framer Motion
- 🎯 Modern UI with Tailwind CSS

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **QR Generation**: qrcode.react
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fingerprinting**: FingerprintJS

## Setup Instructions

### 1. Prerequisites

- Node.js 18+
- npm or yarn

### 2. Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install
```

### 3. Environment Configuration

```bash
# Copy environment template
cp .env.example .env

# Edit .env file
nano .env
```

Environment variables:
```env
VITE_API_URL=http://localhost:8000/api
```

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Project Structure

```
frontend/
├── src/
│   ├── components/        # Reusable components
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── QRGenerator.jsx
│   │   └── QRDisplay.jsx
│   ├── contexts/         # React contexts
│   │   ├── ThemeContext.jsx
│   │   └── DeviceContext.jsx
│   ├── pages/            # Page components
│   │   ├── HomePage.jsx
│   │   └── HistoryPage.jsx
│   ├── services/         # API services
│   │   └── api.js
│   ├── App.jsx           # Root component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # Tailwind configuration
└── postcss.config.js     # PostCSS configuration
```

## Features Explained

### Theme System

The app supports two themes:
- **Light Mode**: Clean white background with black accents
- **Dark Mode**: Deep black background with white accents

Theme preference is saved to localStorage and persists across sessions.

```jsx
import { useTheme } from './contexts/ThemeContext'

const { theme, toggleTheme } = useTheme()
```

### Device Fingerprinting

No user accounts needed! The app uses FingerprintJS to generate a unique device identifier that persists across sessions.

```jsx
import { useDevice } from './contexts/DeviceContext'

const { deviceId, loading } = useDevice()
```

### API Integration

All API calls are centralized in `src/services/api.js`:

```jsx
import { qrCodeAPI } from './services/api'

// Generate QR code
const qr = await qrCodeAPI.create({ data: 'https://example.com', device_id })

// Get history
const history = await qrCodeAPI.history()

// Get stats
const stats = await qrCodeAPI.stats()
```

## Component Documentation

### QRGenerator

Input form for creating new QR codes.

**Props:**
- `onGenerate(data)`: Callback when QR is generated

### QRDisplay

Displays generated QR code with actions.

**Props:**
- `qrCode`: QR code object from API

**Features:**
- Download as PNG
- Copy data to clipboard
- Open URL in new tab
- View scan count

### Header

Navigation header with theme toggle.

**Features:**
- Logo and branding
- Navigation links
- Theme switcher

## Styling Guide

### Tailwind Classes

Custom utility classes defined in `tailwind.config.js`:

```css
.btn-primary       /* Primary button */
.btn-secondary     /* Secondary button */
.input-field       /* Form input */
.card              /* Card container */
.container-custom  /* Page container */
```

### Color Scheme

**Light Mode:**
- Background: `#ffffff`
- Surface: `#f5f5f5`
- Border: `#e0e0e0`
- Text: Black/Gray

**Dark Mode:**
- Background: `#0a0a0a`
- Surface: `#1a1a1a`
- Border: `#2a2a2a`
- Text: White/Gray

### Animations

Custom animations using Framer Motion:

```jsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  Content
</motion.div>
```

## Building for Production

```bash
# Build optimized production bundle
npm run build

# Preview production build
npm run preview
```

Build output will be in the `dist/` directory.

## Deployment

### Vercel

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## Performance Optimization

- ✅ Code splitting with React Router
- ✅ Lazy loading components
- ✅ Image optimization
- ✅ CSS purging with Tailwind
- ✅ Vite's optimized build
- ✅ Tree shaking

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### API Connection Issues

Ensure backend is running and VITE_API_URL is correct:
```env
VITE_API_URL=http://localhost:8000/api
```

### Theme Not Persisting

Check browser localStorage is enabled and not cleared.

### Device ID Issues

Clear localStorage and refresh:
```javascript
localStorage.clear()
location.reload()
```

## Contributing

1. Fork the repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## License

MIT License - see LICENSE file for details
