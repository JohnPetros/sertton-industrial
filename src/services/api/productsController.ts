import type { Api } from '@/@types/api'
import type { Meta } from '@/@types/meta'
import type { Product } from '@/@types/product'
import { Endpoints } from '@/services/api/endpoints'
import { IProductsController } from '@/services/api/interfaces/IProductsService'
import { Resources } from '@/services/api/resources'

export function productsController(api: Api): IProductsController {
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

      const response = await api.get<{ data: Product[]; meta: Meta }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand${searchParam}${sorterParam}${categoryParam}${brandsIdsParam}&page=${page}&limit=20`
      )
      const { data, meta } = response

      return {
        products: data,
        totalPages: meta.pagination.total_pages,
      }
    },

    async getProductsByCollection(collectionId: number) {
      const response = await api.get<{ data: Product[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand&collection_id[]=${collectionId}`
      )
      return response.data
    },

    async getProductBySlug(slug: string) {
      const response = await api.get<{ data: Product[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand,texts&search=${slug}&searchFields=slug`
      )

      return response.data[0]
    },

    async getSimiliarProducts(id: string) {
      const response = await api.get<{ data: Product[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${id}/${Endpoints.SIMILAR}?include=images,skus,brand,`
      )

      return response.data
    },
  }
}
