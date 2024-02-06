import { IHttpProvider } from '../../http/interfaces/IHttp'

import { Discount } from '@/@types/discount'
import { IDiscountsController } from '@/services/api/interfaces/IDiscountsController'
import { Endpoints } from '@/services/api/yampi/utils/endpoints'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiDiscountsController(
  http: IHttpProvider
): IDiscountsController {
  return {
    async getDiscounts() {
      const response = await http.get<{ data: Discount[] }>(
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
