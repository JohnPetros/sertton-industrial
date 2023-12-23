import { useState } from 'react'

import { emailSchema } from '@/libs/zod'
import { useApi } from '@/services/api'

export function useLeadsCapture() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const api = useApi()

  async function handleSubmit() {
    const emailValidation = emailSchema.safeParse(email)

    if (emailValidation.success) {
      await api.saveLead(email)
    } else {
      setError(emailValidation.error.format()._errors[0])
    }
  }

  function handleEmailChange(value: string) {
    setEmail(value)
    setError('')
  }

  return {
    email,
    error,
    handleSubmit,
    handleEmailChange,
  }
}
