import { Link } from 'react-router-dom'
import './AboutPage.css'

const founders = [
  {
    name: 'Daniel Ankrah',
    role: 'Co-Founder & CEO',
    emoji: '👨🏾‍💼',
    bio: 'Daniel brings sharp strategic vision and a deep passion for financial inclusion across Ghana. He leads PH Securities\' overall direction and drives the company\'s growth.',
  },
  {
    name: 'Wise Ofori Mawusinu',
    role: 'Co-Founder & CTO',
    emoji: '👨🏾‍💻',
    bio: 'Wise is the engineering force behind PH Securities\' digital platforms. He architected PenApp Ghana from the ground up, ensuring it is fast, secure, and accessible to all.',
  },
  {
    name: 'Emmanuel Arkorful',
    role: 'Co-Founder & COO',
    emoji: '👨🏽‍⚖️',
    bio: 'Emmanuel oversees day-to-day operations, compliance, and regulatory relationships. His legal background ensures PH Securities operates with the highest integrity.',
  },
  {
    name: 'Jesse Afari',
    role: 'Co-Founder & CMO',
    emoji: '👨🏿‍🎨',
    bio: 'Jesse shapes how PH Securities communicates its mission. His campaigns have resonated across generations of Ghanaians, making pension planning feel personal and achievable.',
  },
]

const values = [
  {
    title: 'Integrity First',
    text: 'We handle people\'s futures. We will never compromise on transparency, honesty, or regulatory compliance.',
  },
  {
    title: 'Radical Inclusion',
    text: 'From the market trader to the corporate executive — every Ghanaian deserves access to a reliable pension.',
  },
  {
    title: 'Long-Term Thinking',
    text: 'Pensions are a 30-year promise. Every product decision we make is with our clients\' long-term wellbeing in mind.',
  },
  {
    title: 'Ghanaian at Heart',
    text: 'We understand this land and these people because we are one of them. Our products are designed for Ghana\'s reality.',
  },
  {
    title: 'Innovation Always',
    text: 'We use technology to make saving smarter, simpler, and more rewarding for every Ghanaian.',
  },
  {
    title: 'People Over Profit',
    text: 'Our success is measured by the number of Ghanaians who retire with dignity. When they win, we win.',
  },
]

export const AboutPage = () => {
  return (
    <div className="about-page">

      {/* NAVBAR */}
      <nav className="about-nav">
        <div className="about-nav-container">
          <Link to="/" className="about-logo">
            <img src="/logo.jpeg" alt="PH Securities" className="about-logo-img" />
          </Link>
          <div className="about-nav-links">
            <Link to="/about" className="about-nav-active">About</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/products">Products</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/login" className="about-nav-login">Sign In</Link>
            <Link to="/register" className="about-nav-cta">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-inner">
          <p className="about-eyebrow">Our Story</p>
          <h1 className="about-hero-title">
            Built by Ghanaians,<br />
            <span className="about-highlight">for Ghanaians</span>
          </h1>
          <p className="about-hero-sub">
            PH Securities was founded in 2025 with one conviction — every Ghanaian
            deserves to retire with dignity. Not just those with formal jobs.
            Everyone.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="about-story">
        <div className="about-container">
          <div className="about-story-grid">
            <div className="about-story-text">
              <h2>Where It All Began</h2>
              <p>
                It started with a conversation between four young Ghanaians who had
                watched their grandparents and parents retire into financial hardship;
                not because they hadn&apos;t worked hard, but because no reliable system
                had ever been built for people like them.
              </p>
              <p>
                Daniel, Wise, Emmanuel, and Jesse had each individually arrived at the
                same conclusion: Ghana&apos;s informal workers, entrepreneurs, and young
                professionals were being left out of the pension ecosystem entirely.
              </p>
              <p>
                In early 2025, they sat around a table in Accra with a bold ambition;
                to build Ghana&apos;s most accessible, most transparent, and most human
                pension platform. Not one designed for corporations, but one designed
                for the woman who sells fabric at Makola, the teacher in Kumasi, the
                freelance developer in East Legon.
              </p>
              <p>
                PH Securities launched with two flagship products and a slogan that
                captures everything they believe in:
              </p>
              <blockquote className="about-quote">
                &ldquo;Prepare for the beautiful old age.&rdquo;
              </blockquote>
            </div>

            <div className="about-story-stats">
              <div className="about-stat-card">
                <div className="about-stat-num">2025</div>
                <div className="about-stat-label">Year Founded in Accra, Ghana</div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-num">4</div>
                <div className="about-stat-label">Passionate Co-Founders</div>
              </div>
              <div className="about-stat-card">
                <div className="about-stat-num">2</div>
                <div className="about-stat-label">Products Serving Ghanaians</div>
              </div>
              <div className="about-stat-card about-stat-card--orange">
                <div className="about-stat-num">NPRA</div>
                <div className="about-stat-label">Regulated & Compliant</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION / VISION */}
      <section className="about-mission">
        <div className="about-container">
          <h2 className="about-section-title">Our Mission, Vision & Promise</h2>
          <div className="about-mvp-grid">
            <div className="about-mvp-card">
              <div className="about-mvp-icon">🎯</div>
              <h3>Our Mission</h3>
              <ul>
                <li>Give every Ghanaian a reliable, accessible pension plan</li>
                <li>Encourage early pension investment from the very first paycheck</li>
              </ul>
            </div>
            <div className="about-mvp-card">
              <div className="about-mvp-icon">🔭</div>
              <h3>Our Vision</h3>
              <p>
                To reduce the financial dependency of pensioners on young adults in
                Ghana — creating a generation that enters retirement with independence,
                confidence, and joy.
              </p>
            </div>
            <div className="about-mvp-card">
              <div className="about-mvp-icon">✨</div>
              <h3>Our Slogan</h3>
              <p className="about-slogan">
                &ldquo;Prepare for the beautiful old age.&rdquo;
              </p>
              <p>
                A reminder that retirement should not be feared — but planned for,
                invested in, and looked forward to.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="about-founders">
        <div className="about-container">
          <h2 className="about-section-title">Meet Our Founders</h2>
          <div className="about-founders-grid">
            {founders.map((founder) => (
              <div className="about-founder-card" key={founder.name}>
                <div className="about-founder-avatar">{founder.emoji}</div>
                <div className="about-founder-body">
                  <h4 className="about-founder-name">{founder.name}</h4>
                  <p className="about-founder-role">{founder.role}</p>
                  <p className="about-founder-bio">{founder.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="about-values">
        <div className="about-container">
          <h2 className="about-section-title about-section-title--light">
            Our Core Values
          </h2>
          <div className="about-values-grid">
            {values.map((value, index) => (
              <div className="about-value-card" key={value.title}>
                <div className="about-value-num">0{index + 1}</div>
                <h4 className="about-value-title">{value.title}</h4>
                <p className="about-value-text">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="about-container">
          <h2>Ready to secure your future?</h2>
          <p>Join Ghanaians across Accra, Kumasi, Takoradi and beyond who are already saving for retirement.</p>
          <Link to="/register" className="about-cta-btn">Open Your Pension Account</Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="about-footer">
        <div className="about-footer-container">
          <div>
            <p>&copy; 2025 PH Securities. All rights reserved.</p>
            <p className="about-footer-note">
              Regulated by the National Pensions Regulatory Authority (NPRA).
              This scheme is managed by licensed trustees in compliance with
              Ghana&apos;s pension regulations.
            </p>
          </div>
          <div className="about-footer-links">
            <Link to="/faq">FAQ</Link>
            <Link to="/newsletter">Newsletter</Link>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}