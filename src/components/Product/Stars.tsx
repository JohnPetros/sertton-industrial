import { useState } from 'react'
import { Star } from 'phosphor-react-native'
import { Button, getTokens, XStack } from 'tamagui'

interface StarsProps {
  total: number
  size: number
  isEditable?: boolean
}

export function Stars({ total, size, isEditable = false }: StarsProps) {
  const [totalFilledStars, setTotalFilledStars] = useState(total)

  function handleStarPress(starNumber: number) {
    if (isEditable) setTotalFilledStars(starNumber)
  }

  return (
    <XStack gap={8}>
      {Array.from({ length: 5 }).map((_, index) => {
        const isFilled = index <= totalFilledStars
        return (
          <Button
            key={`star-${index}`}
            unstyled
            onPress={() => handleStarPress(index)}
          >
            <Star
              size={size}
              color={getTokens().color.blue400.val}
              weight={isFilled ? 'fill' : 'bold'}
            />
          </Button>
        )
      })}
    </XStack>
  )
}
