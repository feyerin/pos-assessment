export interface Product {
  id: string
  name: string
  price: number
  stock: number
  image: string
  category: "food" | "drink" | "snack" | "dessert" | "pizza" | "coffee"
}