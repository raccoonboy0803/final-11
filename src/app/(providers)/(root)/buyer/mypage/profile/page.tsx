import { createClient } from '@/supabase/supabaseServer';
import UserEditForm from '../_components/UserEditFrom';
import { redirect } from 'next/navigation';

export default async function BuyerMyPage() {
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

  const { data, error } = await supabase.from('User').select('*').eq('user_id', userId).single();

  if (error) {
    return <div>오류가 발생했습니다: {error.message}</div>;
  }

  if (!data) {
    return <div>데이터를 불러오는 중입니다...</div>;
  }

  const initialData = {
    address: data.address || '',
    detailAddress: data.address_detail || '',
    addressCode: data.address_code || '',
    phone: data.phone || '',
    userName: data.user_name || '사용자 이름',
    avatarUrl: data.avatar_url || '/path/to/default-avatar.png'
  };

  return (
    <section className="max-w-sm mx-auto">
      <div className="mb-[180px]">
        <UserEditForm initialData={initialData} userId={userId} />
      </div>
    </section>
  );
}
