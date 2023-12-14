import { Text } from 'tamagui'
import { Paragraph, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { formatPrice } from '@/utils/helpers/formatPrice'

interface TicketFormProps {
  total: number
}

export function TicketForm({ total }: TicketFormProps) {
  return (
    <YStack gap={16}>
      <Paragraph color="$gray900" fontWeight="600">
        ⚠️ ATENÇÃO: O boleto terá vencimento de 3 dias úteis.
      </Paragraph>
      <Paragraph color="$gray800" fontWeight="500">
        Somente quando o seu boleto for compensado pelo banco, seguiremos com
        aprovação e despacho com o produto.
      </Paragraph>
      <Paragraph color="$gray800" fontWeight="500">
        O prazo de compensação do boletos leva 5 dias úteis após o pagamento.
        Portanto, o prazo de entrega passa a ser contado a partir da data que o
        boleto foi compensado.
      </Paragraph>
      <Text color="$green500" fontSize={20} fontWeight="600">
        Valor no Pix: {formatPrice(total)}
      </Text>
      <Button>Comprar agora</Button>
    </YStack>
  )
}