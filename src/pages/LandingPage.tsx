import { Link } from 'react-router-dom'
import './LandingPage.css'

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
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              Start saving for your future, <span className="highlight">one contribution at a time</span>
            </h1>
            <p className="hero-subtitle">
              Secure your retirement with Ghana's Tier 3 pension scheme. 
              Enjoy tax benefits on contributions up to 16.5% of your basic salary. 
              NPRA-regulated and open to both formal and informal sector workers.
            </p>
            <div className="hero-cta">
              <Link to="/register" className="btn-primary">Start Saving Today</Link>
              <Link to="/faq" className="btn-secondary">Learn More</Link>
            </div>
          </div>
        </section>

        <section className="features">
          <div className="features-container">
            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3>Tax-Deductible Contributions</h3>
              <p>Contributions up to 16.5% of your basic salary are tax-deductible, providing immediate tax relief while you save.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>NPRA Regulated</h3>
              <p>Managed by licensed trustees in compliance with National Pensions Regulatory Authority (NPRA) guidelines for your security.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure & Safe</h3>
              <p>Your savings are protected with secure banking and mobile money integration, managed by licensed trustees.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Easy Management</h3>
              <p>Track contributions, view statements, and manage your pension all in one place.</p>
            </div>
          </div>
        </section>

        <section className="benefits">
          <div className="benefits-container">
            <h2>Why Choose PensionApp?</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
              <h4>Tax-Free Withdrawals</h4>
              <p>Withdrawals after 10 years of continuous contribution are tax-free. Early withdrawals may incur a 15% tax.</p>
              </div>
              <div className="benefit-item">
              <h4>Annuity & Pension</h4>
              <p>A portion of your benefits is used to purchase an annuity, providing guaranteed income during retirement.</p>
              </div>
              <div className="benefit-item">
                <h4>Auto-Debit</h4>
                <p>Set up automatic monthly contributions from your bank or mobile money.</p>
              </div>
              <div className="benefit-item">
              <h4>Retirement at 60</h4>
              <p>Plan for retirement at age 60, Ghana's standard retirement age, with confidence and security.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-container">
            <h2>Ready to secure your future?</h2>
            <p>Join thousands who are already building their retirement savings.</p>
            <Link to="/register" className="btn-primary btn-large">Get Started Now</Link>
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-container">
          <div>
            <p>&copy; 2024 PH Securities. All rights reserved.</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem', opacity: 0.8 }}>
              Regulated by the National Pensions Regulatory Authority (NPRA). This scheme is managed by licensed trustees in compliance with Ghana's pension regulations.
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
