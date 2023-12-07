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
  ): Promise<Omit<Address, 'number' | 'receiver' | 'id'> | null>
  saveAddress(address: Omit<Address, 'id'>, customerId: number): Promise<void>
  updateAddress(address: Address, customerId: number): Promise<void>
  deleteAddress(addressId: number, customerId: number): Promise<void>
}
