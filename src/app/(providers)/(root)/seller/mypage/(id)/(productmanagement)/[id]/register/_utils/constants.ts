import { Product } from '@/types/product';

export const INITIAL_STATE: Product = {
  category: '',
  title: '',
  price: null,
  stock: null,
  description: '',
  created_at: null,
  updated_at: null,
  product_id: '',
  product_seller_id: '',
  thumbnail_url: ''
};

export const FORMATS = [
  'float',
  'height',
  'width',
  'size',
  'bold',
  'underline',
  'blockquote',
  'list',
  'link',
  'image',
  'align',
  'color',
  'background'
];
