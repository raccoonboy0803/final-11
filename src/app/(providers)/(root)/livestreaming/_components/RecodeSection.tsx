'use client';

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getAllRecodeStramDB, getVideos } from '../actions';
import Link from 'next/link';
import Image from 'next/image';

export default function RecodeSection({ category }: { category: string }) {
  const {
    data: recodedVideos,
    error,
    isFetched
  } = useQuery({
    queryKey: ['getRecodeStreamList', category],
    queryFn: () => getVideos(category!)
  });

  if (!isFetched) {
    return <p>로딩중</p>;
  }

  if (recodedVideos && isFetched) {
    return (
      <div className="grid grid-cols-2 w-full gap-[20px]">
        {recodedVideos.map((video) => {
          return (
            <div key={video.uid} className="w-full relative">
              <div className="relative w-full h-[342px]">
                <Image
                  src={video.streamData[0].thumbnail_url}
                  alt="방송썸네일"
                  fill
                  className="rounded-2xl"
                />
              </div>
              <div className="flex justify-between mt-4 pr-6">
                <div>
                  <h2 className="font-semibold">{video.streamData[0].stream_title}</h2>
                  <p className="text-[#555555]">{video.streamData[0].description}</p>
                </div>
                <Link
                  href={`/livestreaming/video/${video.streamData[0].livestream_product_id}_${video.streamData[0].livestream_id}_${video.uid}`}
                >
                  <button className="bg-[#3BB873] text-white px-6 py-3 rounded-lg">
                    구매하러가기
                  </button>
                </Link>
              </div>
              <Image
                src="/icons/recode-stream.png"
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
