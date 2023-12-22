import { useMemo } from 'react'

import type { Storage } from '@/@types/storage'
import { customerStorage } from '@/services/storage/customerStorage'

let storage: Storage

export function initializeStorage(initialStorage: Storage) {
  storage = initialStorage
}

export function useStorage() {
  if (!storage) {
    throw new Error('useStorage must be used with a storage')
  }

  return useMemo(
    () => ({
      ...customerStorage(storage),
    }),
    [storage]
  )
}
