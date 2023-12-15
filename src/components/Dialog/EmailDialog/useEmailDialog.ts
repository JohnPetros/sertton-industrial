import { useRef, useState } from 'react'

import { DialogRef } from '@/components/Dialog'
import { useCustomerContext } from '@/contexts/CustomerContext'
import { emailSchema } from '@/libs/zod'

export function useEmailDialog() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const { fetchCustomerByEmail } = useCustomerContext()
  const dialogRef = useRef<DialogRef | null>(null)

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

  function handleSubmit() {
    const emailValidation = emailSchema.safeParse(email)

    if (emailValidation.success) {
      fetchCustomerByEmail(email)
    } else {
      setError(emailValidation.error.format()._errors[0])
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
