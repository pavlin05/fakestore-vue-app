const BASE_URL = import.meta.env.VITE_API_BASE_URL

interface User {
  id: string
  name: string
  email: string
  password: string
}

const UserApi = {
  me: async (id: string): Promise<User> => {
    return fetch(`${BASE_URL}/users/${id}`)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  },
}

export default UserApi
