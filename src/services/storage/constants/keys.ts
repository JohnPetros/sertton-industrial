import { APP_PREFIX } from '@/utils/constants/app-prefix'

export const STORAGE = {
  id: '@sertton-industrial-storage',
  keys: {
    cart: `${APP_PREFIX}:cart`,
    customer: {
      email: `${APP_PREFIX}:customer.email`,
      selectedAddressZipcode: `${APP_PREFIX}:customer.selectedAddressZipcode`,
    },
  },
}
