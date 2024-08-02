'use client';

import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { createChatroom, findExistingChatroom } from '../../../chat/_utils/chatroomUtils';
import Image from 'next/image';

interface TopButtonsProps {
  productState: {
    count: number;
    setCount: (value: number) => void;
    handleAddToCart: () => void;
    handleBuyNow: () => void;
    product: {
      product_id: string;
      price: string | number;
      title: string;
      product_seller_id: string;
    };
  };
}

function TopButtons({ productState }: TopButtonsProps) {
  const { count, setCount, handleAddToCart, handleBuyNow, product } = productState;
  const router = useRouter();
  const { user } = useUser();

  const handleStartChat = async () => {
    if (!user) {
      console.error('사용자가 로그인되어 있지 않습니다.');
      return;
    }

    // 기존채팅방 확인
    const existingChatrooms = await findExistingChatroom(
      user.id,
      product.product_seller_id,
      product.product_id
    );

    if (existingChatrooms && existingChatrooms.length > 0) {
      const existingChatroom = existingChatrooms[0];
      console.log('기존채팅방이 존재합니다', existingChatroom);
      router.push(`/chat/${existingChatroom.chatroom_id}`);
    } else {
      const chatroomId = uuidv4();
      const newChatroom = await createChatroom(
        chatroomId,
        user.id,
        product.product_seller_id,
        product.product_id
      );
      console.log('새로운 채팅방이 생성되었습니다.', newChatroom);
      router.push(`/chat/${chatroomId}`);
    }
  };

  return (
    <>
      <div className="mb-5 flex-col w-full">
        <div className="mt-6 mb-5 flex justify-end">
          <button className="w-9 h-9 border px-4 py-2" onClick={() => setCount(count - 1)}>
            -
          </button>
          <div className="w-[52px] h-9 border p-2 text-center">{count}</div>
          <button className="w-9 h-9 border px-4 py-2" onClick={() => setCount(count + 1)}>
            +
          </button>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-[14px]">총 상품금액</p>
          <p className="text-xl font-bold text-right">{+product.price * count} 원</p>
        </div>
      </div>

      <div className="flex space-x-[6px]">
        <button className="flex items-center justify-center w-[52px] h-[56px] border border-gray-300 rounded-lg">
          <Image src="/icons/productchat.svg" alt="문의하기" width={24} height={24} />
        </button>

        <button className="flex items-center justify-center w-[220.5px] h-[56px] border border-primary-green-500 rounded-lg">
          <span className="text-primary-green-500">장바구니</span>
          <Image src="/icons/productcart.svg" alt="장바구니" width={24} height={24} />
        </button>

        <button className="flex items-center justify-center w-[220.5px] h-[56px] bg-primary-green-500 text-white rounded-lg">
          <span className="mr-1">바로구매</span>
          <Image src="/icons/productcard.svg" alt="바로구매" width={24} height={24} />
        </button>
      </div>
    </>
  );
}

export default TopButtons;
