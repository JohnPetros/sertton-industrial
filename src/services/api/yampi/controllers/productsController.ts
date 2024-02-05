import { YampiProduct } from '../types/YampiProduct'

import type { Meta } from '@/@types/meta'
import type { Product } from '@/@types/product'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { IProductsController } from '@/services/api/interfaces/IProductsService'
import { Endpoints } from '@/services/api/yampi/config/endpoints'
import { Resources } from '@/services/api/yampi/config/resources'

export function productsController(api: IApiProvider): IProductsController {
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

      const response = await api.get<{ data: YampiProduct[]; meta: Meta }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}?include=images,skus,brand${searchParam}${sorterParam}${categoryParam}${brandsIdsParam}&page=${page}&limit=20`
      )
      const { data, meta } = response

      // const products: Product[] = data.map((product) => ({
      //   id: product.id,
      //   name: product.name,
      //   images: product.images,
      //   sku: product.sku,
      //   slug: product.slug,
      //   description: product.texts.data.description,
      //   specifications: product.texts.data.specifications,
      //   skus: product.skus.data.map((sku) => ({
      //     id: sku.id,
      //     id: sku.id,
      //   })),
      // }))

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
