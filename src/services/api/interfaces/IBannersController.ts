import type { Banner } from '@/@types/banner'

export interface IBannersController {
  getBanners(): Promise<Banner[]>
}
