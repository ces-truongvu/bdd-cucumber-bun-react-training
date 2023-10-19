import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { authService, AuthDTO, SignInResponse } from '~/services/AuthService'

interface AuthContextType {
  username: string
  token: string
  signin: (credential: AuthDTO) => Promise<void>
  signout: (callback: VoidFunction) => void
}

let AuthContext = React.createContext<AuthContextType>(null!)

/**
 * AuthProvider component that provides authentication functionality to its children components.
 *
 * @param children - The children components that will have access to the authentication functionality.
 * @returns The provider component that wraps the children components.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // State variable to store the authentication token
  const [token, setToken] = React.useState<string>('')
  const [username, setUsername] = React.useState<string>('')

  const signin = async (credential: AuthDTO) => {
    const { username, token }: SignInResponse = await authService.signin(credential)
    setUsername(username)
    setToken(token)
  }

  const signout = () => {
    return authService.signout().then(() => {
      setToken('')
    })
  }

  // The value object that contains the authentication token and functions
  const value = { username, token, signin, signout }

  // Return the provider component with the value object as the value prop
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return React.useContext(AuthContext)
}
