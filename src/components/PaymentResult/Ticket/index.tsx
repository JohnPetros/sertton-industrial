import { Printer, WhatsappLogo } from 'phosphor-react-native'
import { getTokens, H1, H2, Text, XStack, YStack } from 'tamagui'
import { Image } from 'tamagui'

import { Button } from '@/components/Button'
import { Clipboard } from '@/components/Clipboard'
import { List } from '@/components/List'
import { useTicket } from '@/components/PaymentResult/Ticket/useTicket'
import { SCREEN } from '@/utils/constants/screen'

interface TicketProps {
  code: string
  url: string
}

export function Ticket({ code, url }: TicketProps) {
  const { downloadTicket } = useTicket(url)

  return (
    <YStack px={SCREEN.paddingX}>
      <YStack gap={20}>
        <H1 textAlign="center" color="$gray700" fontSize={24} lineHeight={32}>
          Seu pedido foi realizado.
        </H1>
        <XStack flexShrink={0} flexWrap="wrap" gap={4}>
          <Text color="$gray300" textAlign="center">
            Daqui a pouco você receberá um e-mail no endereço
          </Text>
          <Text color="$gray600">joaopedro.cds@gmail.com</Text>

          <Text color="$gray300" textAlign="center">
            com todos os detalhes de sua compra.
          </Text>
        </XStack>

        <YStack gap={16}>
          <Button
            icon={
              <WhatsappLogo
                size={20}
                color={getTokens().color.white.val}
                weight="bold"
              />
            }
            color="$white"
          >
            Enviar pelo WhatsApp
          </Button>
          <Button
            background="secondary"
            icon={
              <Printer
                size={20}
                color={getTokens().color.white.val}
                weight="bold"
              />
            }
            onPress={downloadTicket}
          >
            Baixar boleto
          </Button>
        </YStack>
      </YStack>

      <YStack bg="$white" p={24} gap={16} mt={36}>
        <H2 textAlign="center" color="$gray700" fontSize={20}>
          Instruções
        </H2>

        <List
          items={[
            'Imprima seu boleto e pague-o no banco',
            ' Você também pode pagar pela internet usando o código de barras:',
          ]}
        />
        <Clipboard
          label="Código de barras do boleto"
          text={code}
          message="Código do boleto copiado"
        />
        <XStack gap={12} mt={24}>
          <Image
            w={32}
            h={32}
            borderRadius={4}
            resizeMode="contain"
            source={require('@/assets/images/banco-do-brasil-logo.png')}
          />
          <Image
            w={32}
            h={32}
            borderRadius={4}
            resizeMode="contain"
            source={require('@/assets/images/santander-logo.png')}
          />
          <Image
            w={32}
            h={32}
            borderRadius={4}
            resizeMode="contain"
            source={require('@/assets/images/itau-logo.png')}
          />
          <Image
            w={32}
            h={32}
            borderRadius={4}
            resizeMode="contain"
            source={require('@/assets/images/bradesco-logo.png')}
          />
          <Image
            ml={-12}
            w={60}
            h={32}
            borderRadius={4}
            resizeMode="contain"
            source={require('@/assets/images/caixa-logo.png')}
          />
        </XStack>
      </YStack>
    </YStack>
  )
}
