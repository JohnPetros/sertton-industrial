import { fireEvent, screen, waitFor } from '@testing-library/react-native'

import { render } from '@/_tests_/customs/customRender'
import { Step } from '@/components/Checkout/Steps/Step'
import { green } from '@/styles/colors'

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

    expect(step.props.style.backgroundColor).toBe(green.green500)
  })

  it('should render spinner on press', async () => {
    const labelMock = 'label mock'
    const numberMock = 1

    render(
      <Step
        isActive={false}
        label={labelMock}
        number={numberMock}
        width={240}
      />
    )

    const step = screen.getByTestId('step-circle')

    fireEvent.press(step)

    const spinner = await screen.findByTestId('step-circle')

    await waitFor(() => {
      expect(spinner).toBeTruthy()
    })
  })
})
