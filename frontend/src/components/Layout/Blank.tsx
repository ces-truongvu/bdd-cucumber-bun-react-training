import { Outlet } from 'react-router-dom'
import { AuthProvider } from '~/providers/AuthContext'

export function BlankLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  )
}
