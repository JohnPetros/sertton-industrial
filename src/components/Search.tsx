import { useState } from 'react'
import { Dimensions } from 'react-native'
import { useRouter } from 'expo-router/src/hooks'
import { MagnifyingGlass } from 'phosphor-react-native'
import { getTokens, Spinner, XStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Input } from '@/components/input'
import { useProductsFilterStore } from '@/stores/productsFilterStore'
import { ROUTES } from '@/utils/constants/routes'

const SCREEN_WIDTH = Dimensions.get('screen').width
const BUTTON_WIDTH = 48
const X_PADDING_WIDTH = 24
const GAP = 8
const INPUT_WIDTH = SCREEN_WIDTH - BUTTON_WIDTH - GAP - X_PADDING_WIDTH * 2

export function Search() {
  const [searchValue, setSearchValue] = useState('')
  const [isloading, setIsloading] = useState(false)
  const setSearch = useProductsFilterStore((store) => store.actions.setSearch)
  const router = useRouter()

  function handleSearch() {
    setSearch(searchValue)
    setIsloading(true)
    router.push(ROUTES.products)
  }

  // useEffect(() => {

  // }, [])

  return (
    <XStack gap={GAP}>
      <Input
        placeholder="Exemplo: Arremate"
        w={INPUT_WIDTH}
        label="Procurar produto"
        value={searchValue}
        onChangeText={setSearchValue}
      />
      <Button
        w={BUTTON_WIDTH}
        background="primary"
        alignSelf="flex-end"
        onPress={handleSearch}
      >
        {isloading ? (
          <Spinner size="small" color="$white" />
        ) : (
          <MagnifyingGlass color={getTokens().color.white.val} />
        )}
      </Button>
    </XStack>
  )
}
