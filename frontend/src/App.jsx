import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { DeviceProvider } from './contexts/DeviceContext'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import HistoryPage from './pages/HistoryPage'

function App() {
    return (
        <ThemeProvider>
            <DeviceProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="history" element={<HistoryPage />} />
                        </Route>
                    </Routes>
                </Router>
            </DeviceProvider>
        </ThemeProvider>
    )
}

export default App
