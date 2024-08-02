'use server';

import { createClient } from '@/supabase/supabaseServer';

export const getSeedData = async () => {
  const supabase = createClient();
  const { data: Product, error } = await supabase
    .from('Product')
    .select('*')
    .eq('category', '씨앗');
  return Product;
};

export const getSeedlingData = async () => {
  const supabase = createClient();
  const { data: Product, error } = await supabase
    .from('Product')
    .select('*')
    .eq('category', '모종');
  return Product;
};

export const getKitData = async () => {
  const supabase = createClient();
  const { data: Product, error } = await supabase
    .from('Product')
    .select('*')
    .eq('category', '재배키트');
  return Product;
};

export const getSoilData = async () => {
  const supabase = createClient();
  const { data: Product, error } = await supabase
    .from('Product')
    .select('*')
    .eq('category', '흙,비료');
  return Product;
};

export const getGoodsData = async () => {
  const supabase = createClient();
  const { data: Product, error } = await supabase
    .from('Product')
    .select('*')
    .eq('category', '원예용품');
  return Product;
};
