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
import { PersonFormData } from '@/components/CheckoutForm/Step1'
import { Input } from '@/components/Form/Input'
import { PasswordInput } from '@/components/Form/PasswordInput'
import { NaturalPersonFormFields, naturalPersonFormSchema } from '@/libs/zod'

interface NaturalPersonFormProps {
  onSubmit: () => void
  personFormData: React.MutableRefObject<PersonFormData>
}

export function NaturalPersonForm({
  onSubmit,
  personFormData,
}: NaturalPersonFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NaturalPersonFormFields>({
    mode: 'onBlur',
    resolver: zodResolver(naturalPersonFormSchema),
    defaultValues: {
      name: personFormData.current.naturalPerson.name,
      email: personFormData.current.naturalPerson.email,
      cpf: personFormData.current.naturalPerson.email,
      phone: personFormData.current.naturalPerson.phone,
      password: personFormData.current.naturalPerson.password,
      passwordConfirmation:
        personFormData.current.naturalPerson.passwordConfirmation,
    },
  })

  function handleFormSubmit(data: NaturalPersonFormFields) {
    console.log({ data })
    // onSubmit()
  }

  function handleInputChange(
    changeHandler: (value: string) => void,
    value: string,
    fieldName: keyof NaturalPersonFormFields
  ) {
    changeHandler(value)

    personFormData.current.naturalPerson[fieldName] = value
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
            defaultValue={personFormData.current.naturalPerson.name}
            onChangeText={(value: string) =>
              handleInputChange(onChange, value, 'name')
            }
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
            defaultValue={personFormData.current.naturalPerson.email}
            onChangeText={(value: string) =>
              handleInputChange(onChange, value, 'email')
            }
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
            defaultValue={personFormData.current.naturalPerson.cpf}
            onChangeText={(value: string) =>
              handleInputChange(onChange, value, 'cpf')
            }
            icon={IdentificationCard}
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
            defaultValue={personFormData.current.naturalPerson.phone}
            onChangeText={(value: string) =>
              handleInputChange(onChange, value, 'phone')
            }
            mask="phone"
            icon={Phone}
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
            defaultValue={personFormData.current.naturalPerson.password}
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
              personFormData.current.naturalPerson.passwordConfirmation
            }
            onChangeText={(value: string) =>
              handleInputChange(onChange, value, 'passwordConfirmation')
            }
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
