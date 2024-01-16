import { SvgUri } from 'react-native-svg'

import { useCreditCardTypes } from '@/components/Checkout/PaymentForm/CreditCardForm/CreditCardTypes/useCreditCardTypes'

export function CreditCardTypes() {
  const { creditCardTypes } = useCreditCardTypes()
  if (creditCardTypes)
    return creditCardTypes.map((creditCardType) => {
      return (
        <SvgUri
          testID={`credit-card-type-${creditCardType.name}`}
          key={creditCardType.name}
          uri={creditCardType.icon}
        />
      )
    })
}
