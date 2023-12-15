import { Buildings, User } from 'phosphor-react-native'
import { YStack } from 'tamagui'

import { Heading } from '@/components/CheckoutForm/Heading'
import { LegalPersonForm } from '@/components/CheckoutForm/LegalPersonForm'
import { NaturalPersonForm } from '@/components/CheckoutForm/NaturalPersonForm'
import { PersonForm } from '@/components/CheckoutForm/PersonForm'
import { KeyboardHandlerView } from '@/components/KeyboardHandlerView'
import { Tabs } from '@/components/Tabs'
import { LegalPersonFormFields, NaturalPersonFormFields } from '@/libs/zod'
import { useApi } from '@/services/api'
import { useCheckoutStore } from '@/stores/checkoutStore'
import { SCREEN } from '@/utils/constants/screen'

export type PersonFormData = {
  naturalPerson: NaturalPersonFormFields
  legalPerson: LegalPersonFormFields
}

export function Step1() {
  return (
    <YStack px={SCREEN.paddingX}>
      <PersonForm />
    </YStack>
  )
}
