export type CheckoutPayload = {
  items: {
    productId: string
    qty: number
  }[]
  total: number
}