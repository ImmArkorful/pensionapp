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
import { mockContributions, mockNotifications, mockStatements, mockUser, reminderSettings } from '../data/mockData'
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
  simulateContribution: (amount?: number) => Promise<void>
  toggleReminder: (id: string) => Promise<void>
  linkAccount: (channel: 'momo' | 'bank', value: boolean) => Promise<void>
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>
}

type AppContextValue = AppState & AppActions

const AppStateContext = createContext<AppContextValue | undefined>(undefined)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const uniqueId = () => `id-${Math.random().toString(16).slice(2)}`
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
  const [contributions, setContributions] = useState<Contribution[]>(mockContributions)
  const [statements, setStatements] = useState<StatementEntry[]>(mockStatements)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [reminders, setReminders] = useState<ReminderSetting[]>(reminderSettings)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  useEffect(() => {
    const bootstrap = async () => {
      if (!user) return
      try {
        const res = await api.bootstrap()
        setUser(res.user)
        setContributions(res.contributions)
        setStatements(res.statements)
        setNotifications(res.notifications)
        setReminders(res.reminders)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user))
      } catch {
        // keep existing local demo state if backend/token is unavailable
      }
    }
    bootstrap()
  }, [user?.id])

  const login = async (phone: string, otp: string) => {
    setIsAuthenticating(true)
    try {
      const res = await api.login(phone, otp)
      setUser(res.user)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(res.user))
      setIsAuthenticating(false)
      return true
    } catch {
      await delay(500)
      const success = phone.trim() === mockUser.phone && otp === '123456'
      if (success) {
        setUser(mockUser)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(mockUser))
      }
      setIsAuthenticating(false)
      return success
    }
  }

  const logout = () => {
    setUser(null)
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
      setIsAuthenticating(false)
      return true
    } catch {
      await delay(800)
      const generatedUser: UserProfile = {
        ...mockUser,
        id: uniqueId(),
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone,
        email: payload.email,
        minimumContribution: payload.minimumContribution,
        retirementAge: payload.retirementAge,
        nextOfKin: payload.nextOfKin,
        accountLinks: payload.accountLinks,
        verified: true,
        joinedOn: new Date().toISOString(),
      }
      setUser(generatedUser)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(generatedUser))
      setStatements((prev) => {
        const previousBalance = prev[0]?.balance ?? 0
        const fee = 5
        return [
          {
            id: uniqueId(),
            date: new Date().toISOString().slice(0, 10),
            description: 'Account setup fee',
            debit: fee,
            credit: 0,
            balance: Number((previousBalance - fee).toFixed(2)),
            channel: 'system',
          },
          ...prev,
        ]
      })
      setNotifications((prev) => [
        {
          id: uniqueId(),
          title: 'Welcome to MyPension',
          body: `Thanks for signing your Tier 3 mandate. First debit scheduled on the ${generatedUser.dueDay}th.`,
          timestamp: new Date().toISOString(),
          type: 'info',
        },
        ...prev,
      ])
      setIsAuthenticating(false)
      return true
    }
  }

  const simulateContribution = async (amount = user?.minimumContribution ?? 500) => {
    if (!user) return
    try {
      await api.addContribution(amount)
      const res = await api.bootstrap()
      setContributions(res.contributions)
      setStatements(res.statements)
      setNotifications(res.notifications)
      return
    } catch {
      const contribution: Contribution = {
        id: uniqueId(),
        month: new Date().toLocaleString('default', { month: 'short', year: 'numeric' }),
        amount,
        interestEarned: Number((amount * 0.025).toFixed(2)),
        status: 'completed',
      }
      setContributions((prev) => [contribution, ...prev])
      setStatements((prev) => [
        {
          id: uniqueId(),
          date: new Date().toISOString().slice(0, 10),
          description: 'Manual top-up',
          credit: amount,
          balance: Number(((prev[0]?.balance ?? 0) + amount).toFixed(2)),
          channel: 'momo',
        },
        ...prev,
      ])
      setNotifications((prev) => [
        {
          id: uniqueId(),
          title: 'Contribution successful',
          body: `GHS ${amount.toFixed(2)} received via mobile money.`,
          timestamp: new Date().toISOString(),
          type: 'payment',
        },
        ...prev,
      ])
    }
  }

  const toggleReminder = async (id: string) => {
    try {
      const res = await api.toggleReminder(id)
      setReminders(res.reminders)
    } catch {
      setReminders((prev) => prev.map((reminder) => (reminder.id === id ? { ...reminder, active: !reminder.active } : reminder)))
    }
  }

  const linkAccount = async (channel: 'momo' | 'bank', value: boolean) => {
    if (!user) return
    const next = { ...user, accountLinks: { ...user.accountLinks, [channel]: value } }
    setUser(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    try {
      await api.updateAccountLinks(next.accountLinks)
    } catch {
      // keep local state
    }
  }

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return
    const next = { ...user, ...updates }
    setUser(next)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    try {
      await api.updateProfile(updates)
    } catch {
      // keep local state
    }
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
        simulateContribution,
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
