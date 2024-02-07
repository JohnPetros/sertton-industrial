// import type { IStorageProvider } from '@/providers/interfaces/IStorageProvider'
// import { ICartStorage } from '@/services/storage/interfaces/ICartStorage'

// export function cartStorage(storage: IStorageProvider): ICartStorage {
//   return {
//     async getItem(name) {
//       const item = await storage.get(name)
//       return item ?? null
//     },

//     async setItem(name, value) {
//       storage.set(name, value)
//     },

//     async removeItem(name) {
//       storage.delete(name)
//     },
//   }
// }
