const BASE_URL = import.meta.env.VITE_API_BASE_URL

export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

const ProductsApi = {
  getProducts: async (): Promise<Product[]> => {
    return fetch(`${BASE_URL}/products`)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  },
  getProductsByCategory: async (category: string): Promise<Product[]> => {
    return fetch(`${BASE_URL}/products/category/${category}`)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  },
  getProductById: async (id: number): Promise<Product> => {
    return fetch(`${BASE_URL}/products/${id}`)
      .then((response) => response.json())
      .catch((error) => console.error(error))
  },
  addProduct: async (product: Product): Promise<Product> => {
    return fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error))
  },
  updateProduct: async (id: number, product: Product): Promise<Product> => {
    return fetch(`${BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .catch((error) => console.error(error))
  },
  deleteProduct: async (id: number) => {
    return fetch(`${BASE_URL}/products/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .catch((error) => console.error(error))
  },
}

export default ProductsApi
