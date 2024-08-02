'use client';

import Image from 'next/image';
import React, { Suspense } from 'react';
import { createClient } from '@/supabase/supabaseClient';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { getUserDate } from '../actions';
import UserEditForm from './AddressForm';
import paymentHandler from '../payment';

interface Product {
  productId: string;
  quantity: number;
}

interface CombinedProductData {
  product_id: string;
  productseller_id: string;
  category: string;
  title: string;
  price: number;
  quantity: number;
  stock: number;
  thumbnail_url: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface ProductInfo {
  combinedData: CombinedProductData[];
  totalCost: number;
  cart: boolean;
}

export default function PaymentPage() {
  let products: Product[] = [];
  const searchParams = useSearchParams();
  const dataString = searchParams.get('data');
  const productId = searchParams.get('productId');
  const quantity = searchParams.get('quantity');

  if (dataString) {
    try {
      const decodedData = decodeURIComponent(dataString);
      products = JSON.parse(decodedData);
    } catch (error) {
      console.error('Error decoding or parsing query data:', error);
    }
  } else if (productId && quantity) {
    products = [{ productId, quantity: Number(quantity) }];
  }

  const getProductInfo = async () => {
    const productIds = products.map((product) => product.productId);
    const supabase = createClient();
    const { data: productData, error } = await supabase
      .from('Product')
      .select()
      .in('product_id', productIds);
    if (error) {
      console.error('Error fetching product data:', error);
      return null;
    }

    const combinedData = productData.map((product) => {
      const matchingProduct = products.find((p) => p.productId === product.product_id);
      return {
        ...product,
        quantity: matchingProduct ? matchingProduct.quantity : 0
      };
    });

    const totalCost = combinedData.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);

    return { combinedData, totalCost, cart: !!dataString };
  };

  const {
    data: productData,
    error: productError,
    isFetched: productFeched
  } = useQuery({
    queryKey: ['getProductInfo'],
    queryFn: getProductInfo
  });

  const getUserInfo = async () => {
    const supabase = createClient();
    const { data: userData } = await supabase.auth.getUser();
    const userInfo = await getUserDate(userData.user?.id!);
    return userInfo![0];
  };

  const {
    data: userData,
    error: userError,
    isFetched: userFetched
  } = useQuery({
    queryKey: ['getUserInfo'],
    queryFn: getUserInfo
  });

  if (!userFetched) {
    return null;
  }

