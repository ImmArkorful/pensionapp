import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import type {
  Contribution,
  Notification,
  RegistrationPayload,
  ReminderSetting,
  StatementEntry,
  UserProfile,
} from '../types'
import { api } from '../services/api'

interface AppState {
  user: UserProfile | null
  contributions: Contribution[]
  statements: StatementEntry[]
  notifications: Notification[]
  reminders: ReminderSetting[]
  isAuthenticating: boolean
}

interface AppActions {
  login: (phone: string, otp: string) => Promise<boolean>
  logout: () => void
  register: (payload: RegistrationPayload) => Promise<boolean>
  addContribution: (amount?: number) => Promise<void>
  toggleReminder: (id: string) => Promise<void>
  linkAccount: (channel: 'momo' | 'bank', value: boolean) => Promise<void>
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>
}

type AppContextValue = AppState & AppActions

const AppStateContext = createContext<AppContextValue | undefined>(undefined)
const STORAGE_KEY = 'pensionapp:user'

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null
      return saved ? (JSON.parse(saved) as UserProfile) : null
    } catch {
      return null
    }
  })
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [statements, setStatements] = useState<StatementEntry[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [reminders, setReminders] = useState<ReminderSetting[]>([])
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const refreshAppData = async () => {
    const res = await api.bootstrap()
    setUser(res.user)
    setContributions(res.contributions)
    setStatements(res.statements)
    setNotifications(res.notifications)
    setReminders(res.reminders)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user))
  }

  useEffect(() => {
    const bootstrap = async () => {
      if (!user) return
      try {
        await refreshAppData()
      } catch {
        logout()
      }
    }
    bootstrap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id])

  const login = async (phone: string, otp: string) => {
    setIsAuthenticating(true)
    try {
      const res = await api.login(phone, otp)
      setUser(res.user)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user))
      await refreshAppData()
      return true
    } catch {
      return false
    } finally {
      setIsAuthenticating(false)
    }
  }

  const logout = () => {
    setUser(null)
    setContributions([])
    setStatements([])
    setNotifications([])
    setReminders([])
    api.clearToken()
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      // ignore
    }
  }

  const register = async (payload: RegistrationPayload) => {
    setIsAuthenticating(true)
    try {
      const res = await api.register(payload)
      setUser(res.user)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user))
      await refreshAppData()
      return true
    } catch {
      return false
    } finally {
      setIsAuthenticating(false)
    }
  }

  const addContribution = async (amount = user?.minimumContribution ?? 500) => {
    if (!user) return
    await api.addContribution(amount)
    await refreshAppData()
  }

  const toggleReminder = async (id: string) => {
    const res = await api.toggleReminder(id)
    setReminders(res.reminders)
  }

  const linkAccount = async (channel: 'momo' | 'bank', value: boolean) => {
    if (!user) return
    const accountLinks = { ...user.accountLinks, [channel]: value }
    const res = await api.updateAccountLinks(accountLinks)
    setUser(res.user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user))
  }

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return
    const res = await api.updateProfile(updates)
    setUser(res.user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user))
  }

  return (
    <AppStateContext.Provider
      value={{
        user,
        contributions,
        statements,
        notifications,
        reminders,
        isAuthenticating,
        login,
        logout,
        register,
        addContribution,
        toggleReminder,
        linkAccount,
        updateUserProfile,
      }}
    >
      {children}
    </AppStateContext.Provider>
  )
}

export const useAppState = () => {
  const ctx = useContext(AppStateContext)
  if (!ctx) throw new Error('useAppState must be used within AppProvider')
  return ctx
}

export const calculateRetirementInsight = (contributions: Contribution[]) => {
  const total = contributions.reduce((sum, entry) => sum + entry.amount, 0)
  const interest = contributions.reduce((sum, entry) => sum + entry.interestEarned, 0)
  const lumpSum = total * 0.3
  const monthlyPayout = ((total - lumpSum) / (20 * 12)).toFixed(2)
  return { total, interest, lumpSum, monthlyPayout: Number(monthlyPayout) }
}

export const daysUntilDebit = (dueDay: number) => {
  const now = new Date()
  const currentDay = now.getDate()
  const debitDate = currentDay <= dueDay ? new Date(now.getFullYear(), now.getMonth(), dueDay) : new Date(now.getFullYear(), now.getMonth() + 1, dueDay)
  return differenceInCalendarDays(debitDate, now)
}
