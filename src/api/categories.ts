const BASE_URL = import.meta.env.VITE_API_BASE_URL

const CategoriesApi = {
  getCategories: async (): Promise<string[]> => {
    return fetch(`${BASE_URL}/products/categories`)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  },
}

export default CategoriesApi
