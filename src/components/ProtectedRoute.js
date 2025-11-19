// Next.js-compatible client ProtectedRoute
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import LoadingScreen from './common/LoadingScreen';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const from = typeof window !== 'undefined' ? encodeURIComponent(window.location.pathname) : '';
      router.replace(`/login${from ? `?from=${from}` : ''}`);
    }
  }, [loading, isAuthenticated, router]);

  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return null; // briefly render nothing during redirect
  return children;
}