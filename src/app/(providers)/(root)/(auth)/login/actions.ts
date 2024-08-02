// 'use server';

// import supabase from '../../../../../supabase/index';

// type OAuthProvider = 'google' | 'kakao';

// const handleSocialLogin = async (provider: OAuthProvider) => {
//   const { data, error } = await supabase.auth.signInWithOAuth({
//     provider: provider,
//     options: {
//       redirectTo: `${window.location.origin}/auth/callback`
//     }
//   });

//   if (error) {
//     console.error(`Error logging in with ${provider}:`, error.message);
//   }
// };
