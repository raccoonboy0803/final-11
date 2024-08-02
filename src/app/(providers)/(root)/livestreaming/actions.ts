'use server';

import { createClient } from '@/supabase/supabaseServer';
import { Video } from '@/types/livestream';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

const getLiveStreamData = async (videoUid: string) => {
  const supabaseServer = createClient();
  const { data, error } = await supabaseServer
    .from('Livestream')
    .select('*')
    .eq('video_uid', videoUid);
  return data;
};

export const getVideos = async (category: string) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
      Pragma: 'no-cache',
      Expires: '0'
    }
  };

  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream`,
      options
    )
  ).json();

  const videos = response.result;

  const videosWithProduct = await Promise.all(
    videos.map(async (video: Video) => {
      if (video.liveInput) {
        const streamData = await getLiveStreamData(video.liveInput);
        return {
          ...video,
          streamData
        };
      } else {
        return video;
      }
    })
  );

  if (category === 'all') {
    return videosWithProduct;
  }

  const categoryFilteredData = videosWithProduct.filter((video) => {
    return video.streamData[0].category === category;
  });

  return categoryFilteredData;
};

export const startLiveStreaming = async (_: any, formData: FormData) => {
  const supabaseServer = createClient();

  const InputDatas = {
    liveTitle: formData.get('liveTitle'),
    product: formData.get('product') as string,
    description: formData.get('description'),
    category: formData.get('category'),
    thumbnail: formData.get('thumbnail')
  };

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`
      },
      body: JSON.stringify({
        meta: {
          name: InputDatas.liveTitle,
          descriptioin: InputDatas.description,
          product: InputDatas.product,
          category: InputDatas.category
        },
        recording: {
          mode: 'automatic'
        }
      })
    }
  );

  const streamServerData = await response.json();
  const sellerSession = await supabaseServer.auth.getUser();
  console.log('streamServerData::', streamServerData);

  const productId = InputDatas.product;
  let splitProductId;
  if (productId) {
    splitProductId = productId.split('/')[2];
  }

  if (InputDatas.thumbnail instanceof File) {
    const filename = `stream/${sellerSession.data.user?.id}/${uuidv4()}-${InputDatas.thumbnail.name}`;
    const response = await supabaseServer.storage
      .from('product-thumbnail')
      .upload(filename, InputDatas.thumbnail, {
        cacheControl: '1800',
        upsert: false
      });

    let fileUrl;
    if (response.data) {
      fileUrl = response.data.path;
    }

    const urlResponse = supabaseServer.storage.from('product-thumbnail').getPublicUrl(`${fileUrl}`);
    InputDatas.thumbnail = urlResponse.data.publicUrl!;
  }

  const stream = {
    livestream_seller_id: sellerSession.data.user!.id,
    livestream_product_id: splitProductId,
    stream_title: InputDatas.liveTitle,
    product_title: InputDatas.product,
    description: InputDatas.description,
    stream_id: streamServerData.result.uid,
    stream_key: streamServerData.result.rtmps.streamKey,
    video_uid: streamServerData.result.uid,
    thumbnail_url: InputDatas.thumbnail,
    category: InputDatas.category,
    is_live: true
  };

  const { data, error } = await supabaseServer.from('Livestream').insert([stream]).select('*');

  if (error) {
    console.log('error::', error);
    return;
  }

  const { data: liveStreamDB, error: liveStreamError } = await supabaseServer
    .from('Livestream')
    .select('livestream_id')
    .eq('stream_id', stream.stream_id);

  redirect(`/livestreaming/${stream.livestream_product_id}_${liveStreamDB![0].livestream_id}`);
  // redirect(`/livestreaming/${stream.livestream_product_id}_${stream.stream_id}`);
};

interface Livestream {
  livestream_id: string;
  stream_title: string;
  category: string;
  description: string;
  stream_key: string;
  stream_id: string;
  video_uid: string;
  create_at: string; // ISO 8601 날짜 문자열
  livestream_product_id: string;
  thumbnail_url: string;
  product_title: string;
  livestream_seller_id: string;
}

export const getStream = async (id: string): Promise<Livestream | null> => {
  const supabaseServer = createClient();
  const { data, error } = await supabaseServer.from('Livestream').select().eq('livestream_id', id);
  console.log(data);

  if (error) {
    console.error('Error fetching stream:', error);
    return null;
  }

  if (!data || data.length === 0) {
    return null;
  }

  return data[0] as Livestream;
};

interface ProductPrice {
  price: number;
}

export const getProductPrice = async (productId: string): Promise<ProductPrice[]> => {
  const supabaseServer = createClient();
  const { data, error } = await supabaseServer
    .from('Product')
    .select('price')
    .eq('product_id', productId);
  return data as ProductPrice[];
};

export const getProductId = async (videoUid: string) => {
  const supabaseServer = createClient();
  const { data, error } = await supabaseServer
    .from('Livestream')
    .select('livestream_product_id')
    .eq('video_uid', videoUid);
  // .single(); // 단일 행 반환
  if (error) {
    console.error('Error fetching product id:', error);
    return null;
  }

  return data;
};

export const addProductIdsToVideos = async (videos: Video[]) => {
  const updatedVideos = await Promise.all(
    videos.map(async (video) => {
      const productId = await getProductId(video.uid);
      return { ...video, product_id: productId };
    })
  );
  return updatedVideos;
};

interface LivestreamDB {
  livestream_id: string;
  stream_title: string;
  category: string;
  description: string;
  stream_key: string;
  stream_id: string;
  video_uid: string;
  create_at: string; // ISO 8601 날짜 문자열
  livestream_product_id: string;
  thumbnail_url: string;
  product_title: string;
  livestream_seller_id: string;
  id_live: boolean;
}

export const getAllLiveStreamDB = async (category: string): Promise<LivestreamDB[]> => {
  const supabaseServer = createClient();

  if (category === 'all') {
    const { data, error } = await supabaseServer.from('Livestream').select('*').eq('is_live', true);

    return data as LivestreamDB[];
  } else {
    const { data, error } = await supabaseServer
      .from('Livestream')
      .select('*')
      .eq('is_live', true)
      .eq('category', category);

    return data as LivestreamDB[];
  }
};

export const getAllRecodeStramDB = async (category: string): Promise<LivestreamDB[]> => {
  const supabaseServer = createClient();
  const { data, error } = await supabaseServer
    .from('Livestream')
    .select('*')
    .eq('is_live', false)
    .eq('category', category);
  return data as LivestreamDB[];
};

export const getLiveInput = async (liveInputUID: string) => {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`
    }
  };

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/stream/live_inputs/${liveInputUID}`,
    options
  );

  const data = await response.json();
  return data;
};

export const getSellerData = async (sellerId: string) => {
  const supabaseServer = createClient();
  const { data, error } = await supabaseServer.from('Seller').select().eq('seller_id', sellerId);
  return data;
};
