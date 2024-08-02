import { createClient } from '@/supabase/supabaseClient';
// import supabase from "@/supabase/supabaseClient";
import { useEffect, useState } from 'react';

function useUser() {
  const supabase = createClient();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: userData, error } = await supabase.auth.getUser();
      if (error) {
        console.error('로그인한 유저 정보 가져오는 중 에러 발생', error);
      } else {
        setUser(userData?.user);
      }
    };
    fetchUser();
  }, [supabase.auth]);

  return { user };
}

export default useUser;
