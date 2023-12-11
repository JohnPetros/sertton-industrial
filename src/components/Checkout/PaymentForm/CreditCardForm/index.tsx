import { Controller, FormProvider } from 'react-hook-form'
import { XStack, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { useCreditCardForm } from '@/components/Checkout/PaymentForm/CreditCardForm/useCreditCardForm'
import { Input } from '@/components/Form/Input'

export function CreditCardForm() {
  const { control, formFields, errors, handleSubmit } = useCreditCardForm()

  return (
    <YStack gap={24}>
      <FormProvider {...formFields}>
        <CreditCardForm />
      </FormProvider>

      {/* <Controller
        control={control}
        name="number"
        render={({ field: { onChange, value } }) => (
          <Input
            label="número do cartão"
            keyboardType="numeric"
            mask="credit-card-number"
            placeholder="1234 1234 1234 1234"
            max={16}
            value={value}
            onChangeText={onChange}
            error={errors.number?.message}
          />
        )}
      />

      <XStack justifyContent="space-between">
        <Controller
          control={control}
          name="expirationDate"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Validade"
              keyboardType="numeric"
              subLabel="(mês/ano)"
              placeholder="MM/AA"
              mask="credit-card-expiration-date"
              value={value}
              max={4}
              onChangeText={onChange}
              error={errors.expirationDate?.message}
            />
          )}
        />

        <Controller
          control={control}
          name="securityCode"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Cód. de segurança"
              keyboardType="numeric"
              value={value}
              max={4}
              onChangeText={onChange}
              error={errors.expirationDate?.message}
            />
          )}
        />
      </XStack>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            label="Nome e sobrenome do titular"
            placeholder="ex.: Maria Joaquina de Souza"
            value={value}
            onChangeText={onChange}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange, value } }) => (
          <Input
            label="CPF do titular"
            keyboardType="numeric"
            mask="cpf"
            placeholder="000.000.000-00"
            value={value}
            onChangeText={onChange}
            error={errors.cpf?.message}
          />
        )}
      /> */}

      <Button onPress={handleSubmit}>Comprar agora</Button>
    </YStack>
  )
}
