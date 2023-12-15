import { useState } from 'react'

export function useRadio() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleRadio() {
    setIsLoading(true)

    await new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false)
        resolve(true)
      }, 2000)
    })

    setIsLoading(false)
  }

  return {
    isLoading,
    handleRadio,
  }
}
