import { Api } from '@/@types/api'
import { Product } from '@/@types/product'
import { Endpoints } from '@/services/api/endpoints'
import { IProductsService } from '@/services/api/interfaces/IProductsService'
import { Resources } from '@/services/api/resources'

export function productsService(api: Api): IProductsService {
  return {
    async getProducts({ page, search, sorter, categoryId }) {
      const sorterParam = sorter
        ? `&orderBy=${sorter.type}&sortedBy=${sorter.order}`
        : ''

      const searchParam = search ? `&search=${search}&searchFields=name` : ''

      const categoryParam = categoryId ? `&category_id[]=${categoryId}` : ''

      const response = await api.get<Product[]>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand${searchParam}${sorterParam}${categoryParam}&page=${page}`
      )
      const { data } = response.data
      return data
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
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand&search=${slug}&searchFields=slug`
      )

      const { data } = response.data
      return data[0]
    },
  }
}