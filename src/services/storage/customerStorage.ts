import type { IStorageProvider } from '@/providers/interfaces/IStorageProvider'
import { CUSTOMER_KEY } from '@/services/storage/config/keys'
import { ICustomerStorage } from '@/services/storage/interfaces/ICustomerStorage'

export function customerStorage(storage: IStorageProvider): ICustomerStorage {
  return {
    async getCustomerEmail() {
      const email = await storage.get(CUSTOMER_KEY.email)
      return email ?? ''
    },

    async getCustomerSelectedAddressZipcode() {
      const selectedAddressZipcode = await storage.get(
        CUSTOMER_KEY.selectedAddressZipcode
      )

      return selectedAddressZipcode ?? null
    },

    async setCustomerEmail(email: string) {
      await storage.set(CUSTOMER_KEY.email, String(email))
    },

    async setCustomerSelectedAddressZipcode(selectedAddressZipcode: string) {
      await storage.set(
        CUSTOMER_KEY.selectedAddressZipcode,
        selectedAddressZipcode
      )
    },
  }
}
