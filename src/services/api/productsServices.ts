import { Api } from '@/@types/api'
import { Product } from '@/@types/product'
import { Endpoints } from '@/services/api/endpoints'
import { IProductsService } from '@/services/api/interfaces/IProductsService'
import { Resources } from '@/services/api/resources'

export function productsService(api: Api): IProductsService {
  return {
    async getProducts({ page, sorter, category_id }) {
      const sorterParam = sorter
        ? `&orderBy=${sorter.type}&sortedBy=${sorter.order}`
        : ''

      const categoryParam = category_id ? `&category_id[]=${category_id}` : ''

      const response = await api.get<Product[]>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand&page=${page}${sorterParam}${categoryParam}`
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
  }
}
