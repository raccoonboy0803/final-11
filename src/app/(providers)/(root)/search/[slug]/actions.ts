import { createClient } from '@/supabase/supabaseServer';

interface Product {
  product_id: string;
  category: string;
  title: string;
  price: number;
  thumbnail_url: string;
  description: string;
  stock: number;
  created_at: string;
  updated_at: string;
  productseller_id: string;
}

export const getProductDatas = async (keyword: string): Promise<Product[]> => {
  const supabaseServer = createClient();
  const { data, error } = await supabaseServer
    .from('Product')
    .select()
    .ilike('title', `%${keyword}%`);
  return data as Product[];
};
