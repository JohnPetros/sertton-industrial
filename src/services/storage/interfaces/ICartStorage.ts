import { StateStorage } from 'zustand/middleware'

export interface ICartStorage extends StateStorage {
  setItem: (name: string, value: string) => Promise<void>
  getItem: (name: string) => Promise<string | null>
  removeItem: (name: string) => Promise<void>
}
