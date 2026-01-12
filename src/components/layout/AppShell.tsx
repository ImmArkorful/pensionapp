import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAppState } from '../../context/AppStateContext'

const navItems = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/dashboard/statements', label: 'Statements', disabled: true },
  { to: '/dashboard/settings', label: 'Settings', disabled: true },
]

export const AppShell = ({ children }: { children: ReactNode }) => {
  const { user, logout } = useAppState()

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="branding">
          <img src="/logo.jpeg" alt="PH Securities" className="logo-img" />
          <div>
            <p className="brand-name">PH Securities</p>
            <small>Pensions & Savings</small>
          </div>
        </div>

        <nav>
          {navItems.map(({ to, label, disabled }) => (
            <NavLink key={label} to={to} className={({ isActive }) => (disabled ? 'nav-link disabled' : `nav-link ${isActive ? 'active' : ''}`)}>
              {label}
              {disabled && <span className="soon-pill">Soon</span>}
            </NavLink>
          ))}
        </nav>

        {user && (
          <div className="user-pill">
            <div className="avatar">{user.firstName.at(0)}</div>
            <div className="user-meta">
              <strong>
                {user.firstName} {user.lastName}
              </strong>
              <small>Retires at {user.retirementAge}</small>
            </div>
            <button className="link-btn" onClick={logout}>
              Log out
            </button>
          </div>
        )}
      </header>

      <main className="app-main">{children}</main>
    </div>
  )
}
