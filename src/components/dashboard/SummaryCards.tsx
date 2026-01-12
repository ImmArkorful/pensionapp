import { calculateRetirementInsight, useAppState } from '../../context/AppStateContext'

export const SummaryCards = () => {
  const { contributions, user } = useAppState()
  const insight = calculateRetirementInsight(contributions)

  const stats = [
    { label: 'Total contributed', value: `GHS ${insight.total.toLocaleString()}`, helper: `Returns earned GHS ${insight.interest.toFixed(2)}` },
    { label: 'Projected monthly pension', value: `GHS ${insight.monthlyPayout.toLocaleString()}`, helper: 'Via annuity at retirement (age 60)' },
    { label: 'Estimated lump sum', value: `GHS ${insight.lumpSum.toLocaleString()}`, helper: 'Available at retirement (NPRA regulated)' },
    { label: 'Min monthly debit', value: `GHS ${user?.minimumContribution.toFixed(2)}`, helper: `Next debit on the ${user?.dueDay}th` },
  ]

  return (
    <section className="summary-grid">
      {stats.map((stat) => (
        <article key={stat.label} className="summary-card">
          <p>{stat.label}</p>
          <strong>{stat.value}</strong>
          <small>{stat.helper}</small>
        </article>
      ))}
    </section>
  )
}
