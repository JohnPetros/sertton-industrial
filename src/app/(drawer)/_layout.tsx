import { Drawer } from 'expo-router/drawer'

import { Sidebar } from 'ui/layout/Sidebar'

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
