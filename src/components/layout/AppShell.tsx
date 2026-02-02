import { NavLink } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAppState } from '../../context/AppStateContext'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', end: true },
  { to: '/dashboard/statements', label: 'Statements' },
  { to: '/dashboard/settings', label: 'Settings' },
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
          {navItems.map(({ to, label, end }) => (
            <NavLink
              key={label}
              to={to}
              end={end}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {label}
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
