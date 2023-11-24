import type { DateProvider } from '@/@types/dateProvider'

let dateProvider: DateProvider

export function initializeDateProvider(initialDateProvider: DateProvider) {
  dateProvider = initialDateProvider
}

export function useDate(): DateProvider {
  if (!dateProvider) {
    throw new Error('useDate Must be used with a DateProvider')
  }

  return dateProvider
}
