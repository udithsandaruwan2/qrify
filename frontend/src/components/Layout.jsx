import { Outlet } from 'react-router-dom'
import Header from './Header'
import { useDevice } from '../contexts/DeviceContext'
import { useEffect } from 'react'
import { setDeviceId } from '../services/api'

export default function Layout() {
    const { deviceId, loading } = useDevice()

    useEffect(() => {
        if (deviceId) {
            setDeviceId(deviceId)
        }
    }, [deviceId])

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-light-bg dark:bg-dark-bg">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-black dark:border-gray-700 dark:border-t-white"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-400">Initializing...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col bg-light-bg dark:bg-dark-bg text-gray-900 dark:text-white">
            <Header />
            <main className="flex-1">
                <Outlet />
            </main>
            <footer className="border-t border-light-border dark:border-dark-border py-6 mt-12">
                <div className="container-custom">
                    <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Developed by{' '}
                        <a
                            href="https://udithsandaruwan.me"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-medium text-black dark:text-white hover:underline transition-all"
                        >
                            udithsandaruwan.me
                        </a>
                    </p>
                </div>
            </footer>
        </div>
    )
}
