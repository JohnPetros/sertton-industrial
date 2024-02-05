import { SvgUri } from 'react-native-svg'

import { useCreditCardTypes } from '@/components/Checkout/PaymentForm/CreditCardForm/CreditCardTypes/useCreditCardTypes'
import { Skeleton } from '@/components/Skeleton'

export function CreditCardTypes() {
  const { creditCardTypes, isLoading } = useCreditCardTypes()

  if (isLoading) {
    return (
      <>
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
        <Skeleton isVisible={true} height={24} width={40} />
      </>
    )
  }

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
