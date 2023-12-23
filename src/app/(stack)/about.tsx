import { H1, Paragraph, ScrollView, XStack, YStack } from 'tamagui'
import { Text } from 'tamagui'

import { BackButton } from '@/components/BackButton'
import { Contacts } from '@/components/Contacts'
import { Indentification } from '@/components/Indentification'
import { Logo } from '@/components/Logo'
import { SCREEN } from '@/utils/constants/screen'

export default function AboutScreen() {
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

          <Indentification />
        </YStack>
      </ScrollView>
    </YStack>
  )
}
