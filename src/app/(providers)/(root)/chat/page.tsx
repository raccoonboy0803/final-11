'use client';

import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { fetchSellerInfo, fetchUserInfo } from './_utils/fetchInfo';
import Image from 'next/image';
import { createClient } from '@/supabase/supabaseClient';
import useChatrooms from './_hooks/useChatrooms';
import { timeForToday } from './_utils/timeUtils';

const supabase = createClient();

function ChatListPage() {
  const { user } = useUser();
  const router = useRouter();
  const { chatrooms } = useChatrooms(user ? user.id : '');
  const [avatars, setAvatars] = useState<{
    [key: string]: { avatar_url: string; user_name: string } | null;
  }>({});
  const [unreadCounts, setUnreadCounts] = useState<{ [key: string]: number }>({});
  const [latestMessages, setLatestMessages] = useState<{
    [key: string]: { payload: string; createdAt: string };
  }>({});

  useEffect(() => {
    const fetchInfo = async () => {
      for (const chatroom of chatrooms) {
        const userInfo = await fetchUserInfo(chatroom.chatroom_user_id);
        const sellerInfo = await fetchSellerInfo(chatroom.chatroom_seller_id);

        setAvatars((prevAvatars) => ({
          ...prevAvatars,
          [chatroom.chatroom_user_id]: userInfo,
          [chatroom.chatroom_seller_id]: sellerInfo
        }));

        const { data: messages, error } = await supabase
          .from('Message')
          .select('payload, created_at')
          .eq('message_chatroom_id', chatroom.chatroom_id)
          .order('created_at', { ascending: false })
          .limit(1);

        if (error) {
          console.error('최근 메세지 가져오는 중 에러발생', error);
        } else if (messages.length > 0) {
          const latestMessage = messages[0];
          setLatestMessages((prevMessages) => ({
            ...prevMessages,
            [chatroom.chatroom_id]: {
              payload: latestMessage.payload,
              createdAt: latestMessage.created_at
            }
          }));
        }
      }
    };

    fetchInfo();
  }, [chatrooms]);

  useEffect(() => {
    const fetchUnreadCounts = async () => {
      const counts: { [key: string]: number } = {};

      for (const chatroom of chatrooms) {
        let data, error;

        if (user.id === chatroom.chatroom_user_id) {
          // 구매자일 때
          ({ data, error } = await supabase
            .from('Message')
            .select('is_read', { count: 'exact' })
            .eq('message_chatroom_id', chatroom.chatroom_id)
            .eq('is_read', false)
            .neq('message_user_id', user.id));
        } else {
          // 판매자일 때
          ({ data, error } = await supabase
            .from('Message')
            .select('is_read', { count: 'exact' })
            .eq('message_chatroom_id', chatroom.chatroom_id)
            .eq('is_read', false)
            .neq('message_user_id', chatroom.chatroom_seller_id));
        }

        if (error) {
          console.error('읽지 않은 메세지 수 가져오는 중 에러발생', error);
        } else if (data) {
          counts[chatroom.chatroom_id] = data.length;
        }
      }
      setUnreadCounts(counts);
    };

    fetchUnreadCounts();
  }, [chatrooms, user]);

  if (!user) {
    return (
      <div className="max-w-[1180px] mx-auto p-4 mt-20 mb-[180px]">
        <h1 className="text-[32px] font-semibold border-b pb-8 flex justify-center">
          로그인이 필요합니다.
        </h1>
        <div className="flex justify-center items-center">
          <div className="text-center">
            <button
              onClick={() => router.push('/login')}
              className="mt-8 px-16 py-2 bg-primary-green-500 text-white rounded-lg hover:bg-primary-green-700"
            >
              LOGIN
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleChatroomClick = (chatroomId: string) => {
    router.push(`/chat/${chatroomId}`);
  };

  return (
    <div className="max-w-[650px] mx-auto mt-12 mb-[180px]">
      <h1 className="text-[32px] font-bold border-b pb-8 flex justify-center">상담톡</h1>
      <div className="flex justify-center w-full">
        {chatrooms.length === 0 ? (
          <p className="mt-20 text-[15px]">채팅 상대가 아직 없습니다.</p>
        ) : (
          <ul className="flex w-[650px] flex-col items-center">
            {chatrooms.map((chatroom) => {
              const isUser = user.id === chatroom.chatroom_user_id;
              const otherParty = isUser ? chatroom.chatroom_seller_id : chatroom.chatroom_user_id;
              const otherInfo = avatars[otherParty];
              const latestMessage = latestMessages[chatroom.chatroom_id];

              return (
                <li
                  key={chatroom.chatroom_id}
                  onClick={() => handleChatroomClick(chatroom.chatroom_id)}
                  className="bg-white border-b cursor-pointer w-full px-5 py-6 hover:bg-secondary-yellow-50 transition"
                >
                  <div className="flex items-start pb-8 w-full sm:p-0">
                    <div className="w-12 h-12 flex-shrink-0 rounded-full overflow-hidden mr-4">
                      <Image
                        src={otherInfo?.avatar_url || '/default-avatar.png'}
                        alt="Avatar"
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col w-full">
                      <div className="flex justify-between items-center w-full">
                        <strong className="block text-lg">
                          {otherInfo?.user_name || 'Unknown'}
                        </strong>
                        {latestMessage && (
                          <p className="text-sm text-gray-400 ml-auto">
                            {timeForToday(latestMessage.createdAt)}
                          </p>
                        )}
                      </div>

                      <div className="flex justify-between items-center w-full mt-2">
                        <p className="text-sm text-gray-500 flex-1">
                          {latestMessage ? latestMessage.payload : '이전 대화내역이 없습니다.'}
                        </p>
                        {unreadCounts[chatroom.chatroom_id] > 0 && (
                          <div className="w-5 h-5 bg-primary-green-500 text-white rounded-full flex items-center justify-center text-xs ml-2">
                            {unreadCounts[chatroom.chatroom_id]}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
export default ChatListPage;
