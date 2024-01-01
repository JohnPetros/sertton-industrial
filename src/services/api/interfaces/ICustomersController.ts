import type { Customer } from '@/@types/customer'

export type CreateCustomerRequest = Omit<Customer, 'id' | 'addresses'> & {
  active: boolean
}
export interface ICustomersController {
  createCustomer(request: CreateCustomerRequest): Promise<void>
  updateCustomerById(
    customerId: number,
    customerNewData: Customer
  ): Promise<void>
  getCustomerByEmail(email: string): Promise<Customer | null>
  checkCustomerDocument(document: string): Promise<boolean>
}
