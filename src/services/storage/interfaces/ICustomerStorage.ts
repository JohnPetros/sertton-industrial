export interface ICustomerStorage {
  getCustomerEmail: () => Promise<string>
  getCustomerSelectedAddressZipcode: () => Promise<string | null>
  setCustomerEmail: (email: string) => Promise<void>
  setCustomerSelectedAddressZipcode: (
    selectedAddressZipcode: string
  ) => Promise<void>
  removeCustomerSelectedAddressZipcode: () => Promise<void>
}
