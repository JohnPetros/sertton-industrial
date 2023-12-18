import { Image, XStack } from 'tamagui'

import { useCreditCardTypes } from '@/components/Checkout/PaymentForm/CreditCardForm/CreditCardTypes/useCreditCardTypes'

export function CreditCardTypes() {
  const { creditCardTypes } = useCreditCardTypes()

  console.log({ creditCardTypes })

  if (creditCardTypes)
    return (
      <XStack gap={8}>
        {creditCardTypes.map((creditCardType) => (
          <Image
            key={creditCardType.name}
            source={{ uri: creditCardType.image }}
            alt={creditCardType.name}
          />
        ))}
      </XStack>
    )
}
