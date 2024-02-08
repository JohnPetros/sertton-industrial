import { fireEvent, screen } from '@testing-library/react-native'

import { PixForm } from '..'

import { render } from '@/_tests_/customs/customRender'
import { formatPrice } from '@/utils/helpers/formatPrice'

const onGenerateMock = jest.fn()
const totalMock = 99.99

describe('PixForm component', () => {
  it('should render price formated', () => {
    render(<PixForm total={totalMock} onGenerate={onGenerateMock} />)

    expect(
      screen.getByText('Valor no Pix: ' + formatPrice(totalMock))
    ).toBeTruthy()
  })

  it('should call onGenerate function on press generate pix button', () => {
    render(<PixForm total={totalMock} onGenerate={onGenerateMock} />)

    fireEvent.press(screen.getByTestId('generate-pix-button'))

    expect(onGenerateMock).toHaveBeenCalled()
  })
})
