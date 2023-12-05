import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ComputerTower,
  CreditCard,
  Envelope,
  Lock,
  Phone,
} from 'phosphor-react-native'
import { Spinner, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Input } from '@/components/Form/Input'
import { PasswordInput } from '@/components/Form/PasswordInput'
import { LegalPersonFormFields, legalPersonFormSchema } from '@/libs/zod'
import { useCheckoutStore } from '@/stores/checkoutStore'

type FieldName = keyof LegalPersonFormFields

interface LegalPersonFormProps {
  onSubmit: (personType: 'natural' | 'legal') => void
}

export function LegalPersonForm({ onSubmit }: LegalPersonFormProps) {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<LegalPersonFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(legalPersonFormSchema),
  })

  const personFormData = useCheckoutStore((store) => store.state.personFormData)
  const setPersonFormData = useCheckoutStore(
    (store) => store.actions.setPersonFormData
  )

  const { razaoSocial, email, password, passwordConfirmation, cnpj, phone } =
    personFormData.legalPerson

  function handleFormSubmit() {
    // onSubmit('legal')
  }

  function handleInputChange(
    changeHandler: (value: string) => void,
    value: string,
    fieldName: keyof LegalPersonFormFields
  ) {
    changeHandler(value)

    setPersonFormData('legal', fieldName, value)
  }

  useEffect(() => {
    const { legalPerson } = personFormData

    for (const fieldName of Object.keys(legalPerson)) {
      const value = legalPerson[fieldName as keyof LegalPersonFormFields]
      if (value) setValue(fieldName as FieldName, value)
    }
  }, [])

  return (
    <YStack gap={16} mt={12}>
      <Controller
        control={control}
        name="razaoSocial"
        render={({ field: { onChange } }) => (
          <Input
            label="Razão social"
            icon={ComputerTower}
            placeholder="Exemplo: Maria de Almeira LTDA"
            defaultValue={razaoSocial}
            onChangeText={(value: string) =>
              handleInputChange(onChange, value, 'razaoSocial')
            }
            error={errors.razaoSocial?.message}
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
            placeholder="Exemplo: maria@gmail.com"
            defaultValue={email}
            onChangeText={(value: string) =>
              handleInputChange(onChange, value, 'email')
            }
            error={errors.email?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="cnpj"
        render={({ field: { onChange } }) => (
          <Input
            label="CNPJ"
            keyboardType="numeric"
            icon={CreditCard}
            mask="cnpj"
            placeholder="00.000.000/0000-00"
            defaultValue={cnpj}
            max={14}
            onChangeText={(value: string) =>
              handleInputChange(onChange, value, 'cnpj')
            }
            error={errors.cnpj?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange } }) => (
          <Input
            label="Celular / Whatsapp"
            keyboardType="numeric"
            placeholder="(12) 98881-5499"
            icon={Phone}
            mask="phone"
            defaultValue={phone}
            max={11}
            onChangeText={(value: string) =>
              handleInputChange(onChange, value, 'phone')
            }
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
            defaultValue={password}
            onChangeText={(value: string) =>
              handleInputChange(onChange, value, 'password')
            }
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
            defaultValue={passwordConfirmation}
            onChangeText={(value: string) =>
              handleInputChange(onChange, value, 'passwordConfirmation')
            }
            error={errors.passwordConfirmation?.message}
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
