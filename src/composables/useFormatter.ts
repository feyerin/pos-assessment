import {
  currencyFormatter,
  numberFormatter,
} from "../utils/formatter"

export function useFormatter() {
  const formatCurrency = (value: number) =>
    currencyFormatter.format(value)

  const formatNumber = (value: number) =>
    numberFormatter.format(value)

  return {
    formatCurrency,
    formatNumber,
  }
}