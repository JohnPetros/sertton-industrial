import { screen } from '@testing-library/react-native'

import { PersonForm } from '..'

import { render } from '@/_tests_/customs/customRender'
import { initializeHttpProvider } from '@/services/api/http'
import { AxiosProvider } from '@/services/api/http/axios'
import { initializeValidationProvider } from '@/services/validation'
import { zodProvider } from '@/services/validation/zod/index.ts'

jest.mock('expo-router')

const onSuccessMock = jest.fn()

describe('PersonForm component', () => {
  beforeAll(() => {
    initializeHttpProvider(AxiosProvider)
    initializeValidationProvider(zodProvider)
  })

  it('should render person form tabs', () => {
    render(<PersonForm onSuccess={onSuccessMock} />)

    expect(screen.getByText(/Pessoa física/i)).toBeTruthy()
    expect(screen.getByText(/Pessoa jurídica/i)).toBeTruthy()
  })
})
