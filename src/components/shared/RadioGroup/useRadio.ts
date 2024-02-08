import { useState } from 'react'

import { waitFor } from '@/utils/helpers/wait'

export function useRadio() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleRadio() {
    setIsLoading(true)

    await waitFor(1000)

    setIsLoading(false)
  }

  return {
    isLoading,
    handleRadio,
  }
}
