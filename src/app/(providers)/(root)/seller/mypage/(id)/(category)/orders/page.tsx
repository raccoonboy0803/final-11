// import { createClient } from '@/supabase/0supabaseServer';
// import AccordionMenu from '../_components/AccordionMenu';
// import Pagination from '@/app/(providers)/(root)/buyer/mypage/_components/Pagination';
// import { QueryResult, QueryData, QueryError } from '@supabase/supabase-js';
// import { redirect } from 'next/navigation';

// // Product 타입
// interface Product {
//   title: string;
// }

// // User 타입
// interface User {
//   user_name: string;
//   phone: string;
//   address: string;
//   address_detail: string;
//   email: string;
// }

// // Order 타입
// interface Order {
//   order_id: number;
//   order_product_id: string;
//   cost: number;
//   quantity: number;
//   order_date: string;
//   order_user_id: string;
//   order_seller_id: string;
//   Product: Product;
//   User: User;
// }

// interface ProductPageProps {
//   searchParams: { [key: string]: string | string[] };
// }

// export default async function SellerOrderListPage({ searchParams }: ProductPageProps) {
//   const supabase = createClient();

//   const {
//     data: { user },
//     error: userError
//   } = await supabase.auth.getUser();
//   const userId = user?.id;
//   if (userError || !user) {
//     redirect('/login');
//   }

//   if (!userId) {
//     redirect('/login');
//   }

//   // 페이지네이션 설정
//   const currentPage = parseInt(searchParams.page as string, 10) || 1; // 현재 페이지
//   const itemsPerPage = 5; // 한 페이지에 표시할 주문 수

//   // 총 주문 수 조회
//   const { count: totalOrders, error: countError } = await supabase
//     .from('Order')
//     .select('*', { count: 'exact' })
//     .eq('order_seller_id', userId);

//   if (countError) {
//     return <div>총 주문 수 조회 에러: {countError.message}</div>;
//   }

//   // 현재 페이지의 주문 데이터 조회
//   const { data: orders, error: orderError } = await supabase
//     .from('Order')
//     .select(
//       `
//       order_id,
//       order_product_id,
//       cost,
//       quantity,
//       order_date,
//       order_user_id,
//       order_seller_id,
//       Product:order_product_id (title),
//       User:order_user_id (user_name, phone, address, address_detail, email)
//     `
//     )
//     .eq('order_seller_id', userId)
//     .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);
//   if (orderError) {
//     return <div>주문 데이터 조회 에러: {orderError.message}</div>;
//   }

//   console.log('페이지주문데이터:', orders);
//   if (!orders || orders.length === 0) {
//     return <div>주문이 없습니다.</div>;
//   }

//   const typeOrders = orders as unknown;
//   const myOrdersType = typeOrders as Order[];

//   return (
//     <>
//       <AccordionMenu orders={myOrdersType} />
//       <Pagination
//         totalItems={totalOrders || 0} // 전체 주문의 총 개수
//         currentPage={currentPage} // 현재 페이지 번호
//         pageCount={10} // 페이지 버튼의 최대 개수
//         itemCountPerPage={itemsPerPage} // 한 페이지에 표시할 아이템 수
//       />
//     </>
//   );
// }
import { createClient } from '@/supabase/supabaseServer';
import AccordionMenu from '../_components/AccordionMenu';
import Pagination from '@/app/(providers)/(root)/buyer/mypage/_components/Pagination';
import { redirect } from 'next/navigation';

// Product 타입
interface Product {
  title: string;
}

// User 타입
interface User {
  user_name: string;
  phone: string;
  address: string;
  address_detail: string;
  email: string;
}

// Order 타입
interface Order {
  order_id: number;
  order_product_id: string;
  cost: number;
  quantity: number;
  order_date: string;
  order_user_id: string;
  order_seller_id: string;
  Product: Product;
  User: User;
}

interface ProductPageProps {
  searchParams: { [key: string]: string | string[] };
}

export default async function SellerOrderListPage({ searchParams }: ProductPageProps) {
  const supabase = createClient();

  // 현재 사용자 정보 가져오기
  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  const userId = user?.id;

  // 사용자 정보가 없거나 오류가 발생한 경우 로그인 페이지로 리디렉션
  if (userError || !userId) {
    redirect('/login');
  }

  // Seller 테이블에서 판매자 정보 조회
  const { data: sellerData, error: sellerError } = await supabase
    .from('Seller')
    .select('*')
    .eq('seller_id', userId)
    .single();

  // 오류가 발생한 경우 적절히 처리
  if (sellerError || !sellerData) {
    redirect('/');
  }

  console.log('userId:', userId);
  console.log('sellerData:', sellerData);

  // 판매자 데이터가 존재하지 않거나 seller_id가 userId와 다를 경우 홈으로 리디렉션
  if (sellerData.seller_id !== userId) {
    redirect('/');
  }

  // 페이지네이션 설정
  const currentPage = parseInt(searchParams.page as string, 10) || 1; // 현재 페이지
  const itemsPerPage = 5; // 한 페이지에 표시할 주문 수

  // 총 주문 수 조회
  const { count: totalOrders, error: countError } = await supabase
    .from('Order')
    .select('*', { count: 'exact' })
    .eq('order_seller_id', userId);

  if (countError) {
    return <div>총 주문 수 조회 에러: {countError.message}</div>;
  }

  // 현재 페이지의 주문 데이터 조회
  const { data: orders, error: orderError } = await supabase
    .from('Order')
    .select(
      `
      order_id,
      order_product_id,
      cost,
      quantity,
      order_date,
      order_user_id,
      order_seller_id,
      Product:order_product_id (title), 
      User:order_user_id (user_name, phone, address, address_detail, email)
    `
    )
    .eq('order_seller_id', userId)
    .range((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage - 1);

  if (orderError) {
    return <div>주문 데이터 조회 에러: {orderError.message}</div>;
  }

  console.log('페이지주문데이터:', orders);
  if (!orders || orders.length === 0) {
    return <div>주문이 없습니다.</div>;
  }

  const typeOrders = orders as unknown;
  const myOrdersType = typeOrders as Order[];

  return (
    <>
      <AccordionMenu orders={myOrdersType} />
      <Pagination
        totalItems={totalOrders || 0} // 전체 주문의 총 개수
        currentPage={currentPage} // 현재 페이지 번호
        pageCount={10} // 페이지 버튼의 최대 개수
        itemCountPerPage={itemsPerPage} // 한 페이지에 표시할 아이템 수
      />
    </>
  );
}
