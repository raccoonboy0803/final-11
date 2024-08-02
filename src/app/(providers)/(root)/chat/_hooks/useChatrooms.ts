import { useEffect, useState } from 'react';
import { createClient } from '@/supabase/supabaseClient';
import { Chatroom } from '@/types/chatroom';

const supabase = createClient();

const useChatrooms = (userId: string) => {
  const [chatrooms, setChatrooms] = useState<Chatroom[]>([]);

  useEffect(() => {
    if (!userId) return;

    const fetchChatrooms = async () => {
      const { data, error } = await supabase
        .from('Chatroom')
        .select('*')
        .or(`chatroom_user_id.eq.${userId},chatroom_seller_id.eq.${userId}`)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('채팅 리스트를 가져오는 중 에러 발생', error);
      } else {
        setChatrooms(data as Chatroom[]);
      }
    };

    fetchChatrooms();

    // 리얼타임 구독 설정
    const channel = supabase
      .channel('public:Chatroom')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'Chatroom' },
        (payload) => {
          const newChatroom = payload.new as Chatroom;
          setChatrooms((prevChatrooms) => [newChatroom, ...prevChatrooms]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  return { chatrooms };
};

export default useChatrooms;
