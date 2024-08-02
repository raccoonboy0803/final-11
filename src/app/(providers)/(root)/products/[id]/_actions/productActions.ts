'use server';

import { revalidatePath } from "next/cache";
import { Review, ReviewInput } from "@/types/review";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { createClient } from "@/supabase/supabaseServer";
import { cache } from "react";

export async function createReview(reviewData: ReviewInput): Promise<Review[]> {
    const supabseServer:SupabaseClient<Database> = createClient();
    const { data, error } = await supabseServer.from('Review').insert(reviewData).select('*');
    
    if (error) {
      console.error('리뷰 데이터 삽입 중 에러발생', error);
      throw new Error(error.message);
    }

    revalidatePath(`/products/${reviewData.review_product_id}`);
    return data;
  }

  export async function getReviews(reviewProductId: string, limit: number, offset: number) {
    const supabaseServer: SupabaseClient<Database> = createClient();
    const { data: reviews, error, count } = await supabaseServer
      .from('Review')
      .select('*', { count: 'exact' })  
      .eq('review_product_id', reviewProductId)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
  
    if (error) {
      console.error('리뷰 데이터 가져오는 중 에러발생', error);
      throw new Error(error.message);
    }
  
    return { reviews, totalCount: count };
  }

  export async function getProductRequest(id: string){
  const supabseServer:SupabaseClient<Database> = createClient();
  const { data: product, error } = await supabseServer
    .from('Product')
    .select('*')
    .eq('product_id', id)
    .single();

    if (error || !product) {
      console.error('해당 상품을 찾을 수 없습니다.', error);
      return;
    }

  return product;
}
// export const getProduct = cache(getProductRequest);

// export async function getUser(){
//   const {data:userData, error} = await supabaseSever.auth.getUser();

//     if (error) {
//       console.error('로그인한 유저 정보 가져오는 중 에러 발생', error);
//       return;
//     }

//   return userData;
// }