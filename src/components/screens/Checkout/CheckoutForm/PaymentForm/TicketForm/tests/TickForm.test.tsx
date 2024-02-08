import { fireEvent, screen } from '@testing-library/react-native'

import { TicketForm } from '..'

import { render } from '@/_tests_/customs/customRender'
import { formatPrice } from '@/utils/helpers/formatPrice'

const onGenerateMock = jest.fn()
const totalMock = 99.99

describe('TicketForm component', () => {
  it('should render price formated', () => {
    render(<TicketForm total={totalMock} onGenerate={onGenerateMock} />)

    expect(
      screen.getByText('Valor no boleto: ' + formatPrice(totalMock))
    ).toBeTruthy()
  })

  it('should call onGenerate function on press generate pix button', () => {
    render(<TicketForm total={totalMock} onGenerate={onGenerateMock} />)

    fireEvent.press(screen.getByTestId('generate-ticket-button'))

    expect(onGenerateMock).toHaveBeenCalled()
  })
})
