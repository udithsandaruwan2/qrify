import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

// Add device ID to all requests
export const setDeviceId = (deviceId) => {
    if (deviceId) {
        api.defaults.headers.common['X-Device-Id'] = deviceId
    }
}

// QR Code API
export const qrCodeAPI = {
    // Generate a new QR code
    create: async (data) => {
        const response = await api.post('/qr-codes/', data)
        return response.data
    },

    // Get all QR codes for current device
    list: async (page = 1) => {
        const response = await api.get('/qr-codes/', { params: { page } })
        return response.data
    },

    // Get specific QR code details
    get: async (id) => {
        const response = await api.get(`/qr-codes/${id}/`)
        return response.data
    },

    // Delete a QR code
    delete: async (id) => {
        const response = await api.delete(`/qr-codes/${id}/`)
        return response.data
    },

    // Get history for device
    history: async (page = 1) => {
        const response = await api.get('/qr-codes/history/', { params: { page } })
        return response.data
    },

    // Get statistics
    stats: async () => {
        const response = await api.get('/qr-codes/stats/')
        return response.data
    },

    // Increment scan count
    incrementScan: async (id) => {
        const response = await api.post(`/qr-codes/${id}/increment_scan/`)
        return response.data
    },
}

export default api
