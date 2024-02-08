import type { Address } from '@/@types/address'
export interface IAddressesController {
  getAddressesByCustomerId(customerId: number): Promise<Address[]>
  getAddressByZipcode(
    zipcode: string
  ): Promise<Omit<Address, 'number' | 'receiver' | 'id'> | null>
  saveAddress(address: Omit<Address, 'id'>, customerId: number): Promise<void>
  updateAddress(address: Address, customerId: number): Promise<void>
  deleteAddress(addressId: number, customerId: number): Promise<void>
}
