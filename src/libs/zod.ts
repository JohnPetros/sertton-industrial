import { z } from 'zod'

import { REGEX } from '@/utils/constants/regex'

const nameSchema = z.string().min(1, 'Campo obrigatório')
const emailSchema = z.string().min(1, 'Campo obrigatório')
const cpfSchema = z
  .string()
  .min(1, 'Campo obrigatório')
  .regex(REGEX.cpf, 'CPF inválido')
const cnpjSchema = z
  .string()
  .min(1, 'Campo obrigatório')
  .regex(REGEX.cpf, 'CPF inválido')
const phoneSchema = z
  .string()
  .min(1, 'Campo obrigatório')
  .regex(REGEX.cpf, 'CPF inválido')

const razaoSocialSchema = z
  .string()
  .min(1, 'Campo obrigatório')
  .regex(REGEX.cpf, 'CPF inválido')

const naturalPersonFormSchema = z.object({
  name: nameSchema,
  cpf: cpfSchema,
  phone: phoneSchema,
})

const legalPersonFormSchema = z.object({
  razaoSocial: razaoSocialSchema,
  email: emailSchema,
  cnpj: cnpjSchema,
  phone: phoneSchema,
})

export type NaturalPersonFormFields = z.infer<typeof naturalPersonFormSchema>
export type LegalPersonFormFields = z.infer<typeof legalPersonFormSchema>

export { legalPersonFormSchema, naturalPersonFormSchema }
