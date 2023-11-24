import { Product } from '@/@types/product'
import { brandsMock } from '@/tests/mocks/brandsMock'
import { skusMock } from '@/tests/mocks/skusMock'

export const productsMock: Product[] = [
  {
    id: 1,
    slug: 'slug-1',
    sku: 1001,
    name: 'Produto 1',
    description: 'Descrição do Produto 1',
    images: {
      data: [
        {
          small: {
            width: 100,
            height: 100,
            url: 'http://example.com/small_image_1.jpg',
          },
          thumb: {
            width: 50,
            height: 50,
            url: 'http://example.com/thumb_image_1.jpg',
          },
          medium: {
            width: 300,
            height: 300,
            url: 'http://example.com/medium_image_1.jpg',
          },
          large: {
            width: 800,
            height: 800,
            url: 'http://example.com/large_image_1.jpg',
          },
          xLarge: {
            width: 1000,
            height: 1000,
            url: 'http://example.com/large_image_1.jpg',
          },
        },
      ],
    },
    skus: {
      data: skusMock,
    },
    texts: {
      data: {
        description: 'mock description',
        specifications: 'mock specifications',
      },
    },
    brand: {
      data: brandsMock[0],
    },
  },
  {
    id: 2,
    slug: 'slug-2',
    sku: 1002,
    name: 'Produto 2',
    description: 'Descrição do Produto 2',
    images: {
      data: [
        {
          small: {
            width: 120,
            height: 120,
            url: 'http://example.com/small_image_2.jpg',
          },

          thumb: {
            width: 60,
            height: 60,
            url: 'http://example.com/thumb_image_2.jpg',
          },
          medium: {
            width: 400,
            height: 400,
            url: 'http://example.com/medium_image_2.jpg',
          },
          large: {
            width: 1000,
            height: 1000,
            url: 'http://example.com/large_image_2.jpg',
          },
          xLarge: {
            width: 1000,
            height: 10000,
            url: 'http://example.com/large_image_2.jpg',
          },
        },
      ],
    },
    skus: {
      data: skusMock,
    },
    texts: {
      data: {
        description: 'mock description',
        specifications: 'mock specifications',
      },
    },
    brand: {
      data: brandsMock[1],
    },
  },
  {
    id: 3,
    slug: 'slug-3',
    sku: 1003,
    name: 'Produto 3',
    description: 'Descrição do Produto 3',
    images: {
      data: [
        {
          small: {
            width: 90,
            height: 90,
            url: 'http://example.com/small_image_3.jpg',
          },

          thumb: {
            width: 45,
            height: 45,
            url: 'http://example.com/thumb_image_3.jpg',
          },
          medium: {
            width: 350,
            height: 350,
            url: 'http://example.com/medium_image_3.jpg',
          },
          large: {
            width: 900,
            height: 900,
            url: 'http://example.com/large_image_3.jpg',
          },
          xLarge: {
            width: 1000,
            height: 1000,
            url: 'http://example.com/large_image_3.jpg',
          },
        },
      ],
    },
    skus: {
      data: skusMock,
    },
    texts: {
      data: {
        description: 'mock description',
        specifications: 'mock specifications',
      },
    },
    brand: {
      data: brandsMock[2],
    },
  },
  {
    id: 4,
    slug: 'slug-4',
    sku: 1004,
    name: 'Produto 4',
    description: 'Descrição do Produto 4',
    images: {
      data: [
        {
          small: {
            width: 90,
            height: 90,
            url: 'http://example.com/small_image_4.jpg',
          },

          thumb: {
            width: 45,
            height: 45,
            url: 'http://example.com/thumb_image_4.jpg',
          },
          medium: {
            width: 450,
            height: 450,
            url: 'http://example.com/medium_image_4.jpg',
          },
          large: {
            width: 900,
            height: 900,
            url: 'http://example.com/large_image_4.jpg',
          },
          xLarge: {
            width: 1000,
            height: 1000,
            url: 'http://example.com/large_image_4.jpg',
          },
        },
      ],
    },
    skus: {
      data: skusMock,
    },
    texts: {
      data: {
        description: 'mock description',
        specifications: 'mock specifications',
      },
    },
    brand: {
      data: brandsMock[2],
    },
  },
  {
    id: 5,
    slug: 'slug-5',
    sku: 1005,
    name: 'Produto 5',
    description: 'Descrição do Produto 5',
    images: {
      data: [
        {
          small: {
            width: 90,
            height: 90,
            url: 'http://example.com/small_image_5.jpg',
          },

          thumb: {
            width: 45,
            height: 45,
            url: 'http://example.com/thumb_image_5.jpg',
          },
          medium: {
            width: 550,
            height: 550,
            url: 'http://example.com/medium_image_5.jpg',
          },
          large: {
            width: 900,
            height: 900,
            url: 'http://example.com/large_image_5.jpg',
          },
          xLarge: {
            width: 1000,
            height: 1000,
            url: 'http://example.com/large_image_5.jpg',
          },
        },
      ],
    },
    skus: {
      data: skusMock,
    },
    texts: {
      data: {
        description: 'mock description',
        specifications: 'mock specifications',
      },
    },
    brand: {
      data: brandsMock[2],
    },
  },
]
