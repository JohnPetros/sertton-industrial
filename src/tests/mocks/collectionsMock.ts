import { Collection } from '@/@types/collection'
import { productsMock } from '@/tests/mocks/productsMock'

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
