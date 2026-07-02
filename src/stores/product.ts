import { defineStore } from "pinia"
import { computed, ref } from "vue"

import type { Product } from "../types/product"
import productService from "../services/productService"

export const useProductStore = defineStore("product", () => {
  const products = ref<Product[]>([])
  const loading = ref(false)
  const error = ref("")
  const search = ref("")
  const category = ref("all")

  const filteredProducts = computed(() => {
    return products.value.filter((p) => {
      const matchSearch = p.name
        .toLowerCase()
        .includes(search.value.toLowerCase())

      const matchCategory =
        category.value === "all" ||
        p.category === category.value

      return matchSearch && matchCategory
    })
  })

  const fetchProducts = async () => {
    loading.value = true
    error.value = ""

    try {
      products.value = await productService.getProducts()
    } catch (err) {
      error.value = "Failed to fetch products."
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    filteredProducts,
    search,
    error,
    category,
    fetchProducts,
  }
})