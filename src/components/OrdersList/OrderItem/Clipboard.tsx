import { CopySimple } from 'phosphor-react-native'
import { Button, getTokens, Text, XStack } from 'tamagui'

import { useClipboard } from '@/components/Clipboard/useClipboard'

interface ClipboardProps {
  children: string
}

export function Clipboard({ children }: ClipboardProps) {
  const { copy } = useClipboard(children, 'Copiado')

  return (
    <Button unstyled onPress={copy}>
      <XStack>
        <CopySimple
          size={20}
          color={getTokens().color.white.val}
          weight="bold"
        />
        <Text color="$blue400">Copiar código</Text>
      </XStack>
    </Button>
  )
}
