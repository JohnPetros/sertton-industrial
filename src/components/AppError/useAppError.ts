import { useCallback, useEffect, useState } from 'react'

export function useAppError(error = '') {
  const [message, setMessage] = useState('')
  const [statusCode, setStatusCode] = useState('')
  const [, setAppError] = useState()

  const throwAppError = useCallback((message: string, statusCode = 500) => {
    setAppError(() => {
      throw new Error(`@message:${message};@statusCode:${statusCode}`)
    })
  }, [])

  function handleAppError(error: Error) {
    console.error(error)
  }

  useEffect(() => {
    if (error && !message && !statusCode) {
      if (!error.includes('@')) {
        setMessage('Erro desconhecido')
        return
      }

      const [message, statusCode] = error.split(';')

      setMessage(message.split(':')[1])
      setStatusCode(statusCode.split(':')[1])
    }
  }, [error, message, statusCode])

  return {
    throwAppError,
    handleAppError,
    message,
    statusCode,
  }
}
