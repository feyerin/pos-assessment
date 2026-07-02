import api from "../api/axios"
import type { CheckoutPayload } from "../types/checkout"

export const checkout = async (payload: CheckoutPayload) => {
  const response = await api.post("/checkout", payload)
  return response.data
}