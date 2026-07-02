import { ref } from "vue"
import { defineStore } from "pinia"
import { checkout as checkoutAPI } from "../services/checkoutService"
import type { CartItem } from "../types/cart"
import type { Receipt } from "../types/receipt"

type CheckoutResult =
  | { ok: true }
  | { ok: false; message: string }

export const useCheckoutStore = defineStore("checkout", () => {
  const loading = ref(false)
  const error = ref<string | null>(null)

  const receipt = ref<Receipt | null>(null)
  const showReceipt = ref(false)

  async function processCheckout(payload: {
    items: CartItem[]
    total: number
  }): Promise<CheckoutResult> {
    if (!payload.items.length) {
      return { ok: false, message: "Empty cart" }
    }

    loading.value = true
    error.value = null

    try {
      const apiPayload = {
        items: payload.items.map(i => ({
          productId: i.product.id,
          qty: i.quantity,
        })),
        total: payload.total,
      }

      await checkoutAPI(apiPayload)

      receipt.value = {
        id: crypto.randomUUID().slice(0, 8).toUpperCase(),
        date: new Date().toLocaleString("id-ID"),
        items: payload.items.map(i => ({
          productId: i.product.id,
          name: i.product.name,
          price: i.product.price,
          qty: i.quantity,
        })),
        total: payload.total,
      }

      showReceipt.value = true

      return { ok: true }
    } catch (e: any) {
      const message = e?.message ?? "Checkout failed"
      error.value = message
      return { ok: false, message }
    } finally {
      loading.value = false
    }
  }

  function clearReceipt() {
    receipt.value = null
    showReceipt.value = false
    error.value = null
  }

  function closeReceipt() {
    showReceipt.value = false
  }

  return {
    loading,
    error,
    receipt,
    showReceipt,
    processCheckout,
    clearReceipt,
    closeReceipt,
  }
})