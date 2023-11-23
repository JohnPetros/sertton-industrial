import { Stack } from 'expo-router'

export default function DrawerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="checkout" />
    </Stack>
  )
}
