import { DrawerActions, useNavigation } from '@react-navigation/native'
import { Link } from 'expo-router'
import { ListBullets } from 'phosphor-react-native'
import { Button, getTokens, Image, XStack } from 'tamagui'

export function Header() {
  const navigation = useNavigation()

  function handleToggleDrawer() {
    navigation.dispatch(DrawerActions.toggleDrawer())
  }

  return (
    <XStack alignItems="center" justifyContent="space-between">
      <Button unstyled ml={-8} p={8} onPress={handleToggleDrawer}>
        <ListBullets color={getTokens().color.blue800.val} />
      </Button>
      <Link href="/(drawer)/(tabs)/home" asChild>
        <Image source={require('@/assets/sertton-logo.png')} w={96} h={40} />
      </Link>
    </XStack>
  )
}