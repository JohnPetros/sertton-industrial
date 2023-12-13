import { CopySimple } from 'phosphor-react-native'
import { getTokens, H1, Separator, Text, XStack, YStack } from 'tamagui'
import { Image } from 'tamagui'

import { Button } from '@/components/Button'
import { Strong } from '@/components/Strong'
import { Timer } from '@/components/Timer'
import { SCREEN } from '@/utils/constants/screen'

interface PixProps {
  code: string
}

export function Pix({ code }: PixProps) {
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
        p={36}
        gap={20}
        bg="$white"
      >
        <XStack justifyContent="center" alignItems="center" gap={4}>
          <Text fontSize={16} fontWeight="600" color="$gray800">
            Valor no Pix:
          </Text>
          <Text fontSize={18} color="$green500" fontWeight="600">
            R$ 194,12
          </Text>
        </XStack>
        <Button
          fontWeight="600"
          icon={
            <CopySimple
              size={20}
              color={getTokens().color.white.val}
              weight="bold"
            />
          }
        >
          Copiar código
        </Button>
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
