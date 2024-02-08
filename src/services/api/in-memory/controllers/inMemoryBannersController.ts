import { IBannersController } from '../../interfaces/IBannersController'

import { bannersMock } from '@/_tests_/mocks/bannersMock'
import type { Banner } from '@/@types/banner'

export function inMemoryBannersController(): IBannersController {
  const banners: Banner[] = bannersMock

  return {
    async getBanners() {
      return banners
    },
  }
}
