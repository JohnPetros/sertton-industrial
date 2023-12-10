import type { Address } from '@/@types/address'

export type Customer = {
  id: string
  type: 'f' | 'j'
  name?: string
  cpf?: string
  cnpj?: string
  email: string
  razao_social?: string
  active: boolean
  homephone: string
  addresses?: {
    data: Address[]
  }
}
