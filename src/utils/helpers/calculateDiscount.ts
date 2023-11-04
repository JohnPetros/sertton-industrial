export function calculateDiscount(discountPrice: number, salesPrice: number) {
  return Math.floor(((salesPrice - discountPrice) / salesPrice) * 100)
}
