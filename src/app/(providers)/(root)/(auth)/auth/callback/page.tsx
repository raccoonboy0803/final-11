'use client';

import React, { useEffect } from 'react';
import { createClient } from '@/supabase/supabaseClient';
import { useRouter } from 'next/navigation';

function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const saveUserToDatabase = async (user: any) => {
      const userData = {
        // 구매자
        user_id: user.id,
        user_name: user.user_metadata.full_name,
        avatar_url: user.user_metadata.avatar_url,
        email: user.email,
        phone: '000-0000-0000',
        address: '',
        created_at: user.created_at
      };
      const sellerData = {
        // 판매자
        seller_id: user.id,
        email: user.email,
        user_name: user.user_metadata.full_name,
        address: '',
        phone: '000-0000-0000',
        avatar_url: user.user_metadata.avatar_url
      };

      try {
        const supabase = createClient();
        const { error } = await supabase.from('User').upsert([userData]);
        // const { error } = await supabase.from('Seller').upsert([sellerData]);

        if (error) {
          console.error('유저 정보를 데이터베이스에 저장하는 중 에러 발생:', error.message);
        } else {
          console.log('유저 정보를 데이터베이스에 성공적으로 저장');
        }
      } catch (error: any) {
        console.error('유저 정보를 데이터베이스에 저장하는 중 에러 발생:', error.message);
      }
    };

    const checkUserExists = async (userId: string) => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('User')
        .select('user_id')
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') {
        // PGRST116 is the code for no rows found in supabase-js
        console.error('사용자 확인 중 에러 발생:', error.message);
        return false;
      }

      return data !== null;
    };

    const getUserSession = async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getSession();
      return data;
    };

    const handleAuthCallback = async () => {
      const { session } = await getUserSession();
      if (session) {
        const userExists = await checkUserExists(session.user.id);
        if (!userExists) {
          await saveUserToDatabase(session.user);
        }
        router.push('/');
      }
    };

    handleAuthCallback();
  }, [router]);

  return <div>로그인 중...</div>;
}

export default AuthCallback;
