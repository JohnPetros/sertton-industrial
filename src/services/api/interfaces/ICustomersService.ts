import type { Customer } from '@/@types/customer'

export interface ICustomersService {
  createCustomer(customer: Customer): Promise<void>
}
