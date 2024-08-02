'use server';
import { createClient } from '@/supabase/supabaseServer';

export const getUserInfo = async () => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();
  return user;
};
