import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Envelope,
  IdentificationCard,
  Phone,
  User,
} from 'phosphor-react-native'
import { YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Input } from '@/components/Form/Input'
import { NaturalPersonFormFields, naturalPersonFormSchema } from '@/libs/zod'

interface NaturalPersonFormProps {
  onSubmit: () => void
}

export function NaturalPersonForm({ onSubmit }: NaturalPersonFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NaturalPersonFormFields>({
    resolver: zodResolver(naturalPersonFormSchema),
  })

  function handleFormSubmit() {
    console.log('submit')
    onSubmit()
  }

  return (
    <YStack gap={16} mt={12}>
      <Input
        label="Nome completo"
        placeholder="00.000.000/0000-00"
        icon={User}
        {...register('name')}
        error={errors.name?.message}
      />
      <Input
        label="E-mail"
        icon={Envelope}
        placeholder="Exemplo: maria@gmail.com"
      />
      <Input
        label="CPF"
        placeholder="00.000.000-00"
        mask="cpf"
        icon={IdentificationCard}
        {...register('cpf')}
        error={errors.cpf?.message}
      />
      <Input
        label="Celular / Whatsapp"
        placeholder="(12) 98881-5499"
        mask="phone"
        icon={Phone}
        {...register('phone')}
        error={errors.phone?.message}
      />

      <Button mt={24} onPress={handleSubmit(handleFormSubmit)}>
        Continuar
      </Button>
    </YStack>
  )
}
