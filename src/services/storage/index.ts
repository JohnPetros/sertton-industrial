import type { Storage } from '@/@types/storage'
import { cartStorage } from '@/services/storage/cartStorage'

let storage: Storage

export function initializeStorage(initialStorage: Storage) {
  storage = initialStorage
}

export function useStorage() {
  return {
    ...cartStorage(storage),
  }
}
