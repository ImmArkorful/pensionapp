import { format } from 'date-fns'
import { useAppState } from '../../context/AppStateContext'

export const StatementPreview = () => {
  const { statements } = useAppState()
  const recent = statements.slice(0, 4)

  const handleDownloadCsv = () => {
    if (!statements.length) return

    const header = ['Date', 'Description', 'Channel', 'Credit', 'Balance']
    const rows = statements.map((entry) => [
      format(new Date(entry.date), 'yyyy-MM-dd'),
      entry.description,
      entry.channel,
      entry.credit ? entry.credit.toFixed(2) : '',
      entry.balance.toString(),
    ])

    const csvContent = [header, ...rows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'statements.csv')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return (
    <section className="panel statements">
      <header className="panel-header">
        <div>
          <h3>Statement preview</h3>
          <p>Download a CSV of your full statement</p>
        </div>
        <button className="primary ghost" type="button" onClick={handleDownloadCsv}>
          Download CSV
        </button>
      </header>

      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Channel</th>
            <th>Credit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {recent.map((entry) => (
            <tr key={entry.id}>
              <td>{format(new Date(entry.date), 'dd MMM yyyy')}</td>
              <td>{entry.description}</td>
              <td>{entry.channel}</td>
              <td>{entry.credit ? `GHS ${entry.credit.toFixed(2)}` : '-'}</td>
              <td>GHS {entry.balance.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
