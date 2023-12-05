import type { Customer } from '@/@types/customer'

export type CreateCustomerPayload = Omit<Customer, 'id'> & { active: boolean }
export interface ICustomersService {
  createCustomer(payload: CreateCustomerPayload): Promise<void>
}
