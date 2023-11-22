import { Api } from '@/@types/api'
import { Product } from '@/@types/product'
import { Endpoints } from '@/services/api/endpoints'
import { IProductsService } from '@/services/api/interfaces/IProductsService'
import { Resources } from '@/services/api/resources'

export function productsService(api: Api): IProductsService {
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

      const response = await api.get<Product[]>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand${searchParam}${sorterParam}${categoryParam}${brandsIdsParam}&page=${page}&limit=20`
      )
      const { data, meta } = response.data
      return {
        products: data,
        totalPages: meta.pagination.total_pages,
      }
    },

    async getProductsByCollection(collectionId: number) {
      const response = await api.get<Product[]>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand&collection_id[]=${collectionId}`
      )
      const { data } = response.data

      return data
    },

    async getProductBySlug(slug: string) {
      const response = await api.get<Product[]>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand,texts&search=${slug}&searchFields=slug`
      )

      const { data } = response.data
      return data[0]
    },

    async getSimiliarProducts(id: string) {
      const response = await api.get<Product[]>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${id}/${Endpoints.SIMILAR}`
      )

      const { data } = response.data
      return data
    },
  }
}
