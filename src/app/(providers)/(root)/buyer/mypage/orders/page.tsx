import { createClient } from '@/supabase/supabaseServer';
import Pagination from '../_components/Pagination';
import { redirect } from 'next/navigation';

interface Product {
  title: string;
}

interface Order {
  order_id: number;
  order_date: string;
  cost: number;
  is_payed: boolean;
  Product: Product | null;
}

interface ProductPageProps {
  searchParams: { [key: string]: string | string[] };
}

export default async function BuyerOrderListPage({ searchParams }: ProductPageProps) {
  const page = searchParams.page ? parseInt(searchParams.page as string, 10) : 1;
  const currentPage = page || 1;
  const itemsPerPage = 1;
  const supabase = createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();
  const userId = user?.id;
  if (userError || !user) {
    redirect('/login');
  }

  if (!userId) {
    redirect('/login');
  }

  // 총 주문 수를 조회
  const { count: totalOrders, error: countError } = await supabase
    .from('Order')
    .select('*', { count: 'exact' })
    .eq('order_user_id', userId);

  if (countError) {
    return <div>총 주문 수 조회 에러: {countError.message}</div>;
  }

  // 현재 페이지의 주문 데이터 조회
  const { data: orders, error: orderError } = await supabase
    .from('Order')
    .select(
      `
      order_id,
      order_date,
      cost,
      is_payed,
      order_product_id
    `
    )
    .eq('order_user_id', userId)
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

  // 제품 데이터 조회
  const { data: products, error: productError } = await supabase
    .from('Product')
    .select('product_id, title');

  if (orderError || productError) {
    return <div>데이터 조회 에러: {orderError?.message || productError?.message}</div>;
  }

  // 주문과 제품 데이터를 결합
  const ordersWithProducts = orders?.map((order) => {
    const product = products?.find((p) => p.product_id === order.order_product_id);
    return {
      ...order,
      Product: product || null
    };
  }) as Order[];

  // 금액을 원화 형식으로 포맷하는 함수
  const formatCurrency = (value: number) => {
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

  // 날짜를 'YY/MM/DD' 형식으로 포맷하는 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = String(date.getFullYear()).slice(2);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  };

  return (
    <>
      <div className="max-w-screen-xl mx-auto mt-20 mb-20  w-m-[1240px] ">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border-collapse">
            <thead>
              <tr className="bg-secondary-yellow-100">
                <th className="w-[15%] px-4 py-[22px] border-b text-[16px] font-normal leading-[24px] tracking-[-0.4px]-font/main">
                  주문 번호
                </th>
                <th className="px-4 py-[22px] border-b text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main">
                  상품명
                </th>
                <th className="w-[12%] px-4 py-[22px] border-b text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main">
                  주문 날짜
                </th>
                <th className="w-[12%] px-4 py-[22px] border-b text-[16px] font-normal leading-[24px] tracking-[-0.4px] text-font/main">
                  결제 금액
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(ordersWithProducts) && ordersWithProducts.length > 0 ? (
                ordersWithProducts.map((order) => (
                  <tr key={order.order_id}>
                    <td className="px-4 py-[22px] text-font/sub2 text-[14px] font-normal leading-[20px] tracking-[-0.35px]  text-center border-b">
                      {order.order_id}
                    </td>
                    <td className="px-4 py-[22px] font/main text-[14px] font-normal leading-[20px] tracking-[-0.35px border-b ">
                      {order.Product?.title || '제품 없음'}
                    </td>
                    <td className="px-4 py-[22px] text-font/sub2 text-[14px] font-normal leading-[20px] tracking-[-0.35px] border-b text-center">
                      {formatDate(order.order_date)}
                    </td>
                    <td className="px-4 py-[22px] text-font/sub2 text-[14px] font-normal leading-[20px] tracking-[-0.35px] border-b text-center">
                      {formatCurrency(order.cost)}원
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className=" text-center pt-20 text-[15px] font-normal leading-[22px] tracking-[-0.375px] text-font/main"
                  >
                    구매내역이 아직 없습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          totalItems={totalOrders || 0} // 전체 주문의 총 개수
          currentPage={currentPage} // 현재 페이지 번호
          pageCount={10} // 페이지 버튼의 최대 개수
          itemCountPerPage={itemsPerPage} // 한 페이지에 표시할 아이템 수
        />
      </div>
    </>
  );
}
