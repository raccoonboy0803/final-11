'use server';

import { createClient } from '@/supabase/supabaseServer';
import { Database } from '@/types/supabase';
import { revalidatePath } from 'next/cache';

export const getUserSession = async () => {
  const supabaseSever = createClient();
  const { data, error } = await supabaseSever.auth.getUser();
  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }
  return data;
};

export interface Product {
  product_id: string;
  category: string;
  title: string;
  price: number;
  thumbnail_url: string;
  description: string;
  stock: number;
  created_at: string; // ISO 날짜 형식
  updated_at: string; // ISO 날짜 형식
  product_seller_id: string;
  count: number;
}

export const getCartData = async (userId: string) => {
  const supabaseSever = createClient();
  const { data, error } = await supabaseSever.from('Cart').select().eq('cart_user_id', userId);
  if (error) {
    console.error('Error fetching posts:', error);
  }
  return data;
};

interface CartProps {
  cart_id: string;
  cart_product_id: string;
  count: number;
  cart_user_id: string;
}

export const getProductData = async (carts: CartProps[]): Promise<Product[]> => {
  const supabaseSever = createClient();
  let productIds: string[] = carts.map((cart) => cart.cart_product_id);
  let productCounts: number[] = carts.map((cart) => cart.count);

  const { data, error } = await supabaseSever.from('Product').select().in('product_id', productIds);

  if (error) {
    console.error('Error fetching posts:', error);
    return [];
  }

  const response = data.map((product) => {
    const index = productIds.indexOf(product.product_id);
    const count = productCounts[index];
    return {
      ...product,
      count: count
    };
  });

  return response;
};

export const deleteCart = async (productId: string) => {
  const supabaseSever = createClient();
  const { data, error } = await supabaseSever
    .from('Cart')
    .delete()
    .eq('cart_product_id', productId);
  if (error) {
    console.error('Error deleting record:', error);
    return;
  }
  revalidatePath('/cart');
  return data;
};

export const toggleCheckbox = async (productId: string, isChecked: boolean) => {
  const supabaseSever = createClient();

  const { data, error } = await supabaseSever
    .from('Cart')
    .update({ is_checked: isChecked })
    .eq('cart_product_id', productId);

  return data;
};

export interface IsCheck {
  is_checked: boolean;
}

export const getCartIsChecked = async (productId: string): Promise<IsCheck> => {
  const supabaseSever = createClient();
  const { data, error } = await supabaseSever
    .from('Cart')
    .select('is_checked')
    .eq('cart_product_id', productId);

  return data![0] as IsCheck;
};

export const allToggleCheckbox = async (userId: string, isChecked: boolean) => {
  const supabaseSever = createClient();

  const { data, error } = await supabaseSever
    .from('Cart')
    .update({ is_checked: isChecked })
    .eq('cart_user_id', userId);

  return data;
};

export const deleteSelectCart = async (userId: string) => {
  const supabaseSever = createClient();

  const { data, error } = await supabaseSever
    .from('Cart')
    .delete()
    .eq('is_checked', true)
    .eq('cart_user_id', userId);

  revalidatePath('/cart');
  return data;
};
