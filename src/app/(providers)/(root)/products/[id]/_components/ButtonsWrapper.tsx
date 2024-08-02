'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import useUser from '@/hooks/useUser';
import TopButtons from './TopButtons';
import BottomTab from './BottomTab';
import { createCartItem } from '../_actions/cartActions';

interface ButtonsWrapperProps {
  productId: string;
  productPrice: string | number;
  productTitle: string;
  productSellerId: string;
}

function ButtonsWrapper({
  productId,
  productPrice,
  productTitle,
  productSellerId
}: ButtonsWrapperProps) {
  const [count, setCount] = useState(1);
  const { user } = useUser();
  const router = useRouter();

  const handleAddToCart = async () => {
    const cartItemData = {
      cart_product_id: productId,
      count: count,
      cart_user_id: user.id,
      is_checked: true
    };
    const result = await createCartItem(cartItemData);

    if (result) {
      alert('선택하신 상품이 장바구니에 추가되었습니다.');
      router.push(`/cart`);
    }
  };

  const handleBuyNow = () => {
    router.push(`/payment?productId=${productId}&quantity=${count}`);
  };

  const productState = {
    count,
    setCount,
    handleAddToCart,
    handleBuyNow,
    product: {
      product_id: productId,
      price: productPrice,
      title: productTitle,
      product_seller_id: productSellerId
    }
  };

  return (
    <>
      <TopButtons productState={productState} />
      <BottomTab productState={productState} />
    </>
  );
}

export default ButtonsWrapper;
