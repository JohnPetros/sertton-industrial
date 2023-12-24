import { Discount } from '@/@types/discount'

export interface IDiscountsController {
  getDiscounts(): Promise<Discount[]>
}
