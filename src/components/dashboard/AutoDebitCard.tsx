import { daysUntilDebit, useAppState } from '../../context/AppStateContext'

export const AutoDebitCard = () => {
  const { user, simulateContribution } = useAppState()
  if (!user) return null
  const days = daysUntilDebit(user.dueDay)

  return (
    <section className="panel auto-debit">
      <header className="panel-header">
        <div>
          <h3>Automatic debit</h3>
          <p>Linked to mobile money wallet • Next debit GHS {user.minimumContribution.toFixed(2)}</p>
        </div>
        <span className={`badge ${days <= 1 ? 'danger' : 'info'}`}>{days <= 0 ? 'Due today' : `${days} days`}</span>
      </header>

      <div className="debit-row">
        <div>
          <strong>{user.accountLinks.momo ? 'MTN MoMo' : 'Add mobile money'}</strong>
          <p>{user.accountLinks.momo ? 'Auto debit active' : 'Required for seamless monthly deductions'}</p>
        </div>
        <button className="primary ghost">{user.accountLinks.momo ? 'Switch account' : 'Link now'}</button>
      </div>

      <div className="debit-row">
        <div>
          <strong>{user.accountLinks.bank ? 'Absa Bank' : 'Add bank account'}</strong>
          <p>{user.accountLinks.bank ? 'Backup funding source' : 'Optional backup funding source'}</p>
        </div>
        <button className="primary ghost">{user.accountLinks.bank ? 'Update mandate' : 'Add account'}</button>
      </div>

      <footer className="panel-footer">
        <p>Need to top up ahead of time?</p>
        <button className="primary" onClick={() => simulateContribution()}>
          Simulate manual top-up
        </button>
      </footer>
    </section>
  )
}
