import type { Contribution, Notification, ReminderSetting, StatementEntry, UserProfile } from '../types'

export const mockUser: UserProfile = {
  id: 'usr-0001',
  firstName: 'Adwoa',
  lastName: 'Mensah',
  phone: '+233501234567',
  email: 'adwoa.mensah@example.com',
  verified: true,
  minimumContribution: 500,
  retirementAge: 60,
  nextOfKin: {
    name: 'Kwame Mensah',
    relationship: 'Brother',
    phone: '+233241112223',
  },
  accountLinks: {
    momo: true,
    bank: false,
  },
  dueDay: 25,
  referralCode: 'PEN-ADW58',
  joinedOn: '2021-03-15',
}

export const mockContributions: Contribution[] = [
  { id: 'cont-1', month: 'Aug 2024', amount: 750, interestEarned: 18, status: 'completed' },
  { id: 'cont-2', month: 'Sep 2024', amount: 550, interestEarned: 12, status: 'completed' },
  { id: 'cont-3', month: 'Oct 2024', amount: 800, interestEarned: 20, status: 'completed' },
  { id: 'cont-4', month: 'Nov 2024', amount: 500, interestEarned: 11, status: 'completed' },
  { id: 'cont-5', month: 'Dec 2024', amount: 600, interestEarned: 15, status: 'completed' },
  { id: 'cont-6', month: 'Jan 2025', amount: 500, interestEarned: 13, status: 'pending' },
]

export const mockStatements: StatementEntry[] = [
  {
    id: 'stmt-1',
    date: '2026-12-25',
    description: 'Monthly Tier 3 Contribution',
    debit: 0,
    credit: 600,
    balance: 12950,
    channel: 'momo',
  },
  {
    id: 'stmt-2',
    date: '2026-11-25',
    description: 'Monthly Tier 3 Contribution',
    debit: 0,
    credit: 500,
    balance: 12350,
    channel: 'momo',
  },
  {
    id: 'stmt-3',
    date: '2026-10-25',
    description: 'Interest Credit',
    debit: 0,
    credit: 20,
    balance: 11850,
    channel: 'system',
  },
  {
    id: 'stmt-4',
    date: '2026-10-25',
    description: 'Monthly Tier 3 Contribution',
    debit: 0,
    credit: 800,
    balance: 11830,
    channel: 'bank',
  },
]

export const mockNotifications: Notification[] = [
  {
    id: 'ntf-1',
    title: 'Debit reminder',
    body: 'Your mobile money wallet will be debited in 7 days for GHS 500.',
    timestamp: '2025-01-18T09:30:00Z',
    type: 'reminder',
  },
  {
    id: 'ntf-2',
    title: 'Monthly interest posted',
    body: 'Interest calculation complete. GHS 13 credited to your Tier 3 balance.',
    timestamp: '2024-12-31T08:00:00Z',
    type: 'payment',
  },
  {
    id: 'ntf-3',
    title: 'Product update',
    body: 'Introducing flexible top-ups and boosted referral bonuses for Q1.',
    timestamp: '2024-12-12T10:15:00Z',
    type: 'info',
  },
  {
    id: 'ntf-4',
    title: 'Referral bonus unlocked',
    body: 'You earned GHS 50 bonus after Ama completed her first deposit.',
    timestamp: '2024-11-05T12:45:00Z',
    type: 'bonus',
  },
]

export const reminderSettings: ReminderSetting[] = [
  { id: 'rem-1', label: 'One week before debit', timing: '7 days prior', active: true },
  { id: 'rem-2', label: 'A day before debit', timing: '1 day prior', active: true },
  { id: 'rem-3', label: 'When debited', timing: 'Immediately', active: true },
  { id: 'rem-4', label: 'Newsletter updates', timing: 'Monthly', active: false },
]
