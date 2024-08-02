'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllLiveStreamDB } from '../actions';
import Link from 'next/link';
import Image from 'next/image';

export default function LiveSection({ category }: { category: string }) {
  const {
    data: liveStreamDatas,
    error,
    isFetched
  } = useQuery({
    queryKey: ['getLiveStreamList', category],
    queryFn: () => getAllLiveStreamDB(category!)
  });

  if (!isFetched) {
    return <p>로딩중</p>;
  }

  if (liveStreamDatas && isFetched) {
    return (
      <div className="grid grid-cols-2 w-full gap-[20px]">
        {liveStreamDatas.map((data) => {
          return (
            <div key={data.livestream_id} className="w-full relative">
              <div className="relative w-full h-[342px]">
                <Image src={data.thumbnail_url} alt="방송썸네일" fill className="rounded-2xl" />
              </div>
              <div className="flex justify-between mt-4 pr-6">
                <div>
                  <h2 className="font-semibold">{data.stream_title}</h2>
                  <p className="text-[#555555]">{data.description}</p>
                </div>
                <Link href={`/livestreaming/${data.livestream_product_id}_${data.livestream_id}`}>
                  <button className="bg-[#3BB873] text-white px-6 py-3 rounded-lg">
                    구매하러가기
                  </button>
                </Link>
              </div>
              <Image
                src="/icons/on-live.png"
                alt="라이브"
                width={50}
                height={26}
                quality={100}
                className="absolute top-4 left-4"
              />
            </div>
          );
        })}
      </div>
    );
  }
}
