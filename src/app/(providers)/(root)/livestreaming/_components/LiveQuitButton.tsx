'use client';

import { createClient } from '@/supabase/supabaseClient';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function LiveQuitButton({ streamId }: { streamId: string }) {
  const router = useRouter();

  const deleteLivestreamDB = async (streamId: string) => {
    const supabase = createClient();
    // const { error } = await supabase.from('Livestream').delete().eq('stream_id', streamId);
    const { error } = await supabase
      .from('Livestream')
      .update({ is_live: false })
      .eq('stream_id', streamId);
    if (error) {
      console.error('Error end stream:', error);
      return null;
    }
    router.push('/');
  };
  return <button onClick={() => deleteLivestreamDB(streamId)}>방송종료하기</button>;
}
