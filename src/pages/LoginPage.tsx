import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'

export const LoginPage = () => {
  const { login, isAuthenticating } = useAppState()
  const [phone, setPhone] = useState('+233501234567')
  const [otp, setOtp] = useState('123456')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const success = await login(phone, otp)
    if (!success) {
      setError('Invalid phone or OTP. Use the demo credentials shown.')
      return
    }
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <section className="auth-card">
        <header>
          <Link to="/" className="auth-logo">
            <img src="/logo.jpeg" alt="PH Securities" />
          </Link>
          <p className="eyebrow">Demo credentials</p>
          <h1>Sign in to your Tier 3 account</h1>
          <p>Use the pre-filled details to mimic the OTP flow.</p>
        </header>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Phone number
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>

          <label>
            OTP code (demo: 123456)
            <input value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} required />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary" disabled={isAuthenticating}>
            {isAuthenticating ? 'Verifying...' : 'Sign in'}
          </button>
        </form>

        <footer>
          <p>
            First time using the flow? <Link to="/register">Create a mock account</Link>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            <Link to="/">← Back to Home</Link>
          </p>
        </footer>
      </section>
    </div>
  )
}
