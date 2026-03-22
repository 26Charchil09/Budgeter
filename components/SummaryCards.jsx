"use client";

import { ArrowUpRight, ArrowDownRight, Wallet, TrendingUp } from 'lucide-react';

export default function SummaryCards({ balance = 0, income = 0, expenses = 0 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Total Balance */}
      <div className="glass-card p-6 relative overflow-hidden group bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border-blue-500/20">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 group-hover:opacity-20 transition-all duration-500">
          <Wallet size={100} className="text-blue-400" />
        </div>
        <p className="text-blue-200/70 text-sm font-semibold tracking-wider uppercase mb-2 relative z-10">Total Balance</p>
        <h3 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 relative z-10 text-white">${balance.toLocaleString()}</h3>
        <div className="flex items-center text-sm text-emerald-400 bg-emerald-400/10 w-fit px-3 py-1 rounded-full relative z-10 gap-1.5 border border-emerald-400/20">
          <TrendingUp size={14} />
          <span className="font-medium">+2.5% vs last month</span>
        </div>
      </div>

      {/* Income */}
      <div className="glass-card p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
          <ArrowUpRight size={100} />
        </div>
        <div className="flex justify-between items-start mb-2 relative z-10">
          <p className="text-slate-400 text-sm font-semibold tracking-wider uppercase">Total Income</p>
          <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
            <ArrowUpRight size={18} className="text-emerald-400" />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-1 relative z-10 text-slate-100">${income.toLocaleString()}</h3>
      </div>

      {/* Expenses */}
      <div className="glass-card p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 group-hover:opacity-10 transition-all duration-500">
          <ArrowDownRight size={100} />
        </div>
        <div className="flex justify-between items-start mb-2 relative z-10">
          <p className="text-slate-400 text-sm font-semibold tracking-wider uppercase">Total Expenses</p>
          <div className="p-2.5 bg-red-500/10 rounded-xl border border-red-500/20">
            <ArrowDownRight size={18} className="text-red-400" />
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-1 relative z-10 text-slate-100">${expenses.toLocaleString()}</h3>
      </div>
    </div>
  );
}
