import { fireEvent, screen } from '@testing-library/react-native'
import { usePathname } from 'expo-router'

import { render } from '@/_tests_/customs/customRender'
import { SubmitButton } from '@/components/CheckoutForm/PersonForm/SubmitButton'

jest.mock('expo-router')

const submitMock = jest.fn()

describe('SubmitButton component', () => {
  it('should render spinner when is submiting', () => {
    render(<SubmitButton handleSubmit={submitMock} isSubmitting={true} />)

    const spinner = screen.getByTestId('spinner')

    expect(spinner).toBeTruthy()
  })

  it('should call submit function on press', () => {
    render(<SubmitButton handleSubmit={submitMock} isSubmitting={true} />)

    const button = screen.getByTestId('submit-button')

    fireEvent.press(button)

    expect(submitMock).toHaveBeenCalled()
  })

  it('should call submit function on press', () => {
    const usePathnameMock = jest.mocked(usePathname)

    usePathnameMock.mockReturnValueOnce('/profile')

    render(<SubmitButton handleSubmit={submitMock} isSubmitting={true} />)

    const button = screen.getByTestId('submit-button')

    fireEvent.press(button)

    expect(submitMock).toHaveBeenCalled()
  })

  it('should render title "Continuar" on checkout screen', async () => {
    const usePathnameMock = jest.mocked(usePathname)

    usePathnameMock.mockReturnValueOnce('/checkout')

    render(<SubmitButton handleSubmit={submitMock} isSubmitting={false} />)

    expect(screen.getByText('Continuar')).toBeTruthy()
  })

  it('should render title "Atualizar cadastro" on profile screen', async () => {
    const usePathnameMock = jest.mocked(usePathname)

    usePathnameMock.mockReturnValueOnce('/profile')

    render(<SubmitButton handleSubmit={submitMock} isSubmitting={false} />)

    expect(screen.getByText('Atualizar cadastro')).toBeTruthy()
  })
})
