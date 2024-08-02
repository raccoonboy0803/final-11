'use client';

import Pagination from '@/app/(providers)/(root)/buyer/mypage/_components/Pagination';
import { createClient } from '@/supabase/supabaseClient';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

type Product = {
  category: string;
  title: string;
  price: number | null;
  stock: number | null;
  product_id: string;
  created_at: string | null;
  description: string;
  product_seller_id: string;
  thumbnail_url: string;
  updated_at: string | null;
};

interface ProductTableProps {
  sellerId: string;
}

export default function ProductTable({ sellerId }: ProductTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState<boolean>(true);
  const [isSellerValid, setIsSellerValid] = useState<boolean>(false);
  const supabase = createClient();

  // 판매자 유효성 확인 함수
  const checkSellerValidity = async () => {
    const { data, error } = await supabase
      .from('Seller')
      .select('*')
      .eq('seller_id', sellerId)
      .single();

    if (error || !data) {
      // 오류가 발생했거나 판매자가 존재하지 않을 경우
      router.push('/');
    } else {
      setIsSellerValid(true); // 판매자 유효성 설정
    }
  };

  // 판매자 유효성을 가장 먼저 확인
  useEffect(() => {
    checkSellerValidity(); // 판매자 유효성 확인
  }, [sellerId]);

  // 제품을 가져오는 함수
  const fetchProducts = async (page: number, category: string) => {
    if (!isSellerValid) return; // 판매자가 유효하지 않으면 제품을 가져오지 않음

    setLoading(true);
    const categoryCondition = category !== 'all' ? `${category}` : '';

    // 총 제품 수 조회
    const { count: totalProducts, error: countError } = await supabase
      .from('Product')
      .select('*', { count: 'exact' })
      .eq('product_seller_id', sellerId);

    if (countError) {
      console.error('총 제품 수 조회 에러:', countError.message);
      setLoading(false);
      return;
    }
    setTotalProducts(totalProducts || 0);

    // 현재 페이지의 제품 데이터 조회
    const { data, error } = await supabase
      .from('Product')
      .select(
        'category, title, price, stock, product_id, created_at, description, product_seller_id, thumbnail_url, updated_at'
      )
      .eq('product_seller_id', sellerId)
      .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

    if (error) {
      console.error('오류가 발생했습니다:', error.message);
      setLoading(false);
      return;
    }

    setProducts(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (isSellerValid) {
      // 판매자가 유효한 경우에만 제품을 가져옴
      const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string, 10) : 1;
      setCurrentPage(page);
      fetchProducts(page, categoryFilter);
    }
  }, [searchParams, sellerId, itemsPerPage, categoryFilter, isSellerValid]);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = event.target.value;
    setCategoryFilter(selectedCategory);
    setCurrentPage(1);
    router.push(`?page=1`);
  };

  const handleMoveEditPage = (id: string) => {
    router.push(`/seller/mypage/${id}/edit`);
  };

  const filteredProducts =
    categoryFilter === 'all'
      ? products
      : products.filter((product) => product.category === categoryFilter);

  const formatCurrency = (value: number | null): string => {
    if (value === null) {
      return 'N/A';
    }
    return new Intl.NumberFormat('ko-KR', {
      style: 'currency',
      currency: 'KRW',
      minimumFractionDigits: 0,
      currencyDisplay: 'code'
    })
      .format(value)
      .replace('KRW', '')
      .trim();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="max-w-screen-xl mx-auto mt-20 mb-20  w-[1240px]">
      <div className="flex">
        <div className="ml-auto ">
          <Link
            href={`/seller/mypage/${sellerId}/register`}
            className="px-[12px] py-[9px] bg-primary-green-500 rounded text-white"
          >
            상품 등록
          </Link>
        </div>
      </div>
      <div className="">
        <table className=" flex flex-col items-start bg-white border-collapse">
          <thead>
            <tr className="bg-secondary-yellow-100">
              <th className=" p-4 border-b text-center">카테고리</th>
              <th className="p-4 border-b">상품명</th>
              <th className=" p-4 border-b text-center">가격</th>
              <th className=" p-4 border-b text-center">수량</th>
              <th className=" p-4 border-b text-center">상태</th>
              <th className=" p-4 border-b text-center">수정</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.product_id}>
                  <td className="p-[22px] border-b text-center">{product.category}</td>
                  <td className="p-[22px] border-b">{product.title}</td>
                  <td className="p-[22px] border-b text-center">
                    {formatCurrency(product.price ?? 0)} <label>개</label>
                  </td>
                  <td className="p-[22px] border-b text-center">
                    {formatCurrency(product.stock ?? 0)} <label>개</label>
                  </td>
                  <td className="p-[22px] border-b text-center">
                    <span
                      className={
                        product.stock === 0 ? 'text-font/Disabled' : 'text-primary-green-500'
                      }
                    >
                      {product.stock === 0 ? '품절' : '판매중'}
                    </span>
                  </td>
                  <td className="p-4 border-b text-center">
                    <button
                      onClick={() => handleMoveEditPage(product.product_id)}
                      className="px-[12px] py-[9px] border border-primary-green-500 bg-white rounded text-primary-green-500"
                    >
                      상품 수정
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="p-4 text-center">
                  판매중인 제품이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalItems={totalProducts}
        currentPage={currentPage}
        pageCount={10}
        itemCountPerPage={itemsPerPage}
      />
    </section>
  );
}
