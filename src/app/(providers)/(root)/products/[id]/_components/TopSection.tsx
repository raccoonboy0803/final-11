'use client';

import { Product } from '@/types/product';
import showSwal from '@/utils/swal';
import Image from 'next/image';
import React from 'react';

export interface TopSectionProps {
  product: Product;
  averageRating: number;
  reviewCount: number;
}

function TopSection({ product, averageRating, reviewCount }: TopSectionProps) {
  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      showSwal({ icon: 'success', title: '링크가 복사되었습니다!' });
    } catch (error) {
      console.error('클립보드로 링크복사 실패', error);
    }
  };
  const filledStars = Math.floor(averageRating);

  return (
    <div className="flex flex-col items-center md:items-start md:text-left">
      <strong className="text-sm">예쁜꽃집</strong>
      <h1 className="text-2xl mb-4">{product.title}</h1>
      <div className="flex justify-between w-full">
        <div className="flex items-center">
          {Array.from({ length: filledStars }).map((_, index) => (
            <span key={index} className="text-primary-green-500">
              ★
            </span>
          ))}
          {Array.from({ length: 5 - filledStars }).map((_, index) => (
            <span key={index} className="text-Line/Regular">
              ★
            </span>
          ))}
          <p className="text-lg ml-2">
            {averageRating.toFixed(1)} ({reviewCount}개의 리뷰)
          </p>
        </div>
        <Image
          src="/icons/link.svg"
          alt="share"
          width={30}
          height={30}
          style={{ width: 'auto', height: 'auto' }}
          onClick={handleCopyToClipboard}
          className="cursor-pointer"
        />
      </div>
      <div className="border-t border-b border-Line/Regular mt-8 py-8 w-full">
        <div className="flex items-center justify-between font-semibold">
          <p className="text-sm">판매가</p>
          <p className="text-[32px]">{product.price} 원</p>
        </div>
        <div className="flex justify-between text-sm">
          <p>배송비 </p>
          <p>무료</p>
        </div>
      </div>
    </div>
  );
}

export default TopSection;
