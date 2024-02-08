import { useApi } from '@/services/api'
import { useInMemoryApi } from '@/services/api/in-memory'
import { IApi } from '@/services/api/interfaces/IApi'

const mockedUseApi = jest.mocked(useApi)

export function useApiMock(customApiMock?: Partial<IApi> | null) {
  const inMemoryApi = useInMemoryApi()

  mockedUseApi.mockReturnValue({
    ...inMemoryApi,
    ...customApiMock,
  })

  const apiMock = mockedUseApi()

  return apiMock
}
