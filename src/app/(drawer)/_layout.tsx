import { Drawer } from 'expo-router/drawer'

import { Sidebar } from '@/components/Sidebar'
import { useCatogories } from '@/hooks/useCategories'

export default function DrawerLayout() {
  const { categories } = useCatogories()

  return (
    <Drawer
      drawerContent={() =>
        categories ? <Sidebar categories={categories} /> : null
      }
    >
      <Drawer.Screen
        name="(tabs)"
        options={{ headerShown: false, swipeEdgeWidth: 0 }}
      />
    </Drawer>
  )
}
