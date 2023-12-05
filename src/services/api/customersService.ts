import type { Api } from '@/@types/api'
import {
  CreateCustomerPayload,
  ICustomersService,
} from '@/services/api/interfaces/ICustomersService'
import { Resources } from '@/services/api/resources'

export function customersService(api: Api): ICustomersService {
  return {
    async createCustomer(customer: CreateCustomerPayload) {
      const response = await api.post<CreateCustomerPayload, void>(
        `/${Resources.CUSTOMERS}`,
        customer
      )

      console.log(customer)
    },
  }
}
