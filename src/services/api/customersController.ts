import type { Api } from '@/@types/api'
import type { Customer } from '@/@types/customer'
import {
  CreateCustomerRequest,
  ICustomersController,
} from '@/services/api/interfaces/ICustomersService'
import { Resources } from '@/services/api/resources'

export function customersController(api: Api): ICustomersController {
  return {
    async createCustomer(customer: Customer) {
      await api.post(`/customers`, customer)
    },

    async getCustomerByEmail(email: string): Promise<Customer> {
      const response = await api.get<{ data: Customer[] }>(
        `/${Resources.CUSTOMERS}?q=${email}&includes=addresses`
      )

      return response.data[0]
    },
  }
}
