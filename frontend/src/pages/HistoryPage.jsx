import { useState, useEffect } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Trash2, ExternalLink, Copy, Download, Loader2, TrendingUp } from 'lucide-react'
import { qrCodeAPI } from '../services/api'
import { motion } from 'framer-motion'

export default function HistoryPage() {
    const [history, setHistory] = useState([])
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        loadHistory()
        loadStats()
    }, [])

    const loadHistory = async () => {
        try {
            setLoading(true)
            const data = await qrCodeAPI.history()
            setHistory(data.results || data)
        } catch (err) {
            setError('Failed to load history')
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const loadStats = async () => {
        try {
            const data = await qrCodeAPI.stats()
            setStats(data)
        } catch (err) {
            console.error('Failed to load stats:', err)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this QR code?')) return

        try {
            await qrCodeAPI.delete(id)
            setHistory(history.filter(qr => qr.id !== id))
            loadStats() // Refresh stats
        } catch (err) {
            alert('Failed to delete QR code')
            console.error(err)
        }
    }

    const handleDownload = (qrData, id) => {
        const svg = document.getElementById(`qr-${id}`)
        const svgData = new XMLSerializer().serializeToString(svg)
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        const img = new Image()

        img.onload = () => {
            canvas.width = img.width
            canvas.height = img.height
            ctx.drawImage(img, 0, 0)
            const pngFile = canvas.toDataURL('image/png')

            const downloadLink = document.createElement('a')
            downloadLink.download = `qrcode-${id}.png`
            downloadLink.href = pngFile
            downloadLink.click()
        }

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }

    const handleCopy = async (data) => {
        try {
            await navigator.clipboard.writeText(data)
            alert('Copied to clipboard!')
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const isURL = (str) => {
        try {
            new URL(str)
            return true
        } catch {
            return false
        }
    }

    if (loading) {
        return (
            <div className="container-custom py-12">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin" />
                </div>
            </div>
        )
    }

    return (
        <div className="container-custom py-12">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">QR Code History</h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        All your generated QR codes in one place
                    </p>
                </div>

                {/* Stats */}
                {stats && (
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="card p-6"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                        Total QR Codes
                                    </p>
                                    <p className="text-3xl font-bold">{stats.total_qr_codes}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center">
                                    <span className="text-2xl">📊</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="card p-6"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                        Total Scans
                                    </p>
                                    <p className="text-3xl font-bold">{stats.total_scans}</p>
                                </div>
                                <div className="w-12 h-12 rounded-full bg-black dark:bg-white flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6 text-white dark:text-black" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                {/* History List */}
                {history.length === 0 ? (
                    <div className="card p-12 text-center">
                        <div className="w-24 h-24 rounded-full bg-gray-100 dark:bg-gray-800 mx-auto mb-4 flex items-center justify-center">
                            <span className="text-4xl">📋</span>
                        </div>
                        <h3 className="text-xl font-bold mb-2">No QR Codes Yet</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Generate your first QR code to see it here
                        </p>
                        <a href="/" className="btn-primary inline-block">
                            Create QR Code
                        </a>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {history.map((qr, index) => (
                            <motion.div
                                key={qr.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="card p-6 hover:shadow-lg transition-all"
                            >
                                {/* QR Code */}
                                <div className="flex justify-center p-4 bg-white rounded-lg mb-4">
                                    <QRCodeSVG
                                        id={`qr-${qr.id}`}
                                        value={qr.data}
                                        size={120}
                                        level="H"
                                    />
                                </div>

                                {/* Data */}
                                <div className="mb-4">
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                        Data
                                    </p>
                                    <p className="font-mono text-sm truncate" title={qr.data}>
                                        {qr.data}
                                    </p>
                                </div>

                                {/* Meta */}
                                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                                    <span>{new Date(qr.created_at).toLocaleDateString()}</span>
                                    <span>{qr.scan_count} scans</span>
                                </div>

                                {/* Actions */}
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={() => handleDownload(qr.data, qr.id)}
                                        className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center space-x-1"
                                        title="Download"
                                    >
                                        <Download className="w-4 h-4" />
                                    </button>

                                    <button
                                        onClick={() => handleCopy(qr.data)}
                                        className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center space-x-1"
                                        title="Copy"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>

                                    {isURL(qr.data) && (
                                        <button
                                            onClick={() => window.open(qr.data, '_blank')}
                                            className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all flex items-center justify-center space-x-1"
                                            title="Open link"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    )}

                                    <button
                                        onClick={() => handleDelete(qr.id)}
                                        className="px-3 py-2 rounded-lg bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 transition-all flex items-center justify-center space-x-1"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
