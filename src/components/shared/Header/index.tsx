import { DrawerActions, useNavigation } from '@react-navigation/native'
import { ListBullets } from 'phosphor-react-native'
import { getTokens, XStack } from 'tamagui'

import { Button } from '@/components/shared/Button'
import { Logo } from '@/components/shared/Logo'

export function Header() {
  const navigation = useNavigation()

  function handleToggleDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer())
  }

  return (
    <XStack alignItems="center" justifyContent="space-between">
      <Button
        background="transparent"
        ml={-8}
        p={8}
        onPress={handleToggleDrawer}
      >
        <ListBullets color={getTokens().color.blue800.val} />
      </Button>
      <Logo />
    </XStack>
  )
}
