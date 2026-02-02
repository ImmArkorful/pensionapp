import { useState, useMemo } from 'react'
import { format } from 'date-fns'
import { AppShell } from '../components/layout/AppShell'
import { useAppState } from '../context/AppStateContext'
import type { StatementEntry } from '../types'

export const StatementsPage = () => {
  const { statements } = useAppState()
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [channel, setChannel] = useState<'all' | 'momo' | 'bank' | 'system'>('all')

  const filtered = useMemo(() => {
    let list: StatementEntry[] = [...statements]
    if (dateFrom) {
      list = list.filter((e) => e.date >= dateFrom)
    }
    if (dateTo) {
      list = list.filter((e) => e.date <= dateTo)
    }
    if (channel !== 'all') {
      list = list.filter((e) => e.channel === channel)
    }
    return list.sort((a, b) => (b.date > a.date ? 1 : -1))
  }, [statements, dateFrom, dateTo, channel])

  const handlePrint = () => {
    window.print()
  }

  return (
    <AppShell>
      <div className="page-header">
        <div>
          <h1>Statements</h1>
          <p>View and download your Tier 3 transaction history</p>
        </div>
      </div>

      <section className="panel statements statements-page">
        <header className="panel-header">
          <div>
            <h3>Transaction history</h3>
            <p>Filter by date range and channel</p>
          </div>
          <button type="button" className="primary ghost" onClick={handlePrint}>
            Print / Save PDF
          </button>
        </header>

        <div className="statements-filters no-print">
          <div className="filter-row">
            <label>
              <span>From</span>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </label>
            <label>
              <span>To</span>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </label>
            <label>
              <span>Channel</span>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value as typeof channel)}
              >
                <option value="all">All</option>
                <option value="momo">Mobile Money</option>
                <option value="bank">Bank</option>
                <option value="system">System</option>
              </select>
            </label>
          </div>
        </div>

        <div className="statements-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Channel</th>
                <th>Debit</th>
                <th>Credit</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="empty-state">
                    No transactions match your filters.
                  </td>
                </tr>
              ) : (
                filtered.map((entry) => (
                  <tr key={entry.id}>
                    <td>{format(new Date(entry.date), 'dd MMM yyyy')}</td>
                    <td>{entry.description}</td>
                    <td>
                      <span className={`channel-badge channel-${entry.channel}`}>
                        {entry.channel}
                      </span>
                    </td>
                    <td>
                      {entry.debit && entry.debit > 0
                        ? `GHS ${entry.debit.toFixed(2)}`
                        : '-'}
                    </td>
                    <td>
                      {entry.credit && entry.credit > 0
                        ? `GHS ${entry.credit.toFixed(2)}`
                        : '-'}
                    </td>
                    <td>GHS {entry.balance.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <footer className="panel-footer no-print">
          <p>
            Showing {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
            {dateFrom || dateTo || channel !== 'all' ? ' (filtered)' : ''}.
          </p>
        </footer>
      </section>
    </AppShell>
  )
}
