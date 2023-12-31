import { Collection } from '@/@types/collection'
import { productsMock } from '@/__tests__/mocks/productsMock'

export const collectionsMock: Collection[] = [
  {
    id: 1,
    name: 'Coleção Verão',
    products: productsMock,
  },
  {
    id: 2,
    name: 'Coleção Inverno',
    products: productsMock,
  },
  {
    id: 3,
    name: 'Coleção Esportiva',
    products: productsMock,
  },
]
