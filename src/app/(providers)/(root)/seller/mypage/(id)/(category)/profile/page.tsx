import { createClient } from '@/supabase/supabaseServer';
import SellerEditFrom from '../_components/SellerEditFrom';
import { redirect } from 'next/navigation';

export default async function BuyerMyPage() {
  const supabase = createClient();

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();
  const userId = user?.id;

  // 사용자가 로그인하지 않았거나 오류가 발생한 경우 리디렉션
  if (userError || !user) {
    redirect('/login');
  }

  // 판매자 정보를 가져오기
  const { data, error } = await supabase
    .from('Seller')
    .select('*')
    .eq('seller_id', userId)
    .single();

  console.log('User ID:', userId); // userId 로그
  console.log('Seller Data:', data); // data 로그
  console.log('Error:', error); // 에러 로그

  // 오류가 발생한 경우
  if (error) {
    if (error.code === 'PGRST116') {
      return redirect('/');
    }
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  return (
    <section className="max-w-sm mx-auto">
      <div className="mb-8">
        <SellerEditFrom sellerData={data} />
      </div>
    </section>
  );
}
