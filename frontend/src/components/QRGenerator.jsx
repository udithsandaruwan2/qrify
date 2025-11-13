import { useState } from 'react'
import { Loader2 } from 'lucide-react'

export default function QRGenerator({ onGenerate }) {
    const [data, setData] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')

        if (!data.trim()) {
            setError('Please enter some data or URL')
            return
        }

        setLoading(true)
        try {
            await onGenerate(data.trim())
            setData('')
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to generate QR code')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="card p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6">Generate QR Code</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="data" className="block text-sm font-medium mb-2">
                        Enter URL or Text
                    </label>
                    <input
                        id="data"
                        type="text"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                        placeholder="https://example.com or any text..."
                        className="input-field"
                        disabled={loading}
                    />
                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        Enter any URL or text you want to encode in a QR code
                    </p>
                </div>

                {error && (
                    <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            <span>Generating...</span>
                        </>
                    ) : (
                        <span>Generate QR Code</span>
                    )}
                </button>
            </form>
        </div>
    )
}
