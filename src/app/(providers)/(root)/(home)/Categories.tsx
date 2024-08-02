'use client';
import Link from 'next/link';
import { useState } from 'react';
import CategoryIcon from './_components/CategoryIcon';
import { useRouter } from 'next/navigation';

export type CategoryIconType = {
  imgUrl: string;
  alt: string;
  url: string;
};

function Categories() {
  const [categoryIcons, setCategoryIcons] = useState<CategoryIconType[]>([
    {
      imgUrl: '/icons/icon-seed.svg',
      alt: '씨앗',
      url: '/productsList/seed'
    },
    {
      imgUrl: '/icons/icon-seedling.svg',
      alt: '모종',
      url: '/productsList/seedling'
    },
    {
      imgUrl: '/icons/icon-kit.svg',
      alt: '재배키트',
      url: '/productsList/kit'
    },
    {
      imgUrl: '/icons/icon-soil.svg',
      alt: '흙, 비료',
      url: '/productsList/soil'
    },
    {
      imgUrl: '/icons/icon-goods.svg',
      alt: '원예용품',
      url: '/productsList/goods'
    }
  ]);

  // 페이지 네비게이션
  const router = useRouter();
  const redirect = (e: string) => {
    router.push(`${e}`);
  };

  return (
    <div className="lg:w-[1020px] md:w-[600px] sm:w-[351px] flex justify-between justify-center items-center mx-auto lg:mt-[120px] mt-[40px] px-[24px] text-center justify-items-center">
      {categoryIcons.map((category) => (
        <button
          onClick={() => {
            redirect(`${category.url}`);
          }}
          key={category.alt}
        >
          <CategoryIcon category={category} />
        </button>
      ))}
    </div>
  );
}

export default Categories;
