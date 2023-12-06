import type { Storage } from '@/@types/storage'
import { ICustomerStorage } from '@/services/storage/interfaces/ICustomerStorage'
import { CUSTOMER_KEY } from '@/services/storage/keys'

export function customerStorage(storage: Storage): ICustomerStorage {
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
