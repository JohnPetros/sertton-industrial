import { Link } from 'expo-router'
import { ShoppingCart, SmileySad } from 'phosphor-react-native'
import { getTokens, Paragraph, Text, XStack, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { ROUTES } from '@/utils/constants/routes'

export function EmptyCartMessage() {
  return (
    <YStack flex={1} alignItems="center" justifyContent="center">
      <XStack alignItems="flex-start">
        <ShoppingCart size={64} color={getTokens().color.gray600.val} />
        <SmileySad
          size={32}
          weight="bold"
          color={getTokens().color.gray600.val}
        />
      </XStack>
      <Text fontSize={24} color="$gray600" fontWeight="600" mt={12}>
        Seu carrinho está vazio
      </Text>
      <Paragraph color="$gray600" mt={4}>
        Navegue pela loja e adiciona produtos.
      </Paragraph>

      <Link href={ROUTES.products} asChild>
        <Button mt={24}>Procurar produtos</Button>
      </Link>
    </YStack>
  )
}
