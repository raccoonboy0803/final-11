import { createClient } from "@/supabase/supabaseClient"


const supabase = createClient();

export const fetchUserInfo = async (userId: string) => {
    const {data, error} = await supabase
    .from('User')
    .select('avatar_url, user_name')
    .eq('user_id', userId)
    .single();

    if(error) {
        console.error('유저 프로필 이미지 가져오는 중 에러발생', error);
    } 

    return data || null;
}


export const fetchSellerInfo = async (sellerId: string) => {
    const { data, error } = await supabase
      .from('Seller')
      .select('user_name, avatar_url')
      .eq('seller_id', sellerId)
      .single();
  
    if (error) {
      console.error('판매자 정보 가져오는 중 에러발생', error);
    }

    return data || null;
  };
  