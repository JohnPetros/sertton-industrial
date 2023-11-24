import type { Storage } from '@/@types/storage'
import { ICartStorage } from '@/services/storage/interfaces/ICartStorage'

export function cartStorage(storage: Storage): ICartStorage {
  return {
    async getItem(name) {
      const item = await storage.get(name)
      return item ?? null
    },

    async setItem(name, value) {
      storage.set(name, value)
    },

    async removeItem(name) {
      storage.delete(name)
    },
  }
}
