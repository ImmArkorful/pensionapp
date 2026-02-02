import { useAppState } from '../../context/AppStateContext'

export const ContributionTrend = () => {
  const { contributions } = useAppState()
  const recent = [...contributions].slice(0, 6).reverse()
  const maxAmount = Math.max(...recent.map((c) => c.amount))

  const handleDownloadCsv = () => {
    if (!contributions.length) return

    const header = ['Month', 'Amount (GHS)', 'Status']
    const rows = contributions.map((entry) => [
      entry.month,
      entry.amount.toFixed(2),
      entry.status,
    ])

    const csvContent = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'monthly-contributions.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <section className="panel">
      <header className="panel-header">
        <div>
          <h3>Contribution trend</h3>
          <p>Past 6 months including pending debit</p>
        </div>
        <button className="link-btn" type="button" onClick={handleDownloadCsv}>
          Download CSV
        </button>
      </header>

      <div className="trend-grid">
        {recent.map((entry) => (
          <div key={entry.id} className="trend-column">
            <div className="bar-wrapper" title={`GHS ${entry.amount}`}>
              <span className={`status-dot ${entry.status}`} />
              <div className="bar-track">
                <div className="bar" style={{ height: `${(entry.amount / maxAmount) * 100}%` }} />
              </div>
            </div>
            <strong>GHS {entry.amount}</strong>
            <small>{entry.month}</small>
          </div>
        ))}
      </div>
    </section>
  )
}
