import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ComputerTower,
  CreditCard,
  Envelope,
  Lock,
  Phone,
} from 'phosphor-react-native'
import { YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { PersonFormData } from '@/components/CheckoutForm/Step1'
import { Input } from '@/components/Form/Input'
import { PasswordInput } from '@/components/Form/PasswordInput'
import { LegalPersonFormFields, legalPersonFormSchema } from '@/libs/zod'

interface LegalPersonFormProps {
  onSubmit: () => void
  personFormData: React.MutableRefObject<PersonFormData>
}

export function LegalPersonForm({
  onSubmit,
  personFormData,
}: LegalPersonFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LegalPersonFormFields>({
    mode: 'onBlur',
    defaultValues: {
      razaoSocial: personFormData.current.legalPerson.razaoSocial,
      email: personFormData.current.legalPerson.email,
      cnpj: personFormData.current.legalPerson.cnpj,
      phone: personFormData.current.legalPerson.phone,
      password: personFormData.current.legalPerson.password,
      passwordConfirmation:
        personFormData.current.legalPerson.passwordConfirmation,
    },
    resolver: zodResolver(legalPersonFormSchema),
  })

  function handleFormSubmit() {
    console.log('submit')
    onSubmit()
  }

  function handleInputChange(
    changeHandler: (value: string) => void,
    value: string,
    fieldName: keyof LegalPersonFormFields
  ) {
    changeHandler(value)

    personFormData.current.legalPerson[fieldName] = value
  }

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
            defaultValue={personFormData.current.legalPerson.razaoSocial}
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
            defaultValue={personFormData.current.legalPerson.email}
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
            defaultValue={personFormData.current.legalPerson.cnpj}
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
            defaultValue={personFormData.current.legalPerson.phone}
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
            defaultValue={personFormData.current.legalPerson.password}
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
            defaultValue={
              personFormData.current.legalPerson.passwordConfirmation
            }
            onChangeText={(value: string) =>
              handleInputChange(onChange, value, 'passwordConfirmation')
            }
            error={errors.password?.message}
          />
        )}
      />

      <Button mt={24} onPress={handleSubmit(handleFormSubmit)}>
        Continuar
      </Button>
    </YStack>
  )
}
