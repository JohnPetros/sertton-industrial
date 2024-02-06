import { IHttpProvider } from '../../http/interfaces/IHttp'
import { yampiSkuAdapter } from '../adapters/yampiSkuAdapter'
import { YampiSku } from '../types/YampiSku'

import { ISkusController } from '@/services/api/interfaces/ISkusService'
import { Endpoints } from '@/services/api/yampi/utils/endpoints'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiSkusController(http: IHttpProvider): ISkusController {
  return {
    async getSkusByProductId(productId: string) {
      const response = await http.get<{ data: YampiSku[] }>(
        `/${Resources.CATALOG}/${Endpoints.PRODUCT}/${productId}/${Endpoints.SKU}?include=images`
      )
      return response.data.map(yampiSkuAdapter)
    },
  }
}
