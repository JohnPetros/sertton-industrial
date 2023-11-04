import { Api } from '@/@types/api'
import { Product } from '@/@types/product'
import { Endpoints } from '@/services/api/endpoints'
import { IProductsService } from '@/services/api/interfaces/IProductsService'
import { Resources } from '@/services/api/resources'

export function productsService(api: Api): IProductsService {
  return {
    async getProductsByCollection(collectionId: number) {
      const response = await api.get<Product[]>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?collection_id[]=${collectionId}&include=images,skus`
      )
      const { data } = response.data
      return data
    },
  }
}
