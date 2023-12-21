import { YStack } from 'tamagui'

import { Heading } from '@/components/CheckoutForm/Heading'
import { PersonForm } from '@/components/CheckoutForm/PersonForm'
import { LegalPersonFormFields, NaturalPersonFormFields } from '@/libs/zod'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { SCREEN } from '@/utils/constants/screen'

export type PersonFormData = {
  naturalPerson: NaturalPersonFormFields
  legalPerson: LegalPersonFormFields
}

export function Step1() {
  const setStep = useCheckoutStore(({ actions }) => actions.setStep)

  return (
    <YStack px={SCREEN.paddingX}>
      <Heading
        step={1}
        title="Identifique-se"
        subtitle="Utilizaremos seu e-mail para identificar seu perfil."
      />
      <PersonForm onSuccess={() => setStep(2)} />
    </YStack>
  )
}
