import { useRef } from 'react'
import { Buildings, User } from 'phosphor-react-native'
import { YStack } from 'tamagui'

import { Heading } from '@/components/CheckoutForm/Heading'
import { LegalPersonForm } from '@/components/CheckoutForm/LegalPersonForm'
import { NaturalPersonForm } from '@/components/CheckoutForm/NaturalPersonForm'
import { Tabs } from '@/components/Tabs'
import { LegalPersonFormFields, NaturalPersonFormFields } from '@/libs/zod'

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

  function handleSubmit() {
    console.log('submit')
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
