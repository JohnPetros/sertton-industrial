import { Controller } from 'react-hook-form'
import { XStack, YStack } from 'tamagui'

import { PaymentMethod } from '@/@types/paymentMethod'
import { Button } from '@/components/Button'
import { useCreditCardForm } from '@/components/Checkout/PaymentForm/CreditCardForm/useCreditCardForm'
import { Input } from '@/components/Form/Input'

interface CreditCardFormProps {
  onPay: (paymentMethod: PaymentMethod, cardToken: string) => Promise<void>
}

export function CreditCardForm({ onPay }: CreditCardFormProps) {
  const { control, errors, handleInputChange, handleSubmit } =
    useCreditCardForm(onPay)

  return (
    <YStack gap={24}>
      <Controller
        control={control}
        name="number"
        render={({ field: { name, onChange, value } }) => (
          <Input
            testID={name}
            label="número do cartão"
            keyboardType="numeric"
            mask="credit-card-number"
            placeholder="1234 1234 1234 1234"
            max={16}
            value={value}
            onChangeText={(value) => {
              onChange(value)
              handleInputChange('number', value)
            }}
            error={errors.number?.message}
          />
        )}
      />

      <XStack justifyContent="space-between">
        <Controller
          control={control}
          name="expirationDate"
          render={({ field: { name, onChange, value } }) => (
            <Input
              testID={name}
              label="Validade"
              keyboardType="numeric"
              subLabel="(mês/ano)"
              placeholder="MM/AA"
              mask="credit-card-expiration-date"
              value={value}
              max={4}
              onChangeText={(value) => {
                onChange(value)
                handleInputChange('expirationDate', value)
              }}
              error={errors.expirationDate?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="securityCode"
          render={({ field: { name, onChange, value } }) => (
            <Input
              testID={name}
              label="Cód. de segurança"
              keyboardType="numeric"
              value={value}
              max={4}
              onChangeText={(value) => {
                onChange(value)
                handleInputChange('securityCode', value)
              }}
              error={errors.securityCode?.message}
            />
          )}
        />
      </XStack>

      <Controller
        control={control}
        name="name"
        render={({ field: { name, onChange, value } }) => (
          <Input
            testID={name}
            label="Nome e sobrenome do titular"
            placeholder="ex.: Maria Joaquina de Souza"
            value={value}
            onChangeText={(value) => {
              onChange(value)
              handleInputChange('name', value)
            }}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cpf"
        render={({ field: { name, onChange, value } }) => (
          <Input
            testID={name}
            label="CPF do titular"
            keyboardType="numeric"
            mask="cpf"
            placeholder="000.000.000-00"
            value={value}
            onChangeText={(value) => {
              onChange(value)
              handleInputChange('cpf', value)
            }}
            error={errors.cpf?.message}
          />
        )}
      />

      <Button testID="submit-button" onPress={() => handleSubmit()}>
        Comprar agora
      </Button>
    </YStack>
  )
}
