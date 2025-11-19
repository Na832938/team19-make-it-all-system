// Next.js-compatible logout hook
'use client';
import { useRouter } from 'next/navigation';

export default function useLogout() {
  const router = useRouter();
  return () => {
    localStorage.removeItem('user');
    localStorage.removeItem('currentUser');
    router.replace('/login');
  };
}
