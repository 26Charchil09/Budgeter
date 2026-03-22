"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, X, DollarSign, Tag, Loader2 } from 'lucide-react';

export default function TransactionForm({ onClose, onSave }) {
  const [type, setType] = useState('expense');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Food & Dining');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const numericAmount = type === 'expense' ? -Math.abs(parseFloat(amount)) : Math.abs(parseFloat(amount));

    const { error } = await supabase.from('transactions').insert([{
      title,
      amount: numericAmount,
      category,
      type
    }]);

    setLoading(false);
    
    if (error) {
      alert("Error saving: " + error.message);
      return;
    }

    if (onSave) onSave();
    if (onClose) onClose();
  };

  return (
    <div className="glass-card p-6 w-full max-w-md animate-in zoom-in-95 duration-300 shadow-2xl shadow-black">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold tracking-tight text-white">Add Transaction</h3>
        {onClose && (
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <X size={20} className="text-slate-400" />
          </button>
        )}
      </div>

      <div className="flex p-1 bg-black/40 rounded-xl mb-6 border border-white/5 shadow-inner">
        <button 
          onClick={() => setType('expense')}
          type="button"
          className={`flex-1 py-2.5 text-sm font-bold tracking-wider uppercase rounded-lg transition-all ${type === 'expense' ? 'bg-rose-500/20 text-rose-400 shadow-md border border-rose-500/30' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Expense
        </button>
        <button 
          onClick={() => setType('income')}
          type="button"
          className={`flex-1 py-2.5 text-sm font-bold tracking-wider uppercase rounded-lg transition-all ${type === 'income' ? 'bg-emerald-500/20 text-emerald-400 shadow-md border border-emerald-500/30' : 'text-slate-500 hover:text-slate-300'}`}
        >
          Income
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Amount</label>
          <div className="relative">
            <DollarSign size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="number" 
              step="0.01"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="glass-input pl-12 text-2xl font-black tracking-tight py-4" 
              placeholder="0.00"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Description</label>
          <input 
            type="text" 
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="glass-input font-medium" 
            placeholder="e.g. Grocery Shopping"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
          <div className="relative">
            <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <select 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="glass-input pl-12 appearance-none bg-[#111827] font-medium"
            >
              <option value="Food & Dining">Food & Dining</option>
              <option value="Transportation">Transportation</option>
              <option value="Utilities">Bills & Utilities</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Shopping">Shopping</option>
              <option value="Salary">Income / Salary</option>
            </select>
          </div>
        </div>

        <button type="submit" disabled={loading} className={`btn-primary mt-8 !py-4 shadow-xl ${type === 'income' ? 'from-emerald-600 to-teal-600 shadow-emerald-500/20 hover:from-emerald-500 hover:to-teal-500 border border-emerald-500/50' : 'from-rose-600 to-pink-600 shadow-rose-500/20 hover:from-rose-500 hover:to-pink-500 border border-rose-500/50'}`}>
          {loading ? <Loader2 size={20} className="animate-spin" /> : <Plus size={20} strokeWidth={3} />}
          <span className="font-bold text-lg tracking-wide">Save {type === 'income' ? 'Income' : 'Expense'}</span>
        </button>
      </form>
    </div>
  );
}
