import { Buildings, User } from 'phosphor-react-native'
import { YStack } from 'tamagui'

import { LegalPersonForm } from '../LegalPersonForm'
import { NaturalPersonForm } from '../NaturalPersonForm'

import { usePersonForm } from './usePersonForm'

import { Tabs } from '@/components/shared/Tabs'

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
            value: 'natural-person',
            icon: User,
            size: 600,
            content: <NaturalPersonForm onSubmit={handleSubmit} />,
          },
          {
            title: 'Pessoa jurídica',
            value: 'legal-person',
            icon: Buildings,
            size: 600,
            content: <LegalPersonForm onSubmit={handleSubmit} />,
          },
        ]}
      />
    </YStack>
  )
}
