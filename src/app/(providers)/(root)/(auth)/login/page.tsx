import React from 'react';
import SocialLoginButtons from './_components/SocialLoginButtons';

function LoginPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-10 mt-12 mb-36 h-[30vh]">
      <h1 className="text-[32px] font-semibold">로그인/회원가입</h1>
      <div className="relative w-[50%] flex items-center">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-1 whitespace-nowrap bg-white px-2 text-[#93907A] font-[15px]">
          SNS 계정으로 간편 로그인
        </span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>
      <section>
        <SocialLoginButtons />
      </section>
    </div>
  );
}

export default LoginPage;
