import { H1, Separator, Text, XStack, YStack } from 'tamagui'
import { Image } from 'tamagui'

import { Clipboard } from '@/components/Clipboard'
import { Strong } from '@/components/Strong'
import { Timer } from '@/components/Timer'
import { useCart } from '@/hooks/useCart'
import { useCartSummary } from '@/hooks/useCartSummary'
import { SCREEN } from '@/utils/constants/screen'
import { formatPrice } from '@/utils/helpers/formatPrice'

interface PixProps {
  code: string
}

export function Pix({ code }: PixProps) {
  const { products } = useCart()
  const { totalToPay, totalDiscount } = useCartSummary(products ?? [])

  return (
    <YStack
      alignItems="center"
      justifyContent="center"
      w="100%"
      px={SCREEN.paddingX}
      gap={24}
    >
      <H1 fontSize={24} color="$gray800">
        Quase lá...
      </H1>
      <YStack mt={-20} alignItems="center" justifyContent="center">
        <XStack alignItems="center" justifyContent="center" gap={4}>
          <Text fontSize={16} color="$gray700">
            Pague seu Pix dentro de{' '}
          </Text>
          <Timer
            initialHours={0}
            initialMinutes={30}
            initialSeconds={0}
            fontSize={20}
          />
        </XStack>
        <Text fontSize={16} color="$gray700">
          Para garantir sua compra.
        </Text>
      </YStack>
      <Strong>Aguardando pagamento...</Strong>
      <YStack
        elevation={0.5}
        borderRadius={4}
        w="100%"
        p={32}
        gap={20}
        bg="$white"
      >
        <XStack justifyContent="center" alignItems="center" gap={4}>
          <Text fontSize={16} fontWeight="600" color="$gray800">
            Valor no Pix:
          </Text>
          <Text fontSize={18} color="$green500" fontWeight="600">
            {formatPrice(totalToPay - totalDiscount)}
          </Text>
        </XStack>
        <Clipboard
          label="Copiar código do pix"
          text={code}
          message="Código do pix copiado"
        />
        <Text
          textAlign="center"
          fontSize={16}
          fontWeight="600"
          color="$gray800"
        >
          Após copiar o código, abra seu aplicativo de pagamento onde você
          utiliza o Pix.
        </Text>
        <Text
          textAlign="center"
          fontSize={16}
          fontWeight="600"
          color="$gray800"
        >
          Escolha a opção Pix Copia e Cola e insira o código copiado.
        </Text>
        <Separator bg="$gray400" />
        <Text textAlign="center" color="$gray400">
          Pix processado por
        </Text>
        <Image
          mt={-8}
          source={require('@/assets/images/pagarme-logo.png')}
          h={24}
          w="100%"
          resizeMode="contain"
        />
      </YStack>
    </YStack>
  )
}
