import { Link } from 'react-router-dom'
import { useState } from 'react'
import './CareersPage.css'

const jobs = [
  {
    id: 1,
    title: 'Senior Software Engineer — Mobile',
    department: 'Technology',
    type: 'Full-Time',
    location: 'Hybrid · Accra',
    deadline: '31 July 2025',
    emoji: '💻',
    description:
      'Lead development of our PenApp Ghana mobile platform. Work closely with the CTO to ship features that directly impact thousands of Ghanaians saving for retirement.',
  },
  {
    id: 2,
    title: 'Investment Analyst',
    department: 'Finance',
    type: 'Full-Time',
    location: 'On-site · Accra',
    deadline: '15 Aug 2025',
    emoji: '📊',
    description:
      'Analyse investment opportunities, monitor portfolio performance, and prepare reports for senior management. CFA or equivalent preferred with minimum 2 years experience.',
  },
  {
    id: 3,
    title: 'Digital Marketing Manager',
    department: 'Marketing',
    type: 'Full-Time',
    location: 'Remote',
    deadline: '20 Aug 2025',
    emoji: '📣',
    description:
      'Own PH Securities\' digital presence across social, email, and paid channels. Craft campaigns that speak to Ghanaians across all demographics.',
  },
  {
    id: 4,
    title: 'Compliance & Legal Officer',
    department: 'Legal',
    type: 'Full-Time',
    location: 'On-site · Accra',
    deadline: '10 Aug 2025',
    emoji: '⚖️',
    description:
      'Ensure PH Securities operates within all NPRA regulations and internal compliance frameworks. Primary liaison with the National Pensions Regulatory Authority.',
  },
  {
    id: 5,
    title: 'Client Relationship Officer',
    department: 'Operations',
    type: 'Full-Time',
    location: 'Hybrid · Accra',
    deadline: '25 Aug 2025',
    emoji: '🤝',
    description:
      'Be the face of PH Securities for our clients. Onboard new customers, resolve account issues, and build long-term relationships.',
  },
]

const steps = [
  {
    num: '01',
    title: 'Apply Online',
    text: 'Submit your CV and cover letter through your personal job account on this page.',
    emoji: '📝',
  },
  {
    num: '02',
    title: 'CV Review',
    text: 'Our team carefully reviews every application within 5 working days.',
    emoji: '🔍',
  },
  {
    num: '03',
    title: 'Phone Screen',
    text: 'A 20-minute call with HR to discuss your background and the role.',
    emoji: '📞',
  },
  {
    num: '04',
    title: 'Skills Interview',
    text: 'A technical or role-specific interview with the relevant department lead.',
    emoji: '🎯',
  },
  {
    num: '05',
    title: 'Offer & Onboarding',
    text: 'Successful candidates receive an offer within 3 days and begin structured onboarding.',
    emoji: '🎉',
  },
]

const team = [
  { name: 'Abena K.', role: 'Head of Finance', emoji: '👩🏾‍💼', bg: '#0f2744' },
  { name: 'Kwame T.', role: 'Backend Engineer', emoji: '👨🏿‍💻', bg: '#1a3a5c' },
  { name: 'Efua M.', role: 'Product Designer', emoji: '👩🏽‍🎨', bg: '#2d5580' },
  { name: 'Yaw B.', role: 'Client Relations', emoji: '👨🏾‍🏫', bg: '#0f2744' },
]

