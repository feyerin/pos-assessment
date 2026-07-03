import { beforeEach, describe, expect, it, vi } from "vitest"
import { createPinia, setActivePinia } from "pinia"
import type { Product } from "../types/product"

import { useProductStore } from "./product"
import { getProducts } from "../services/productService"

vi.mock("../services/productService", () => ({
  getProducts: vi.fn(),
}))


const mockProducts: Product[] = [
  {
    id: "1",
    name: "Burger",
    price: 25000,
    stock: 10,
    category: "food",
    image: "/burger.png",
  },
  {
    id: "2",
    name: "Coffee",
    price: 18000,
    stock: 8,
    category: "coffee",
    image: "/coffee.png",
  },
]

describe("Product Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  it("fetches products successfully", async () => {
    vi.mocked(getProducts).mockResolvedValue(mockProducts)

    const store = useProductStore()

    await store.fetchProducts()

    expect(store.products).toEqual(mockProducts)
    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
  })

  it("handles fetch error", async () => {
    vi.mocked(getProducts).mockRejectedValue(new Error("Network Error"))

    const store = useProductStore()

    await store.fetchProducts()

    expect(store.products).toEqual([])
    expect(store.loading).toBe(false)
    expect(store.error).toBe("Network Error")
  })

  it("filters by search", () => {
    const store = useProductStore()

    store.products = mockProducts
    store.search = "burger"

    expect(store.filteredProducts).toHaveLength(1)
    expect(store.filteredProducts[0].name).toBe("Burger")
  })

    it("filters by category", () => {
    const store = useProductStore()

    store.products = mockProducts
    store.category = "coffee"

    expect(store.filteredProducts).toHaveLength(1)
    expect(store.filteredProducts[0].name).toBe("Coffee")
    })

    it("combines search and category filters", () => {
    const store = useProductStore()

    store.products = mockProducts
    store.search = "coffee"
    store.category = "coffee"

    expect(store.filteredProducts).toHaveLength(1)
    expect(store.filteredProducts[0].name).toBe("Coffee")
    })

  it("returns all products when category is all", () => {
    const store = useProductStore()

    store.products = mockProducts
    store.category = "all"

    expect(store.filteredProducts).toHaveLength(2)
  })
})