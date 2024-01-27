import { useQuery } from 'react-query'

import { useAppError } from '@/components/AppError/useAppError'
import { useApi } from '@/services/api'

export function useBanners() {
  const api = useApi()
  const { throwAppError } = useAppError()

  const { data, isLoading } = useQuery('banners', () => api.getBanners(), {
    onError: (error) => {
      api.handleError(error)
      throwAppError('Erro ao mostrar banners')
    },
  })

  return {
    banners: data,
    areBannersLoading: isLoading,
  }
}
