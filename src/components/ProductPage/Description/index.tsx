import { H2, Paragraph, YStack } from 'tamagui'

import { List } from '@/components/List'
import { getItemsFromHTMLList } from '@/utils/helpers/getItemsFromHTMLList'
import { removeHTMLTags } from '@/utils/helpers/removeHTMLTags'

interface DescriptionProps {
  description: string
  specifications: string
}

export function Description({ description, specifications }: DescriptionProps) {
  return (
    <>
      <YStack gap={12}>
        <H2 fontSize={24}>Descrição do produto</H2>
        <Paragraph lineHeight={28}>{removeHTMLTags(description)}</Paragraph>
      </YStack>
      <YStack>
        <H2 fontSize={24}>Especificações técnicas</H2>
        <List items={getItemsFromHTMLList(specifications) ?? []} />
      </YStack>
    </>
  )
}
