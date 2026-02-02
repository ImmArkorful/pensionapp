import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { format } from 'date-fns'
import { AppShell } from '../components/layout/AppShell'
import { useAppState } from '../context/AppStateContext'

export const SettingsPage = () => {
  const { user, reminders, toggleReminder, linkAccount, updateUserProfile } = useAppState()
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [profileForm, setProfileForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    retirementAge: '',
    minimumContribution: '',
    dueDay: '',
  })
  const [copying, setCopying] = useState(false)
  const location = useLocation()
  const [isEditingNextOfKin, setIsEditingNextOfKin] = useState(false)
  const [nextOfKinForm, setNextOfKinForm] = useState({
    name: '',
    relationship: '',
    phone: '',
  })

  useEffect(() => {
    if (user) {
      setProfileForm({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        retirementAge: String(user.retirementAge),
        minimumContribution: String(user.minimumContribution),
        dueDay: String(user.dueDay),
      })
      setNextOfKinForm({
        name: user.nextOfKin.name,
        relationship: user.nextOfKin.relationship,
        phone: user.nextOfKin.phone,
      })
    }
  }, [user])

  useEffect(() => {
    if (location.hash === '#next-of-kin') {
      const el = document.getElementById('next-of-kin')
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [location])

  const handleProfileChange = (field: keyof typeof profileForm, value: string) => {
    setProfileForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleNextOfKinChange = (field: keyof typeof nextOfKinForm, value: string) => {
    setNextOfKinForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleCancelEdit = () => {
    if (!user) return
    setProfileForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      retirementAge: String(user.retirementAge),
      minimumContribution: String(user.minimumContribution),
      dueDay: String(user.dueDay),
    })
    setIsEditingProfile(false)
  }

  const handleCancelNextOfKin = () => {
    if (!user) return
    setNextOfKinForm({
      name: user.nextOfKin.name,
      relationship: user.nextOfKin.relationship,
      phone: user.nextOfKin.phone,
    })
    setIsEditingNextOfKin(false)
  }

  const handleSaveNextOfKin = () => {
    if (!user) return

    updateUserProfile({
      nextOfKin: {
        name: nextOfKinForm.name.trim() || user.nextOfKin.name,
        relationship: nextOfKinForm.relationship.trim() || user.nextOfKin.relationship,
        phone: nextOfKinForm.phone.trim() || user.nextOfKin.phone,
      },
    })

    setIsEditingNextOfKin(false)
  }

  const handleSaveProfile = () => {
    if (!user) return

    const toNumber = (value: string, fallback: number) => {
      const parsed = Number(value)
      return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
    }

    updateUserProfile({
      firstName: profileForm.firstName.trim() || user.firstName,
      lastName: profileForm.lastName.trim() || user.lastName,
      email: profileForm.email.trim() || user.email,
      phone: profileForm.phone.trim() || user.phone,
      retirementAge: toNumber(profileForm.retirementAge, user.retirementAge),
      minimumContribution: toNumber(profileForm.minimumContribution, user.minimumContribution),
      dueDay: toNumber(profileForm.dueDay, user.dueDay),
    })

    setIsEditingProfile(false)
  }

  const handleCopyReferral = async () => {
    if (!user || copying) return
    try {
      await navigator.clipboard.writeText(user.referralCode)
      setCopying(true)
      setTimeout(() => setCopying(false), 1500)
    } catch {
      setCopying(false)
    }
  }

  if (!user) return null

  return (
    <AppShell>
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p>Manage your account, notifications, and payment methods</p>
        </div>
      </div>

      <section className="panel settings-section">
        <header className="panel-header">
          <div>
            <h3>Profile</h3>
            <p>Your account details</p>
          </div>
          {!isEditingProfile ? (
            <button type="button" className="primary ghost" onClick={() => setIsEditingProfile(true)}>
              Edit profile
            </button>
          ) : (
            <div className="profile-actions">
              <button type="button" className="primary" onClick={handleSaveProfile}>
                Save changes
              </button>
              <button type="button" className="link-btn" onClick={handleCancelEdit}>
                Cancel
              </button>
            </div>
          )}
        </header>
        <div className="settings-grid">
          <div className="setting-row">
            <span className="setting-label">Name</span>
            {isEditingProfile ? (
              <div className="setting-value setting-input-row">
                <input
                  type="text"
                  value={profileForm.firstName}
                  onChange={(e) => handleProfileChange('firstName', e.target.value)}
                  placeholder="First name"
                />
                <input
                  type="text"
                  value={profileForm.lastName}
                  onChange={(e) => handleProfileChange('lastName', e.target.value)}
                  placeholder="Last name"
                />
              </div>
            ) : (
              <span className="setting-value">
                {user.firstName} {user.lastName}
              </span>
            )}
          </div>
          <div className="setting-row">
            <span className="setting-label">Email</span>
            {isEditingProfile ? (
              <input
                className="setting-value"
                type="email"
                value={profileForm.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
              />
            ) : (
              <span className="setting-value">{user.email}</span>
            )}
          </div>
          <div className="setting-row">
            <span className="setting-label">Phone</span>
            {isEditingProfile ? (
              <input
                className="setting-value"
                type="tel"
                value={profileForm.phone}
                onChange={(e) => handleProfileChange('phone', e.target.value)}
              />
            ) : (
              <span className="setting-value">{user.phone}</span>
            )}
          </div>
          <div className="setting-row">
            <span className="setting-label">Retirement age</span>
            {isEditingProfile ? (
              <input
                className="setting-value"
                type="number"
                min={18}
                max={80}
                value={profileForm.retirementAge}
                onChange={(e) => handleProfileChange('retirementAge', e.target.value)}
              />
            ) : (
              <span className="setting-value">{user.retirementAge}</span>
            )}
          </div>
          <div className="setting-row">
            <span className="setting-label">Minimum contribution</span>
            {isEditingProfile ? (
              <input
                className="setting-value"
                type="number"
                min={0}
                step={10}
                value={profileForm.minimumContribution}
                onChange={(e) => handleProfileChange('minimumContribution', e.target.value)}
              />
            ) : (
              <span className="setting-value">GHS {user.minimumContribution.toFixed(2)} / month</span>
            )}
          </div>
          <div className="setting-row">
            <span className="setting-label">Due day</span>
            {isEditingProfile ? (
              <input
                className="setting-value"
                type="number"
                min={1}
                max={31}
                value={profileForm.dueDay}
                onChange={(e) => handleProfileChange('dueDay', e.target.value)}
              />
            ) : (
              <span className="setting-value">{user.dueDay}th of each month</span>
            )}
          </div>
          <div className="setting-row">
            <span className="setting-label">Referral code</span>
            <div className="setting-value referral-code referral-row">
              <span>{user.referralCode}</span>
              <button
                type="button"
                className="link-btn copy-referral-btn"
                onClick={handleCopyReferral}
                disabled={copying}
              >
                {copying ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="setting-row">
            <span className="setting-label">Member since</span>
            <span className="setting-value">
              {format(new Date(user.joinedOn), 'dd MMM yyyy')}
            </span>
          </div>
        </div>
      </section>

      <section className="panel settings-section">
        <header className="panel-header">
          <div>
            <h3>Payment methods</h3>
            <p>Link mobile money or bank for automatic debits</p>
          </div>
        </header>
        <ul className="settings-list">
          <li>
            <div>
              <strong>Mobile Money (MoMo)</strong>
              <p>{user.accountLinks.momo ? 'Linked for auto debit' : 'Not linked'}</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={user.accountLinks.momo}
                onChange={(e) => linkAccount('momo', e.target.checked)}
              />
              <span />
            </label>
          </li>
          <li>
            <div>
              <strong>Bank account</strong>
              <p>{user.accountLinks.bank ? 'Linked as backup' : 'Not linked'}</p>
            </div>
            <label className="switch">
              <input
                type="checkbox"
                checked={user.accountLinks.bank}
                onChange={(e) => linkAccount('bank', e.target.checked)}
              />
              <span />
            </label>
          </li>
        </ul>
      </section>

      <section className="panel settings-section reminders">
        <header className="panel-header">
          <div>
            <h3>Reminder schedule</h3>
            <p>When to receive debit and update notifications</p>
          </div>
        </header>
        <ul>
          {reminders.map((reminder) => (
            <li key={reminder.id}>
              <div>
                <strong>{reminder.label}</strong>
                <p>{reminder.timing}</p>
              </div>
              <label className="switch">
                <input
                  type="checkbox"
                  checked={reminder.active}
                  onChange={() => toggleReminder(reminder.id)}
                />
                <span />
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section id="next-of-kin" className="panel settings-section next-of-kin">
        <header className="panel-header">
          <div>
            <h3>Next of kin</h3>
            <p>Contact in case of emergency</p>
          </div>
          {!isEditingNextOfKin ? (
            <button type="button" className="primary ghost" onClick={() => setIsEditingNextOfKin(true)}>
              Change
            </button>
          ) : (
            <div className="profile-actions">
              <button type="button" className="primary" onClick={handleSaveNextOfKin}>
                Save
              </button>
              <button type="button" className="link-btn" onClick={handleCancelNextOfKin}>
                Cancel
              </button>
            </div>
          )}
        </header>
        <div className="kin-details">
          {isEditingNextOfKin ? (
            <>
              <label className="kin-field">
                <span>Name</span>
                <input
                  type="text"
                  value={nextOfKinForm.name}
                  onChange={(e) => handleNextOfKinChange('name', e.target.value)}
                />
              </label>
              <label className="kin-field">
                <span>Relationship</span>
                <input
                  type="text"
                  value={nextOfKinForm.relationship}
                  onChange={(e) => handleNextOfKinChange('relationship', e.target.value)}
                />
              </label>
              <label className="kin-field">
                <span>Phone</span>
                <input
                  type="tel"
                  value={nextOfKinForm.phone}
                  onChange={(e) => handleNextOfKinChange('phone', e.target.value)}
                />
              </label>
            </>
          ) : (
            <>
              <strong>{user.nextOfKin.name}</strong>
              <p>{user.nextOfKin.relationship}</p>
              <p>{user.nextOfKin.phone}</p>
            </>
          )}
        </div>
      </section>
    </AppShell>
  )
}
