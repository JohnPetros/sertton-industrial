export type Review = {
  product_id: number
  name: string
  email: string
  approved: false
  rating: number
  message: string
  updated_at: {
    date: string
  }
}
