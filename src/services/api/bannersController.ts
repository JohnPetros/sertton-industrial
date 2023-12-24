import type { Api } from '@/@types/api'
import type { Banner } from '@/@types/banner'
import { Endpoints } from '@/services/api/endpoints'
import { IBannersController } from '@/services/api/interfaces/IBannersController'
import { Resources } from '@/services/api/resources'

export function bannersController(api: Api): IBannersController {
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
