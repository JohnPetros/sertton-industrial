import { ReactNode } from 'react'
import { H3, ScrollView, Text, YStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Dialog } from '@/components/Dialog'
import { Input } from '@/components/Form/Input'
import { TextArea } from '@/components/Form/TextArea'
import { Stars } from '@/components/Product/Stars'
import { useApi } from '@/services/api'

interface ReviewDialogProps {
  productId: number
  productName: string
  children: ReactNode
}

export function ReviewDialog({
  productId,
  productName,
  children,
}: ReviewDialogProps) {
  const api = useApi()

  async function handleSubmit() {
    try {
      await api.postProductReview({
        approved: false,
        email: 'test@test.com',
        name: 'Jonas',
        message: 'message',
        product_id: productId,
        rating: 4,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Dialog
      height={550}
      title="Avalie o produto"
      content={
        <YStack mt={8}>
          <H3 fontSize={18} color="$gray600">
            {productName}
          </H3>
          <ScrollView>
            <YStack mt={12} gap={8}>
              <Text color="$gray400" textTransform="uppercase">
                Quantidade de estrelas
              </Text>
              <Stars total={5} size={32} isEditable={true} />
            </YStack>

            <YStack mt={24} gap={12}>
              <Input label="Nome" placeholder="Ex.: Adriana" />
              <Input label="E-mail" placeholder="Ex.: adrian@gmail.com" />
              <TextArea
                label="Avaliação"
                placeholder="Escreva o que achou desse produto..."
              />
            </YStack>
          </ScrollView>

          <YStack y={-12} my={32}>
            <Button onPress={handleSubmit}>Enviar avaliação</Button>
          </YStack>
        </YStack>
      }
    >
      {children}
    </Dialog>
  )
}
