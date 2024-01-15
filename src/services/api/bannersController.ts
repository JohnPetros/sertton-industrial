import type { Banner } from '@/@types/banner'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Endpoints } from '@/services/api/config/endpoints'
import { Resources } from '@/services/api/config/resources'
import { IBannersController } from '@/services/api/interfaces/IBannersController'

export function bannersController(api: IApiProvider): IBannersController {
  return {
    async getBanners() {
      const response = await api.get<{ data: Banner[] }>(
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
