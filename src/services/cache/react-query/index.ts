import { useQuery as useReactQuery, useQueryClient } from 'react-query'

import { Cache } from '../types/cache'

export function useReactQueryCache<Data>({
  key,
  fetcher,
  dependencies = [],
  isEnabled = true,
}: Cache<Data>) {
  const queryClient = useQueryClient()

  const { data, error, isLoading } = useReactQuery({
    queryKey: [key, ...dependencies],
    queryFn: fetcher,
    enabled: isEnabled,
  })

  function mutateCache(newData: Data) {
    queryClient.setQueryData(key, newData)
  }

  return {
    data,
    error,
    isLoading,
    mutate: mutateCache,
  }
}
