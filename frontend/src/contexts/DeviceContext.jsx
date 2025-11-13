import { createContext, useContext, useState, useEffect } from 'react'
import FingerprintJS from '@fingerprintjs/fingerprintjs'

const DeviceContext = createContext()

export function DeviceProvider({ children }) {
    const [deviceId, setDeviceId] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const initializeDeviceId = async () => {
            try {
                // Check if device ID already exists in localStorage
                const storedId = localStorage.getItem('qrify-device-id')

                if (storedId) {
                    setDeviceId(storedId)
                    setLoading(false)
                    return
                }

                // Generate new device fingerprint
                const fp = await FingerprintJS.load()
                const result = await fp.get()
                const visitorId = result.visitorId

                // Store the device ID
                localStorage.setItem('qrify-device-id', visitorId)
                setDeviceId(visitorId)
            } catch (error) {
                console.error('Error generating device ID:', error)
                // Fallback to a random UUID if fingerprinting fails
                const fallbackId = crypto.randomUUID()
                localStorage.setItem('qrify-device-id', fallbackId)
                setDeviceId(fallbackId)
            } finally {
                setLoading(false)
            }
        }

        initializeDeviceId()
    }, [])

    return (
        <DeviceContext.Provider value={{ deviceId, loading }}>
            {children}
        </DeviceContext.Provider>
    )
}

export function useDevice() {
    const context = useContext(DeviceContext)
    if (!context) {
        throw new Error('useDevice must be used within a DeviceProvider')
    }
    return context
}
