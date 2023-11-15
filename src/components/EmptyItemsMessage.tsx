import { ReactNode } from 'react'
import { Link } from 'expo-router'
import { Icon, SmileySad } from 'phosphor-react-native'
import { getTokens, Paragraph, Text, XStack, YStack } from 'tamagui'

import { ROUTES } from '@/utils/constants/routes'

interface EmptyItemsMessage {
  title: string
  subtitle?: string
  icon: Icon
  callback?: ReactNode
}

export function EmptyItemsMessage({
  title,
  subtitle,
  icon: Icon,
  callback,
}: EmptyItemsMessage) {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <XStack alignItems="flex-start">
        <Icon size={48} color={getTokens().color.gray600.val} />
        <SmileySad
          size={32}
          weight="bold"
          color={getTokens().color.gray600.val}
        />
      </XStack>
      <Text fontSize={24} color="$gray600" fontWeight="600" mt={12}>
        {title}
      </Text>
      {subtitle && (
        <Paragraph color="$gray600" mt={4}>
          {subtitle}
        </Paragraph>
      )}

      {callback && (
        <Link href={ROUTES.products} asChild>
          {callback}
        </Link>
      )}
    </YStack>
  )
}
