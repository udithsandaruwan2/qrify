import { QRCodeSVG } from 'qrcode.react'
import { Download, Copy, ExternalLink, Check } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'

export default function QRDisplay({ qrCode }) {
    const [copied, setCopied] = useState(false)

    if (!qrCode) {
        return (
            <div className="card p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
                <div className="w-32 h-32 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                    <div className="w-20 h-20 border-4 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"></div>
                </div>
                <p className="text-gray-500 dark:text-gray-400">
                    Your QR code will appear here
                </p>
            </div>
        )
    }

    const handleDownload = () => {
        const svg = document.getElementById('qr-code-svg')
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
            downloadLink.download = `qrcode-${Date.now()}.png`
            downloadLink.href = pngFile
            downloadLink.click()
        }

        img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(qrCode.data)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy:', err)
        }
    }

    const handleOpenLink = () => {
        window.open(qrCode.data, '_blank')
    }

    const isURL = (str) => {
        try {
            new URL(str)
            return true
        } catch {
            return false
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card p-8 space-y-6"
        >
            <h2 className="text-2xl font-bold">Your QR Code</h2>

            {/* QR Code Display */}
            <div className="flex justify-center p-8 bg-white rounded-xl">
                <QRCodeSVG
                    id="qr-code-svg"
                    value={qrCode.data}
                    size={256}
                    level="H"
                    includeMargin
                />
            </div>

            {/* Data Display */}
            <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                    Encoded Data
                </p>
                <p className="font-mono text-sm break-all">{qrCode.data}</p>
            </div>

            {/* Stats */}
            <div className="flex gap-4">
                <div className="flex-1 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Scans</p>
                    <p className="text-2xl font-bold">{qrCode.scan_count || 0}</p>
                </div>
                <div className="flex-1 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                    <p className="text-sm font-medium">
                        {new Date(qrCode.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
                <button
                    onClick={handleDownload}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                </button>

                <button
                    onClick={handleCopy}
                    className="btn-secondary flex items-center justify-center space-x-2"
                >
                    {copied ? (
                        <>
                            <Check className="w-5 h-5" />
                            <span>Copied!</span>
                        </>
                    ) : (
                        <>
                            <Copy className="w-5 h-5" />
                            <span>Copy</span>
                        </>
                    )}
                </button>

                {isURL(qrCode.data) && (
                    <button
                        onClick={handleOpenLink}
                        className="btn-secondary flex items-center justify-center"
                        title="Open link"
                    >
                        <ExternalLink className="w-5 h-5" />
                    </button>
                )}
            </div>
        </motion.div>
    )
}
