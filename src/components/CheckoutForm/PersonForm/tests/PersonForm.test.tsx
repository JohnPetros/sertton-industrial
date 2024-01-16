import { screen } from '@testing-library/react-native'

import { PersonForm } from '..'

import { render } from '@/_tests_/customs/customRender'
import { initializeApiProvider } from '@/services/api'
import { axiosProvider } from '@/services/api/axios'
import { initializeValidation } from '@/services/validation'
import { zodProvider } from '@/services/validation/zod/index.ts'

jest.mock('expo-router')

const onSuccessMock = jest.fn()

describe('PersonForm component', () => {
  beforeAll(() => {
    initializeApiProvider(axiosProvider)
    initializeValidation(zodProvider)
  })

  it('should render person form tabs', () => {
    render(<PersonForm onSuccess={onSuccessMock} />)

    expect(screen.getByText(/Pessoa física/i)).toBeTruthy()
    expect(screen.getByText(/Pessoa jurídica/i)).toBeTruthy()
  })
})
