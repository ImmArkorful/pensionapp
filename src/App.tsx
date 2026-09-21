import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { LandingPage } from './pages/LandingPage'
import { FAQPage } from './pages/FAQPage'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { DashboardPage } from './pages/DashboardPage'
import { StatementsPage } from './pages/StatementsPage'
import { SettingsPage } from './pages/SettingsPage'
import { AboutPage } from './pages/AboutPage'
import { CareersPage } from './pages/CareersPage'
import { ProductsPage } from './pages/ProductsPage'
import { NewsletterPage } from './pages/NewsletterPage'
import { ProtectedRoute } from './components/layout/ProtectedRoute'
import { ScrollToTop } from './components/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/statements"
          element={
            <ProtectedRoute>
              <StatementsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/settings"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
