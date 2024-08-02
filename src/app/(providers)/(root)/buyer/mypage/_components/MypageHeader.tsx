'use client';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

const MyPageHeader = () => {
  const params = useParams();
  const pathname = usePathname();

  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    setActiveLink(pathname);
  }, [pathname]);

  const linkClassName = ' text-font/main border-line-gray-50 border-b-2';
  const activeLinkClassName =
    'text-primary-green-500 font-bole  border-primary-green-500 border-b-2 ';

  return (
    <div className="max-w-screen-xl mx-auto mt-20 mb-20  w-m-[1240px] ">
      {/* Title */}
      <h1 className="text-center text-[32px] font-semibold leading-[42px] tracking-[-0.8px] mb-[51px]">
        마이페이지
      </h1>

      {/* Links */}
      <ul className="flex items-start  ">
        <li
          className={`w-1/3  p-4 text-center ${linkClassName} ${activeLink === `/buyer/mypage/orders` ? activeLinkClassName : ''}`}
        >
          <Link href={`/buyer/mypage/orders`}>
            <div className="  text-[18px] font-semibold leading-[26px] tracking-[-0.45px]">
              구매내역 조회
            </div>
          </Link>
        </li>
        <li
          className={`w-1/3 p-4 text-center ${linkClassName} ${activeLink === `/buyer/mypage/profile` ? activeLinkClassName : ''}`}
        >
          <Link href={`/buyer/mypage/profile`}>
            <div className="  text-[18px] font-semibold leading-[26px] tracking-[-0.45px]">
              회원정보 변경
            </div>
          </Link>
        </li>
        <li
          className={`w-1/3 p-4 text-center ${linkClassName} ${activeLink === `/buyer/mypage/BusinessCheck` ? activeLinkClassName : ''}`}
        >
          <Link href={`/buyer/mypage/BusinessCheck`}>
            <div className=" text-[18px] font-semibold leading-[26px] tracking-[-0.45px]">
              사업자 인증
            </div>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default MyPageHeader;
