import { Controller } from 'react-hook-form'
import {
  Envelope,
  IdentificationCard,
  Lock,
  Phone,
  User,
} from 'phosphor-react-native'
import { YStack } from 'tamagui'
import { Spinner } from 'tamagui'

import { Button } from '@/components/Button'
import { useNaturalPesonForm } from '@/components/CheckoutForm/NaturalPersonForm/useNaturalPersonForm'
import { Input } from '@/components/Form/Input'
import { PasswordInput } from '@/components/Form/PasswordInput'

interface NaturalPersonFormProps {
  onSubmit: (personType: 'natural' | 'legal') => void
}

export function NaturalPersonForm({ onSubmit }: NaturalPersonFormProps) {
  const { control, errors, isSubmitting, handleSubmit, handleInputChange } =
    useNaturalPesonForm(onSubmit)

  return (
    <YStack gap={12} mt={12}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Nome completo"
            placeholder="Maria Joaquina dos Santos"
            icon={User}
            value={value}
            onChangeText={() => handleInputChange(onChange, value, name)}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="E-mail"
            icon={Envelope}
            autoCapitalize="none"
            placeholder="Exemplo: maria@gmail.com"
            value={value}
            onChangeText={() => handleInputChange(onChange, value, name)}
            error={errors.email?.message}
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
            onChangeText={() => handleInputChange(onChange, value, name)}
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
            onChangeText={() => handleInputChange(onChange, value, name)}
            mask="phone"
            icon={Phone}
            error={errors.phone?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, name } }) => (
          <PasswordInput
            label="Senha"
            placeholder="******"
            icon={Lock}
            value={value}
            onChangeText={() => handleInputChange(onChange, value, name)}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="passwordConfirmation"
        render={({ field: { onChange, value, name } }) => (
          <PasswordInput
            label="Confirmação de senha"
            icon={Lock}
            value={value}
            onChangeText={() => handleInputChange(onChange, value, name)}
            error={errors.passwordConfirmation?.message}
          />
        )}
      />

      <Button mt={24} onPress={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? <Spinner color="$white" /> : 'Continuar'}
      </Button>
    </YStack>
  )
}
