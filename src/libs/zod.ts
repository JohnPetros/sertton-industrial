import { z } from 'zod'

import { REGEX } from '@/utils/constants/regex'

const nameSchema = z
  .string({
    required_error: 'Campo obrigatório',
  })
  .regex(REGEX.fullname, 'Digite seu nome completo')

const emailSchema = z
  .string({
    required_error: 'Campo obrigatório',
  })
  .regex(REGEX.email, 'E-mail inválido')

const cpfSchema = z.string({
  required_error: 'Campo obrigatório',
})

const cnpjSchema = z.string({
  required_error: 'Campo obrigatório',
})

const phoneSchema = z.string({
  required_error: 'Campo obrigatório',
})

const razaoSocialSchema = z.string({
  required_error: 'Campo obrigatório',
})

const passwordSchema = z
  .string({
    required_error: 'Campo obrigatório',
  })
  .regex(
    REGEX.password,
    'Senha deve conter pelo menos uma letra minúscula, uma maiúscula, um dígito e um caractere especial.'
  )

const passwordConfirmationSchema = z.string({
  required_error: 'Campo obrigatório',
})

const naturalPersonFormSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: passwordConfirmationSchema,
    cpf: cpfSchema,
    phone: phoneSchema,
  })
  .refine((fields) => fields.password === fields.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'As senhas precisam de iguais',
  })

const legalPersonFormSchema = z
  .object({
    razaoSocial: razaoSocialSchema,
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: passwordConfirmationSchema,
    cnpj: cnpjSchema,
    phone: phoneSchema,
  })
  .refine((fields) => fields.password === fields.passwordConfirmation, {
    path: ['passwordConfirmation'],
    message: 'As senhas precisam de iguais',
  })

export type NaturalPersonFormFields = z.infer<typeof naturalPersonFormSchema>
export type LegalPersonFormFields = z.infer<typeof legalPersonFormSchema>

export { legalPersonFormSchema, naturalPersonFormSchema }
