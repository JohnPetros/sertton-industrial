'use client'

import { Cache } from './types/cache'
import { useReactQueryCache } from './react-query'

export function useCache<Data>(cache: Cache<Data>) {
  return useReactQueryCache(cache)
}
