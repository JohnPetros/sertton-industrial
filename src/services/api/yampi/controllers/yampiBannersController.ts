import { yampiBannerAdapter } from '../adapters/yampiBannerAdapter'
import type { YampiBanner } from '../types/YampiBanner'

import { IBannersController } from '@/services/api/interfaces/IBannersController'
import { Endpoints } from '@/services/api/yampi/utils/endpoints'
import { Resources } from '@/services/api/yampi/utils/resources'
import { IHttp } from '../../http/interfaces/IHttp'

export function yampiBannersController(
  http: IHttp
): IBannersController {
  return {
    async getBanners() {
      const response = await http.get<{ data: YampiBanner[] }>(
        `/${Resources.MARKETING}/${Endpoints.BANNER}`
      )

      return response.data.map(yampiBannerAdapter)
    },
  }
}
