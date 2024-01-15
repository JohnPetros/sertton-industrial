import type { Customer } from '@/@types/customer'
import type { IApiProvider } from '@/providers/interfaces/IApiProvider'
import { Resources } from '@/services/api/config/resources'
import {
  CreateCustomerRequest,
  ICustomersController,
} from '@/services/api/interfaces/ICustomersController'

export function customersController(api: IApiProvider): ICustomersController {
  return {
    async createCustomer(customer: CreateCustomerRequest) {
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
