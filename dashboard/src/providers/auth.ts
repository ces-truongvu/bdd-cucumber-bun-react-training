import { AuthDTO } from './AuthContext'

interface AuthProvider {
  signin(credential: AuthDTO): Promise<string>
  signout(): Promise<void>
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const authProvider: AuthProvider = {
  async signin(credential: AuthDTO): Promise<string> {
    try {
      const response = await fetch('/api/users/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credential)
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const responseData = await response.json()
      authProvider.isAuthenticated = true
      authProvider.token = responseData.data.token

      return responseData.data.token
    } catch (error) {
      throw new Error('Login failed')
    }
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)) // fake delay
  }
}
