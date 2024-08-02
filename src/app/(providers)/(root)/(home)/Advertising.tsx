import Link from 'next/link';
import React from 'react';

function Advertising() {
  return (
    <section
      className="w-full h-[180px] text-center bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/bg-advertising.svg')" }}
    >
      <Link
        href={'/livestreaming'}
        className="w-full h-full cursor-pointer	 flex justify-center items-center"
      >
        <p>
          <span className="text-[32px]">식물의 매력을 실시간으로!</span>
          <br />
          실시간으로 만나는 식물, 직접 확인하고 선택하세요.
        </p>
      </Link>
    </section>
  );
}

export default Advertising;
