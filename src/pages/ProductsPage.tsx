import { Link } from 'react-router-dom'
import './ProductsPage.css'

const products = [
  {
    id: 1,
    name: 'PenApp Ghana',
    label: 'Pension App',
    emoji: '📱',
    url: 'https://penappgh.com',
    tagline: 'Your pension. Your phone. Your future.',
    description: "Ghana's most accessible mobile pension platform. Contribute to your retirement fund directly from your phone using Mobile Money, bank transfer, or card payment.",
    features: [
      'Mobile Money (MTN, Telecel, AirtelTigo) integration',
      'Real-time portfolio dashboard',
      'Automated monthly contribution plans',
      'Retirement income projections',
      'NPRA regulated and fully compliant',
    ],
    cardClass: 'products-card-visual--blue',
    btnClass: 'products-visit-btn--blue',
  },
  {
    id: 2,
    name: 'PledgePay Ghana',
    label: 'Pledge & Pay',
    emoji: '🤝',
    url: 'https://pledgepaygh.com',
    tagline: 'Save together. Retire together.',
    description: "A revolutionary group savings platform that harnesses the power of community. PledgePay Ghana lets families and susu groups collectively contribute to each other's pension funds.",
    features: [
      'Group pension contribution pools',
      'Digital Susu savings circles',
      'Pledge tracking and reminders',
      'Family pension gifting',
      'Transparent contribution ledger',
    ],
    cardClass: 'products-card-visual--orange',
    btnClass: 'products-visit-btn--orange',
  },
]

const whyItems = [
  { emoji: '🛡️', title: 'NPRA Regulated', text: "Both products operate under the National Pensions Regulatory Authority framework with licensed trustees." },
  { emoji: '📱', title: 'Mobile-First', text: "Designed for Ghana's mobile-first population. Works seamlessly on any device, any network." },
  { emoji: '💰', title: 'Start from GHS 200', text: "No large upfront commitment. Begin your pension journey with as little as GHS 200 per month." },
  { emoji: '📊', title: 'Transparent Returns', text: "Real-time dashboards show exactly how your money is growing. No hidden fees, ever." },
]

const faqs = [
  {
    q: 'Is my money safe with PH Securities?',
    a: 'Yes. PH Securities is regulated by the NPRA. All client funds are held in segregated, insured accounts with licensed custodian banks.',
  },
  {
    q: 'What is the minimum amount I can start with?',
    a: 'You can begin with as little as GHS 200 per month through PenApp Ghana. PledgePay Ghana allows group contributions from GHS 50 per member.',
  },
  {
    q: 'How is PenApp Ghana different from PledgePay Ghana?',
    a: "PenApp Ghana is for individuals saving independently. PledgePay Ghana is built for group and community-based saving — inspired by Ghana's susu culture.",
  },
  {
    q: 'Which mobile money networks are supported?',
    a: 'PenApp Ghana supports MTN Mobile Money, Telecel Cash, and AirtelTigo Money, as well as bank transfers and card payments.',
  },
]

export const ProductsPage = () => {
  return (
    <div className="products-page">

      <nav className="products-nav">
        <div className="products-nav-container">
          <Link to="/">
            <img src="/logo.jpeg" alt="PH Securities" className="products-logo-img" />
          </Link>
          <div className="products-nav-links">
            <Link to="/about">About</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/products" className="products-nav-active">Products</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/login" className="products-nav-login">Sign In</Link>
            <Link to="/register" className="products-nav-cta">Get Started</Link>
          </div>
        </div>
      </nav>

      <section className="products-hero">
        <div className="products-hero-inner">
          <p className="products-eyebrow">Our Platforms</p>
          <h1 className="products-hero-title">
            Two Products.<br />
            <span className="products-highlight">One Mission.</span>
          </h1>
          <p className="products-hero-sub">
            PH Securities offers two powerful platforms to help every Ghanaian
            invest in their pension — starting today, no matter their income level.
          </p>
        </div>
      </section>

      <section className="products-section">
        <div className="products-container">
          <div className="products-grid">
            {products.map((product) => (
              <div className="products-card" key={product.id}>
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`products-card-visual ${product.cardClass}`}
                >
                  <span className="products-card-emoji">{product.emoji}</span>
                  <span className="products-card-badge">Visit Site ↗</span>
                </a>
                <div className="products-card-body">
                  <p className="products-card-label">{product.label}</p>
                  <h2 className="products-card-name">{product.name}</h2>
                  <p className="products-card-tagline">{product.tagline}</p>
                  <p className="products-card-desc">{product.description}</p>
                  <ul className="products-features">
                    {product.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`products-visit-btn ${product.btnClass}`}
                  >
                    Visit {product.name} →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="products-why">
        <div className="products-container">
          <p className="products-section-eyebrow">Why It Matters</p>
          <h2 className="products-section-title">Why Every Year Counts</h2>
          <div className="products-why-grid">
            {whyItems.map((item) => (
              <div className="products-why-card" key={item.title}>
                <div className="products-why-icon">{item.emoji}</div>
                <h4 className="products-why-title">{item.title}</h4>
                <p className="products-why-text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="products-stats">
        <div className="products-container">
          <div className="products-stats-grid">
            <div className="products-stat">
              <div className="products-stat-num">4×</div>
              <div className="products-stat-label">Starting at 25 vs 45 can grow your pension 4x for the same monthly contribution</div>
            </div>
            <div className="products-stat">
              <div className="products-stat-num">GHS 200</div>
              <div className="products-stat-label">Minimum monthly contribution to open a PH Securities pension plan</div>
            </div>
            <div className="products-stat">
              <div className="products-stat-num">~12%</div>
              <div className="products-stat-label">Average illustrative annual return on PH Securities pension portfolios</div>
            </div>
          </div>
        </div>
      </section>

      <section className="products-faq">
        <div className="products-container">
          <p className="products-section-eyebrow">Common Questions</p>
          <h2 className="products-section-title">Frequently Asked Questions</h2>
          <div className="products-faq-list">
            {faqs.map((faq) => (
              <div className="products-faq-item" key={faq.q}>
                <h4 className="products-faq-q">{faq.q}</h4>
                <p className="products-faq-a">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="products-cta">
        <div className="products-container">
          <h2>Ready to start saving?</h2>
          <p>Open your pension account today and take the first step toward a beautiful old age.</p>
          <Link to="/register" className="products-cta-btn">Open Your Pension Account</Link>
        </div>
      </section>

      <footer className="products-footer">
        <div className="products-footer-container">
          <div>
            <p>&copy; 2025 PH Securities. All rights reserved.</p>
            <p className="products-footer-note">
              Regulated by the National Pensions Regulatory Authority (NPRA).
              This scheme is managed by licensed trustees in compliance with
              Ghana&apos;s pension regulations.
            </p>
          </div>
          <div className="products-footer-links">
            <Link to="/faq">FAQ</Link>
            <Link to="/newsletter">Newsletter</Link>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}
