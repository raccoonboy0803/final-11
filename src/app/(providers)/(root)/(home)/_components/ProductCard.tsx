'use client';
import React, { useEffect, useState } from 'react';
import { Product } from '@/types/product';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createCartItem } from '../../products/[id]/_actions/cartActions';
import useUser from '@/hooks/useUser';
import { getSellerName } from '../actions';

const ProductCard = ({ product }: { product: Product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  const [count, setCount] = useState(1);
  const { user } = useUser();
  const router = useRouter();
  const [businessName, setbusinessName] = useState('');

  useEffect(() => {
    const sellerName = async () => {
      const business_name = await getSellerName(product.product_seller_id!);
      setbusinessName(business_name.business_name);
    };
    sellerName();
  }, []);

  // 페이지 네비게이션
  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  const handleAddToCart = async () => {
    const cartItemData = {
      cart_product_id: product.product_id,
      count: count,
      cart_user_id: user.id,
      is_checked: true
    };
    const result = await createCartItem(cartItemData);

    if (result) {
      alert('선택하신 상품이 장바구니에 추가되었습니다.');
    }
  };

  const handleBuyNow = () => {
    console.log('나는 productId =>', product.product_id);
    router.push(`/payment?productId=${product.product_id}&quantity=1`);
  };

  function handleBuyNowClick(event: React.MouseEvent) {
    event.stopPropagation();
    handleBuyNow();
  }

  function handleAddCartClick(event: React.MouseEvent) {
    event.stopPropagation();
    handleAddToCart();
  }

  return (
    <div>
      <div className="lg:w-[295px]">
        <div className="relative ">
          <div
            onClick={() => redirect(`/products/${product.product_id}`)}
            className="cursor-pointer opacity-0 lg:w-[295px] lg:h-[295px] w-[164px] h-[164px] z-1 flex justify-center items-center absolute z-5 hover:backdrop-blur-sm hover:opacity-100"
          >
            <button className="mr-10" onClick={handleAddCartClick}>
              <img src="/icons/icon-card-cart.svg" alt="cart" />
            </button>
            <button onClick={handleBuyNowClick}>
              <img src="/icons/icon-card.svg" alt="card" />
            </button>
          </div>

          <Link href={'/상세페이지'}>
            <img
              src={product.thumbnail_url}
              className="lg:w-[295px] lg:h-[295px] w-[164px] h-[164px] bg-zinc-300 rounded-2xl hover:bg-white cursor-pointer"
            ></img>
          </Link>
        </div>
      </div>
      <p className="lg:w-[295px] w-[164px] mt-[24px] text-sm font-semibold">{businessName}</p>
      <p className="lg:w-[295px] w-[164px] lg:line-clamp-2 line-clamp-1 text-sm text-[#555555] text-ellipsis overflow-hidden">
        {product.title}
      </p>
      <p className="mt-[10px] font-semibold text-lg">{formatPrice(product.price ?? 0)}원</p>
    </div>
  );
};

export default ProductCard;
