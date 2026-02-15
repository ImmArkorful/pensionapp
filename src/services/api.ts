import type { RegistrationPayload, UserProfile } from '../types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3001'
const TOKEN_KEY = 'pensionapp:token'

const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem(TOKEN_KEY) : null)
const setToken = (token: string) => {
  if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, token)
}
const clearToken = () => {
  if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY)
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken()
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(body.message ?? 'Request failed')
  }

  return response.json() as Promise<T>
}

export const api = {
  clearToken,
  async login(phone: string, otp: string) {
    const res = await request<{ token: string; user: UserProfile }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ phone, otp }),
    })
    setToken(res.token)
    return res
  },
  async register(payload: RegistrationPayload) {
    const res = await request<{ token: string; user: UserProfile }>('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
    setToken(res.token)
    return res
  },
  bootstrap() {
    return request<{
      user: UserProfile
      contributions: any[]
      statements: any[]
      notifications: any[]
      reminders: any[]
    }>('/api/bootstrap')
  },
  addContribution(amount: number) {
    return request<{ contribution: any }>('/api/contributions', {
      method: 'POST',
      body: JSON.stringify({ amount }),
    })
  },
  toggleReminder(id: string) {
    return request<{ reminders: any[] }>(`/api/reminders/${id}/toggle`, { method: 'PATCH' })
  },
  updateAccountLinks(accountLinks: { momo: boolean; bank: boolean }) {
    return request<{ user: UserProfile }>('/api/user/account-links', {
      method: 'PATCH',
      body: JSON.stringify({ accountLinks }),
    })
  },
  updateProfile(updates: Partial<UserProfile>) {
    return request<{ user: UserProfile }>('/api/user/profile', {
      method: 'PATCH',
      body: JSON.stringify(updates),
    })
  },
}
