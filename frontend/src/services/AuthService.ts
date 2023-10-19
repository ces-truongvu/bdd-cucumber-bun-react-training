export interface SignInResponse {
  username: string
  token: string
}

export interface AuthDTO {
  username: string
  password: string
}

interface AuthProvider {
  signin(credential: AuthDTO): Promise<SignInResponse>
  signout(): Promise<void>
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const authService: AuthProvider = {
  /**
   * Sign in a user with the provided credentials and return a token
   * @param credential - The user's authentication credentials
   * @returns A Promise that resolves to a token string
   */
  async signin(credential: AuthDTO): Promise<SignInResponse> {
    try {
      // Send a POST request to the sign-in endpoint
      const response = await fetch('/api/users/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credential)
      })

      if (!response.ok) {
        // Throw an error if the response status is not ok
        throw new Error('Login failed')
      }

      // Parse the response data
      const responseData = await response.json()
      // Return the token from the response data
      return responseData.data
    } catch (error) {
      // Throw a generic error if an exception occurs
      throw new Error('Login failed')
    }
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)) // fake delay
  }
}
