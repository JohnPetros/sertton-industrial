import type { Address } from '@/@types/address'

export type PersonType = 'natural' | 'legal'

export type Customer = {
  id: number
  personType: PersonType
  email: string
  name?: string
  cpf?: string
  cnpj?: string
  razaoSocial?: string
  active: boolean
  addresses: Address[]
  phone: string | null
  selectedAddressZipcode?: string | null
}
