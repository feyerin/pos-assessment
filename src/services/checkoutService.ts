import api from "../api/axios"
import type { AxiosError } from "axios"

export type CheckoutPayload = {
  items: {
    productId: string
    qty: number
  }[]
  total: number
}

export const checkout = async (payload: CheckoutPayload) => {
  try {
    console.log("🚀 Sending payload:", payload)

    const response = await api.post("/checkout", payload)

    console.log("✅ Response:", response)

    return response.data
  } catch (err) {
    const error = err as AxiosError

    console.error("❌ AXIOS ERROR")
    console.error("Status:", error.response?.status)
    console.error("Response:", error.response?.data)
    console.error(error)

    throw error
  }
}