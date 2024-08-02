import { createPostponedAbortSignal } from 'next/dist/server/app-render/dynamic-rendering';
import ProductCard from './_components/ProductCard';
import { getProducts } from './actions';

async function NewProduct() {
  const newProductsData = await getProducts();
  const sortedProducts = newProductsData.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <section className="lg:w-[1240px] mx-auto lg:mt-[93px] mt-[55px] px-5 lg:px-0">
      <h2 className="text-[32px] text-center lg:mb-[43px] mb-[16px]">신제품</h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-[20px] lg:gap-y-[24px] justify-items-center">
        {sortedProducts.slice(0, 8).map((product) => (
          <div key={product.product_id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewProduct;
