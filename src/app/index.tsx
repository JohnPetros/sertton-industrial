import { Redirect } from 'expo-router'

import { ROUTES } from '@/utils/constants/routes'

export default function Index() {
  return <Redirect href={ROUTES.cart} />
}
