'use client';
import '@/app/globals.css';
import { Accordion, AccordionItem } from '@szhsin/react-accordion';

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

interface AccordionMenuProps {
  orders: Order[];
}

export default function AccordionMenu({ orders }: AccordionMenuProps) {
  if (orders.length === 0) {
    return <div>주문이 없습니다.</div>;
  }
  function formatDate(dateString: string) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}/${month}/${day}`;
  }

  function formatPhoneNumber(phoneNumber: string) {
    const cleaned = ('' + phoneNumber).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{4})(\d{4})$/);

    if (match) {
      return `${match[1]}-${match[2]}-${match[3]}`;
    }

    return phoneNumber;
  }

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
  console.log(orders);
  return (
    <div className="max-w-screen-xl mx-auto mt-20 mb-20  w-m-[1240px]">
      <div>
        <div>
          {/* <div className="flex justify-between  bg-secondary-yellow-100">
           */}
          <div className="flex items-start self-stretch bg-secondary-yellow-100">
            <span className=" w-[16%] text-font/main text-[16px] font-normal leading-[24px] tracking-[-0.4px] p-4 text-center">
              주문 번호
            </span>
            <span className="w-[84%] text-font/main text-[16px] font-normal leading-[24px] tracking-[-0.4px] p-4 text-center">
              상품명
            </span>
          </div>
        </div>
        <div>
          <Accordion>
            {orders.map((order) => (
              <AccordionItem
                key={order.order_id}
                header={
                  <div className="flex items-start self-stretch py-[22px] ">
                    <span className="w-[178px] text-[16px] font-normal leading-[24px] tracking-[-0.4px] text font/sub2 text-center px-4">
                      {order.order_id}
                    </span>
                    <span className=" w-[84%] text-font/main text-[16px] font-normal leading-[24px] tracking-[-0.4px] px-4 ">
                      {order.Product?.title || '제품 없음'}
                    </span>
                  </div>
                }
              >
                <div className="flex justify-between gap-x-6 px-8 pt-8 pb-8 my-2">
                  <div className="w-1/2">
                    <div className="pb-6 text-font/sub1">[상품 정보]</div>
                    <div className="flex">
                      <div className="w-[100px] pt-[16px] pr-[0px] pb-[16px] pl-[16px]  bg-BG/Light  border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        결제금액
                      </div>
                      <div className="flex-grow p-4 border-b border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        {formatCurrency(order.cost)}원
                      </div>
                    </div>

                    <div className="flex">
                      <div className="pt-[16px] pr-[0px] pb-[16px] pl-[16px] w-[100px] bg-BG/Light  border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        수량
                      </div>
                      <div className="flex-grow p-4 border-b border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        {formatCurrency(order.quantity)}
                        <label>개</label>
                      </div>
                    </div>

                    <div className="flex">
                      <div className="pt-[16px] pr-[0px] pb-[16px] pl-[16px] w-[100px] bg-BG/Light  border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        주문일자
                      </div>
                      <div className=" flex-grow p-4 border-b border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        {formatDate(order.order_date)}
                      </div>
                    </div>

                    <div className="flex ">
                      <div className="pt-[16px] pr-[0px] pb-[16px] pl-[16px] w-[100px] bg-BG/Light  border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        주문자
                      </div>
                      <div className=" flex-grow p-4 border-b border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main ">
                        {' '}
                        {order.User?.user_name || 'N/A'}
                      </div>
                    </div>
                  </div>

                  <div className="w-1/2">
                    <div className="pb-6 text-font/sub1 ">[주문자 정보]</div>
                    <div className="flex">
                      <div className="pt-[16px] pr-[0px] pb-[16px] pl-[16px] w-[100px] bg-BG/Light  border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        이름
                      </div>
                      <div className="flex-grow p-4 border-b border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        {order.User?.user_name || 'N/A'}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="pt-[16px] pr-[0px] pb-[16px] pl-[16px] w-[100px] bg-BG/Light  border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        전화번호
                      </div>
                      <div className="flex-grow p-4 border-b border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        {formatPhoneNumber(order.User?.phone) || 'N/A'}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="pt-[16px] pr-[0px] pb-[16px] pl-[16px] w-[100px] bg-BG/Light  border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        주소
                      </div>
                      <div className="flex-grow p-4  border-b border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        {order.User?.address || 'N/A'} {order.User?.address_detail || 'N/A'}
                      </div>
                    </div>
                    <div className="flex">
                      <div className="pt-[16px] pr-[0px] pb-[16px] pl-[16px] w-[100px] bg-BG/Light  border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        이메일
                      </div>
                      <div className="flex-grow p-4 border-b border-t border-Line/Light text-[14px] font-normal leading-[20px] tracking-[-0.35px] text-font/main">
                        {order.User?.email || 'N/A'}
                      </div>
                    </div>
                  </div>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}
