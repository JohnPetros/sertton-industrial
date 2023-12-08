import { Controller } from 'react-hook-form'
import {
  ComputerTower,
  CreditCard,
  Envelope,
  Lock,
  Phone,
} from 'phosphor-react-native'
import { Spinner, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { useLegalPesonForm } from '@/components/CheckoutForm/LegalPersonForm/useLegalPersonForm'
import { Input } from '@/components/Form/Input'
import { PasswordInput } from '@/components/Form/PasswordInput'

interface LegalPersonFormProps {
  onSubmit: (personType: 'natural' | 'legal') => void
}

export function LegalPersonForm({ onSubmit }: LegalPersonFormProps) {
  const { control, errors, isSubmitting, handleSubmit, handleInputChange } =
    useLegalPesonForm(onSubmit)

  return (
    <YStack gap={16} mt={12}>
      <Controller
        control={control}
        name="razaoSocial"
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Razão social"
            icon={ComputerTower}
            placeholder="Exemplo: Maria de Almeira LTDA"
            value={value}
            onChangeText={() => handleInputChange(onChange, value, name)}
            error={errors.razaoSocial?.message}
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
            placeholder="Exemplo: maria@gmail.com"
            value={value}
            onChangeText={(email) => handleInputChange(onChange, email, name)}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cnpj"
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="CNPJ"
            keyboardType="numeric"
            icon={CreditCard}
            mask="cnpj"
            placeholder="00.000.000/0000-00"
            value={value}
            max={14}
            onChangeText={(cnpj) => handleInputChange(onChange, cnpj, name)}
            error={errors.cnpj?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value, name } }) => (
          <Input
            label="Celular / Whatsapp"
            keyboardType="numeric"
            placeholder="(12) 98881-5499"
            icon={Phone}
            mask="phone"
            value={value}
            max={11}
            onChangeText={(phone) => handleInputChange(onChange, phone, name)}
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
