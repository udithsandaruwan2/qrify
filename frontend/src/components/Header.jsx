import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, QrCode, History } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

export default function Header() {
    const { theme, toggleTheme } = useTheme()
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    return (
        <header className="sticky top-0 z-50 border-b border-light-border dark:border-dark-border bg-white/80 dark:bg-dark-surface/80 backdrop-blur-lg">
            <div className="container-custom">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 group">
                        <QrCode className="w-8 h-8 transition-transform group-hover:scale-110" />
                        <span className="text-xl font-bold">QRify</span>
                    </Link>

                    {/* Navigation */}
                    <nav className="flex items-center space-x-6">
                        <Link
                            to="/"
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isActive('/')
                                    ? 'bg-black text-white dark:bg-white dark:text-black'
                                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                                }`}
                        >
                            <QrCode className="w-5 h-5" />
                            <span className="font-medium">Generate</span>
                        </Link>

                        <Link
                            to="/history"
                            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${isActive('/history')
                                    ? 'bg-black text-white dark:bg-white dark:text-black'
                                    : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
                                }`}
                        >
                            <History className="w-5 h-5" />
                            <span className="font-medium">History</span>
                        </Link>

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-all active:scale-95"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <Moon className="w-5 h-5" />
                            ) : (
                                <Sun className="w-5 h-5" />
                            )}
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}
