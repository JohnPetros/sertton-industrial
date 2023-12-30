import { Controller } from 'react-hook-form'
import {
  ComputerTower,
  CreditCard,
  Envelope,
  Phone,
} from 'phosphor-react-native'
import { YStack } from 'tamagui'

import { useLegalPesonForm } from '@/components/CheckoutForm/LegalPersonForm/useLegalPersonForm'
import { SubmitButton } from '@/components/CheckoutForm/PersonForm/SubmitButton'
import { Input } from '@/components/Form/Input'

interface LegalPersonFormProps {
  onSubmit: (
    personType: 'natural' | 'legal',
    setFormError: (fieldName: string, message: string) => void
  ) => void
}

export function LegalPersonForm({ onSubmit }: LegalPersonFormProps) {
  const { control, errors, isSubmitting, handleSubmit, handleInputChange } =
    useLegalPesonForm(onSubmit)

  return (
    <YStack gap={16} mt={12}>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, name } }) => (
          <Input
            testID={name}
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
        name="razaoSocial"
        render={({ field: { onChange, value, name } }) => (
          <Input
            testID={name}
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
        name="cnpj"
        render={({ field: { onChange, value, name } }) => (
          <Input
            testID={name}
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
            testID={name}
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

      <SubmitButton handleSubmit={handleSubmit} isSubmitting={isSubmitting} />
    </YStack>
  )
}
