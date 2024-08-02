import { Product } from '@/types/product';
import ProductCard from './_components/ProductCard';
import { getGoodsproducts } from './actions';

async function Goods() {
  const goodsProductsData = await getGoodsproducts();

  return (
    <section className="lg:w-[1240px] mx-auto lg:mt-[93px] mt-[55px] px-5 lg:px-0" id="goods">
      <h2 className="text-[32px] text-center mb-[43px]">식집사 필수템</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[20px] lg:gap-y-[24px] justify-items-center">
        {goodsProductsData.slice(0, 4).map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default Goods;
