import { PaymentConfig } from '@/@types/paymentMethod'

export const paymentConfigsMock: PaymentConfig[] = [
  {
    id: 1,
    name: 'Credit Card',
    alias: 'CC',
    has_config: true,
    active_config: true,
    is_credit_card: true,
    is_deposit: false,
    is_billet: false,
    is_pix: false,
    is_pix_in_installments: false,
    is_wallet: false,
    icon_url: 'https://www.svgrepo.com/show/85091/random.svg',
  },
  {
    id: 2,
    name: 'Bank Deposit',
    alias: 'BD',
    has_config: true,
    active_config: true,
    is_credit_card: false,
    is_deposit: true,
    is_billet: false,
    is_pix: false,
    is_pix_in_installments: false,
    is_wallet: false,
    icon_url: 'https://www.svgrepo.com/show/85091/random.svg',
  },
]
