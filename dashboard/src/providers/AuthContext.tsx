import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { authProvider } from './auth'

export interface AuthDTO {
  username: string
  password: string
}

interface AuthContextType {
  token: string
  signin: (credential: AuthDTO) => Promise<string>
  signout: (callback: VoidFunction) => void
}

const AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string>('')

  const signin = async (credential: AuthDTO, callback: VoidFunction) => {
    const token = await authProvider.signin(credential)
    setToken(token)
    callback()
  }

  const signout = () => {
    return authProvider.signout().then(() => {
      setToken('')
    })
  }

  const value = { token, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return React.useContext(AuthContext)
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.token) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to='/login' state={{ from: location }} replace />
  }

  return children
}
