import { Tabs, useRouter } from 'expo-router'
import {
  House,
  MagnifyingGlass,
  ShoppingBag,
  ShoppingCart,
} from 'phosphor-react-native'

import { Button } from '@/components/Button'

export default function TabsLayout() {
  const router = useRouter()

  function handleTabButton(screen: string) {
    router.push(`/(drawer)/(tabs)/${screen}`)
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: 64,
        },
      }}
      initialRouteName="products"
    >
      <Tabs.Screen
        name="products"
        options={{
          tabBarIcon: ({ focused }) => (
            <Button
              background={focused ? 'primary' : 'outline'}
              w={40}
              h={40}
              icon={<MagnifyingGlass size={24} />}
              onPress={() => handleTabButton('products')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Button
              background={focused ? 'primary' : 'outline'}
              w={40}
              h={40}
              icon={<House size={24} />}
              onPress={() => handleTabButton('home')}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          tabBarIcon: ({ focused }) => (
            <Button
              background={focused ? 'primary' : 'outline'}
              w={40}
              h={40}
              icon={<ShoppingCart size={24} />}
              onPress={() => handleTabButton('cart')}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          tabBarIcon: ({ focused }) => (
            <Button
              background={focused ? 'primary' : 'outline'}
              w={40}
              h={40}
              icon={<ShoppingBag size={24} />}
              onPress={() => handleTabButton('orders')}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="product/[product_id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  )
}