  if (userData && productData) {
    return (
      <div className="pt-[80px] pb-[180px]">
        <h1 className="text-[32px] font-semibold text-center">주문/결제</h1>
        <p>주문자</p>
        <form action="">
          <input type="checkbox" id="sameaddress" />
          <label htmlFor="sameaddress">회원 정보와 동일</label>
          <input type="checkbox" id="newaddress" />
          <label htmlFor="newaddress">새로운 배송지</label>
        </form>
        <section>
          <UserEditForm
            initialAddress={userData.address}
            initialDetailAddress={userData.address_detail}
            initialAddressCode={userData.address_code}
            initialUserName={userData.user_name}
            initialPhone={userData.phone}
            userId={userData.user_id}
          />
          <div className="flex flex-col">
            <div className="h-[64px]">
              <label htmlFor="phone" className="w-20 mr-12">
                휴대폰번호
              </label>
              <input
                className="border p-3 mb-3 rounded w-1/4"
                type="text"
                id="phone"
                defaultValue={userData.phone.split('-')[0]}
                maxLength={3}
              />
              <span className="mx-2">-</span>
              <input
                className="border p-3 mb-3 rounded w-1/4"
                type="text"
                id="phone"
                defaultValue={userData.phone.split('-')[1]}
                maxLength={4}
              />
              <span className="mx-2">-</span>
              <input
                className="border p-3 mb-3 rounded w-1/4"
                type="text"
                id="phone"
                defaultValue={userData.phone.split('-')[2]}
                maxLength={4}
              />
              <label htmlFor=""></label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="email" className="w-20 mr-[74px]">
                이메일
              </label>
              <input
                type="text"
                id="email"
                defaultValue={userData.email}
                className="border p-3 mb-3 rounded w-1/2 h-[54px]"
              />
              {/* <select name="" id="">
                <option value="">gmail.com</option>
                <option value="">naver.com</option>
                <option value="">hanmail.net</option>
              </select> */}
            </div>
            {/* <div className="flex items-center gap-2">
              <input type="checkbox" id="default" className="green-checkbox" />
              <label htmlFor="default">기본 배송지로 저장</label>
            </div> */}
          </div>
          <div className="border-t w-full my-10" />
        </section>
        <section>
          <h2 className="text-[20px] font-semibold">
            주문상품 {productData.combinedData.length}개
          </h2>
          <div>
            <div className="flex flex-col">
              {productData?.combinedData?.map((product) => {
                return (
                  <div
                    key={product.product_id}
                    className="flex gap-6 items-center border-b w-full py-10"
                  >
                    <Image
                      src={product.thumbnail_url}
                      alt={product.title}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <div>
                      <p>{product.title}</p>
                      <div className="flex mt-4">
                        <span className="text-[18px] font-semibold">
                          {(product.price * product.quantity).toLocaleString()}
                        </span>
                        <span className="ml-1 text-[18px]">원</span>
                        <div className="border-l mx-4" />
                        <p>{product.quantity}개</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="mt-6">
          <h2 className="text-[20px] font-semibold">결제정보</h2>
          <div className="flex justify-between mt-4">
            <span>총 상품 금액</span>
            <span>{productData?.totalCost.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>배송비</span>
            <span>무료</span>
          </div>
          <div className="flex justify-between text-[20px] font-semibold">
            <span>최종 결제 금액</span>
            <span>{productData?.totalCost.toLocaleString()}원</span>
          </div>
        </section>
        <div className="w-full border-b my-6" />
        <section>
          <h2 className="text-[20px] font-semibold mb-4">결제수단</h2>
          <p className="mb-4">결제수단 선택</p>
          <div className="border border-[#787878] w-full h-[48px] rounded-md flex items-center gap-2 justify-center">
            <Image src="/icons/kakaotalk.png" alt="kakaotalk" width={20} height={20} />
            <p>카카오 페이</p>
          </div>
        </section>
        <div className="border-b w-full my-10" />
        <div className="mb-10 flex items-center gap-2">
          <input type="checkbox" id="agreement" className="green-checkbox" />
          <label htmlFor="agreement" className="text-[15px]">
            주문 내용을 확인하였으며 약관에 동의합니다.
          </label>
        </div>
        <button
          onClick={() => paymentHandler(productData as ProductInfo)}
          className="w-full bg-[#3BB873] rounded-md h-[48px] text-white"
        >
          {productData?.totalCost.toLocaleString()}원 결제하기
        </button>
      </div>
    );
  }
}

// 상품id,수량 을 쿼리로 주고받는 방식

// 1. 상세페이지에서 router.push(클라이언트 컴포넌트)
// router.push(`/payment?productId=${productId}&quantity=${quantity}`);

// 2. 상세페이지에서 Link(서버컴포넌트)
//  const url = `/payment?productId=${productId}&quantity=${quantity}`;
// return (
//   <div>
//     <h1>Home Page</h1>
//     {/* 클라이언트 측에서 이 URL을 사용하여 페이지를 이동시킵니다 */}
//     <Link href={url}>Go to Payment</Link>
//   </div>
// );

// -> 둘 중 택1

// 받는곳 - 결제페이지
// const quantity = searchParams.get('productId'); // 쿼리 문자열 파라미터 - 상품id 캐치
// const quantity = searchParams.get('quantity'); // 쿼리 문자열 파라미터 - 수량 캐치
