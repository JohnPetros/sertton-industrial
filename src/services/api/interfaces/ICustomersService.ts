import type { Customer } from '@/@types/customer'

export type CreateCustomerRequest = Omit<Customer, 'id'> & { active: boolean }
export interface ICustomersController {
  createCustomer(request: CreateCustomerRequest): Promise<void>
  getCustomerByEmail(email: string): Promise<Customer>
}
