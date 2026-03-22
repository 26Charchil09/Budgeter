"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import SummaryCards from '@/components/SummaryCards';
import TransactionList from '@/components/TransactionList';
import BudgetCard from '@/components/BudgetCard';
import TransactionForm from '@/components/TransactionForm';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function DashboardOverview() {
  const [transactions, setTransactions] = useState([]);
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch top 5 recent transactions
    const { data: txs } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false })
      .limit(5);
    
    // Fetch all budgets
    const { data: bdgs } = await supabase
      .from('budgets')
      .select('*');

    if (txs) setTransactions(txs);
    if (bdgs) setBudgets(bdgs);
    setLoading(false);
  };

  const calculateTotals = () => {
    let income = 0;
    let expenses = 0;
    transactions.forEach(tx => {
      if (tx.type === 'income') income += Number(tx.amount);
      else expenses += Math.abs(Number(tx.amount));
    });
    return { balance: income - expenses, income, expenses };
  };

  const totals = calculateTotals();

  return (
    <div className="space-y-8 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-1">Overview</h1>
          <p className="text-slate-400 font-medium">Welcome back! Here's your live financial summary.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary sm:w-auto text-sm px-5 py-2.5 shadow-blue-500/20"
        >
          <Plus size={18} strokeWidth={3} />
          <span className="font-bold">Add Transaction</span>
        </button>
      </div>

      {loading && transactions.length === 0 ? (
        <div className="h-32 flex items-center justify-center text-slate-400 glass-card">Loading live data...</div>
      ) : (
        <SummaryCards balance={totals.balance} income={totals.income} expenses={totals.expenses} />
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-2 flex flex-col h-full min-h-[500px]">
          <TransactionList transactions={transactions} isLoading={loading} />
        </div>
        
        <div className="flex flex-col space-y-5">
          <div className="flex items-center justify-between glass-card px-5 py-4 bg-white/[0.02]">
            <h3 className="text-lg font-bold tracking-tight text-slate-100">Top Budgets</h3>
            <Link href="/dashboard/budgets" className="text-sm text-blue-400 hover:text-blue-300 font-semibold tracking-wide transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-500/10">
              Manage All
            </Link>
          </div>
          
          <div className="space-y-4">
            {budgets.length > 0 ? budgets.slice(0, 3).map((b, i) => {
               // Calculate spent just for this component instance
               const spent = transactions
                 .filter(t => t.category === b.category && t.type === 'expense')
                 .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);
                 
               const colors = ["bg-indigo-500", "bg-emerald-500", "bg-cyan-500"];
                 
               return (
                 <BudgetCard 
                   key={b.id} 
                   category={b.category} 
                   spent={spent} 
                   limit={b.amount_limit} 
                   colorClasses={colors[i % colors.length]} 
                 />
               );
            }) : (
              <div className="text-center p-6 text-slate-400 text-sm glass-card border border-white/5 border-dashed">No budgets in DB.</div>
            )}
          </div>
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
          <TransactionForm 
            onClose={() => setShowForm(false)} 
            onSave={() => fetchData()} 
          />
        </div>
      )}
    </div>
  );
}
