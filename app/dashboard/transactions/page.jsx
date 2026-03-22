"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import TransactionList from '@/components/TransactionList';
import TransactionForm from '@/components/TransactionForm';
import { Plus } from 'lucide-react';

export default function TransactionsPage() {
  const [showForm, setShowForm] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('transactions')
      .select('*')
      .order('date', { ascending: false });
    
    if (data) setTransactions(data);
    setLoading(false);
  };

  return (
    <div className="space-y-6 relative h-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-1">Transactions</h1>
          <p className="text-slate-400 font-medium">View and manage your entire financial history.</p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary sm:w-auto text-sm px-5 py-2.5 shadow-blue-500/20 hover:scale-105"
        >
          <Plus size={18} strokeWidth={3} />
          <span className="font-bold">New Transaction</span>
        </button>
      </div>

      <div className="flex flex-col min-h-[700px]">
        <TransactionList 
          transactions={transactions} 
          isLoading={loading}
          onRefresh={fetchTransactions}
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
          <TransactionForm 
            onClose={() => setShowForm(false)} 
            onSave={() => fetchTransactions()}
          />
        </div>
      )}
    </div>
  );
}
