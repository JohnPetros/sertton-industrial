import { MagnifyingGlass } from 'phosphor-react-native'
import { getTokens, Spinner, XStack } from 'tamagui'

import { useSearch } from './useSearch'

import { Button } from '@/components/Button'
import { Input } from '@/components/Form/Input'
import { SCREEN } from '@/utils/constants/screen'

const BUTTON_WIDTH = 48
const GAP = 8
const INPUT_WIDTH = SCREEN.width - BUTTON_WIDTH - GAP - SCREEN.paddingX * 2

type SearchProps = {
  isFetching?: boolean
}

export function Search({ isFetching }: SearchProps) {
  const { handleSearch, setSearchValue, isLoading, searchValue } = useSearch(
    isFetching ?? false
  )

  return (
    <XStack gap={GAP}>
      <Input
        placeholder="Exemplo: Arremate"
        w={INPUT_WIDTH}
        label="Procurar produto"
        autoCorrect={false}
        value={searchValue}
        onSubmitEditing={handleSearch}
        onChangeText={setSearchValue}
      />
      <Button
        w={BUTTON_WIDTH}
        background="primary"
        alignSelf="flex-end"
        onPress={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? (
          <Spinner size="small" color="$white" />
        ) : (
          <MagnifyingGlass color={getTokens().color.white.val} />
        )}
      </Button>
    </XStack>
  )
}
