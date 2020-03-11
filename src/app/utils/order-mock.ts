export interface IOrder {
  [key: string]: number;
}

export const ORDER_CONFIG = [
  {
    field: 'count',
    id: 'count',
    title: 'Count'
  },
  {
    field: 'price',
    id: 'price',
    title: 'Price'
  },
  {
    field: 'discount',
    id: 'discount',
    title: 'Discount'
  },
  {
    field: 'maxPrice',
    id: 'maxPrice',
    title: 'Max price'
  },
];

export const ORDER_LIST = [
  {
    id: 1,
    count: 10,
    price: 24,
    discount: 5,
    maxPrice: 36
  },
  {
    id: 2,
    count: 5,
    price: 12,
    discount: 1,
    maxPrice: 18
  },
  {
    id: 3,
    count: 9,
    price: 10,
    discount: 15,
    maxPrice: 20
  },
  {
    id: 4,
    count: 3,
    price: 5,
    discount: 9,
    maxPrice: 8
  },
  {
    id: 5,
    count: 7,
    price: 15,
    discount: 10,
    maxPrice: 25
  },
  {
    id: 6,
    count: 20,
    price: 10,
    discount: 2.5,
    maxPrice: 15
  },
  {
    id: 7,
    count: 3,
    price: 21,
    discount: 10,
    maxPrice: 31
  }
];
