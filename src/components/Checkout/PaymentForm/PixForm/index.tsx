import { Paragraph, Text, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { formatPrice } from '@/utils/helpers/formatPrice'

interface PixFormProps {
  total: number
}

export function PixForm({ total }: PixFormProps) {
  if (total)
    return (
      <YStack mt={12} gap={16}>
        <Paragraph color="$gray900">
          A confirmação de pagamento é realizada em poucos minutos. Utilize o
          aplicativo do seu banco para pagar.
        </Paragraph>
        <Text color="$green500" fontSize={20} fontWeight="600">
          Valor no Pix: {formatPrice(total)}
        </Text>
        <Button>Comprar agora</Button>
      </YStack>
    )
}
