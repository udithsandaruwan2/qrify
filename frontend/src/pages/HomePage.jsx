import { useState } from 'react'
import QRGenerator from '../components/QRGenerator'
import QRDisplay from '../components/QRDisplay'
import { qrCodeAPI } from '../services/api'
import { useDevice } from '../contexts/DeviceContext'

export default function HomePage() {
    const [currentQR, setCurrentQR] = useState(null)
    const { deviceId } = useDevice()

    const handleGenerate = async (data) => {
        try {
            const qrCode = await qrCodeAPI.create({
                data,
                device_id: deviceId,
            })
            setCurrentQR(qrCode)
        } catch (error) {
            console.error('Error generating QR code:', error)
            throw error
        }
    }

    return (
        <div className="container-custom py-12">
            <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <div className="text-center mb-12 animate-fade-in">
                    <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                        Create QR Codes Instantly
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Generate beautiful QR codes for any URL or text. Track your history, no sign-up required.
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="animate-slide-up" style={{ animationDelay: '100ms' }}>
                        <QRGenerator onGenerate={handleGenerate} />
                    </div>

                    <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
                        <QRDisplay qrCode={currentQR} />
                    </div>
                </div>

                {/* Features */}
                <div className="mt-16 grid md:grid-cols-3 gap-8">
                    <div className="text-center p-6 rounded-xl border border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-700 transition-all">
                        <div className="w-12 h-12 rounded-full bg-black dark:bg-white mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="font-bold mb-2">Instant Generation</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Create QR codes in seconds with our fast and reliable generator
                        </p>
                    </div>

                    <div className="text-center p-6 rounded-xl border border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-700 transition-all">
                        <div className="w-12 h-12 rounded-full bg-black dark:bg-white mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl">🔒</span>
                        </div>
                        <h3 className="font-bold mb-2">Privacy First</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            No sign-up required. Your data stays on your device
                        </p>
                    </div>

                    <div className="text-center p-6 rounded-xl border border-gray-200 dark:border-dark-border hover:border-gray-300 dark:hover:border-gray-700 transition-all">
                        <div className="w-12 h-12 rounded-full bg-black dark:bg-white mx-auto mb-4 flex items-center justify-center">
                            <span className="text-2xl">📊</span>
                        </div>
                        <h3 className="font-bold mb-2">Track History</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Access your QR code history anytime, anywhere on this device
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
