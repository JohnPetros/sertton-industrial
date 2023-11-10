import { Tabs, useRouter } from 'expo-router'
import {
  House,
  MagnifyingGlass,
  ShoppingBag,
  ShoppingCart,
} from 'phosphor-react-native'
import { View } from 'tamagui'

import { Button } from '@/components/Button'
import { ItemsQuantityBadge } from '@/components/ItemsQuantityBadge'
import { useCartStore } from '@/stores/cartStore'
import { TAB_BAR_HEIGHT } from '@/utils/constants/tabBarHeight'

export default function TabsLayout() {
  const router = useRouter()
  const cartItemsQuantity = useCartStore((store) => store.state.items.length)

  function handleTabButton(screen: string) {
    router.push(`/(drawer)/(tabs)/${screen}`)
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: TAB_BAR_HEIGHT,
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
            <View position="relative">
              {cartItemsQuantity && (
                <ItemsQuantityBadge
                  quantity={cartItemsQuantity}
                  isActive={focused}
                />
              )}
              <Button
                background={focused ? 'primary' : 'outline'}
                w={40}
                h={40}
                icon={<ShoppingCart size={24} />}
                onPress={() => handleTabButton('cart')}
              />
            </View>
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
