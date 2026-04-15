import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppState } from '../context/AppStateContext'
import type { RegistrationPayload } from '../types'

const steps = ['Contact', 'Verification', 'Plan setup', 'Next of kin', 'Initial charge'] as const
const ghanaBanks = [
  'Absa Bank Ghana',
  'Access Bank Ghana',
  'Agricultural Development Bank',
  'CalBank',
  'Ecobank Ghana',
  'Fidelity Bank Ghana',
  'First Atlantic Bank',
  'GCB Bank',
  'Prudential Bank',
  'Stanbic Bank Ghana',
] as const

const detectMomoNetwork = (value: string) => {
  const digits = value.replace(/\D/g, '')
  const local = digits.startsWith('233') ? `0${digits.slice(3)}` : digits
  if (!/^0\d{9}$/.test(local)) return ''

  // Common Ghana mobile ranges used for quick network identification.
  if (/^0(24|25|53|54|55|59)/.test(local)) return 'MTN'
  if (/^0(20|50)/.test(local)) return 'Telecel'
  if (/^0(26|27|56|57)/.test(local)) return 'AirtelTigo'
  return ''
}

export const RegisterPage = () => {
  const { register, isAuthenticating } = useAppState()
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState('')
  const [authMethod, setAuthMethod] = useState<'phone' | 'email'>('phone')
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    minimumContribution: '',
    retirementAge: 60,
    momo: true,
    bank: false,
    momoNumber: '',
    momoNetwork: '',
    momoAccountName: '',
    bankName: '',
    bankAccountNumber: '',
    bankAccountName: '',
    bankBranchCode: '',
    nextOfKinName: '',
    nextOfKinRelationship: '',
    nextOfKinPhone: '',
  })

  const updateField = (field: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const setPaymentMethod = (method: 'momo' | 'bank') => {
    setForm((prev) => ({
      ...prev,
      momo: method === 'momo',
      bank: method === 'bank',
      momoNumber: method === 'momo' && !prev.momoNumber ? prev.phone : prev.momoNumber,
      momoNetwork:
        method === 'momo' && !prev.momoNetwork
          ? detectMomoNetwork(prev.momoNumber || prev.phone)
          : prev.momoNetwork,
    }))
  }

  const validateContactStep = () => {
    if (!form.firstName.trim()) return 'First name is required.'
    if (!form.lastName.trim()) return 'Last name is required.'
    if (!form.phone.trim()) return 'Phone number is required.'
    if (!/^\+?\d{10,15}$/.test(form.phone.trim())) return 'Enter a valid phone number (10 to 15 digits).'
    if (!form.email.trim()) return 'Email is required.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return 'Enter a valid email address.'
    return ''
  }

  const validatePlanStep = () => {
    if (!form.minimumContribution.trim()) return 'Minimum monthly amount is required.'
    const amount = Number(form.minimumContribution)
    if (Number.isNaN(amount)) return 'Minimum monthly amount must be a number.'
    if (amount < 100) return 'Minimum monthly amount must be at least GHS 100.'
    if (form.retirementAge !== 60) return 'Retirement age must be 60.'
    if (!form.momo && !form.bank) return 'Please choose a payment method.'
    if (form.momo) {
      if (!form.momoNumber.trim()) return 'Mobile money number is required.'
      if (!/^\+?\d{10,15}$/.test(form.momoNumber.trim())) return 'Enter a valid mobile money number (10 to 15 digits).'
      if (!form.momoNetwork.trim()) return 'Please select or confirm mobile money network.'
      if (!form.momoAccountName.trim()) return 'Mobile money account name is required.'
    }
    if (form.bank) {
      if (!form.bankName.trim()) return 'Bank name is required.'
      if (!form.bankAccountNumber.trim()) return 'Bank account number is required.'
      if (!/^\d{8,20}$/.test(form.bankAccountNumber.trim())) return 'Enter a valid account number (8 to 20 digits).'
      if (!form.bankAccountName.trim()) return 'Bank account name is required.'
      if (!form.bankBranchCode.trim()) return 'Bank branch/sort code is required.'
    }
    return ''
  }

  const validateNextOfKinStep = () => {
    if (!form.nextOfKinName.trim()) return 'Next of kin full name is required.'
    if (!form.nextOfKinRelationship.trim()) return 'Next of kin relationship is required.'
    if (!form.nextOfKinPhone.trim()) return 'Next of kin contact phone is required.'
    if (!/^\+?\d{10,15}$/.test(form.nextOfKinPhone.trim())) return 'Enter a valid next of kin phone number (10 to 15 digits).'
    return ''
  }

  const handleContactContinue = () => {
    const validationError = validateContactStep()
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    setCurrentStep(1)
  }

  const handleOtp = () => {
    if (otp.trim() !== '123456') {
      setError('Invalid OTP. Use default OTP 123456.')
      return
    }
    setError('')
    setCurrentStep(2)
  }

  const handlePlanContinue = () => {
    const validationError = validatePlanStep()
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    setCurrentStep(3)
  }

  const handleNextOfKinContinue = () => {
    const validationError = validateNextOfKinStep()
    if (validationError) {
      setError(validationError)
      return
    }
    setError('')
    setCurrentStep(4)
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setError('')
    const contactError = validateContactStep()
    if (contactError) {
      setError(contactError)
      setCurrentStep(0)
      return
    }
    const planError = validatePlanStep()
    if (planError) {
      setError(planError)
      setCurrentStep(2)
      return
    }
    const nextOfKinError = validateNextOfKinStep()
    if (nextOfKinError) {
      setError(nextOfKinError)
      setCurrentStep(3)
      return
    }
    if (otp.trim() !== '123456') {
      setError('Invalid OTP. Use default OTP 123456.')
      setCurrentStep(1)
      return
    }
    const payload: RegistrationPayload = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      minimumContribution: Number(form.minimumContribution),
      retirementAge: form.retirementAge,
      nextOfKin: {
        name: form.nextOfKinName.trim(),
        relationship: form.nextOfKinRelationship.trim(),
        phone: form.nextOfKinPhone.trim(),
      },
      accountLinks: {
        momo: form.momo,
        bank: form.bank,
      },
      paymentDetails: form.momo
        ? {
            method: 'momo',
            momo: {
              number: form.momoNumber.trim(),
              network: form.momoNetwork.trim(),
              accountName: form.momoAccountName.trim(),
            },
          }
        : {
            method: 'bank',
            bank: {
              bankName: form.bankName.trim(),
              accountNumber: form.bankAccountNumber.trim(),
              accountName: form.bankAccountName.trim(),
              branchCode: form.bankBranchCode.trim(),
            },
          },
    }
    const result = await register(payload)
    if (!result.success) {
      setError(result.error ?? 'Registration failed. Please review your details and try again.')
      return
    }
    navigate('/dashboard')
  }

  const goToPreviousStep = () => {
    setError('')
    setCurrentStep((prev) => Math.max(0, prev - 1))
  }

  useEffect(() => {
    if (!form.momo) return
    if (!form.phone.trim()) return
    if (form.momoNumber === form.phone) return

    const detected = detectMomoNetwork(form.phone)
    setForm((prev) => ({
      ...prev,
      momoNumber: prev.phone,
      momoNetwork: prev.momoNetwork || detected,
    }))
  }, [form.momo, form.momoNumber, form.phone])

  return (
    <div className="auth-page">
      <section className="auth-card">
        <header>
          <Link to="/" className="auth-logo">
            <img src="/logo.jpeg" alt="PH Securities" />
          </Link>
          <p className="eyebrow">5 quick steps</p>
          <h1>Sign up for Tier 3</h1>
          <p>Complete KYC, verification, account linking and mandate setup.</p>
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
          {error && <p className="form-error">{error}</p>}
          {currentStep === 0 && (
            <>
              <div className="auth-method-group">
                <p className="auth-method-label">Preferred sign-in method</p>
                <div className="auth-method-picker" role="radiogroup" aria-label="Preferred sign-in method">
                  <button
                    type="button"
                    className={`auth-method-option ${authMethod === 'phone' ? 'active' : ''}`}
                    onClick={() => setAuthMethod('phone')}
                    aria-pressed={authMethod === 'phone'}
                  >
                    Phone number
                  </button>
                  <button
                    type="button"
                    className={`auth-method-option ${authMethod === 'email' ? 'active' : ''}`}
                    onClick={() => setAuthMethod('email')}
                    aria-pressed={authMethod === 'email'}
                  >
                    Email address
                  </button>
                </div>
              </div>
              <label>
                First name
                <input value={form.firstName} onChange={(e) => updateField('firstName', e.target.value)} required />
              </label>
              <label>
                Last name
                <input value={form.lastName} onChange={(e) => updateField('lastName', e.target.value)} required />
              </label>
              <label>
                {authMethod === 'phone' ? 'Phone number (used for sign-in)' : 'Phone number'}
                <input value={form.phone} onChange={(e) => updateField('phone', e.target.value)} required />
              </label>
              <label>
                {authMethod === 'email' ? 'Email address (used for sign-in)' : 'Email address'}
                <input type="email" value={form.email} onChange={(e) => updateField('email', e.target.value)} required />
              </label>
              <button type="button" className="primary" onClick={handleContactContinue}>
                Continue to OTP
              </button>
            </>
          )}

          {currentStep === 1 && (
            <>
              <p className="info-box">Enter the OTP sent to your phone to continue. For now, default OTP is 123456.</p>
              <label>
                Enter OTP
                <input value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Default for now: 123456" required />
              </label>
              <button type="button" className="primary ghost" onClick={goToPreviousStep}>
                Back
              </button>
              <button type="button" className="primary" onClick={handleOtp}>
                Verify OTP
              </button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <label>
                Minimum monthly amount (GHS)
                <input
                  type="number"
                  value={form.minimumContribution}
                  placeholder="400"
                  onChange={(e) => updateField('minimumContribution', e.target.value)}
                  required
                  min={100}
                />
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
              <div className="auth-method-group">
                <p className="auth-method-label">Preferred payment method</p>
                <div className="auth-method-picker" role="radiogroup" aria-label="Preferred payment method">
                  <button
                    type="button"
                    className={`auth-method-option ${form.momo ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('momo')}
                    aria-pressed={form.momo}
                  >
                    Mobile money
                  </button>
                  <button
                    type="button"
                    className={`auth-method-option ${form.bank ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('bank')}
                    aria-pressed={form.bank}
                  >
                    Bank account
                  </button>
                </div>
              </div>
              {form.momo && (
                <>
                  <label>
                    Mobile money number
                    <input
                      value={form.momoNumber}
                      onChange={(e) => {
                        const value = e.target.value
                        updateField('momoNumber', value)
                        const detected = detectMomoNetwork(value)
                        if (detected) updateField('momoNetwork', detected)
                      }}
                      placeholder="+233501234567"
                      required
                    />
                    <small style={{ color: 'var(--ph-text-light)', fontSize: '0.825rem', marginTop: '0.35rem', display: 'block' }}>
                      We auto-detect network from your number prefix when possible.
                    </small>
                  </label>
                  <label>
                    Mobile money network
                    <select value={form.momoNetwork} onChange={(e) => updateField('momoNetwork', e.target.value)} required>
                      <option value="">Select network</option>
                      <option value="MTN">MTN MoMo</option>
                      <option value="Telecel">Telecel Cash</option>
                      <option value="AirtelTigo">AirtelTigo Money</option>
                    </select>
                  </label>
                  <label>
                    Mobile money account name
                    <input
                      value={form.momoAccountName}
                      onChange={(e) => updateField('momoAccountName', e.target.value)}
                      placeholder="As registered on wallet"
                      required
                    />
                  </label>
                </>
              )}
              {form.bank && (
                <>
                  <label>
                    Bank name
                    <select value={form.bankName} onChange={(e) => updateField('bankName', e.target.value)} required>
                      <option value="">Select bank</option>
                      {ghanaBanks.map((bank) => (
                        <option key={bank} value={bank}>
                          {bank}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    Bank account number
                    <input
                      value={form.bankAccountNumber}
                      onChange={(e) => updateField('bankAccountNumber', e.target.value.replace(/\s+/g, ''))}
                      placeholder="8 to 20 digits"
                      required
                    />
                  </label>
                  <label>
                    Bank account name
                    <input
                      value={form.bankAccountName}
                      onChange={(e) => updateField('bankAccountName', e.target.value)}
                      placeholder="As printed by your bank"
                      required
                    />
                  </label>
                  <label>
                    Branch/sort code
                    <input
                      value={form.bankBranchCode}
                      onChange={(e) => updateField('bankBranchCode', e.target.value)}
                      placeholder="e.g. 010123"
                      required
                    />
                    <small style={{ color: 'var(--ph-text-light)', fontSize: '0.825rem', marginTop: '0.35rem', display: 'block' }}>
                      Branch or sort code helps us route debits correctly.
                    </small>
                  </label>
                </>
              )}
              <button type="button" className="primary" onClick={handlePlanContinue}>
                Continue
              </button>
              <button type="button" className="primary ghost" onClick={goToPreviousStep}>
                Back
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
              <button type="button" className="primary" onClick={handleNextOfKinContinue}>
                Continue to GHS 5 charge
              </button>
              <button type="button" className="primary ghost" onClick={goToPreviousStep}>
                Back
              </button>
            </>
          )}

          {currentStep === 4 && (
            <>
              <p className="info-box">
                A mandatory one-time <strong>GHS 5</strong> setup charge will be applied to your account when you complete
                sign up. This appears as an account setup fee in your statement.
              </p>
              <button type="submit" className="primary" disabled={isAuthenticating}>
                {isAuthenticating ? 'Processing charge…' : 'Confirm GHS 5 charge & finish'}
              </button>
              <button type="button" className="primary ghost" onClick={goToPreviousStep} disabled={isAuthenticating}>
                Back
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
