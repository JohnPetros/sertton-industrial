import { Buildings, User } from 'phosphor-react-native'
import { YStack } from 'tamagui'

import { LegalPersonForm } from '@/components/CheckoutForm/LegalPersonForm'
import { NaturalPersonForm } from '@/components/CheckoutForm/NaturalPersonForm'
import { usePersonForm } from '@/components/CheckoutForm/PersonForm/usePersonForm'
import { Tabs } from '@/components/Tabs'

interface PersonFormProps {
  onSuccess: () => void
}

export function PersonForm({ onSuccess }: PersonFormProps) {
  const { handleSubmit } = usePersonForm(onSuccess)

  return (
    <YStack gap={24} pb={120}>
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
