const BASE_URL = import.meta.env.VITE_API_BASE_URL

interface AuthPayload {
  username: string
  password: string
}

const AuthApi = {
  login: async (data: AuthPayload): Promise<{ token: string }> => {
    return fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error))
  },
}

export default AuthApi
