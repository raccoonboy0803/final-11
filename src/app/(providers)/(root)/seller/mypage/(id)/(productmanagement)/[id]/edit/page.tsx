import { getProductRequest } from '@/app/(providers)/(root)/products/[id]/_actions/productActions';
import ProductEditForm from './_components/ProductEditForm';

interface ParamsProps {
  params: { id: string };
}

async function ProductEditPage({ params }: ParamsProps) {
  const { id: productId } = params;
  const product = await getProductRequest(productId);

  if (!product) {
    return <p>해당 상품이 없습니다.</p>;
  }

  return (
    <div className="container mx-auto p-6 flex flex-col">
      <h1 className="text-3xl text-center font-bold my-6">상품 수정</h1>
      <ProductEditForm product={product} />
    </div>
  );
}

export default ProductEditPage;
