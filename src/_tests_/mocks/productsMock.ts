import { Product } from '@/@types/product'

export const productsMock: Product[] = [
  {
    id: 'prod-123',
    slug: 'product-slug',
    skuCode: 'SKU123',
    name: 'Example Product',
    description: 'This is an example product for demonstration purposes.',
    specifications: 'Example specifications for the product.',
    skus: [
      {
        id: 'sku-123',
        skuCode: 'SKU123',
        costPrice: 10.0,
        salePrice: 15.0,
        discountPrice: 12.0,
        weight: 1.5,
        height: 10,
        width: 10,
        length: 10,
        images: [
          {
            size: 'thumb',
            width: 100,
            height: 100,
            url: 'https://example.com/thumb.jpg',
          },
          {
            size: 'small',
            width: 200,
            height: 200,
            url: 'https://example.com/small.jpg',
          },
          {
            size: 'medium',
            width: 300,
            height: 300,
            url: 'https://example.com/medium.jpg',
          },
          {
            size: 'large',
            width: 400,
            height: 400,
            url: 'https://example.com/large.jpg',
          },
          {
            size: 'xLarge',
            width: 500,
            height: 500,
            url: 'https://example.com/xlarge.jpg',
          },
        ],
        variations: [
          {
            id: 'var-123',
            name: 'Color',
            value: 'Red',
          },
          {
            id: 'var-124',
            name: 'Size',
            value: 'M',
          },
        ],
        stock: 100,
        yampiToken: 'YAMPITOKEN123',
      },
    ],
    images: [
      {
        size: 'thumb',
        width: 100,
        height: 100,
        url: 'https://example.com/thumb.jpg',
      },
      {
        size: 'small',
        width: 200,
        height: 200,
        url: 'https://example.com/small.jpg',
      },
      {
        size: 'medium',
        width: 300,
        height: 300,
        url: 'https://example.com/medium.jpg',
      },
      {
        size: 'large',
        width: 400,
        height: 400,
        url: 'https://example.com/large.jpg',
      },
      {
        size: 'xLarge',
        width: 500,
        height: 500,
        url: 'https://example.com/xlarge.jpg',
      },
    ],
    brand: {
      id: 1,
      name: 'Example Brand',
    },
  },
  {
    id: 'prod-456',
    slug: 'another-product-slug',
    skuCode: 'SKU456',
    name: 'Another Example Product',
    description: 'This is another example product for demonstration purposes.',
    specifications: 'More example specifications for the product.',
    skus: [
      {
        id: 'sku-456',
        skuCode: 'SKU456',
        costPrice: 20.0,
        salePrice: 25.0,
        discountPrice: 22.0,
        weight: 2.5,
        height: 20,
        width: 20,
        length: 20,
        images: [
          {
            size: 'thumb',
            width: 100,
            height: 100,
            url: 'https://example.com/thumb-456.jpg',
          },
          // ... other image sizes
        ],
        variations: [
          {
            id: 'var-456',
            name: 'Material',
            value: 'Plastic',
          },
          // ... other variations
        ],
        stock: 200,
        yampiToken: 'YAMPITOKEN456',
      },
    ],
    images: [
      {
        size: 'thumb',
        width: 100,
        height: 100,
        url: 'https://example.com/thumb-456.jpg',
      },
      // ... other image sizes
    ],
    brand: {
      id: 2,
      name: 'Another Example Brand',
    },
  },
  {
    id: 'prod-789',
    slug: 'third-product-slug',
    skuCode: 'SKU789',
    name: 'Third Example Product',
    description:
      'This is yet another example product for demonstration purposes.',
    specifications: 'Even more example specifications for the product.',
    skus: [
      {
        id: 'sku-789',
        skuCode: 'SKU789',
        costPrice: 30.0,
        salePrice: 35.0,
        discountPrice: 32.0,
        weight: 3.5,
        height: 30,
        width: 30,
        length: 30,
        images: [
          {
            size: 'thumb',
            width: 100,
            height: 100,
            url: 'https://example.com/thumb-789.jpg',
          },
          // ... other image sizes
        ],
        variations: [
          {
            id: 'var-789',
            name: 'Color',
            value: 'Blue',
          },
          // ... other variations
        ],
        stock: 300,
        yampiToken: 'YAMPITOKEN789',
      },
    ],
    images: [
      {
        size: 'thumb',
        width: 100,
        height: 100,
        url: 'https://example.com/thumb-789.jpg',
      },
      // ... other image sizes
    ],
    brand: {
      id: 3,
      name: 'Third Example Brand',
    },
  },
  {
    id: 'prod-1001',
    slug: 'fourth-product-slug',
    skuCode: 'SKU1001',
    name: 'Fourth Example Product',
    description:
      'This is the fourth example product for demonstration purposes.',
    specifications: 'Specifications for the fourth product.',
    skus: [
      {
        id: 'sku-1001',
        skuCode: 'SKU1001',
        costPrice: 40.0,
        salePrice: 45.0,
        discountPrice: 42.0,
        weight: 4.5,
        height: 40,
        width: 40,
        length: 40,
        images: [
          {
            size: 'thumb',
            width: 100,
            height: 100,
            url: 'https://example.com/thumb-1001.jpg',
          },
          // ... other image sizes
        ],
        variations: [
          {
            id: 'var-1001',
            name: 'Material',
            value: 'Metal',
          },
          // ... other variations
        ],
        stock: 400,
        yampiToken: 'YAMPITOKEN1001',
      },
    ],
    images: [
      {
        size: 'thumb',
        width: 100,
        height: 100,
        url: 'https://example.com/thumb-1001.jpg',
      },
      // ... other image sizes
    ],
    brand: {
      id: 4,
      name: 'Fourth Example Brand',
    },
  },
  {
    id: 'prod-1007',
    slug: 'fourth-product-slug',
    skuCode: 'SKU1001',
    name: 'Fourth Example Product',
    description:
      'This is the fourth example product for demonstration purposes.',
    specifications: 'Specifications for the fourth product.',
    skus: [
      {
        id: 'sku-1001',
        skuCode: 'SKU1001',
        costPrice: 40.0,
        salePrice: 45.0,
        discountPrice: 42.0,
        weight: 4.5,
        height: 40,
        width: 40,
        length: 40,
        images: [
          {
            size: 'thumb',
            width: 100,
            height: 100,
            url: 'https://example.com/thumb-1001.jpg',
          },
          // ... other image sizes
        ],
        variations: [
          {
            id: 'var-1001',
            name: 'Material',
            value: 'Metal',
          },
          // ... other variations
        ],
        stock: 400,
        yampiToken: 'YAMPITOKEN1001',
      },
    ],
    images: [
      {
        size: 'thumb',
        width: 100,
        height: 100,
        url: 'https://example.com/thumb-1001.jpg',
      },
      // ... other image sizes
    ],
    brand: {
      id: 4,
      name: 'Fourth Example Brand',
    },
  },
  {
    id: 'prod-1027',
    slug: 'fourth-product-slug',
    skuCode: 'SKU1001',
    name: 'Fourth Example Product',
    description:
      'This is the fourth example product for demonstration purposes.',
    specifications: 'Specifications for the fourth product.',
    skus: [
      {
        id: 'sku-1001',
        skuCode: 'SKU1001',
        costPrice: 40.0,
        salePrice: 45.0,
        discountPrice: 42.0,
        weight: 4.5,
        height: 40,
        width: 40,
        length: 40,
        images: [
          {
            size: 'thumb',
            width: 100,
            height: 100,
            url: 'https://example.com/thumb-1001.jpg',
          },
          // ... other image sizes
        ],
        variations: [
          {
            id: 'var-1001',
            name: 'Material',
            value: 'Metal',
          },
          // ... other variations
        ],
        stock: 400,
        yampiToken: 'YAMPITOKEN1001',
      },
    ],
    images: [
      {
        size: 'thumb',
        width: 100,
        height: 100,
        url: 'https://example.com/thumb-1001.jpg',
      },
      // ... other image sizes
    ],
    brand: {
      id: 4,
      name: 'Fourth Example Brand',
    },
  },
]
