import { useRouter } from 'expo-router'
import { Buildings, User } from 'phosphor-react-native'
import { YStack } from 'tamagui'

import { Heading } from '@/components/CheckoutForm/Heading'
import { LegalPersonForm } from '@/components/CheckoutForm/LegalPersonForm'
import { NaturalPersonForm } from '@/components/CheckoutForm/NaturalPersonForm'
import { KeyboardHandlerView } from '@/components/KeyboardHandlerView'
import { Tabs } from '@/components/Tabs'
import { LegalPersonFormFields, NaturalPersonFormFields } from '@/libs/zod'
import { useApi } from '@/services/api'
import { useCheckoutStore } from '@/stores/checkoutStore'

export type PersonFormData = {
  naturalPerson: NaturalPersonFormFields
  legalPerson: LegalPersonFormFields
}

export function Step1() {
  const personFormData = useCheckoutStore((store) => store.state.personFormData)
  const setStep = useCheckoutStore((store) => store.actions.setStep)
  const api = useApi()

  async function handleSubmit(personType: 'legal' | 'natural') {
    try {
      if (personType === 'natural') {
        const { naturalPerson } = personFormData

        await api.createCustomer({
          type: 'f',
          active: true,
          name: naturalPerson.name,
          email: naturalPerson.email,
          cpf: naturalPerson.cpf,
          homephone: naturalPerson.phone,
        })
      } else if (personType === 'legal') {
        const { legalPerson } = personFormData

        await api.createCustomer({
          type: 'j',
          active: true,
          razao_social: legalPerson.razaoSocial,
          cnpj: legalPerson.cnpj,
          email: legalPerson.email,
          homephone: legalPerson.phone,
        })
      }
      // setStep(2)
    } catch (error) {
      console.error({ error })
      api.handleError(error)
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
            size: 700,
            content: <NaturalPersonForm onSubmit={handleSubmit} />,
          },
          {
            title: 'Pessoa jurídica',
            value: 'questions',
            icon: Buildings,
            size: 700,
            content: <LegalPersonForm onSubmit={handleSubmit} />,
          },
        ]}
      />
    </YStack>
  )
}
