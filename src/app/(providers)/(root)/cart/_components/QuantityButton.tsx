'use client';

import { createClient } from '@/supabase/supabaseClient';
import React, { useEffect, useState } from 'react';
import { useQuantityStore } from '@/stores';

export default function QuantityButton({ productId, price }: { productId: string; price: number }) {
  const setQuantity = useQuantityStore((state) => state.setQuantity);
  const [value, setValue] = useState<number>(1);

  useEffect(() => {
    const getProductQuantity = async () => {
      const supabase = createClient();
      const { data: cartData, error } = await supabase
        .from('Cart')
        .select()
        .eq('cart_product_id', productId);
      if (error) {
        console.error('Error fetching quantity:', error);
        return;
      }
      const quantity = cartData[0]?.count ?? 1;

      setValue(quantity);
    };
    getProductQuantity();
  }, [productId]);

  useEffect(() => {
    setQuantity(productId, value, price);
  }, [value, productId, price, setQuantity]);

  const handleIncrease = async () => {
    const supabase = createClient();
    const { data: cartData, error: fetchError } = await supabase
      .from('Cart')
      .select('count')
      .eq('cart_product_id', productId)
      .single(); // 단일 데이터만 필요하므로 .single() 사용

    if (fetchError) {
      console.error('Error fetching cart data:', fetchError);
      return;
    }

    const currentCount = cartData?.count ?? 0;
    const newCount = currentCount + 1;

    const { error: updateError } = await supabase
      .from('Cart')
      .update({ count: newCount })
      .eq('cart_product_id', productId);

    if (updateError) {
      console.error('Error updating cart count:', updateError);
      return;
    }

    setValue((prev) => prev + 1);
  };

  const handleDecrease = async () => {
    const supabase = createClient();
    const { data: cartData, error: fetchError } = await supabase
      .from('Cart')
      .select('count')
      .eq('cart_product_id', productId)
      .single(); // 단일 데이터만 필요하므로 .single() 사용

    if (fetchError) {
      console.error('Error fetching cart data:', fetchError);
      return;
    }

    const currentCount = cartData?.count ?? 0;
    const newCount = currentCount - 1;

    const { error: updateError } = await supabase
      .from('Cart')
      .update({ count: newCount })
      .eq('cart_product_id', productId);

    if (updateError) {
      console.error('Error updating cart count:', updateError);
      return;
    }

    setValue((prev) => prev - 1);
  };

  return (
    <>
      <div className="ring-1 ring-[#E5E5EC] w-[122px] h-[24px] mt-3 grid grid-cols-3">
        <button
          className="border-r border-[#E5E5EC] h-[24px] flex items-center justify-center"
          onClick={handleDecrease}
        >
          -
        </button>
        <input
          type="number"
          className="text-center h-[24px]"
          value={value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setValue(Number(event.target.value))
          }
          min="1"
        />
        <button
          className="flex border-l border-[#E5E5EC] h-[24px] justify-center items-center"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>

      <style jsx>
        {`
          input[type='number']::-webkit-outer-spin-button,
          input[type='number']::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type='number'] {
            -moz-appearance: textfield; /* Firefox */
          }
        `}
      </style>
    </>
  );
}
