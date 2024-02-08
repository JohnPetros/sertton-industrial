import { CopySimple } from 'phosphor-react-native'
import { Button, getTokens, Text, YStack } from 'tamagui'
import { XStack } from 'tamagui'

import { Label } from '../Label'

import { useClipboard } from '@/components/shared/Clipboard/useClipboard'

interface CopyBoardProps {
  label: string
  text: string
  message: string
}

export function Clipboard({ text, label, message }: CopyBoardProps) {
  const { copy } = useClipboard(text, message)

  return (
    <YStack>
      <Label id={text}>{label}</Label>

      <Button
        unstyled
        p={12}
        bg="$gray100"
        borderRadius={4}
        borderWidth={1}
        borderColor="$gray700"
        onPress={copy}
      >
        <YStack justifyContent="space-between" alignItems="center">
          <Text
            textTransform="uppercase"
            color="$gray900"
            fontWeight="700"
            fontSize={15}
          >
            {text}
          </Text>
          <XStack bg="$gray300" p={8} borderRadius={4}>
            <CopySimple
              size={20}
              color={getTokens().color.white.val}
              weight="bold"
            />
            <Text color="$white">Copiar código</Text>
          </XStack>
        </YStack>
      </Button>
    </YStack>
  )
}
