import { Api } from '@/@types/api'
import { Discount } from '@/@types/discount'
import { Endpoints } from '@/services/api/endpoints'
import { IDiscountsController } from '@/services/api/interfaces/IDiscountsController'
import { Resources } from '@/services/api/resources'

export function discountsController(api: Api): IDiscountsController {
  return {
    async getDiscounts() {
      const response = await api.get<{ data: Discount[] }>(
        `/${Resources.PRICING}/${Endpoints.DISCOUNT}`
      )

      const discounts: Discount[] = response.data.map((discount) => ({
        min_value: discount.min_value,
        max_value: discount.max_value,
        percent: discount.percent,
      }))

      return discounts
    },
  }
}
