import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ComputerTower,
  CreditCard,
  Envelope,
  Table,
} from 'phosphor-react-native'
import { YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Checkbox } from '@/components/Form/Checkbox'
import { Input } from '@/components/Form/Input'
import { LegalPersonFormFields, legalPersonFormSchema } from '@/libs/zod'

interface LegalPersonFormProps {
  onSubmit: () => void
}

export function LegalPersonForm({ onSubmit }: LegalPersonFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LegalPersonFormFields>({
    resolver: zodResolver(legalPersonFormSchema),
  })
  const [isFree, setIsFree] = useState(false)

  function handleSubscriptionCheckbox(_: string, isChecked: boolean) {
    setIsFree(isChecked)
  }

  function handleFormSubmit() {
    console.log('submit')
    onSubmit()
  }

  return (
    <YStack gap={16} mt={12}>
      <Input
        label="Razão social"
        icon={ComputerTower}
        {...register('razaoSocial')}
        placeholder="Exemplo: Maria de Almeira LTDA"
      />
      <Input
        label="E-mail"
        icon={Envelope}
        {...register('email')}
        placeholder="Exemplo: maria@gmail.com"
        error={errors.email?.message}
      />
      <Input
        label="CNPJ"
        icon={CreditCard}
        placeholder="00.000.000/0000-00"
        {...register('cnpj')}
        error={errors.cnpj?.message}
      />

      <Input
        label="Celular / Whatsapp"
        placeholder="(12) 98881-5499"
        {...register('phone')}
        error={errors.phone?.message}
      />

      <Button mt={24} onPress={handleSubmit(handleFormSubmit)}>
        Continuar
      </Button>
    </YStack>
  )
}
