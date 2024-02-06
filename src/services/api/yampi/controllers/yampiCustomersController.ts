import { IHttpProvider } from '../../http/interfaces/IHttp'

import type { Customer } from '@/@types/customer'
import {
  CreateCustomerRequest,
  ICustomersController,
} from '@/services/api/interfaces/ICustomersController'
import { Resources } from '@/services/api/yampi/utils/resources'

export function yampiCustomersController(
  http: IHttpProvider
): ICustomersController {
  return {
    async createCustomer(customer: CreateCustomerRequest) {
      await http.post(`/${Resources.CUSTOMERS}`, customer)
    },

    async getCustomerByEmail(email: string): Promise<Customer | null> {
      const response = await http.get<{ data: Customer[] }>(
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
      const response = await http.get<{ data: Customer[] }>(
        `/${Resources.CUSTOMERS}?q=${document}`
      )

      return !!response.data[0]
    },

    async updateCustomerById(customerId: number, customerNewData: Customer) {
      await http.put(`/${Resources.CUSTOMERS}/${customerId}`, customerNewData)
    },
  }
}
