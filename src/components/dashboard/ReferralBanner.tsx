import { useAppState } from '../../context/AppStateContext'

export const ReferralBanner = () => {
  const { user } = useAppState()
  if (!user) return null
  return (
    <section className="panel referral">
      <div>
        <h3>Earn referral bonuses</h3>
        <p>Share your code and earn when friends complete their first month.</p>
        <strong>Code: {user.referralCode}</strong>
      </div>
      <button className="primary ghost">Copy code</button>
    </section>
  )
}
