'use client';

import React, { useState } from 'react';
import LiveSection from './_components/LiveSection';
import RecodeSection from './_components/RecodeSection';
import Image from 'next/image';
import Link from 'next/link';

export default function StreamListPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleClick = (buttonId: string) => {
    setActiveCategory(activeCategory === buttonId ? 'none' : buttonId);
  };

  return (
    <div className="pt-[80px] pb-[180px]">
      <h1 className="text-[32px] font-semibold text-center mb-[32px]">라이브 커머스</h1>
      <div className="flex justify-between">
        <div className="flex gap-[12px]">
          <button
            className={`border px-[16px] py-[14px] rounded-md ${activeCategory === 'all' ? 'bg-primary-green-500 text-white border-transparent' : 'bg-none'} text-[14px]`}
            onClick={() => handleClick('all')}
          >
            전체보기
          </button>
          <button
            className={`border px-[16px] py-[14px] rounded-md ${activeCategory === '씨앗' ? 'bg-primary-green-500 text-white border-transparent' : 'bg-none'} text-[14px]`}
            onClick={() => handleClick('씨앗')}
          >
            씨앗
          </button>
          <button
            className={`border px-[16px] py-[14px] rounded-md ${activeCategory === '모종' ? 'bg-primary-green-500 text-white border-transparent' : 'bg-none'} text-[14px]`}
            onClick={() => handleClick('모종')}
          >
            모종
          </button>
          <button
            className={`border px-[16px] py-[14px] rounded-md ${activeCategory === '재배키트' ? 'bg-primary-green-500 text-white border-transparent' : 'bg-none'} text-[14px]`}
            onClick={() => handleClick('재배키트')}
          >
            재배키트
          </button>
          <button
            className={`border px-3 py-2 rounded-md ${activeCategory === '흙,비료' ? 'bg-primary-green-500 text-white border-transparent' : 'bg-none'} text-[14px]`}
            onClick={() => handleClick('흙,비료')}
          >
            흙/비료
          </button>
          <button
            className={`border px-[16px] py-[14px] rounded-md ${activeCategory === '원예용품' ? 'bg-primary-green-500 text-white border-transparent' : 'bg-none'} text-[14px]`}
            onClick={() => handleClick('원예용품')}
          >
            원예용품
          </button>
        </div>
        <Link href={'/livestreaming/register'}>
          <button className="flex items-center text-[13px] text-primary-green-500 border border-primary-green-500 rounded px-[12px] py-[9px]">
            <Image src="/icons/start-stream.png" alt="startStream-icon" width={16} height={16} />
            방송시작
          </button>
        </Link>
      </div>
      <div className="mt-[80px] flex flex-col gap-[20px]">
        <LiveSection category={activeCategory} />
        <RecodeSection category={activeCategory} />
      </div>
    </div>
  );
}
