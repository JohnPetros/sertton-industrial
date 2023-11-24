import type { Storage } from '@/@types/storage'
import { cartStorage } from '@/services/storage/cartStorage'

let storage: Storage

export function initializeStorage(initialStorage: Storage) {
  storage = initialStorage
}

export function useStorage() {
  if (!storage) {
    throw new Error('useStorage must be used with a storage')
  }

  return {
    ...cartStorage(storage),
  }
}
