import { useToastStore } from "../stores/toast"

export function useAppToast() {
  const toast = useToastStore()

  return {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warning: toast.warning,
  }
}