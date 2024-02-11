import { View } from 'react-native'

const Icon = () => <View />

jest.mock('phosphor-react-native', () => ({
  CaretDown: () => {
    return <Icon />
  },
  CaretUp: () => {
    return <Icon />
  },
  Scroll: () => {
    return <Icon />
  },
  User: () => {
    return <Icon />
  },
  Lock: () => {
    return <Icon />
  },
  Truck: () => {
    return <Icon />
  },
}))
