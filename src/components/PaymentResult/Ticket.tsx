import { WhatsappLogo } from 'phosphor-react-native'
import { H1, H2, H3, Paragraph, Text, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { List } from '@/components/List'
import { SCREEN } from '@/utils/constants/screen'

export default function Ticket() {
  return (
    <YStack>
      <H1 color="$gray500">Seu pedido foi realizado com successo.</H1>
      <Paragraph>
        Daqui a pouco você receberá um e-mail no endereço
        <Text>joaopedro.cds@gmail.com</Text> com todos os detalhes de sua
        compra.
      </Paragraph>

      <YStack>
        <Button>
          <WhatsappLogo />
          Enviar pelo WhatsApp
        </Button>
        <Button background="secondary">Imprimir boleto</Button>
      </YStack>

      <YStack bg="$white" px={SCREEN.paddingX}>
        <H2 color="$gray700">Instruções</H2>

        <List
          items={[
            'Imprima seu boleto e pague-o no banco',
            ' Você também pode pagar pela internet usando o código de barras:',
          ]}
        />
        <H3 textTransform="uppercase" fontSize={12}>
          Código de barras do boleto
        </H3>
      </YStack>
    </YStack>
  )
}
