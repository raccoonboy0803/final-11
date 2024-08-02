import { createClient } from '@/supabase/supabaseServer';
import ProductTable from '../_components/ProductTable';
import { redirect } from 'next/navigation';

export default async function ProductPage() {
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

  return (
    <div className="mb-20">
      <ProductTable sellerId={userId} />
    </div>
  );
}
