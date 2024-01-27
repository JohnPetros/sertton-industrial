import { IHttpProvider } from '../../http/interfaces/IHttp'

import type { Banner } from '@/@types/banner'
import { IBannersController } from '@/services/api/interfaces/IBannersController'
import { Endpoints } from '@/services/api/yampi/config/endpoints'
import { Resources } from '@/services/api/yampi/config/resources'

export function bannersController(http: IHttpProvider): IBannersController {
  return {
    async getBanners() {
      const response = await http.get<{ data: Banner[] }>(
        `/${Resources.MARKETING}/${Endpoints.BANNER}`
      )

      const banners: Banner[] = response.data.map((banner) => ({
        id: banner.id,
        image_url: banner.image_url,
        link: banner.link,
        mobile_image_url: banner.mobile_image_url,
      }))

      return banners
    },
  }
}
