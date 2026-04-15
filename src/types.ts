export type AccountLink = 'momo' | 'bank'
export type PaymentMethod = 'momo' | 'bank'

export interface PaymentDetails {
  method: PaymentMethod
  momo?: {
    number: string
    network: string
    accountName: string
  }
  bank?: {
    bankName: string
    accountNumber: string
    accountName: string
    branchCode: string
  }
}

export interface UserProfile {
  id: string
  firstName: string
  lastName: string
  phone: string
  email: string
  verified: boolean
  minimumContribution: number
  retirementAge: number
  nextOfKin: {
    name: string
    relationship: string
    phone: string
  }
  accountLinks: Record<AccountLink, boolean>
  paymentDetails?: PaymentDetails | null
  dueDay: number
  referralCode: string
  joinedOn: string
}

export interface Contribution {
  id: string
  month: string
  amount: number
  interestEarned: number
  status: 'completed' | 'pending' | 'failed'
}

export interface Notification {
  id: string
  title: string
  body: string
  timestamp: string
  type: 'reminder' | 'payment' | 'info' | 'bonus'
}

export interface StatementEntry {
  id: string
  date: string
  description: string
  debit?: number
  credit?: number
  balance: number
  channel: 'momo' | 'bank' | 'system'
}

export interface ReminderSetting {
  id: string
  label: string
  timing: string
  active: boolean
}

export interface RegistrationPayload {
  firstName: string
  lastName: string
  phone: string
  email: string
  minimumContribution: number
  retirementAge: number
  nextOfKin: {
    name: string
    relationship: string
    phone: string
  }
  accountLinks: {
    momo: boolean
    bank: boolean
  }
  paymentDetails?: PaymentDetails
}
