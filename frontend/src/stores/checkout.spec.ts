import { beforeEach, describe, expect, it, vi } from "vitest"
import { createPinia, setActivePinia } from "pinia"

import { useCheckoutStore } from "./checkout"
import { checkout } from "../services/checkoutService"
import type { CartItem } from "../types/cart"

vi.mock("../services/checkoutService", () => ({
  checkout: vi.fn(),
}))

const items: CartItem[] = [
  {
    product: {
      id: "1",
      name: "Burger",
      price: 25000,
      stock: 10,
      category: "food",
      image: "/burger.png",
    },
    quantity: 2,
  },
]

const payload = {
  items,
  total: 50000,
}

describe("Checkout Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()

    vi.stubGlobal("crypto", {
      randomUUID: () => "12345678-1234",
    })
  })

  it("returns error when cart is empty", async () => {
    const store = useCheckoutStore()

    const result = await store.processCheckout({
      items: [],
      total: 0,
    })

    expect(result).toEqual({
      ok: false,
      message: "Empty cart",
    })

    expect(checkout).not.toHaveBeenCalled()
  })

  it("processes checkout successfully", async () => {
    vi.mocked(checkout).mockResolvedValue({})

    const store = useCheckoutStore()

    const result = await store.processCheckout(payload)

    expect(result).toEqual({
      ok: true,
    })

    expect(store.loading).toBe(false)
    expect(store.error).toBeNull()
    expect(store.showReceipt).toBe(true)

    expect(store.receipt).not.toBeNull()
    expect(store.receipt?.items).toHaveLength(1)
    expect(store.receipt?.total).toBe(50000)
  })

  it("handles checkout failure", async () => {
    vi.mocked(checkout).mockRejectedValue(new Error("Server Error"))

    const store = useCheckoutStore()

    const result = await store.processCheckout(payload)

    expect(result).toEqual({
      ok: false,
      message: "Server Error",
    })

    expect(store.loading).toBe(false)
    expect(store.error).toBe("Server Error")
    expect(store.receipt).toBeNull()
  })

  it("clears receipt", () => {
    const store = useCheckoutStore()

    store.receipt = {
      id: "ABC123",
      date: "today",
      items: [],
      total: 1000,
    }

    store.showReceipt = true
    store.error = "Error"

    store.clearReceipt()

    expect(store.receipt).toBeNull()
    expect(store.showReceipt).toBe(false)
    expect(store.error).toBeNull()
  })

  it("closes receipt", () => {
    const store = useCheckoutStore()

    store.showReceipt = true

    store.closeReceipt()

    expect(store.showReceipt).toBe(false)
  })

  it("uses default error message when error has no message", async () => {
    vi.mocked(checkout).mockRejectedValue({})

    const store = useCheckoutStore()

    const result = await store.processCheckout(payload)

    expect(result).toEqual({
        ok: false,
        message: "Something went wrong.",
    })

    expect(store.error).toBe("Something went wrong.")
    })
})