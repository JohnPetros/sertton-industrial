import { Paragraph, Text, XStack, YStack } from 'tamagui'

import { Stars } from '@/components/Product/Stars'
import { useDate } from '@/hooks/useDate'

interface ReviewProps {
  name: string
  message: string
  rating: number
  date: string
}

export default function Review({ name, message, rating, date }: ReviewProps) {
  const { formatDate } = useDate()

  console.log(date)

  return (
    <YStack
      gap={8}
      borderRadius={4}
      borderWidth={1}
      borderColor="$gray200"
      p={24}
    >
      <Stars total={rating} size={16} />
      <XStack gap={8}>
        <Text fontSize={14} color="$gray900" fontWeight="600">
          {name}
        </Text>
        <Text fontSize={12} color="$gray300">
          {formatDate(date)}
        </Text>
      </XStack>
      <Paragraph fontSize={14} color="$gray400">
        {message}
      </Paragraph>
    </YStack>
  )
}
