export type ContactType = 'whatsapp' | 'landline' | 'email'

export type Contact = {
  type: ContactType
  value: string
}
