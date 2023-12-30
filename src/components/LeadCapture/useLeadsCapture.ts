import { useState } from 'react'

import { useToast } from '@/components/Toast/useToast'
import { emailSchema } from '@/libs/zod'
import { useApi } from '@/services/api'

export function useLeadsCapture() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const api = useApi()
  const toast = useToast()

  async function handleSubmit() {
    const emailValidation = emailSchema.safeParse(email)

    if (emailValidation.success) {
      try {
        await api.saveLead(email)
        setIsLoading(true)
        toast.show('Inscrição realizada com sucesso', 'success')
      } catch (error) {
        const { errors } = api.handleError<{
          errors: { email: string[] }
        }>(error)
        toast.show(errors.email[0], 'error')
      } finally {
        setIsLoading(false)
      }
    } else {
      setError('Insira um e-mail válido')
    }
  }

  function handleEmailChange(value: string) {
    setEmail(value)
    setError('')
  }

  return {
    email,
    error,
    isLoading,
    handleSubmit,
    handleEmailChange,
  }
}
