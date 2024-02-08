import { MMKV } from 'react-native-mmkv'

import type { IStorageProvider } from '@/providers/interfaces/IStorageProvider'
import { STORAGE } from '@/services/storage/constants/keys'

const storage = new MMKV({ id: STORAGE.id })

export const mmkvStorageProvider: IStorageProvider = {
  async getItem(key: string): Promise<string | null> {
    const item = storage.getString(key)
    return item ?? null
  },

  async setItem(key: string, value: string) {
    storage.set(key, value)
  },

  async removeItem(key: string) {
    storage.delete(key)
  },
}
