import Link from 'next/link';
import { ArrowRight, Wallet } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

      <main className="max-w-4xl w-full flex flex-col items-center text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="inline-flex items-center justify-center p-4 bg-white/5 rounded-2xl mb-4 border border-white/10 shadow-2xl">
          <Wallet size={48} className="text-blue-400" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
          Master Your Money with <span className="text-gradient">Budgeter</span>
        </h1>
        
        <p className="text-xl text-slate-400 max-w-2xl font-light">
          Experience premium expense tracking. Keep tabs on your budget, monitor your income, and achieve your financial goals with breathtaking clarity.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 pt-8 w-full sm:w-auto">
          <Link href="/signup" className="btn-primary w-full sm:w-48 group">
            Get Started
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/login" className="btn-outline w-full sm:w-48">
            Sign In
          </Link>
        </div>
      </main>
    </div>
  );
}
