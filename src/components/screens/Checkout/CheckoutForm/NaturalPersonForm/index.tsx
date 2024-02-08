import { Controller } from 'react-hook-form'
import {
  Envelope,
  IdentificationCard,
  Phone,
  User,
} from 'phosphor-react-native'
import { YStack } from 'tamagui'

import { SubmitButton } from '../PersonForm/SubmitButton'

import { useNaturalPesonForm } from './useNaturalPersonForm'

import { Input } from '@/components/shared/Input'

interface NaturalPersonFormProps {
  onSubmit: (
    personType: 'natural' | 'legal',
    setFormError: (fieldName: string, message: string) => void
  ) => void
}

export function NaturalPersonForm({ onSubmit }: NaturalPersonFormProps) {
  const { control, errors, isSubmitting, handleSubmit, handleInputChange } =
    useNaturalPesonForm(onSubmit)

  return (
    <YStack gap={12} mt={12}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, name } }) => (
          <Input
            testID={name}
            label="E-mail"
            keyboardType="email-address"
            icon={Envelope}
            autoCapitalize="none"
            placeholder="Exemplo: maria@gmail.com"
            value={value}
            onChangeText={(email) => handleInputChange(onChange, email, name)}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, name } }) => (
          <Input
            testID={name}
            label="Nome completo"
            placeholder="Maria Joaquina dos Santos"
            icon={User}
            value={value}
            onChangeText={(fullName) =>
              handleInputChange(onChange, fullName, name)
            }
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, value, name } }) => (
          <Input
            testID={name}
            label="CPF"
            keyboardType="numeric"
            placeholder="00.000.000-00"
            mask="cpf"
            value={value}
            max={11}
            onChangeText={(cpf) => handleInputChange(onChange, cpf, name)}
            icon={IdentificationCard}
            error={errors.cpf?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value, name } }) => (
          <Input
            testID={name}
            keyboardType="numeric"
            label="Celular / Whatsapp"
            placeholder="(12) 98881-5499"
            max={11}
            value={value}
            onChangeText={(phone) => handleInputChange(onChange, phone, name)}
            mask="phone"
            icon={Phone}
            error={errors.phone?.message}
          />
        )}
      />

      <SubmitButton handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </YStack>
  )
}
