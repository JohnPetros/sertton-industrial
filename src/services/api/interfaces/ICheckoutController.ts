import type { PaymentConfig } from '@/@types/paymentMethod'

export interface ICheckoutController {
  getPaymentConfigs(): Promise<PaymentConfig[]>
}
