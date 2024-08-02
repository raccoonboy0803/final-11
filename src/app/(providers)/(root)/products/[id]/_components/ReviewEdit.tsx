'use client';

import useUser from '@/hooks/useUser';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Review, ReviewInput } from '@/types/review';
import { createReview } from '../_actions/productActions';
import StarRating from './StarRating';

interface ReviewEditProps {
  reviewProductId: string;
}

function ReviewEdit({ reviewProductId }: ReviewEditProps) {
  const { user } = useUser();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState<string>('');

  const mutation = useMutation<Review[], Error, ReviewInput>({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', reviewProductId] });
      setRating(0);
      setReview('');
    },
    onError: (error: any) => {
      console.error('리뷰 등록 중 에러 발생:', error);
    }
  });

  const handleReviewSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user) {
      console.error('로그인된 유저의 정보를 가져올 수 없습니다.');
      return;
    }

    const reviewData: ReviewInput = {
      description: review,
      rating: rating,
      review_product_id: reviewProductId,
      review_user_id: user.id,
      review_user_name: user.user_metadata.name
    };

    mutation.mutate(reviewData);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">Review</h2>
      <form onSubmit={handleReviewSubmit} className="w-full mx-auto p-4 border rounded shadow-md">
        <StarRating rating={rating} setRating={setRating} />
        <div className="mb-4">
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="소중한 리뷰를 작성해주세요."
            required
            className="w-full px-5 py-16 border rounded"
          />
        </div>
        <div className="flex justify-between gap-4">
          <div className="flex flex-col text-[13px] text-left">
            <span>
              • 상품과 관련없는 내용 또는 이미지, 욕설/비방, 개인정보유출, 광고/홍보글 등 적절하지
              않은 게시물은 별도의 고지없이 비공개 처리 될 수 있습니다.
            </span>
            <span>• 작성된 게시물은 운영 및 마케팅에 활용될 수 있습니다.</span>
          </div>
          <button type="submit" className="bg-black text-white p-2 rounded hover:bg-gray-600">
            등록하기
          </button>
        </div>
      </form>
    </>
  );
}

export default ReviewEdit;
