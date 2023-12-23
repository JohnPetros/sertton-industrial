import { H1, Paragraph, ScrollView, Separator, XStack, YStack } from 'tamagui'
import { Text } from 'tamagui'

import { BackButton } from '@/components/BackButton'
import { Contacts } from '@/components/Contacts'
import { Logo } from '@/components/Logo'
import { useDate } from '@/services/date'
import { SCREEN } from '@/utils/constants/screen'

export default function AboutScreen() {
  const date = useDate()

  return (
    <YStack px={SCREEN.paddingX}>
      <BackButton />
      <H1 fontSize={24} color="$gray800">
        Sobre a Sertton Industrial
      </H1>
      <ScrollView
        contentContainerStyle={{ paddingBottom: SCREEN.paddingBottom }}
        showsVerticalScrollIndicator={false}
      >
        <YStack gap={16}>
          <Logo />
          <Paragraph color="$gray800">
            Nós da Sertton Industrial contamos com profissionais especializados
            e qualificados para prestar um atendimento personalizado e de alta
            qualidade aos nossos clientes.
          </Paragraph>

          <Text color="$gray900" fontSize={16}>
            Atendimento:
          </Text>
          <XStack gap={12} justifyContent="center" flexWrap="wrap">
            <Contacts />
          </XStack>

          <YStack gap={8} alignItems="center">
            <Separator vertical={false} w="90%" bg="$gray800" />
            <Text color="$gray600" fontSize={12}>
              Rua Tomatssu Iawasse 233 - Vila Nova Bonsucesso
            </Text>
            <Text color="$gray600" fontSize={12}>
              © {date.format(new Date(), 'YYYY')} Sertton Brasil Distribuidora
              Ltda
            </Text>
            <Text color="$gray600" fontSize={12}>
              CNPJ: 33.805.461/0001-90
            </Text>
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  )
}
