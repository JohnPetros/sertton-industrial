import { Discount } from '@/@types/discount'
import { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Endpoints } from '@/services/api/config/endpoints'
import { Resources } from '@/services/api/config/resources'
import { IDiscountsController } from '@/services/api/interfaces/IDiscountsController'

export function discountsController(api: IApiProvider): IDiscountsController {
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
