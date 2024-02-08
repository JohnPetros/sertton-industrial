import { Text } from 'react-native'
import { screen } from '@testing-library/react-native'

import { CheckoutForm } from '..'

import { render } from '@/_tests_/customs/customRender'
import {
  CustomerContext,
  CustomerContextValue,
} from '@/contexts/CustomerContext'
import {
  CheckoutStoreProps,
  initialCheckoutStoreState,
  useCheckoutStore,
} from '@/stores/checkoutStore'

const Step1 = () => <Text>Step 1</Text>
const Step2 = () => <Text>Step 2</Text>
const Step3 = () => <Text>Step 3</Text>

jest.mock('../Step1', () => ({
  Step1: () => {
    return <Step1 />
  },
}))

jest.mock('../Step2', () => ({
  Step2: () => {
    return <Step2 />
  },
}))

jest.mock('../Step3', () => ({
  Step3: () => {
    return <Step3 />
  },
}))

function setStep(step: number) {
  useCheckoutStore.setState({
    state: { step },
  } as unknown as CheckoutStoreProps)
}

function renderComponent() {
  render(
    <CustomerContext.Provider
      value={{ customer: null } as unknown as CustomerContextValue}
    >
      <CheckoutForm />
    </CustomerContext.Provider>
  )
}

describe('CheckForm component', () => {
  beforeEach(() => {
    useCheckoutStore.setState({ state: initialCheckoutStoreState })
  })

  it('should render step 1', () => {
    setStep(1)

    renderComponent()

    expect(screen.getByText('Step 1'))
  })

  it('should render step 2', () => {
    setStep(2)

    renderComponent()

    expect(screen.getByText('Step 2'))
  })

  it('should render step 3', () => {
    setStep(3)

    renderComponent()
    expect(screen.getByText('Step 3'))
  })
})
