export const VALIDATION_ERRORS = {
  required: 'Campo obrigatório',
  fullname: {
    regex: 'Digite seu nome completo e sem espaço no final',
  },
  email: {
    regex: 'Digite um e-mail válido',
    inUse: 'E-mail já utilizado por outro usuário',
  },
  cpf: {
    length: 'Deve conter 11 dígitos',
    inUse: 'CPF já utilizado por outro usuário',
  },
  cnpj: {
    length: 'Deve conter 14 dígitos',
    inUse: 'CNPJ já utilizado por outro usuário',
  },
  phone: {
    length: 'Deve conter 11 números',
  },
  creditCardNumber: {
    length: 'Deve conter 11 números',
  },
  creditCardSecurityCode: {
    min: 'Dever conter pelo menos 3 dígitos',
    max: 'Dever conter no máximo 4 dígitos',
  },
  creditCardExpirationDate: {
    length: 'Digite no formato dd/yy',
  },
}
