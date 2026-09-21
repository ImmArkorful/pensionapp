import { useState } from 'react'
import { Link } from 'react-router-dom'
import './NewsletterPage.css'

const pastIssues = [
  {
    id: 1,
    date: 'November 2024',
    title: 'Why Starting at 25 vs 45 Changes Everything',
    summary: 'We break down the compound interest math that shows how 20 extra years of saving can quadruple your retirement fund — even with the same monthly contribution.',
    tag: 'Education',
    url: null,
  },
  {
    id: 2,
    date: 'October 2024',
    title: 'Understanding Ghana\'s Tier 3 Pension Scheme',
    summary: 'A plain-English guide to how voluntary pension contributions work under NPRA rules, who qualifies, and how to claim your tax relief every year.',
    tag: 'Regulation',
    url: null,
  },
  {
    id: 3,
    date: 'September 2024',
    title: 'Mobile Money & Your Pension: A Perfect Match',
    summary: 'How MTN MoMo, Telecel Cash, and AirtelTigo Money integrations are making pension contributions as easy as sending money to a friend.',
    tag: 'Product',
    url: null,
  },
  {
    id: 4,
    date: 'August 2024',
    title: 'The Susu Model, Reimagined for Retirement',
    summary: 'Ghana\'s community savings culture meets modern pension planning. How PledgePay Ghana is turning group accountability into long-term wealth.',
    tag: 'Community',
    url: null,
  },
]

const benefits = [
  { emoji: '📊', text: 'Monthly pension tips & market insights' },
  { emoji: '🏛️', text: 'NPRA regulation updates explained simply' },
  { emoji: '📱', text: 'New feature announcements from PenApp & PledgePay' },
  { emoji: '👥', text: 'Real stories from savers across Ghana' },
  { emoji: '💡', text: 'Retirement planning advice for every income level' },
]

export const NewsletterPage = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !name) return
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1200)
  }

  return (
    <div className="nl-page">

      <nav className="nl-nav">
        <div className="nl-nav-container">
          <Link to="/">
            <img src="/logo.jpeg" alt="PH Securities" className="nl-logo-img" />
          </Link>
          <div className="nl-nav-links">
            <Link to="/about">About</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/products">Products</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/login" className="nl-nav-login">Sign In</Link>
            <Link to="/register" className="nl-nav-cta">Get Started</Link>
          </div>
        </div>
      </nav>

      <section className="nl-hero">
        <div className="nl-hero-inner">
          <p className="nl-eyebrow">PH Securities Newsletter</p>
          <h1 className="nl-hero-title">
            Stay Ahead of<br />
            <span className="nl-highlight">Your Retirement.</span>
          </h1>
          <p className="nl-hero-sub">
            Join thousands of Ghanaians getting monthly pension insights, product updates,
            and financial tips delivered straight to their inbox — free, forever.
          </p>
        </div>
      </section>

      <section className="nl-main">
        <div className="nl-container nl-main-grid">

          <div className="nl-form-col">
            {submitted ? (
              <div className="nl-success">
                <div className="nl-success-icon">🎉</div>
                <h2>You're on the list!</h2>
                <p>
                  Welcome, <strong>{name}</strong>. Your first issue will arrive next month.
                  In the meantime, explore our products or read the FAQ.
                </p>
                <div className="nl-success-links">
                  <Link to="/products" className="nl-success-btn nl-success-btn--primary">Explore Products</Link>
                  <Link to="/faq" className="nl-success-btn nl-success-btn--secondary">Read the FAQ</Link>
                </div>
              </div>
            ) : (
              <div className="nl-form-card">
                <h2 className="nl-form-title">Subscribe — It's Free</h2>
                <p className="nl-form-sub">No spam. Unsubscribe any time.</p>
                <form className="nl-form" onSubmit={handleSubmit}>
                  <div className="nl-field">
                    <label htmlFor="nl-name">Full Name</label>
                    <input
                      id="nl-name"
                      type="text"
                      placeholder="e.g. Ama Owusu"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="nl-field">
                    <label htmlFor="nl-email">Email Address</label>
                    <input
                      id="nl-email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="nl-submit-btn" disabled={loading}>
                    {loading ? 'Subscribing...' : 'Subscribe Now →'}
                  </button>
                </form>
              </div>
            )}
          </div>

          <div className="nl-benefits-col">
            <h3 className="nl-benefits-title">What you'll get every month</h3>
            <ul className="nl-benefits-list">
              {benefits.map((b) => (
                <li key={b.text} className="nl-benefit-item">
                  <span className="nl-benefit-emoji">{b.emoji}</span>
                  <span>{b.text}</span>
                </li>
              ))}
            </ul>
            <div className="nl-stat-row">
              <div className="nl-stat">
                <div className="nl-stat-num">2,400+</div>
                <div className="nl-stat-label">Subscribers</div>
              </div>
              <div className="nl-stat">
                <div className="nl-stat-num">Monthly</div>
                <div className="nl-stat-label">Frequency</div>
              </div>
              <div className="nl-stat">
                <div className="nl-stat-num">Free</div>
                <div className="nl-stat-label">Always</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section className="nl-past">
        <div className="nl-container">
          <p className="nl-section-eyebrow">Past Issues</p>
          <h2 className="nl-section-title">What We've Covered</h2>
          <div className="nl-past-grid">
            {pastIssues.map((issue) => {
              const CardWrapper = issue.url
                ? ({ children }: { children: React.ReactNode }) => (
                    <a href={issue.url!} target="_blank" rel="noopener noreferrer" className="nl-past-card nl-past-card--link" key={issue.id}>{children}</a>
                  )
                : ({ children }: { children: React.ReactNode }) => (
                    <div className="nl-past-card" key={issue.id}>{children}</div>
                  )
              return (
                <CardWrapper key={issue.id}>
                  <div className="nl-past-header">
                    <span className="nl-past-tag">{issue.tag}</span>
                    <span className="nl-past-date">{issue.date}</span>
                  </div>
                  <h4 className="nl-past-title">{issue.title}</h4>
                  <p className="nl-past-summary">{issue.summary}</p>
                </CardWrapper>
              )
            })}
          </div>
        </div> 
      </section>

      <section className="nl-cta">
        <div className="nl-container nl-cta-inner">
          <h2>Ready to take control of your future?</h2>
          <p>Open a pension account and start building wealth today.</p>
          <Link to="/register" className="nl-cta-btn">Open Your Pension Account</Link>
        </div>
      </section>

      <footer className="nl-footer">
        <div className="nl-footer-container">
          <div>
            <p>&copy; 2025 PH Securities. All rights reserved.</p>
            <p className="nl-footer-note">
              Regulated by the National Pensions Regulatory Authority (NPRA).
              Managed by licensed trustees in compliance with Ghana&apos;s pension regulations.
            </p>
          </div>
          <div className="nl-footer-links">
            <Link to="/about">About</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
