import { Dimensions } from 'react-native'
import { MagnifyingGlass } from 'phosphor-react-native'
import { getTokens, XStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Input } from '@/components/input'

const SCREEN_WIDTH = Dimensions.get('screen').width
const BUTTON_WIDTH = 48
const X_PADDING_WIDTH = 24
const GAP = 8
const INPUT_WIDTH = SCREEN_WIDTH - BUTTON_WIDTH - GAP - X_PADDING_WIDTH * 2

export function Search() {
  return (
    <XStack gap={GAP}>
      <Input
        placeholder="Exemplo: Arremate"
        w={INPUT_WIDTH}
        label="Procurar produto"
      />
      <Button w={BUTTON_WIDTH} background="primary" alignSelf="flex-end">
        <MagnifyingGlass color={getTokens().color.white.val} />
      </Button>
    </XStack>
  )
}
