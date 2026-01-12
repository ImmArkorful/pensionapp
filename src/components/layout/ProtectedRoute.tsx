import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useAppState } from '../../context/AppStateContext'

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAppState()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}
