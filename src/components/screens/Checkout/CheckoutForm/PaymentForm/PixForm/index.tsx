import { Paragraph, Text, YStack } from 'tamagui'

import { Button } from '@/components/shared/Button'
import { formatPrice } from '@/utils/helpers/formatPrice'

interface PixFormProps {
  total: number
  onGenerate: () => void
}

export function PixForm({ total, onGenerate }: PixFormProps) {
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
        <Button testID="generate-pix-button" onPress={onGenerate}>
          Comprar agora
        </Button>
      </YStack>
    )
}
