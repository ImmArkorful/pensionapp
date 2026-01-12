import { useState } from 'react'
import { Link } from 'react-router-dom'
import './FAQPage.css'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: 'What is Tier 3 Pension?',
    answer: 'Tier 3 Pension is a voluntary, fully-funded personal pension scheme regulated by the National Pensions Regulatory Authority (NPRA) in Ghana. It allows both formal and informal sector workers to make contributions up to 16.5% of their basic salary, with tax benefits on contributions. The scheme is managed by licensed trustees and provides retirement benefits including lump sum payments and annuity-based monthly pensions.'
  },
  {
    question: 'How much can I contribute?',
    answer: 'You can contribute any amount above the agreed minimum deposit per month. However, contributions up to 16.5% of your basic salary (combined employee and employer contributions) are tax-deductible, providing immediate tax relief. Contributions above this threshold are still accepted but may not qualify for the same tax benefits.'
  },
  {
    question: 'What happens to my contributions?',
    answer: 'Your contributions are managed by licensed trustees in compliance with NPRA regulations. They earn returns based on the investment strategy of the scheme. At retirement (age 60), a portion of your benefits will be used to purchase an annuity, providing guaranteed monthly pension payments. You may also receive a lump sum payment as per the scheme rules.'
  },
  {
    question: 'How do I set up automatic contributions?',
    answer: 'During registration, you can link your Mobile Money (MoMo) account or bank account. Once linked, we\'ll automatically debit your account on your chosen due date each month. You\'ll receive notifications before and after each debit.'
  },
  {
    question: 'What is the minimum contribution amount?',
    answer: 'The minimum contribution amount is agreed upon during registration. You can select an amount that works for your budget, and you can always contribute more than the minimum.'
  },
  {
    question: 'When can I retire?',
    answer: 'The standard retirement age in Ghana is 60 years. Your Tier 3 pension benefits will be available at retirement age 60. Early withdrawals before 10 years of continuous contribution may be subject to a 15% tax, unless used for specific purposes like financing a primary residence.'
  },
  {
    question: 'How do I track my pension savings?',
    answer: 'Your dashboard shows your total contributions, projected monthly pension, lump sum amount, interest earned, and a complete statement history. You can view and print statements at any time.'
  },
  {
    question: 'What notifications will I receive?',
    answer: 'You\'ll receive reminders a week before and a day before your monthly debit, notifications when debits are successful, updates when interest is credited, and alerts for lump sum and monthly pension payments. You can customize these in your settings.'
  },
  {
    question: 'Can I change my next of kin?',
    answer: 'Yes, you can select or change your next of kin at any time through your dashboard. This ensures your pension benefits are properly managed according to your wishes.'
  },
  {
    question: 'How is interest calculated?',
    answer: 'Returns on your contributions are based on the investment performance of the scheme, managed by licensed trustees in accordance with NPRA regulations. The exact returns depend on the investment strategy and market performance, which are disclosed in your scheme documentation.'
  },
  {
    question: 'What are the tax benefits?',
    answer: 'Contributions up to 16.5% of your basic salary are tax-deductible, providing immediate tax relief. Withdrawals made after 10 years of continuous contribution are tax-free. Early withdrawals before 10 years are subject to a 15% tax, unless used for specific purposes like financing a primary residence.'
  },
  {
    question: 'Is my information secure?',
    answer: 'Yes, we take security seriously. Your personal information and financial data are protected with industry-standard security measures. We require valid ID verification during registration to ensure account security. As an NPRA-regulated scheme managed by licensed trustees, we comply with all data protection and financial regulations in Ghana.'
  },
  {
    question: 'Who can join Tier 3?',
    answer: 'Tier 3 pension is open to both formal and informal sector workers in Ghana. Whether you\'re employed, self-employed, or working in the informal sector, you can participate in the Tier 3 scheme to secure your retirement.'
  },
  {
    question: 'What is an annuity?',
    answer: 'An annuity is a financial product that provides guaranteed regular income payments during retirement. A portion of your Tier 3 pension benefits will be used to purchase an annuity, ensuring you receive steady monthly payments throughout your retirement years.'
  }
]

export const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="faq-page">
      <nav className="faq-nav">
        <div className="nav-container">
          <Link to="/" className="logo-container">
            <img src="/logo.jpeg" alt="PH Securities" className="logo-image" />
          </Link>
          <div className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/login" className="nav-login">Sign In</Link>
            <Link to="/register" className="nav-cta">Get Started</Link>
          </div>
        </div>
      </nav>

      <main className="faq-main">
        <div className="faq-container">
          <header className="faq-header">
            <h1>Frequently Asked Questions</h1>
            <p>Everything you need to know about PH Securities and Tier 3 Pension</p>
          </header>

          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openIndex === index ? 'open' : ''}`}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <span>{faq.question}</span>
                  <span className="faq-icon">{openIndex === index ? '−' : '+'}</span>
                </button>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>

          <section className="faq-cta">
            <h2>Still have questions?</h2>
            <p>Get in touch with our support team or start your pension journey today.</p>
            <div className="faq-cta-buttons">
              <Link to="/register" className="btn-primary">Get Started</Link>
              <Link to="/" className="btn-secondary">Back to Home</Link>
            </div>
          </section>
        </div>
      </main>

      <footer className="faq-footer">
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
