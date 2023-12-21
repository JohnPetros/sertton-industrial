import { render, screen } from '@testing-library/react-native'
import { TamaguiProvider } from 'providers/TamaguiProvider'

import { Step } from '@/components/Checkout/Steps/Step'

describe('Step component', () => {
  it('should return gray color when is not active', () => {
    const labelMock = 'label mock'
    const numberMock = 1

    render(
      <TamaguiProvider>
        <Step
          isActive={true}
          label={labelMock}
          number={numberMock}
          width={240}
        />
      </TamaguiProvider>
    )

    const label = screen.getByText(labelMock)
    const number = screen.getByText(String(numberMock))

    expect(label).toBeTruthy()
    expect(number).toBeTruthy()
  })
})
