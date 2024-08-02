'use client';

import React from 'react';
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

function SocialLoginButtons() {
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
