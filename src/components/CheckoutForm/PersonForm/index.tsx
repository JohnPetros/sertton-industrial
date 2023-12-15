import { Buildings, User } from 'phosphor-react-native'
import { YStack } from 'tamagui'

import { Heading } from '@/components/CheckoutForm/Heading'
import { LegalPersonForm } from '@/components/CheckoutForm/LegalPersonForm'
import { NaturalPersonForm } from '@/components/CheckoutForm/NaturalPersonForm'
import { usePersonForm } from '@/components/CheckoutForm/PersonForm/usePersonForm'
import { Tabs } from '@/components/Tabs'

export function PersonForm() {
  const { handleSubmit } = usePersonForm()

  return (
    <YStack gap={24} pb={120}>
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
            size: 600,
            content: <NaturalPersonForm onSubmit={handleSubmit} />,
          },
          {
            title: 'Pessoa jurídica',
            value: 'questions',
            icon: Buildings,
            size: 600,
            content: <LegalPersonForm onSubmit={handleSubmit} />,
          },
        ]}
      />
    </YStack>
  )
}
