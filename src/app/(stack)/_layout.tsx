import { Stack } from 'expo-router'

export default function StackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="profile" />
    </Stack>
  )
}
