"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login');
      } else {
        setChecking(false);
      }
    };

    checkSession();

    // Also listen for auth state changes (e.g. sign out from another tab)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) router.replace('/login');
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 text-slate-300">
        <Loader2 size={36} className="animate-spin text-blue-400" />
        <p className="text-sm font-medium tracking-wide">Checking your session...</p>
      </div>
    );
  }

  return children;
}
