import { SvgUri } from 'react-native-svg'

import { useCreditCardTypes } from './useCreditCardTypes'

import { Skeleton } from '@/components/shared/Skeleton'

export function CreditCardTypes() {
  const { creditCardTypes, isLoading } = useCreditCardTypes()

  console.log({ creditCardTypes })

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
    creditCardTypes.map((creditCardType) => {
      return (
        <SvgUri
          testID={`credit-card-type-${creditCardType.name}`}
          key={creditCardType.name}
          uri={creditCardType.icon}
        />
      )
    })
}
