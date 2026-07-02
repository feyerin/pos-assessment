import api from "../api/axios"
import type { Product } from "../types/product"

class ProductService {
  async getProducts(): Promise<Product[]> {
    const { data } = await api.get("/products")
    return data
  }
}

export default new ProductService()