import { beforeEach, describe, expect, it } from "vitest"
import { createPinia, setActivePinia } from "pinia"

import { useCartStore } from "./cart"
import type { Product } from "../types/product"

const product: Product = {
  id: "1",
  name: "Burger",
  image: "/burger.png",
  price: 25000,
  stock: 3,
  category: "food",
}

describe("Cart Store", () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
  })

  it("adds product into cart", () => {
    const cart = useCartStore()

    const result = cart.addToCart(product)

    expect(result.ok).toBe(true)
    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(1)
  })

  it("increases quantity when adding same product", () => {
    const cart = useCartStore()

    cart.addToCart(product)
    cart.addToCart(product)

    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(2)
  })

  it("prevents quantity from exceeding stock", () => {
    const cart = useCartStore()

    cart.addToCart(product)
    cart.addToCart(product)
    cart.addToCart(product)

    const result = cart.addToCart(product)

    expect(result).toEqual({
      ok: false,
      reason: "LIMIT_REACHED",
    })

    expect(cart.items[0].quantity).toBe(3)
  })

  it("increases quantity", () => {
    const cart = useCartStore()

    cart.addToCart(product)

    const result = cart.increase(product.id)

    expect(result.ok).toBe(true)
    expect(cart.items[0].quantity).toBe(2)
  })

  it("returns ITEM_NOT_FOUND when increasing unknown item", () => {
    const cart = useCartStore()

    const result = cart.increase("unknown")

    expect(result).toEqual({
      ok: false,
      reason: "ITEM_NOT_FOUND",
    })
  })

  it("decreases quantity", () => {
    const cart = useCartStore()

    cart.addToCart(product)
    cart.addToCart(product)

    cart.decrease(product.id)

    expect(cart.items[0].quantity).toBe(1)
  })

  it("removes item when decreasing quantity from one", () => {
    const cart = useCartStore()

    cart.addToCart(product)

    cart.decrease(product.id)

    expect(cart.items).toHaveLength(0)
  })

  it("removes item", () => {
    const cart = useCartStore()

    cart.addToCart(product)

    cart.remove(product.id)

    expect(cart.items).toHaveLength(0)
  })

  it("calculates total", () => {
    const cart = useCartStore()

    cart.addToCart(product)
    cart.addToCart(product)

    expect(cart.total).toBe(50000)
  })

  it("calculates total items", () => {
    const cart = useCartStore()

    cart.addToCart(product)
    cart.addToCart(product)

    expect(cart.totalItems).toBe(2)
  })

  it("clears cart", () => {
    const cart = useCartStore()

    cart.addToCart(product)

    cart.clear()

    expect(cart.items).toHaveLength(0)
    expect(localStorage.getItem("cart")).toBeNull()
  })

  it("loads cart from localStorage", () => {
    localStorage.setItem(
        "cart",
        JSON.stringify([
        {
            product,
            quantity: 2,
        },
        ])
    )

    setActivePinia(createPinia())

    const cart = useCartStore()

    expect(cart.items).toHaveLength(1)
    expect(cart.items[0].quantity).toBe(2)
    })

    it("handles invalid localStorage", () => {
    localStorage.setItem("cart", "invalid-json")

    setActivePinia(createPinia())

    const cart = useCartStore()

    expect(cart.items).toEqual([])
    })

    it("prevents increase when quantity reaches stock", () => {
        const cart = useCartStore()

        const product = {
            id: "1",
            name: "Burger",
            price: 25000,
            stock: 1,
            category: "food",
            image: "/burger.png",
        } as const

        cart.addToCart(product)

        const result = cart.increase(product.id)

        expect(result).toEqual({
            ok: false,
            reason: "LIMIT_REACHED",
        })

        expect(cart.items[0].quantity).toBe(1)
        })
})