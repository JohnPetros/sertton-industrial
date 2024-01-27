import { IHttpProvider } from '../../http/interfaces/IHttp'
import { ICheckoutController } from '../../interfaces/ICheckoutController'

import type { PaymentConfig } from '@/@types/paymentMethod'
import { Resources } from '@/services/api/yampi/config/resources'

export function checkoutController(http: IHttpProvider): ICheckoutController {
  return {
    async getPaymentConfigs() {
      const response = await http.get<{ data: PaymentConfig[] }>(
        `/${Resources.CHECKOUT}/payments`
      )

      const paymentConfigs: PaymentConfig[] = response.data.map(
        (paymentConfig) => ({
          id: paymentConfig.id,
          name: paymentConfig.name,
          alias: paymentConfig.alias,
          has_config: paymentConfig.has_config,
          active_config: paymentConfig.active_config,
          is_credit_card: paymentConfig.is_credit_card,
          is_deposit: paymentConfig.is_deposit,
          is_billet: paymentConfig.is_billet,
          is_pix: paymentConfig.is_pix,
          is_pix_in_installments: paymentConfig.is_pix_in_installments,
          is_wallet: paymentConfig.is_wallet,
          icon_url: paymentConfig.icon_url,
        })
      )

      return paymentConfigs
    },
  }
}
