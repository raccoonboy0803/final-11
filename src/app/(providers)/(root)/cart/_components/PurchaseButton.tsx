'use client';

import React from 'react';
import { createClient } from '@/supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export default function PurchaseButton() {
  const router = useRouter();

  const getCartData = async () => {
    const supabase = createClient();
    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      const { data: cartData, error: cartError } = await supabase
        .from('Cart')
        .select()
        .eq('cart_user_id', user.id);

      if (cartError) {
        console.error('Error fetching cart data:', cartError);
        return;
      }
      const transformData = cartData.map((data) => ({
        productId: data.cart_product_id,
        quantity: data.count
      }));
      return transformData;
    }
  };

  const { data, error, isFetched } = useQuery({ queryKey: ['getCartInfo'], queryFn: getCartData });

  if (error) {
    console.error('Error fetching cart info:', error);
    return <p>Error fetching cart info. Please try again later.</p>;
  }

  if (!isFetched) {
    return <p>Loading...</p>;
  }

  const handleNavigate = (products: any) => {
    const encodedData = encodeURIComponent(JSON.stringify(products));
    router.push(`/payment?data=${encodedData}`);
  };

  return (
    <button
      onClick={() => handleNavigate(data)}
      className="bg-[#3BB873] mt-4 h-[51px] rounded-md text-[16px]"
    >
      구매하기
    </button>
  );
}
