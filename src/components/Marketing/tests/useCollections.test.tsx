import { renderHook, waitFor } from '@testing-library/react-native'

import { useBanners } from '../useBanners'

import { useApiMock } from '@/_tests_/mocks/apiMock'
import { CacheWrapper } from '@/_tests_/wrappers/CacheWrapper'

jest.mock('@/services/api')

async function renderUseBannersHook() {
  return await waitFor(() => renderHook(useBanners, { wrapper: CacheWrapper }))
}

describe('useBanner hook', () => {
  it('should return collections from Api', async () => {
    const apiMock = useApiMock()

    const collectionsMock = await apiMock.getCollections()

    const { result } = await renderUseBannersHook()

    expect(result.current.banners).toEqual(collectionsMock)
  })
})
