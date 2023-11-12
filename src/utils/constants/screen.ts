import { Dimensions } from 'react-native'

import { TAB_BAR_HEIGHT } from '@/utils/constants/tabBarHeight'

const { width, height } = Dimensions.get('window')

export const SCREEN = {
  width,
  height,
  paddingX: 24,
  paddingBottom: TAB_BAR_HEIGHT * 2,
}
