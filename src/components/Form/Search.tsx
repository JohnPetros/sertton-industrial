import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'
import { useRouter } from 'expo-router/src/hooks'
import { MagnifyingGlass } from 'phosphor-react-native'
import { getTokens, Spinner, XStack } from 'tamagui'

import { Button } from '@/components/Button'
import { Input } from '@/components/Form/Input'
import { useProductsFilterStore } from '@/stores/productsFilterStore'
import { ROUTES } from '@/utils/constants/routes'
import { SCREEN } from '@/utils/constants/screen'

const BUTTON_WIDTH = 48
const GAP = 8
const INPUT_WIDTH = SCREEN.width - BUTTON_WIDTH - GAP - SCREEN.paddingX * 2

interface SearchProps {
  isLoading?: boolean
}

export function Search({ isLoading }: SearchProps) {
  const setSearch = useProductsFilterStore((store) => store.actions.setSearch)
  const currentSearchValue = useProductsFilterStore(
    (store) => store.state.search
  )
  const [searchValue, setSearchValue] = useState(currentSearchValue)
  const [isloading, setIsloading] = useState(false)
  const router = useRouter()

  function handleSearch() {
    if (!isLoading) {
      setSearch(searchValue.trim())
      router.push(ROUTES.products)
      Keyboard.dismiss()
    }
  }

  useEffect(() => {
    setIsloading(Boolean(isLoading))
  }, [isLoading])

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
        {isloading ? (
          <Spinner size="small" color="$white" />
        ) : (
          <MagnifyingGlass color={getTokens().color.white.val} />
        )}
      </Button>
    </XStack>
  )
}
