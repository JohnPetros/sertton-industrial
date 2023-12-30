import { screen } from '@testing-library/react-native'

import { Step } from '@/components/Checkout/Steps/Step'
import { render } from '@/tests/render'

describe('Step component', () => {
  it('should render properly', () => {
    const labelMock = 'label mock'
    const numberMock = 1

    render(
      <Step isActive={true} label={labelMock} number={numberMock} width={240} />
    )

    const label = screen.getByText(labelMock)
    const number = screen.getByText(String(numberMock))

    expect(label).toBeTruthy()
    expect(number).toBeTruthy()
  })

  it('should have active color when is active', () => {
    const labelMock = 'label mock'
    const numberMock = 1

    render(
      <Step isActive={true} label={labelMock} number={numberMock} width={240} />
    )

    const step = screen.getByTestId('step-circle')

    expect(step.props.style.backgroundColor).toBe('color mock')
  })
})
