import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'

export const LoginPage = () => {
  const { login, isAuthenticating } = useAppState()
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    const success = await login(phone, otp)
    if (!success) {
      setError('Sign-in failed. Please confirm your phone and OTP, then try again.')
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
          <p className="eyebrow">Secure sign-in</p>
          <h1>Sign in to your Tier 3 account</h1>
          <p>Enter your registered phone number and one-time password.</p>
        </header>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Phone number
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </label>

          <label>
            OTP code
            <input value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} placeholder="Default for now: 123456" required />
            <small style={{ color: 'var(--ph-text-light)', fontSize: '0.825rem', marginTop: '0.35rem', display: 'block' }}>
              Current default OTP: 123456
            </small>
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="primary" disabled={isAuthenticating}>
            {isAuthenticating ? 'Verifying...' : 'Sign in'}
          </button>
        </form>

        <footer>
          <p>
            First time here? <Link to="/register">Create your account</Link>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            <Link to="/">← Back to Home</Link>
          </p>
        </footer>
      </section>
    </div>
  )
}
