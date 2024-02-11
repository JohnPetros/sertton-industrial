import { View } from 'react-native'

const Icon = () => <View />

jest.mock('phosphor-react-native', () => ({
  WhatsappLogo: () => {
    return <Icon />
  },
  Phone: () => {
    return <Icon />
  },
  EnvelopeSimple: () => {
    return <Icon />
  },
}))
