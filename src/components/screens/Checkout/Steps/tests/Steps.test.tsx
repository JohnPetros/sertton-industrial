import { screen } from '@testing-library/react-native'

import { Steps } from '..'

import { render } from '@/_tests_/customs/customRender'

describe('Steps component', () => {
  it('should render steps', () => {
    render(<Steps />)

    expect(screen.getByText(/Cadastro/i)).toBeTruthy()
    expect(screen.getByText(/Entrega/i)).toBeTruthy()
    expect(screen.getByText(/Pagamento/i)).toBeTruthy()
  })
})
