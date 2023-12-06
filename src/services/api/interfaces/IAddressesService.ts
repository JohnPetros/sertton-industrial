import type { Address } from '@/@types/address'

export type GetAddressByZipcodeResponse = {
  cep: string
  logradouro: string
  complemento: string
  bairro: string
  localidade: string
  uf: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
  erro: boolean
}

export interface IAdressesController {
  getAddressesByCustomerId(customerId: number): Promise<Address[]>
  getAddressByZipcode(
    zipcode: string
  ): Promise<Omit<Address, 'number' | 'receiver'> | null>
}
