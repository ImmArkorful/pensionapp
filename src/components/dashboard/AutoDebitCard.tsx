import { useState } from 'react'
import { daysUntilDebit, useAppState } from '../../context/AppStateContext'

export const AutoDebitCard = () => {
  const { user, simulateContribution, linkAccount } = useAppState()
  const [activeModal, setActiveModal] = useState<'momo' | 'bank' | null>(null)
  const [accountName, setAccountName] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  if (!user) return null
  const days = daysUntilDebit(user.dueDay)

  const openModal = (channel: 'momo' | 'bank') => {
    setActiveModal(channel)
    setAccountName('')
    setAccountNumber('')
  }

  const closeModal = () => {
    setActiveModal(null)
  }

  const handleSaveAccount = () => {
    if (!activeModal) return
    // In this demo we only toggle the linked state; details are not persisted
    linkAccount(activeModal, true)
    closeModal()
  }

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
        <button className="primary ghost" onClick={() => openModal('momo')}>
          {user.accountLinks.momo ? 'Switch account' : 'Link now'}
        </button>
      </div>

      <div className="debit-row">
        <div>
          <strong>{user.accountLinks.bank ? 'Absa Bank' : 'Add bank account'}</strong>
          <p>{user.accountLinks.bank ? 'Backup funding source' : 'Optional backup funding source'}</p>
        </div>
        <button className="primary ghost" onClick={() => openModal('bank')}>
          {user.accountLinks.bank ? 'Update mandate' : 'Add account'}
        </button>
      </div>

      <footer className="panel-footer">
        <p>Need to top up ahead of time?</p>
        <button className="primary" onClick={() => simulateContribution()}>
          Simulate manual top-up
        </button>
      </footer>

      {activeModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <header className="modal-header">
              <h3>{activeModal === 'momo' ? 'Link mobile money' : 'Link bank account'}</h3>
              <button
                type="button"
                className="link-btn"
                onClick={closeModal}
                aria-label="Close"
              >
                ✕
              </button>
            </header>
            <div className="modal-body">
              <p className="modal-helper">
                This is a demo flow. Enter any details below to mimic linking your{' '}
                {activeModal === 'momo' ? 'mobile money wallet' : 'bank account'}.
              </p>
              <label className="modal-field">
                <span>{activeModal === 'momo' ? 'Wallet provider' : 'Bank name'}</span>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder={activeModal === 'momo' ? 'e.g. MTN MoMo' : 'e.g. Absa Bank'}
                />
              </label>
              <label className="modal-field">
                <span>{activeModal === 'momo' ? 'Wallet number' : 'Account number'}</span>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account / wallet number"
                />
              </label>
            </div>
            <footer className="modal-actions">
              <button type="button" className="primary" onClick={handleSaveAccount}>
                Save and continue
              </button>
              <button type="button" className="link-btn" onClick={closeModal}>
                Cancel
              </button>
            </footer>
          </div>
        </div>
      )}
    </section>
  )
}
