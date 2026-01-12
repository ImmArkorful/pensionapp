import { createContext, useContext, useState } from 'react'
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
  simulateContribution: (amount?: number) => void
  toggleReminder: (id: string) => void
  linkAccount: (channel: 'momo' | 'bank', value: boolean) => void
}

type AppContextValue = AppState & AppActions

const AppStateContext = createContext<AppContextValue | undefined>(undefined)

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
const uniqueId = () => `id-${Math.random().toString(16).slice(2)}`

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [contributions, setContributions] = useState<Contribution[]>(mockContributions)
  const [statements, setStatements] = useState<StatementEntry[]>(mockStatements)
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [reminders, setReminders] = useState<ReminderSetting[]>(reminderSettings)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const login = async (phone: string, otp: string) => {
    setIsAuthenticating(true)
    await delay(900)
    const success = phone.trim() === mockUser.phone && otp === '123456'
    if (success) {
      setUser(mockUser)
    }
    setIsAuthenticating(false)
    return success
  }

  const logout = () => {
    setUser(null)
  }

  const register = async (payload: RegistrationPayload) => {
    setIsAuthenticating(true)
    await delay(1200)
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
    setIsAuthenticating(false)
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
    return true
  }

  const simulateContribution = (amount = user?.minimumContribution ?? 500) => {
    if (!user) return
    const contribution: Contribution = {
      id: uniqueId(),
      month: new Date().toLocaleString('default', { month: 'short', year: 'numeric' }),
      amount,
      interestEarned: Number((amount * 0.025).toFixed(2)),
      status: 'completed',
    }

    setContributions((prev) => [contribution, ...prev])
    setStatements((prev) => {
      const newBalance = Number(((prev[0]?.balance ?? 0) + amount).toFixed(2))
      return [
        {
          id: uniqueId(),
          date: new Date().toISOString().slice(0, 10),
          description: 'Manual top-up',
          credit: amount,
          balance: newBalance,
          channel: 'momo',
        },
        ...prev,
      ]
    })
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

  const toggleReminder = (id: string) => {
    setReminders((prev) => prev.map((reminder) => (reminder.id === id ? { ...reminder, active: !reminder.active } : reminder)))
  }

  const linkAccount = (channel: 'momo' | 'bank', value: boolean) => {
    if (!user) return
    setUser({ ...user, accountLinks: { ...user.accountLinks, [channel]: value } })
  }

  const value: AppContextValue = {
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
  }

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export const useAppState = () => {
  const ctx = useContext(AppStateContext)
  if (!ctx) {
    throw new Error('useAppState must be used within AppProvider')
  }
  return ctx
}

export const calculateRetirementInsight = (contributions: Contribution[]) => {
  const total = contributions.reduce((sum, entry) => sum + entry.amount, 0)
  const interest = contributions.reduce((sum, entry) => sum + entry.interestEarned, 0)
  const lumpSum = total * 0.3
  const monthlyPayout = ((total - lumpSum) / (20 * 12)).toFixed(2)
  return {
    total,
    interest,
    lumpSum,
    monthlyPayout: Number(monthlyPayout),
  }
}

export const daysUntilDebit = (dueDay: number) => {
  const now = new Date()
  const currentDay = now.getDate()
  const debitDate =
    currentDay <= dueDay
      ? new Date(now.getFullYear(), now.getMonth(), dueDay)
      : new Date(now.getFullYear(), now.getMonth() + 1, dueDay)

  return differenceInCalendarDays(debitDate, now)
}
