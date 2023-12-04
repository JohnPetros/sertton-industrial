import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
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
import { Input } from '@/components/Form/Input'
import { PasswordInput } from '@/components/Form/PasswordInput'
import { NaturalPersonFormFields, naturalPersonFormSchema } from '@/libs/zod'

interface NaturalPersonFormProps {
  onSubmit: () => void
}

export function NaturalPersonForm({ onSubmit }: NaturalPersonFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NaturalPersonFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(naturalPersonFormSchema),
  })

  console.log({ isSubmitting })

  function handleFormSubmit(data: NaturalPersonFormFields) {
    console.log({ data })
    // onSubmit()
  }

  return (
    <YStack gap={16} mt={12}>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange } }) => (
          <Input
            label="Nome completo"
            placeholder="Maria Joaquina dos Santos"
            icon={User}
            onChangeText={onChange}
            error={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange } }) => (
          <Input
            label="E-mail"
            icon={Envelope}
            autoCapitalize="none"
            placeholder="Exemplo: maria@gmail.com"
            onChangeText={onChange}
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cpf"
        render={({ field: { onChange } }) => (
          <Input
            label="CPF"
            keyboardType="numeric"
            placeholder="00.000.000-00"
            mask="cpf"
            icon={IdentificationCard}
            onChangeText={onChange}
            error={errors.cpf?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange } }) => (
          <Input
            keyboardType="numeric"
            label="Celular / Whatsapp"
            placeholder="(12) 98881-5499"
            mask="phone"
            icon={Phone}
            onChangeText={onChange}
            error={errors.phone?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange } }) => (
          <PasswordInput
            label="Senha"
            placeholder="******"
            icon={Lock}
            onChangeText={onChange}
            error={errors.password?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="passwordConfirmation"
        render={({ field: { onChange } }) => (
          <PasswordInput
            label="Confirmação de senha"
            icon={Lock}
            onChangeText={onChange}
            error={errors.password?.message}
          />
        )}
      />

      <Button
        mt={24}
        onPress={handleSubmit(handleFormSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? <Spinner color="$white" /> : 'Continuar'}
      </Button>
    </YStack>
  )
}
