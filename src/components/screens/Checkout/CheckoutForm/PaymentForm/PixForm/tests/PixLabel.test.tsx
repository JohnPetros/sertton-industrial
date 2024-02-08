import { View } from 'react-native'
import { screen } from '@testing-library/react-native'

import { PixLabel } from '../PixLabel'

import { render } from '@/_tests_/customs/customRender'

const CurrencyCircleDollar = () => <View />

jest.mock('phosphor-react-native', () => ({
  CurrencyCircleDollar: () => {
    return <CurrencyCircleDollar />
  },
}))

describe('PixLabel component', () => {
  it('should render label', () => {
    render(<PixLabel />)

    expect(screen.getByText('Pix')).toBeTruthy()
  })
})
