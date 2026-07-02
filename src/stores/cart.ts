import { computed, ref, watch } from "vue"
import { defineStore } from "pinia"

import type { CartItem } from "../types/cart"
import type { Product } from "../types/product"
import { checkout } from "../services/checkoutService"

export const useCartStore = defineStore("cart", () => {
  const loadingCheckout = ref(false)
  const checkoutError = ref("")
  const checkoutSuccess = ref(false)

  const items = ref<CartItem[]>([])

  // Load cart from localStorage
  const savedCart = localStorage.getItem("cart")

  if (savedCart) {
    items.value = JSON.parse(savedCart)
  }

  // Persist cart
  watch(
    items,
    () => {
      localStorage.setItem("cart", JSON.stringify(items.value))
    },
    {
      deep: true,
    }
  )

  // ==========================
  // Getters
  // ==========================

  const total = computed(() =>
    items.value.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    )
  )

  const totalItems = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  // ==========================
  // Actions
  // ==========================

  function addToCart(product: Product) {
    const existing = items.value.find(
      item => item.product.id === product.id
    )

    if (existing) {
      if (existing.quantity >= product.stock) return

      existing.quantity++
      return
    }

    items.value.push({
      product,
      quantity: 1,
    })
  }

  function increase(id: string) {
    const item = items.value.find(
      item => item.product.id === id
    )

    if (!item) return

    if (item.quantity >= item.product.stock) return

    item.quantity++
  }

  function decrease(id: string) {
    const item = items.value.find(
      item => item.product.id === id
    )

    if (!item) return

    if (item.quantity === 1) {
      remove(id)
      return
    }

    item.quantity--
  }

  function remove(id: string) {
    items.value = items.value.filter(
      item => item.product.id !== id
    )
  }

  function clear() {
    items.value = []
      console.log("CLEAR CALLED")

  }

  async function checkoutCart() {
    if (!items.value.length) {
      return {
        success: false,
        message: "Cart is empty.",
      }
    }

    loadingCheckout.value = true
    checkoutSuccess.value = false
    checkoutError.value = ""

    try {
      const payload = {
        items: items.value.map(item => ({
          productId: item.product.id,
          qty: item.quantity,
        })),
        total: total.value,
      }

      await checkout(payload)

      return {
        success: true,
        message: "Checkout successful.",
      }

    } catch (error) {
      console.error(error)

      checkoutError.value = "Checkout failed."

      return {
        success: false,
        message: checkoutError.value,
      }
    } finally {
      loadingCheckout.value = false
    }
  }

  return {
    // state
    items,
    loadingCheckout,
    checkoutError,
    checkoutSuccess,

    // getters
    total,
    totalItems,

    // actions
    addToCart,
    increase,
    decrease,
    remove,
    clear,
    checkoutCart,
  }
})