import ProductReviewList from './_components/ReviewList';
import TopSection from './_components/TopSection';
import { getProductRequest, getReviews } from './_actions/productActions';
import Image from 'next/image';
import ButtonsWrapper from './_components/ButtonsWrapper';
import MiddleSectionWrapper from './_components/MiddleSectionWrapper';

interface ParamsProps {
  params: { id: string };
}

async function ProductDetailPage({ params }: ParamsProps) {
  const { id } = params;
  const product = await getProductRequest(id);
  const reviewsPerPage = 10;
  const reviewData = await getReviews(id, reviewsPerPage, 0);

  if (!product) {
    return <p>해당 상품이 없습니다.</p>;
  }

  const reviewCount = reviewData.totalCount || 0;
  const totalRating = reviewData.reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
  const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

  return (
    <div className="container mx-auto max-w-screen-lg p-20">
      <section className="flex flex-col md:flex-row gap-[80px]">
        <div className="md:w-1/2 flex-shrink-0 justify-center rounded-[28px] mb-4 md:mb-0">
          <Image
            src={product.thumbnail_url}
            alt={product.title}
            width={485}
            height={485}
            className="rounded-lg"
          />
        </div>
        <div className="md:w-1/2 flex flex-col justify-center">
          <TopSection product={product} averageRating={averageRating} reviewCount={reviewCount} />
          <ButtonsWrapper
            productId={product.product_id}
            productPrice={product.price}
            productTitle={product.title}
            productSellerId={product.product_seller_id}
          />
        </div>
      </section>
      <MiddleSectionWrapper productDescription={product.description} reviewProductId={id} />
      <ProductReviewList productId={product.product_id} reviewsPerPage={reviewsPerPage} />
    </div>
  );
}

export default ProductDetailPage;
