import { useRef, useState } from 'react'

import { DialogRef } from '../Dialog/types/DialogRef'

import { useCustomerContext } from '@/contexts/CustomerContext'
import { useValidation } from '@/services/validation'

export function useEmailDialog() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const { fetchCustomerByEmail } = useCustomerContext()
  const dialogRef = useRef<DialogRef | null>(null)
  const validation = useValidation()

  function open() {
    dialogRef.current?.open()
  }

  function close() {
    dialogRef.current?.close()
  }

  function handleEmailChange(value: string) {
    setEmail(value)
    setError('')
  }

  async function handleSubmit() {
    const emailValidation = validation.validateEmail(email)

    if (emailValidation.isValid) {
      const hasCustomer = await fetchCustomerByEmail(email)

      if (!hasCustomer) setError('Cadastro não encontrado com esse e-mail')
    } else {
      setError(emailValidation.errors[0])
    }
  }

  return {
    email,
    error,
    dialogRef,
    open,
    close,
    handleSubmit,
    handleEmailChange,
  }
}
