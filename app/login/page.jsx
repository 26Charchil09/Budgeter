"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Wallet, LogIn, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    // Supabase auth login
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    
    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[100px] -z-10" />
      
      <div className="w-full max-w-md glass-card p-8 animate-in zoom-in-95 duration-500">
        <div className="flex flex-col items-center mb-8">
          <Link href="/" className="inline-flex p-3 bg-white/5 rounded-xl border border-white/10 mb-4 transition-transform hover:scale-105 shadow-xl">
            <Wallet size={32} className="text-blue-400" />
          </Link>
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="text-slate-400 mt-2">Sign in to manage your finances</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="glass-input" 
              placeholder="you@example.com"
            />
          </div>
          <div>
            <div className="flex justify-between mb-2">
              <label className="block text-sm font-medium text-slate-300">Password</label>
              <a href="#" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">Forgot?</a>
            </div>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="glass-input" 
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary mt-8">
            {loading ? <Loader2 size={20} className="animate-spin" /> : <LogIn size={20} />}
            Sign In
          </button>
        </form>

        <p className="text-center text-slate-400 mt-6 text-sm">
          Don't have an account? <Link href="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
