import type { IStorageProvider } from '@/providers/interfaces/IStorageProvider'

let storage: IStorageProvider

export function initializeStorageProvider(storageProvider: IStorageProvider) {
  storage = storageProvider
}

export function useStorage() {
  if (!storage) {
    throw new Error('useStorage must be used with a storage')
  }

  return storage
}
