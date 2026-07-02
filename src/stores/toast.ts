import { defineStore } from "pinia"

export type ToastType = "success" | "error" | "info" | "warning"

export interface ToastItem {
  id: string
  message: string
  type: ToastType
}

export const useToastStore = defineStore("toast", {
  state: () => ({
    toasts: [] as ToastItem[],
  }),

  actions: {
    addToast(message: string, type: ToastType = "info") {
      const id = crypto.randomUUID()

      this.toasts.push({
        id,
        message,
        type,
      })

      setTimeout(() => {
        this.removeToast(id)
      }, 3000)
    },

    removeToast(id: string) {
      this.toasts = this.toasts.filter(t => t.id !== id)
    },

    success(message: string) {
      this.addToast(message, "success")
    },

    error(message: string) {
      this.addToast(message, "error")
    },

    info(message: string) {
      this.addToast(message, "info")
    },

    warning(message: string) {
      this.addToast(message, "warning")
    },
  },
})