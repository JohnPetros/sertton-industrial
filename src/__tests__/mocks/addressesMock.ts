import { Address } from '@/@types/address'

export const addressesMock: Address[] = [
  {
    id: 1,
    receiver: 'John Doe',
    zip_code: '12345-678',
    street: 'Main St',
    number: '123',
    neighborhood: 'Downtown',
    complement: 'Apt 4',
    city: 'Cityville',
    uf: 'CA',
  },
  {
    id: 2,
    receiver: 'Jane Smith',
    zip_code: '98765-432',
    street: 'Broadway',
    number: '456',
    neighborhood: 'Uptown',
    city: 'Townsville',
    uf: 'NY',
  },
  // Adicione mais endereços conforme necessário
]
