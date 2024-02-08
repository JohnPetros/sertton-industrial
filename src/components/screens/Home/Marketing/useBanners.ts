import { useAppError } from '@/components/shared/AppError/useAppError'
import { useApi } from '@/services/api'
import { useCache } from '@/services/cache'
import { CACHE } from '@/utils/constants/cache'

export function useBanners() {
  const api = useApi()
  const { throwAppError } = useAppError()

  const { data, isLoading, error } = useCache({
    key: CACHE.keys.banners,
    fetcher: api.getBanners,
  })

  if (error) {
    api.handleError(error)
    throwAppError('Erro ao mostrar banners')
  }

  return {
    banners: data,
    areBannersLoading: isLoading,
  }
}
