import { Customer } from '@/@types/customer'
import { addressesMock } from '@/tests/mocks/addressesMock'

export const customerMock: Customer = {
  id: 1,
  type: 'f',
  name: 'John Doe',
  cpf: '123.456.789-01',
  email: 'john.doe@example.com',
  active: true,
  homephone: '1234567890',
  addresses: {
    data: addressesMock,
  },
  phone: {
    full_number: '1234567890',
  },
  selectedAddressZipcode: '12345',
}
