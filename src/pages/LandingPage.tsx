import { Link } from 'react-router-dom'
import './LandingPage.css'

const featureItems = [
  {
    title: 'Tax Relief up to 16.5%',
    text: 'Contribute in Ghana cedis (GHS) and enjoy tax-deductible contributions up to 16.5% of basic salary.',
    icon: (
      <div className="cedi-icon" aria-hidden="true">
        ₵
      </div>
    ),
  },
  {
    title: 'NPRA Regulated',
    text: 'Your pension is managed under National Pensions Regulatory Authority (NPRA) rules with licensed trustees.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <path d="M12 3l8 4v5c0 5-3.4 8.8-8 9-4.6-.2-8-4-8-9V7l8-4z" />
        <path d="M9.5 12.5l1.8 1.8 3.2-3.2" />
      </svg>
    ),
  },
  {
    title: 'Secure Mobile Money & Bank',
    text: 'Fund your pension using MTN MoMo, Telecel Cash, AirtelTigo Money, or linked bank accounts.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="3" y="6" width="18" height="12" rx="2" />
        <path d="M3 10h18" />
        <path d="M8 14h3" />
      </svg>
    ),
  },
  {
    title: 'Track Everything in One Place',
    text: 'See contributions, statements, reminders, and projections in one dashboard from anywhere in Ghana.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h4" />
      </svg>
    ),
  },
]

const heroBannerImage =
  'https://images.pexels.com/photos/6476589/pexels-photo-6476589.jpeg?auto=compress&cs=tinysrgb&w=1600'

const humanStories = [
  {
    name: 'Ama, Trader in Kumasi',
    text: '“I save small-small every month, and now I can track my pension plan clearly.”',
    image:
      'https://images.pexels.com/photos/5905496/pexels-photo-5905496.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    name: 'Kojo, Engineer in Accra',
    text: '“Automatic monthly deductions made pension planning easy for me and my family.”',
    image:
      'https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
  {
    name: 'Esi, Teacher in Takoradi',
    text: '“The platform is simple, and I love that it follows Ghana pension regulations.”',
    image:
      'https://images.pexels.com/photos/5553050/pexels-photo-5553050.jpeg?auto=compress&cs=tinysrgb&w=900',
  },
]

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="nav-container">
          <Link to="/" className="logo-container">
            <img src="/logo.jpeg" alt="PH Securities" className="logo-image" />
          </Link>
          <div className="nav-links">
            <Link to="/faq">FAQ</Link>
            <Link to="/login" className="nav-login">Sign In</Link>
            <Link to="/register" className="nav-cta">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="landing-main">
        <section className="hero hero-with-banner" aria-label="Ghanaian families planning for retirement">
          <div className="banner-container">
            <img src={heroBannerImage} alt="Ghanaian family planning their financial future" loading="eager" />
            <div className="hero-overlay-card hero-content">
              <div className="hero-badges">
                <span>NPRA Regulated</span>
                <span>Tax Relief up to 16.5%</span>
                <span>Save in ₵ GHS</span>
              </div>
              <h1 className="hero-title">
                Build your retirement in Ghana, <span className="highlight">one contribution at a time</span>
              </h1>
              <p className="hero-subtitle">
                Secure your future with Ghana&apos;s Tier 3 pension scheme. Save in GHS, enjoy tax benefits,
                and manage your plan with a trusted NPRA-regulated platform.
              </p>
              <div className="hero-cta">
                <Link to="/register" className="btn-primary">Start Saving Today</Link>
                <Link to="/faq" className="btn-secondary">Learn More</Link>
              </div>
            </div>
            <div className="hero-stat-float" aria-hidden="true">
              <strong>₵ 400</strong>
              <small>Typical monthly starter</small>
            </div>
          </div>
        </section>

        <section className="human-stories">
          <div className="stories-container">
            <h2>Made for everyday people in Ghana</h2>
            <div className="stories-grid">
              {humanStories.map((story) => (
                <article className="story-card" key={story.name}>
                  <img src={story.image} alt={story.name} loading="lazy" />
                  <div className="story-content">
                    <h4>{story.name}</h4>
                    <p>{story.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="features">
          <div className="features-container">
            {featureItems.map((item) => (
              <div className="feature-card" key={item.title}>
                <div className="feature-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="benefits">
          <div className="benefits-container">
            <h2>Why choose PensionApp?</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <h4>Tax-Free Long-Term Withdrawals</h4>
                <p>Withdrawals after 10 years of continuous contribution are tax-free under current rules.</p>
              </div>
              <div className="benefit-item">
                <h4>Annuity + Lump Sum</h4>
                <p>A portion of your benefit supports monthly annuity income, with lump-sum access at retirement.</p>
              </div>
              <div className="benefit-item">
                <h4>Auto-Debit Every Month</h4>
                <p>Set your monthly contribution once and keep your savings consistent.</p>
              </div>
              <div className="benefit-item">
                <h4>Retirement Planning at 60</h4>
                <p>Plan confidently around Ghana&apos;s standard retirement age with clear projections.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-container">
            <h2>Ready to secure your future?</h2>
            <p>Join people across Accra, Kumasi, Takoradi, and beyond who are already saving for retirement.</p>
            <Link to="/register" className="btn-primary btn-large">Open Your Pension Account</Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-container">
          <div>
            <p>&copy; 2024 PH Securities. All rights reserved.</p>
            <p className="footer-note">
              Regulated by the National Pensions Regulatory Authority (NPRA). This scheme is managed by licensed trustees in compliance with Ghana&apos;s pension regulations.
            </p>
          </div>
          <div className="footer-links">
            <Link to="/faq">FAQ</Link>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
