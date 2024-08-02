// 'use client';

// import React from 'react';
// import { createClient } from '@/supabase/supabaseClient';

// type OAuthProvider = 'google' | 'kakao';

// const handleSocialLogin = async (provider: OAuthProvider) => {
//   const supabase = createClient();
//   const { error } = await supabase.auth.signInWithOAuth({
//     provider: provider,
//     options: {
//       redirectTo: `${window.location.origin}/auth/callback`
//       // redirectTo: `${process.env.NEXT_PUBLIC_REDIRECT_URL!}/auth/callback`
//     }
//   });

//   if (error) {
//     console.error(`Error logging in with ${provider}:`, error.message);
//   }
// };

// function SocialLoginButtons() {
//   const handleLogin =
//     (provider: OAuthProvider) => async (event: React.MouseEvent<HTMLButtonElement>) => {
//       event.preventDefault();
//       await handleSocialLogin(provider);
//     };

//   return (
//     <form className="flex flex-col gap-5">
//       <button
//         onClick={handleLogin('kakao')}
//         className="w-[400px] h-[56px] bg-[#D9D9D9] rounded-md font-semibold"
//       >
//         카카오 로그인/회원가입
//       </button>
//       <button
//         onClick={handleLogin('google')}
//         className="w-[400px] h-[56px] bg-[#D9D9D9] rounded-md font-semibold"
//       >
//         구글 로그인/회원가입
//       </button>
//     </form>
//   );
// }

// export default SocialLoginButtons;

'use client';

import React, { useEffect } from 'react';
import { createClient } from '@/supabase/supabaseClient';

type OAuthProvider = 'google' | 'kakao';

const handleSocialLogin = async (provider: OAuthProvider) => {
  const supabase = createClient();
  const { error } = await supabase.auth.signInWithOAuth({
    provider: provider,
    options: {
      redirectTo: `${window.location.origin}/auth/callback`
    }
  });

  if (error) {
    console.error(`Error logging in with ${provider}:`, error.message);
  }
};

const saveUserToDatabase = async (user: any) => {
  const userData = {
    user_id: user.id,
    user_name: user.user_metadata.full_name,
    avatar_url: user.user_metadata.avatar_url,
    email: user.email,
    phone: '000-0000-0000',
    address: '',
    created_at: user.created_at,
    address_detail: '상세주소',
    address_code: '우편번호'
  };

  try {
    const supabase = createClient();
    const { error } = await supabase.from('User').upsert([userData]);

    if (error) {
      console.error('유저 정보를 데이터베이스에 저장하는 중 에러 발생:', error.message);
      return false;
    } else {
      console.log('유저 정보를 데이터베이스에 성공적으로 저장');
      return true;
    }
  } catch (error: any) {
    console.error('유저 정보를 데이터베이스에 저장하는 중 에러 발생:', error.message);
    return false;
  }
};

function SocialLoginButtons() {
  useEffect(() => {
    const supabase = createClient();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const isUserSaved = await saveUserToDatabase(session.user);
        if (isUserSaved) {
          window.location.href = '/';
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin =
    (provider: OAuthProvider) => async (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      await handleSocialLogin(provider);
    };

  return (
    <form className="flex flex-col gap-5">
      <button
        onClick={handleLogin('kakao')}
        className="w-[400px] h-[56px] bg-[#D9D9D9] rounded-md font-semibold"
      >
        카카오 로그인/회원가입
      </button>
      <button
        onClick={handleLogin('google')}
        className="w-[400px] h-[56px] bg-[#D9D9D9] rounded-md font-semibold"
      >
        구글 로그인/회원가입
      </button>
    </form>
  );
}

export default SocialLoginButtons;
