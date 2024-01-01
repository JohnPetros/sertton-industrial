import { productsMock } from '@/_tests_/mocks/productsMock'
import { Collection } from '@/@types/collection'

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
