import { IStorageProvider } from '@/providers/interfaces/IStorageProvider'

const storage: Array<{ key: string; value: string }> = []

export const storageMock: IStorageProvider = {
  async get(key: string) {
    const data = storage.find((data) => data.key === key)
    return data?.value ?? null
  },

  async set(key: string, value: string) {
    storage.push({ key, value })
  },

  async delete(key: string) {
    storage.filter((data) => data.key !== key)
  },
}
