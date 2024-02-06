import { IHttpProvider } from '../../http/interfaces/IHttp'
import { yampiProductAdapter } from '../adapters/yampiProductAdapter'
import { YampiProduct } from '../types/YampiProduct'

import type { Meta } from '@/@types/meta'
import type { Product } from '@/@types/product'
import { IProductsController } from '@/services/api/interfaces/IProductsService'
import { Endpoints } from '@/services/api/yampi/utils/endpoints'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiProductsController(
  http: IHttpProvider
): IProductsController {
  return {
    async getProducts({ page, search, sorter, categoryId, brandsIds }) {
      const sorterParam = sorter
        ? `&orderBy=${sorter.type}&sortedBy=${sorter.order}`
        : ''

      const searchParam = search ? `&search=${search}&searchFields=name` : ''

      const categoryParam = categoryId ? `&category_id[]=${categoryId}` : ''

      const brandsIdsParam = brandsIds.length
        ? `&${brandsIds.map((id) => `brand_id[]=${id}`).join('&')}`
        : ''

      const response = await http.get<{ data: YampiProduct[]; meta: Meta }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand${searchParam}${sorterParam}${categoryParam}${brandsIdsParam}&page=${page}&limit=20`
      )
      const { data, meta } = response

      const products: Product[] = data.map(yampiProductAdapter)

      return {
        products,
        totalPages: meta.pagination.total_pages,
      }
    },

    async getProductsByCollection(collectionId: string) {
      const response = await http.get<{ data: YampiProduct[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand&collection_id[]=${collectionId}`
      )

      return response.data.map(yampiProductAdapter)
    },

    async getProductBySlug(slug: string) {
      const response = await http.get<{ data: YampiProduct[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand,texts&search=${slug}&searchFields=slug`
      )

      return yampiProductAdapter(response.data[0])
    },

    async getSimiliarProducts(id: string) {
      const response = await http.get<{ data: YampiProduct[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${id}/${Endpoints.SIMILAR}?include=images,skus,brand`
      )

      return response.data.map(yampiProductAdapter)
    },
  }
}
