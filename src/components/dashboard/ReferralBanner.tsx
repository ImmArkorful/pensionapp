import { useState } from 'react'
import { useAppState } from '../../context/AppStateContext'

export const ReferralBanner = () => {
  const { user } = useAppState()
  const [copied, setCopied] = useState(false)
  if (!user) return null

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user.referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section className="panel referral">
      <div>
        <h3>Earn referral bonuses</h3>
        <p>Share your code and earn when friends complete their first month.</p>
        <strong>Code: {user.referralCode}</strong>
        {copied && <p className="copy-hint">Copied to clipboard</p>}
      </div>
      <button className="primary ghost" type="button" onClick={handleCopy}>
        {copied ? 'Copied' : 'Copy code'}
      </button>
    </section>
  )
}
