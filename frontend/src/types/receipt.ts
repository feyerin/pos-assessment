export interface ReceiptItem {
  productId: string
  name: string
  price: number
  qty: number
}

export interface Receipt {
  id: string
  date: string
  items: ReceiptItem[]
  total: number
}