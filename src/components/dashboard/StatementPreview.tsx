import { format } from 'date-fns'
import { useAppState } from '../../context/AppStateContext'

export const StatementPreview = () => {
  const { statements } = useAppState()
  const recent = statements.slice(0, 4)

  return (
    <section className="panel statements">
      <header className="panel-header">
        <div>
          <h3>Statement preview</h3>
          <p>Detailed statement available for download</p>
        </div>
        <button className="primary ghost" onClick={() => window.print()}>
          Print / Save
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
