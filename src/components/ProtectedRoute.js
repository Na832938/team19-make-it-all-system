/**
 * ProtectedRoute.js
 * 
 * Team 19 - Make It All System
 * 
 * Purpose: Wraps pages that require authentication
 * Behavior:
 * - Checks if user is authenticated before rendering protected content
 * - Redirects unauthenticated users to login page with return URL
 * - Shows loading screen during auth check
 * - Used on: Dashboard, Tasks, Topics, Posts, Knowledge Base pages
 */
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