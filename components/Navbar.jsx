"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, ReceiptText, PieChart, Settings, LogOut, Wallet } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const navItems = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/transactions', label: 'Transactions', icon: ReceiptText },
  { href: '/dashboard/budgets', label: 'Budgets', icon: PieChart },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    if (localStorage.getItem('demo_session')) {
      localStorage.removeItem('demo_session');
      router.push('/login');
      return;
    }
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-full glass-card rounded-none border-t-0 border-l-0 border-b-0 p-4 z-40 bg-background/50">
        <div className="flex items-center gap-3 px-4 py-6 mb-6">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg shadow-blue-500/20">
            <Wallet size={24} className="text-white" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight">Budgeter</span>
        </div>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-white/10 text-white font-semibold shadow-sm border border-white/10' : 'text-slate-400 hover:bg-white/5 hover:text-slate-200 hover:translate-x-1'}`}
              >
                <Icon size={20} className={isActive ? 'text-blue-400' : ''} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button 
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all hover:translate-x-1 mt-auto"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass-card rounded-none border-b-0 border-l-0 border-r-0 flex justify-around p-2 z-50 bg-background/80 backdrop-blur-xl">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-colors ${isActive ? 'text-blue-400 bg-white/5' : 'text-slate-400'}`}
            >
              <Icon size={22} className={`mb-1 transition-transform ${isActive ? 'scale-110' : ''}`} />
              <span className="text-[10px] font-medium tracking-wide">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
