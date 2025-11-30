const BASE_URL = import.meta.env.VITE_API_BASE_URL

interface AuthPayload {
  username: string
  password: string
}

const AuthApi = {
  login: async (data: AuthPayload): Promise<{ token: string }> => {
    const response = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    const text = await response.text()
    if (!response.ok) {
      throw new Error(text || 'Login failed')
    }
    return JSON.parse(text)
  },
}

export default AuthApi
