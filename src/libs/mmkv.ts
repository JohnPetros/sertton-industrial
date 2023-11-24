import { MMKV } from 'react-native-mmkv'

import type { Storage } from '@/@types/storage'
import { STORAGE_ID } from '@/services/storage/keys'

const storage = new MMKV({ id: STORAGE_ID })

export const mmkvStorage: Storage = {
  async get(key: string): Promise<string | null> {
    const item = storage.getString(key)
    console.log(item)
    return item ?? null
  },

  async set(key: string, value: string) {
    storage.set(key, value)
  },

  async delete(key: string) {
    storage.delete(key)
  },
}
