import { useQuery } from 'react-query'

import { FilterType, Tag } from '@/@types/tag'
import { useApi } from '@/services/api'
import { useProductsFilterStore } from '@/stores/productsFilterStore'

export function useTags() {
  const api = useApi()
  const { data: brands } = useQuery('brands', () => api.getBrands())

  const setBrandsIds = useProductsFilterStore(
    (store) => store.actions.setBrandsIds
  )
  const selectedBrandsIds = useProductsFilterStore(
    (store) => store.state.brandsIds
  )

  function handleTag(filterType: FilterType, tagId: string) {
    if (filterType === 'brand') {
      setBrandsIds(
        selectedBrandsIds.filter((brandId) => brandId !== Number(tagId))
      )
    }
  }

  const tags: Tag[] = brands
    ? [
        ...brands
          .filter((brand) => selectedBrandsIds.includes(brand.id))
          .map(
            (brand) =>
              ({
                id: brand.id.toString(),
                type: 'brand',
                title: brand.name,
              } as Tag)
          ),
      ]
    : []

  return {
    brands: brands ?? [],
    tags,
    handleTag,
  }
}
