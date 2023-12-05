import type { Api } from '@/@types/api'
import type { Customer } from '@/@types/customer'
import { Endpoints } from '@/services/api/endpoints'
import { ICustomersService } from '@/services/api/interfaces/ICustomersService'
import { Resources } from '@/services/api/resources'

export function customersService(api: Api): ICustomersService {
  return {
    async createCustomer(customer: Customer) {
      await api.post<Customer, void>(
        `/${Resources.CATALOG}/${Endpoints.CUSTOMERS}`,
        customer
      )
    },
  }
}
