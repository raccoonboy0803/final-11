import { createClient } from '@/supabase/supabaseServer';
import SellerCheck from '../_components/SellerCheck';
import { redirect } from 'next/navigation';

export default async function BusinessCheck() {
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

  const { data, error } = await supabase
    .from('User')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();

  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  return (
    <section className="">
      <div className="">
        <SellerCheck userData={data} />
      </div>
    </section>
  );
}
