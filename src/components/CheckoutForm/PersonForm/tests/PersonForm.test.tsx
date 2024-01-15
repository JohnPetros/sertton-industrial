import { screen } from '@testing-library/react-native'

import { PersonForm } from '..'

import { render } from '@/_tests_/customs/customRender'
import { initializeApi } from '@/services/api'
import { axiosApi } from '@/services/api/axios'

jest.mock('expo-router')

const onSuccessMock = jest.fn()

describe('PersonForm component', () => {
  beforeAll(() => initializeApi(axiosApi))

  it('should render person form tabs', () => {
    render(<PersonForm onSuccess={onSuccessMock} />)

    expect(screen.getByText(/Pessoa física/i)).toBeTruthy()
    expect(screen.getByText(/Pessoa jurídica/i)).toBeTruthy()
  })
})
