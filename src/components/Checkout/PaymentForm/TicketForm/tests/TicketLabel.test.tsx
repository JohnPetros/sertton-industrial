import { screen } from '@testing-library/react-native'

import { TicketLabel } from '../TicketLabel'

import { render } from '@/_tests_/customs/customRender'

describe('TicketLabel component', () => {
  it('should render label', () => {
    render(<TicketLabel />)

    expect(screen.getByText('Boleto')).toBeTruthy()
  })
})
