import { addressesMock } from '@/_tests_/mocks/addressesMock'
import { Customer } from '@/@types/customer'

export const customerMock: Customer = {
  id: 1,
  type: 'f',
  name: 'John Doe',
  cpf: '12345678901',
  cnpj: '12345678901',
  email: 'john.doe@example.com',
  active: true,
  homephone: '1234567890',
  razao_social: 'Razão social Dahora',
  addresses: {
    data: addressesMock,
  },
  phone: {
    full_number: '1234567890',
  },
  selectedAddressZipcode: '12345',
}
