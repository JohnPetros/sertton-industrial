import type { IDateProvider } from '@/providers/interfaces/IDateProvider'

let dateProvider: IDateProvider

export function initializeDateProvider(dateProviderInstance: IDateProvider) {
  dateProvider = dateProviderInstance
}

export function useDate(): IDateProvider {
  if (!dateProvider) {
    throw new Error('useDate Must be used with a DateProvider')
  }

  return dateProvider
}
