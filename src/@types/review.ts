export type Review = {
  product_id: number
  name: string
  email: string
  approved: false
  rating: 1 | 2 | 3 | 4 | 5
  message: string
}
