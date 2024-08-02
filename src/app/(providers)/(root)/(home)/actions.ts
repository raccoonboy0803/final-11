'use server';
import { createClient } from '@/supabase/supabaseServer';
import { Order } from '@/types/order';
import { Product } from '@/types/product';
// supabase 호출을 여기에 모아두고 사용하면 재사용 가능!

export const getProducts = async () => {
  const supabase = createClient();
  const { data: product, error } = await supabase.from('Product').select('*');
  if (error) throw error;
  return product;
};

// 상품 파는 사람 불러오기. => product안에 있는 sellerId
export const getSellerName = async (sellerId: string) => {
  const supabase = createClient();
  const { data: seller, error } = await supabase
    .from('Seller')
    .select('business_name')
    .eq('seller_id', sellerId)
    .single();
  if (error) throw error;
  return seller;
};

// product id 가져오기 => productId
export const getOrderInfo = async (): Promise<Order[]> => {
  const supabase = createClient();
  const { data: orderProduct, error } = await supabase
    .from('Order') // Order테이블에서
    .select('*') // 모든 컬럼을
    .eq('is_payed', true) //
    .order('order_date', { ascending: false }) // order_date를 내림차순으로
    .range(0, 100); // 0번째부터 100번째까지
  if (error) throw error;
  return orderProduct;
};

export const getRecommendPlant = async () => {
  const supabase = createClient();
  const { data: products, error: productError } = await supabase
    .from('Product')
    .select('*')
    .or('category.eq.씨앗, category.eq.모종');

  if (productError) throw productError;
  return products;
};

export const getGoodsproducts = async () => {
  const supabase = createClient();
  const { data: goodsProducts, error: productError } = await supabase
    .from('Product')
    .select('*')
    .eq('category', '원예용품');

  if (productError) throw productError;
  return goodsProducts;
};

export const getBestSellerProducts = async (orderData: Order[]) => {
  const supabase = createClient();

  const { data: products, error: productsError } = await supabase
    .from('Product')
    .select('*')
    .or(
      `product_id.eq.${orderData[0].order_product_id}, product_id.eq.${orderData[1].order_product_id}, product_id.eq.${orderData[2].order_product_id}, product_id.eq.${orderData[3].order_product_id}`
    );
  if (productsError) throw productsError;
  return products as Product[];
};
