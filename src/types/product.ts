export type Product = {
  category: string;
  title: string;
  price: number | null;
  stock: number | null;
  description: string;
  created_at: string | null;
  updated_at: string | null;
  product_id: string;
  product_seller_id: string;
  thumbnail_url: string;
};
export interface ProductProps extends Product {
  thumbnail?: File | null;
}
