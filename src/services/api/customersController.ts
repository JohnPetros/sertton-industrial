import type { Api } from '@/@types/api'
import type { Customer } from '@/@types/customer'
import { ICustomersController } from '@/services/api/interfaces/ICustomersController'
import { Resources } from '@/services/api/resources'

export function customersController(api: Api): ICustomersController {
  return {
    async createCustomer(customer: Customer) {
      await api.post(`/${Resources.CUSTOMERS}`, customer)
    },

    async getCustomerByEmail(email: string): Promise<Customer | null> {
      const response = await api.get<{ data: Customer[] }>(
        `/${Resources.CUSTOMERS}?q=${email}&includes=addresses`
      )

      const customerData = response.data[0]

      if (!customerData) {
        return null
      }

      const customer: Customer = {
        ...customerData,
        selectedAddressZipcode: null,
      }

      return customer
    },

    async checkCustomerDocument(document: string): Promise<boolean> {
      const response = await api.get<{ data: Customer[] }>(
        `/${Resources.CUSTOMERS}?q=${document}`
      )

      return !!response.data[0]
    },

    async updateCustomerById(customerId: number, customerNewData: Customer) {
      await api.put(`/${Resources.CUSTOMERS}/${customerId}`, customerNewData)
    },
  }
}
