import { Drawer } from 'expo-router/drawer'

import { Sidebar } from '@/components/Sidebar'

export default function DrawerLayout() {
  return (
    <Drawer drawerContent={() => <Sidebar />}>
      <Drawer.Screen
        name="(tabs)"
        options={{ headerShown: false, swipeEdgeWidth: 0 }}
      />
    </Drawer>
  )
}
