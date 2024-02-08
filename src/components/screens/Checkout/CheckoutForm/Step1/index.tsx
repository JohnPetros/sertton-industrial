import { YStack } from 'tamagui'

import { Heading } from '../Heading'
import { PersonForm } from '../PersonForm'

import { LegalPersonForm } from '@/services/validation/types/LegalPersonForm'
import { NaturalPersonForm } from '@/services/validation/types/NaturalPersonForm'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { SCREEN } from '@/utils/constants/screen'

export type PersonFormData = {
  naturalPerson: NaturalPersonForm
  legalPerson: LegalPersonForm
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
