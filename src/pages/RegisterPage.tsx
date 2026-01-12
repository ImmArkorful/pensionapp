import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'

const steps = ['Contact', 'Verification', 'Plan setup', 'Next of kin'] as const

export const RegisterPage = () => {
  const { register, isAuthenticating } = useAppState()
  const [currentStep, setCurrentStep] = useState(0)
  const [otpVerified, setOtpVerified] = useState(false)
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: 'Kwaku',
    lastName: 'Boateng',
    phone: '+233200000000',
    email: 'kwaku@example.com',
    minimumContribution: 400,
    retirementAge: 60,
    momo: true,
    bank: false,
    nextOfKinName: 'Afia Boateng',
    nextOfKinRelationship: 'Spouse',
    nextOfKinPhone: '+233245551212',
  })

  const updateField = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleOtp = () => {
    setOtpVerified(true)
    setCurrentStep(2)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      phone: form.phone,
      email: form.email,
      minimumContribution: form.minimumContribution,
      retirementAge: form.retirementAge,
      nextOfKin: {
        name: form.nextOfKinName,
        relationship: form.nextOfKinRelationship,
        phone: form.nextOfKinPhone,
      },
      accountLinks: {
        momo: form.momo,
        bank: form.bank,
      },
    }
    await register(payload)
    navigate('/dashboard')
  }

  return (
    <div className="auth-page">
      <section className="auth-card">
        <header>
          <Link to="/" className="auth-logo">
            <img src="/logo.jpeg" alt="PH Securities" />
          </Link>
          <p className="eyebrow">4 quick steps</p>
          <h1>Sign up for Tier 3</h1>
          <p>The flow mimics KYC, OTP verification, account linking and mandate setup.</p>
        </header>

        <div className="stepper">
          {steps.map((label, index) => (
            <div key={label} className={`step ${currentStep === index ? 'active' : ''} ${index < currentStep ? 'done' : ''}`}>
              <span>{index + 1}</span>
              <small>{label}</small>
            </div>
          ))}
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <>
              <label>
                First name
                <input value={form.firstName} onChange={(e) => updateField('firstName', e.target.value)} required />
              </label>
              <label>
                Last name
                <input value={form.lastName} onChange={(e) => updateField('lastName', e.target.value)} required />
              </label>
              <label>
                Phone number
                <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} required />
              </label>
              <label>
                Email address
                <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} required />
              </label>
              <button type="button" className="primary" onClick={() => setCurrentStep(1)}>
                Continue to OTP
              </button>
            </>
          )}

          {currentStep === 1 && (
            <>
              <p className="info-box">A demo OTP has been sent. Use 654321 to continue.</p>
              <label>
                Enter OTP
                <input placeholder="654321" />
              </label>
              <button type="button" className="primary" onClick={handleOtp}>
                Verify OTP
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <label>
                Minimum monthly amount (GHS)
                <input type="number" value={form.minimumContribution} onChange={(e) => updateField('minimumContribution', Number(e.target.value))} required min={100} />
                <small style={{ color: 'var(--ph-text-light)', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                  Note: Contributions up to 16.5% of basic salary are tax-deductible
                </small>
              </label>
              <label>
                Retirement age (Standard: 60 years)
                <input type="number" min={60} max={60} value={form.retirementAge} onChange={(e) => updateField('retirementAge', Number(e.target.value))} required readOnly />
                <small style={{ color: 'var(--ph-text-light)', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>
                  Standard retirement age in Ghana is 60 years as per NPRA regulations
                </small>
              </label>
              <fieldset>
                <legend>Funding source</legend>
                <label className="checkbox">
                  <input type="checkbox" checked={form.momo} onChange={(e) => updateField('momo', e.target.checked)} />
                  Link mobile money
                </label>
                <label className="checkbox">
                  <input type="checkbox" checked={form.bank} onChange={(e) => updateField('bank', e.target.checked)} />
                  Link bank account
                </label>
              </fieldset>
              <button type="button" className="primary" onClick={() => setCurrentStep(3)} disabled={!otpVerified}>
                Continue
              </button>
            </>
          )}

          {currentStep === 3 && (
            <>
              <label>
                Next of kin full name
                <input value={form.nextOfKinName} onChange={(e) => updateField('nextOfKinName', e.target.value)} required />
              </label>
              <label>
                Relationship
                <input value={form.nextOfKinRelationship} onChange={(e) => updateField('nextOfKinRelationship', e.target.value)} required />
              </label>
              <label>
                Contact phone
                <input value={form.nextOfKinPhone} onChange={(e) => updateField('nextOfKinPhone', e.target.value)} required />
              </label>
              <button type="submit" className="primary" disabled={isAuthenticating}>
                {isAuthenticating ? 'Creating profile...' : 'Sign agreement'}
              </button>
            </>
          )}
        </form>

        <footer>
          <p>
            Already have access? <Link to="/login">Go to login</Link>
          </p>
          <p style={{ marginTop: '0.5rem' }}>
            <Link to="/">← Back to Home</Link>
          </p>
        </footer>
      </section>
    </div>
  )
}
