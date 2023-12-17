import { Controller } from 'react-hook-form'
import {
  Envelope,
  IdentificationCard,
  Phone,
  User,
} from 'phosphor-react-native'
import { YStack } from 'tamagui'
import { Spinner } from 'tamagui'

import { Button } from '@/components/Button'
import { useNaturalPesonForm } from '@/components/CheckoutForm/NaturalPersonForm/useNaturalPersonForm'
import { Input } from '@/components/Form/Input'

interface NaturalPersonFormProps {
  onSubmit: (personType: 'natural' | 'legal') => void
}

export function NaturalPersonForm({ onSubmit }: NaturalPersonFormProps) {
  const { control, errors, isSubmitting, handleSubmit, handleInputChange } =
    useNaturalPesonForm(onSubmit)

  console.log({ errors })

  return (
    <YStack gap={12} mt={12}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, name } }) => (
          <Input
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

      <Button mt={24} onPress={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? <Spinner color="$white" /> : 'Continuar'}
      </Button>
    </YStack>
  )
}
