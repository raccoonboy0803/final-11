import { createClient } from "@/supabase/supabaseClient";
import { CartItemInput } from "@/types/cart";
import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";


export async function createCartItem(cartItemData: CartItemInput){
    const supabase:SupabaseClient<Database> = createClient();
    const {data, error} = await supabase.from('Cart').insert([cartItemData]).select('*')

    if (error) {
        console.error('장바구니 데이터 삽입 중 에러발생', error);
        return;
      }
      return data;
}