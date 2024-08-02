'use client';

import { Review } from '@/types/review';
import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getReviews } from '../_actions/productActions';

interface ProductReviewProps {
  productId: string;
  reviewsPerPage: number;
}

const fetchReviews = async (productId: string, reviewsPerPage: number, currentPage: number) => {
  const offset = (currentPage - 1) * reviewsPerPage;
  return getReviews(productId, reviewsPerPage, offset);
};

const ProductReviewList = ({ productId, reviewsPerPage }: ProductReviewProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: reviewData,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['reviews', productId, currentPage],
    queryFn: () => fetchReviews(productId, reviewsPerPage, currentPage)
  });

  useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  const totalPages = reviewData ? Math.ceil((reviewData.totalCount ?? 0) / reviewsPerPage) : 1;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full mx-auto my-20">
      {isLoading ? (
        <p>리뷰를 불러오는 중입니다...</p>
      ) : error ? (
        <p>리뷰를 불러오는 중 에러가 발생했습니다: {error.message}</p>
      ) : (
        <>
          <ul className="space-y-4 text-left">
            {reviewData?.reviews.map((review: Review) => (
              <li key={review.review_id} className="p-4 border rounded shadow-md">
                <div className="mb-2">
                  <p className="font-bold">작성자: {review.review_user_name}</p>
                </div>
                <div className="flex items-center mb-2">
                  <div className="flex items-center">
                    {Array.from({ length: review.rating || 0 }).map((_, index) => (
                      <span key={index} className="text-green-300">
                        ★
                      </span>
                    ))}
                    {Array.from({ length: 5 - (review.rating || 0) }).map((_, index) => (
                      <span key={index} className="text-gray-300">
                        ★
                      </span>
                    ))}
                    <span className="text-xl font-bold ml-2">{review.rating}.0</span>
                  </div>
                </div>
                <p className="mb-2">{review.description}</p>
                <span className="text-gray-500 text-sm">
                  {review.created_at
                    ? new Date(review.created_at).toLocaleDateString()
                    : '날짜 정보 없음'}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-center mt-5">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-3 py-1 border rounded-md ${currentPage === index + 1 ? 'bg-green-300' : 'bg-white'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductReviewList;
