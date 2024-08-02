import React from 'react';
import { getStream, getSellerData } from '../actions';
import { notFound } from 'next/navigation';
import { createClient } from '@/supabase/supabaseServer';
import Image from 'next/image';
import Link from 'next/link';
import LiveQuitButton from '../_components/LiveQuitButton';

export default async function StreamingPage({ params }: { params: { id: string } }) {
  const supabaseServer = createClient();
  const streamId = params.id.split('_')[1];
  const stream = await getStream(streamId);

  if (!stream) {
    return notFound();
  }
  const sellerData = await getSellerData(stream.livestream_seller_id);
  const sessionData = await supabaseServer.auth.getUser();
  const sessionId = sessionData.data.user?.id;

  return (
    <div className="pt-[80px] pb-[180px]">
      <div className="flex items-center mb-[40px] gap-3">
        <Image
          src={sellerData![0].avatar_url}
          alt="판매자프로필사진"
          width={50}
          height={50}
          className="rounded-full"
        />
        <div>
          <span className="font-bold">{sellerData![0].user_name} </span>
          <span>님의 라이브 방송입니다.</span>
        </div>
      </div>
      <div className="relative aspect-video">
        <iframe
          src={`https://${process.env.CLOUDFLARE_DOMAIN}/${streamId}/iframe`}
          allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
          className="w-full h-[698px] rounded-2xl"
        ></iframe>
      </div>
      <div className="flex gap-[32px] justify-between mt-[32px] items-start">
        <div className="flex gap-[20px]">
          <div className="rounded-full bg-[#F9F3CF] px-[16px] py-[9px] text-[13px] h-[36px] text-center">
            {stream.category}
          </div>
          <div>
            <p className="text-[20px] font-semibold mb-[20px]">{stream.stream_title}</p>
            <p className="text-[14px]">{stream.description}</p>
          </div>
        </div>
        <Link href={`/products/${stream.livestream_product_id}`} className="cursor-pointer">
          <button className="bg-primary-green-500 text-white p-[16px] rounded-[6px] flex items-center gap-[4px] hover:bg-primary-green-700 transition-colors">
            <p className="text-[16px] font-semibold">구매하러 가기</p>
            <Image src="/icons/right-arrow.png" alt="rightarrow" width={20} height={20} />
          </button>
        </Link>
      </div>

      {stream.livestream_seller_id === sessionId! ? (
        <div className="bg-yellow-200 text-black p-5 rounded-md">
          <div className="flex gap-2">
            <span className="font-semibold">Stream URL:</span>
            <span>rtmps://live.cloudflare.com:443/live/</span>
          </div>
          <div className="flex flex-wrap">
            <span className="font-semibold">Secret Key:</span>
            <span>{stream.stream_key}</span>
          </div>
          <LiveQuitButton streamId={streamId} />
        </div>
      ) : null}
    </div>
  );
}
