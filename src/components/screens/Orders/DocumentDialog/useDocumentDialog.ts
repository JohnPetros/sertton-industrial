import { useRef, useState } from 'react'

import type { PersonType } from '@/@types/customer'
import type { DialogRef } from '@/components/shared/Dialog/types/DialogRef'
import { useValidation } from '@/services/validation'

export function useDocumentDialog(
  onValidateDocument: (
    validatedDocument: string,
    personType: PersonType
  ) => void
) {
  const [cpf, setCpf] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [personType, setPersonType] = useState<PersonType>('natural')
  const [error, setError] = useState('')
  const dialogRef = useRef<DialogRef | null>(null)

  const validation = useValidation()

  function open() {
    dialogRef.current?.open()
  }

  function close() {
    dialogRef.current?.close()
  }

  function handleCpfChange(value: string) {
    setCpf(value)
    setError('')
  }

  function handleCnpjChange(value: string) {
    setCnpj(value)
    setError('')
  }

  function handleTabsChange(personType: string) {
    setPersonType(personType as PersonType)
    setError('')
  }

  async function handleSubmit() {
    const documentValidation =
      personType === 'natural'
        ? validation.validateCpf(cpf)
        : validation.validateCnpj(cnpj)

    if (documentValidation.isValid) {
      onValidateDocument(personType === 'natural' ? cpf : cnpj, personType)
    } else {
      setError(documentValidation.errors[0])
    }
  }

  return {
    cpf,
    cnpj,
    error,
    personType,
    dialogRef,
    open,
    close,
    handleSubmit,
    handleCpfChange,
    handleCnpjChange,
    handleTabsChange,
  }
}
