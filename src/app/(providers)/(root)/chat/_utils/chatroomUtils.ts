import { createClient } from '@/supabase/supabaseClient';

const supabase = createClient();

export const createChatroom = async (chatroomId: string, userId: string, sellerId: string, productId: string) => {
  console.log('채팅방 생성 시도 중', { chatroomId, sellerId, productId, userId });

  const { data, error } = await supabase
    .from('Chatroom')
    .insert([{
      chatroom_id: chatroomId,
      chatroom_product_id: productId,
      chatroom_user_id: userId,
      chatroom_seller_id: sellerId
    }])
    .select('*');

  if (error) {
    console.error('채팅방 생성 중 에러 발생', error);
  } else {
    console.log('채팅방 생성 성공', data);
  }

  return data;
};


export const findExistingChatroom = async (userId: string, sellerId: string, productId: string) => {
  console.log('기존 채팅방 확인 시도 중', { userId, sellerId, productId });

  const { data, error } = await supabase
    .from('Chatroom')
    .select('*')
    .eq('chatroom_user_id', userId)
    .eq('chatroom_seller_id', sellerId)
    .eq('chatroom_product_id', productId);

  if (error) {
    console.error('기존 채팅방 확인 중 에러 발생', error);
    return null;
  } else {
    console.log('기존채팅방 데이터: ', data);
  }

  return data;
};