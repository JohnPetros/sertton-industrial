import { useMemo } from 'react'

import type { IStorageProvider } from '@/providers/interfaces/IStorageProvider'
import { customerStorage } from '@/services/storage/customerStorage'

let storage: IStorageProvider

export function initializeStorageProvider(storageProvider: IStorageProvider) {
  storage = storageProvider
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
