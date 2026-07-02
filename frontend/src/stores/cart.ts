import { computed, ref, watch } from "vue"
import { defineStore } from "pinia"
import type { CartItem } from "../types/cart"
import type { Product } from "../types/product"

type CartActionResult =
  | { ok: true }
  | { ok: false; reason: "OUT_OF_STOCK" | "LIMIT_REACHED" | "ITEM_NOT_FOUND" }

export const useCartStore = defineStore("cart", () => {
  const items = ref<CartItem[]>([])

  function initCart() {
    if (typeof window === "undefined") return

    const saved = localStorage.getItem("cart")
    if (!saved) return

    try {
      items.value = JSON.parse(saved)
    } catch {
      items.value = []
    }
  }

  initCart()

  watch(
    items,
    (val) => {
      if (typeof window === "undefined") return
      localStorage.setItem("cart", JSON.stringify(val))
    },
    { deep: true }
  )

  const total = computed(() =>
    items.value.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  )

  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0)
  )

  function findItem(id: string) {
    return items.value.find(i => i.product.id === id)
  }

  function addToCart(product: Product): CartActionResult {
    const existing = findItem(product.id)

    if (existing && existing.quantity >= product.stock) {
      return { ok: false, reason: "LIMIT_REACHED" }
    }

    if (existing) {
      existing.quantity++
      return { ok: true }
    }

    items.value.push({
      product,
      quantity: 1,
    })

    return { ok: true }
  }

  function increase(id: string): CartActionResult {
    const item = findItem(id)

    if (!item) {
      return { ok: false, reason: "ITEM_NOT_FOUND" }
    }

    if (item.quantity >= item.product.stock) {
      return { ok: false, reason: "LIMIT_REACHED" }
    }

    item.quantity++
    return { ok: true }
  }

  function decrease(id: string) {
    const item = findItem(id)

    if (!item) return

    if (item.quantity === 1) {
      remove(id)
      return
    }

    item.quantity--
  }

  function remove(id: string) {
    items.value = items.value.filter(i => i.product.id !== id)
  }

  function clear() {
    items.value = []
    if (typeof window !== "undefined") {
      localStorage.removeItem("cart")
    }
  }

  return {
    items,
    total,
    totalItems,
    addToCart,
    increase,
    decrease,
    remove,
    clear,
  }
})