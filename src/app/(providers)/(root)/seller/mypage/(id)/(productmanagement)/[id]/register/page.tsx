import ProductRegisterForm from './_components/ProductRegisterForm';

function ProductRegisterPage() {
  return (
    <div className="container mx-auto p-6 flex flex-col">
      <h1 className="text-3xl text-center font-bold my-6">상품 등록</h1>
      <ProductRegisterForm />
    </div>
  );
}

export default ProductRegisterPage;
