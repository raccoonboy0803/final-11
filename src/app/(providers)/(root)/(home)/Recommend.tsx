import { Product } from '@/types/product';
import Link from 'next/link';
import { getRecommendPlant, getSellerName } from './actions';
import Image from 'next/image';

const setRecommendPlant = (products: Product[]) => {
  const findData = products.find(
    (data) => data.stock !== null && data.stock !== 0 && data.stock < 50
  );
  return findData;
};

async function Recommend() {
  const products = await getRecommendPlant();
  const myPrd = products as unknown; // type 임시방편
  const recommendProduct = myPrd as Product[]; // type 임시방편

  const recommendedData = setRecommendPlant(recommendProduct);
  const { business_name } = await getSellerName(recommendedData?.product_seller_id!);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US').format(price);
  };

  return (
    <section className="lg:w-[1240px] mx-auto lg:mt-[140px] mt-[55px]">
      <h2 className="text-[32px] text-center mb-[34px]">이 달의 추천 식물</h2>
      <div className=" lg:grid lg:grid-cols-2 justify-center pr-[24px] md:block sm:block bg-[#F7FDFA] rounded-2xl">
        <div className="z-10 lg:w-[610px] lg:h-[342px] md:w-[500px] md:h-[300px] h-[206px] w-[335px] bg-zinc-300 rounded-2xl object-cover mx-auto">
          <Image
            className="object-cover lg:w-[610px] lg:h-[342px] rounded-2xl md:w-[500px] md:h-[300px] h-[206px] w-[335px]"
            src={recommendedData?.thumbnail_url!}
            width={610}
            height={342}
            alt="추천식물"
          />
        </div>
        <div className="text-right my-auto ">
          <p className="mb-[5px] sm:text-xs lg:text-sm text-xs">{business_name}</p>
          <h3 className="lg:text-[32px] mb-[12px] sm:text-[13px] text-[13px]">
            {recommendedData?.title}
          </h3>
          <h3 className="lg:text-[32px] font-semibold sm:text-sm text-sm">
            {formatPrice(recommendedData?.price!)}원
          </h3>
          <p className="hidden lg:block line-clamp-3 mt-[20px] text-ellipsis overflow-hidden text-[#555555]">
            {recommendedData?.description}
          </p>
          <Link
            href={`products/${recommendedData?.product_id}`}
            className="hidden lg:block md:hidden sm:hidden"
          >
            <button className="w-[271px] h-[56px] mt-[32px] rounded-md bg-[#3BB873] text-white ">
              바로가기
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Recommend;
