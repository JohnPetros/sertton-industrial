import { useRef } from 'react'
import { Buildings, User } from 'phosphor-react-native'
import { YStack } from 'tamagui'

import { Heading } from '@/components/CheckoutForm/Heading'
import { LegalPersonForm } from '@/components/CheckoutForm/LegalPersonForm'
import { NaturalPersonForm } from '@/components/CheckoutForm/NaturalPersonForm'
import { Tabs } from '@/components/Tabs'
import { LegalPersonFormFields, NaturalPersonFormFields } from '@/libs/zod'
import { useApi } from '@/services/api'
import { getOnlyNumbers } from '@/utils/helpers/getOnlyNumbers'

export type PersonFormData = {
  naturalPerson: NaturalPersonFormFields
  legalPerson: LegalPersonFormFields
}

export function Step1() {
  const personFormData = useRef<PersonFormData>({
    naturalPerson: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      cpf: '',
      phone: '',
    },
    legalPerson: {
      email: '',
      password: '',
      passwordConfirmation: '',
      phone: '',
      razaoSocial: '',
      cnpj: '',
    },
  })

  const api = useApi()

  async function handleSubmit(personType: 'legal' | 'natural') {
    console.log('submit')

    try {
      if (personType === 'natural') {
        const { naturalPerson } = personFormData.current
        await api.createCustomer({
          type: 'f',
          active: true,
          name: naturalPerson.name,
          email: naturalPerson.email,
          cpf: getOnlyNumbers(naturalPerson.cpf),
          homephone: getOnlyNumbers(naturalPerson.phone),
          password: naturalPerson.password,
          password_confirmation: naturalPerson.passwordConfirmation,
        })
      } else if (personType === 'legal') {
        const { legalPerson } = personFormData.current
        await api.createCustomer({
          type: 'j',
          active: true,
          razao_social: legalPerson.razaoSocial,
          cnpj: getOnlyNumbers(legalPerson.cnpj),
          email: legalPerson.email,
          homephone: getOnlyNumbers(legalPerson.phone),
          password: legalPerson.password,
          password_confirmation: legalPerson.passwordConfirmation,
        })
      }
    } catch (error) {
      // api.handleError(error)
    }
  }

  return (
    <YStack bg="$white" gap={24}>
      <Heading
        step={1}
        title="Identifique-se"
        subtitle="Utilizaremos seu e-mail para identificar seu perfil."
      />

      <Tabs
        label="Tipo de pessoa"
        tabs={[
          {
            title: 'Pessoa física',
            value: 'reviews',
            icon: User,
            size: 900,
            content: (
              <NaturalPersonForm
                onSubmit={handleSubmit}
                personFormData={personFormData}
              />
            ),
          },
          {
            title: 'Pessoa jurídica',
            value: 'questions',
            icon: Buildings,
            size: 900,
            content: (
              <LegalPersonForm
                onSubmit={handleSubmit}
                personFormData={personFormData}
              />
            ),
          },
        ]}
      />
    </YStack>
  )
}