export const CareersPage = () => {
  const [modalOpen, setModalOpen] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [selectedJob, setSelectedJob] = useState<string | null>(null)

  const handleApply = (jobTitle: string) => {
    setSelectedJob(jobTitle)
    setModalOpen(true)
  }

  return (
    <div className="careers-page">

      {/* NAVBAR */}
      <nav className="careers-nav">
        <div className="careers-nav-container">
          <Link to="/" className="careers-logo">
            <img src="/logo.jpeg" alt="PH Securities" className="careers-logo-img" />
          </Link>
          <div className="careers-nav-links">
            <Link to="/about">About</Link>
            <Link to="/careers" className="careers-nav-active">Careers</Link>
            <Link to="/products">Products</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/login" className="careers-nav-login">Sign In</Link>
            <Link to="/register" className="careers-nav-cta">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* ACCOUNT BAR */}
      <div className="careers-account-bar">
        <div className="careers-container careers-account-bar-inner">
          <span>Have a job account? Sign in to track your applications.</span>
          <div className="careers-account-bar-btns">
            <button
              className="careers-bar-btn-outline"
              onClick={() => { setIsLogin(true); setModalOpen(true) }}
            >
              Sign In to My Account
            </button>
            <button
              className="careers-bar-btn"
              onClick={() => { setIsLogin(false); setModalOpen(true) }}
            >
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* HERO */}
      <section className="careers-hero">
        <div className="careers-hero-inner">
          <p className="careers-eyebrow">Join Our Team</p>
          <h1 className="careers-hero-title">
            Build the Future of<br />
            <span className="careers-highlight">Pensions in Ghana</span>
          </h1>
          <p className="careers-hero-sub">
            Join a passionate team on a mission to change how Ghanaians prepare
            for retirement. We are hiring across technology, finance, operations,
            and creative roles.
          </p>
          <button
            className="careers-hero-btn"
            onClick={() => document.getElementById('jobs')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Open Roles ↓
          </button>
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section className="careers-jobs" id="jobs">
        <div className="careers-container">
          <p className="careers-section-eyebrow">Open Positions</p>
          <h2 className="careers-section-title">We Are Hiring</h2>
          <div className="careers-jobs-list">
            {jobs.map((job) => (
              <div className="careers-job-card" key={job.id}>
                <div className="careers-job-icon">{job.emoji}</div>
                <div className="careers-job-info">
                  <h3 className="careers-job-title">{job.title}</h3>
                  <div className="careers-job-tags">
                    <span className="careers-tag careers-tag--blue">{job.type}</span>
                    <span className="careers-tag careers-tag--gray">{job.location}</span>
                    <span className="careers-tag careers-tag--gray">{job.department}</span>
                  </div>
                  <p className="careers-job-desc">{job.description}</p>
                  <div className="careers-job-footer">
                    <button
                      className="careers-apply-btn"
                      onClick={() => handleApply(job.title)}
                    >
                      Apply Now
                    </button>
                    <span className="careers-job-deadline">
                      Deadline: {job.deadline}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="careers-no-role">
            <p>
              Can't find your role?{' '}
              <a href="mailto:careers@phsecurities.com">
                Send your CV to careers@phsecurities.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* RECRUITMENT PROCESS */}
      <section className="careers-process">
        <div className="careers-container">
          <p className="careers-section-eyebrow">How We Hire</p>
          <h2 className="careers-section-title">Our Recruitment Process</h2>
          <div className="careers-steps">
            {steps.map((step, index) => (
              <div className="careers-step" key={step.num}>
                <div className="careers-step-num">{step.num}</div>
                <div className="careers-step-emoji">{step.emoji}</div>
                <h4 className="careers-step-title">{step.title}</h4>
                <p className="careers-step-text">{step.text}</p>
                {index < steps.length - 1 && (
                  <div className="careers-step-arrow">→</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM PHOTOS */}
      <section className="careers-team">
        <div className="careers-container">
          <p className="careers-section-eyebrow">Life at PH</p>
          <h2 className="careers-section-title">Our People</h2>
          <div className="careers-team-grid">
            {team.map((member) => (
              <div className="careers-team-card" key={member.name}>
                <div
                  className="careers-team-photo"
                  style={{ background: `linear-gradient(135deg, ${member.bg}, #2d5580)` }}
                >
                  <span className="careers-team-emoji">{member.emoji}</span>
                </div>
                <div className="careers-team-info">
                  <h4 className="careers-team-name">{member.name}</h4>
                  <p className="careers-team-role">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LOGIN / REGISTER MODAL */}
      {modalOpen && (
        <div className="careers-modal-backdrop" onClick={() => setModalOpen(false)}>
          <div className="careers-modal" onClick={(e) => e.stopPropagation()}>
            <button className="careers-modal-close" onClick={() => setModalOpen(false)}>✕</button>

            <div className="careers-modal-logo">
              <img src="/logo.jpeg" alt="PH Securities" style={{ height: 40 }} />
            </div>

            <h2 className="careers-modal-title">
              {isLogin ? 'Job Account Login' : 'Create Job Account'}
            </h2>

            {selectedJob && (
              <p className="careers-modal-job">
                Applying for: <strong>{selectedJob}</strong>
              </p>
            )}

            <div className="careers-modal-toggle-row">
              <button
                className={`careers-modal-tab ${isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(true)}
              >
                Sign In
              </button>
              <button
                className={`careers-modal-tab ${!isLogin ? 'active' : ''}`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>

            <div className="careers-modal-form">
              {!isLogin && (
                <label className="careers-modal-label">
                  Full Name
                  <input type="text" placeholder="Your full name" />
                </label>
              )}
              <label className="careers-modal-label">
                Email Address
                <input type="email" placeholder="you@example.com" />
              </label>
              <label className="careers-modal-label">
                Password
                <input type="password" placeholder="••••••••" />
              </label>
              {!isLogin && (
                <label className="careers-modal-label">
                  Confirm Password
                  <input type="password" placeholder="••••••••" />
                </label>
              )}
              <button
                className="careers-modal-submit"
                onClick={() => setModalOpen(false)}
              >
                {isLogin ? 'Sign In →' : 'Create Account →'}
              </button>
              <p className="careers-modal-switch">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <span onClick={() => setIsLogin(!isLogin)}>
                  {isLogin ? 'Create one' : 'Sign in'}
                </span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="careers-footer">
        <div className="careers-footer-container">
          <div>
            <p>&copy; 2025 PH Securities. All rights reserved.</p>
            <p className="careers-footer-note">
              Regulated by the National Pensions Regulatory Authority (NPRA).
              This scheme is managed by licensed trustees in compliance with
              Ghana&apos;s pension regulations.
            </p>
          </div>
          <div className="careers-footer-links">
            <Link to="/faq">FAQ</Link>
            <Link to="/newsletter">Newsletter</Link>
            <Link to="/login">Sign In</Link>
          </div>
        </div>
      </footer>

    </div>
  )
}