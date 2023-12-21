import { SvgUri } from 'react-native-svg'
import { XStack } from 'tamagui'

import { useCreditCardTypes } from '@/components/Checkout/PaymentForm/CreditCardForm/CreditCardTypes/useCreditCardTypes'

export function CreditCardTypes() {
  const { creditCardTypes } = useCreditCardTypes()

  if (creditCardTypes)
    return (
      <XStack gap={8} flexWrap="wrap" width="90%">
        {creditCardTypes.map((creditCardType) => (
          <SvgUri key={creditCardType.name} uri={creditCardType.icon} />
        ))}
      </XStack>
    )
}
