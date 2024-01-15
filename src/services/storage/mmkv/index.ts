import { MMKV } from 'react-native-mmkv'

import type { IStorageProvider } from '@/providers/interfaces/IStorageProvider'
import { STORAGE_ID } from '@/services/storage/config/keys'

const storage = new MMKV({ id: STORAGE_ID })

export const mmkvProvider: IStorageProvider = {
  async get(key: string): Promise<string | null> {
    const item = storage.getString(key)
    return item ?? null
  },

  async set(key: string, value: string) {
    storage.set(key, value)
  },

  async delete(key: string) {
    storage.delete(key)
  },
}
