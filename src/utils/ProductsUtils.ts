import { type Product, SortOrderEnum } from '@/api/products.ts'

const ProductsUtils = {
  sortProducts: (products: Product[], sortOrder: SortOrderEnum) => {
    const sorted = [...products]
    switch (sortOrder) {
      case SortOrderEnum.PriceAsc:
        return sorted.sort((a, b) => a.price - b.price)
      case SortOrderEnum.PriceDesc:
        return sorted.sort((a, b) => b.price - a.price)
      case SortOrderEnum.NameAsc:
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case SortOrderEnum.NameDesc:
        return sorted.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return sorted
    }
  },
}

export default ProductsUtils
