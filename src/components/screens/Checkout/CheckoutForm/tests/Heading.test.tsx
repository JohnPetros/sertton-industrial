import { screen } from '@testing-library/react-native'

import { render } from '@/_tests_/customs/customRender'
import { Heading } from '@/components/CheckoutForm/Heading'

describe('Heading component', () => {
  it('should step data', () => {
    const step = 1
    const title = 'title mock'
    const subtitle = 'subtitle mock'

    render(<Heading step={step} title={title} subtitle={subtitle} />)

    expect(screen.getByText(String(step))).toBeTruthy()
    expect(screen.getByText(title)).toBeTruthy()
    expect(screen.getByText(subtitle)).toBeTruthy()
  })
})
