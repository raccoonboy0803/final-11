'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Props {
  totalItems: number;
  itemCountPerPage: number;
  pageCount: number;
  currentPage: number;
}

export default function Pagination({
  totalItems,
  itemCountPerPage,
  pageCount,
  currentPage
}: Props) {
  const totalPages = Math.ceil(totalItems / itemCountPerPage); // 총 페이지 수 계산

  const [startPage, setStartPage] = useState(1); // 페이지 범위의 시작 페이지

  // 페이지 범위의 마지막 페이지
  const endPage = Math.min(startPage + pageCount - 1, totalPages);

  // 페이지 범위 이동 로직
  useEffect(() => {
    const newStartPage = Math.floor((currentPage - 1) / pageCount) * pageCount + 1;
    setStartPage(newStartPage);
  }, [currentPage, pageCount, totalPages]);

  // 이전 및 다음 버튼 클릭 시 페이지 범위 이동
  const handlePrev = () => {
    if (startPage > 1) {
      const newStartPage = Math.max(startPage - pageCount, 1);
      setStartPage(newStartPage);
    }
  };

  const handleNext = () => {
    if (endPage < totalPages) {
      const newStartPage = Math.min(startPage + pageCount, totalPages);
      setStartPage(newStartPage);
    }
  };

  return (
    <div className="flex justify-center items-center mt-8 text-gray-500 text-sm mb-[180px]">
      <ul className="flex items-center space-x-2">
        <li className={`relative cursor-pointer ${startPage === 1 ? 'invisible' : ''}`}>
          <div className="w-12 h-6 flex items-center justify-center" onClick={handlePrev}>
            이전
          </div>
        </li>
        {[...Array(endPage - startPage + 1)].map((_, i) => {
          const pageNum = startPage + i;
          return (
            <li key={pageNum}>
              <Link href={`?page=${pageNum}`} scroll={false}>
                <div
                  className={`w-8 h-8 flex items-center justify-center rounded-full border ${
                    currentPage === pageNum
                      ? 'text-font/main font-bold border-font/main border-[1px] bg-white'
                      : 'border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {pageNum}
                </div>
              </Link>
            </li>
          );
        })}
        <li className={`relative cursor-pointer ${endPage === totalPages ? 'invisible' : ''}`}>
          <div className="w-12 h-6 flex items-center justify-center" onClick={handleNext}>
            다음
          </div>
        </li>
      </ul>
    </div>
  );
}
