import api from "../api/axios"
import type { Product } from "../types/product"

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get<Product[]>("/products")
  return data
}

