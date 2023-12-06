import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Globe, Signpost } from 'phosphor-react-native'
import { XStack, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { AddressForm } from '@/components/CheckoutForm/AddressForm'

export function Step2() {
  return <AddressForm />
}
