export type Customer = {
  id: number
  type: 'f' | 'j'
  name?: string
  cpf?: string
  cnpj?: string
  email: string
  razao_social?: string
  active: boolean
  password: string
  password_confirmation: string
  homephone: string
}
