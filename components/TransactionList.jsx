"use client";

import { useState } from 'react';
import { ArrowDownRight, ArrowUpRight, Filter, Search, Trash2, Pencil } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function TransactionList({ transactions = [], isLoading = false, onRefresh }) {
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editAmount, setEditAmount] = useState('');
  const [search, setSearch] = useState('');

  const filtered = transactions.filter(tx =>
    tx.title.toLowerCase().includes(search.toLowerCase()) ||
    tx.category.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this transaction?')) return;
    const { error } = await supabase.from('transactions').delete().eq('id', id);
    if (error) alert('Error deleting: ' + error.message);
    else onRefresh && onRefresh();
  };

  const startEdit = (tx) => {
    setEditingId(tx.id);
    setEditTitle(tx.title);
    setEditAmount(Math.abs(tx.amount));
  };

  const handleSaveEdit = async (tx) => {
    const newAmount = tx.type === 'expense' ? -Math.abs(parseFloat(editAmount)) : Math.abs(parseFloat(editAmount));
    const { error } = await supabase.from('transactions').update({ title: editTitle, amount: newAmount }).eq('id', tx.id);
    if (error) alert('Error updating: ' + error.message);
    else { setEditingId(null); onRefresh && onRefresh(); }
  };

  return (
    <div className="glass-card flex flex-col h-full overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/[0.02]">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-slate-100">Recent Transactions</h3>
          <p className="text-sm text-slate-400 mt-0.5">Your real-time financial activity</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="glass-input pl-9 h-10 w-full sm:w-48 text-sm bg-black/30 border-white/5 focus:border-white/20"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto custom-scrollbar">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-white/5 text-slate-400 text-xs uppercase tracking-wider bg-black/10">
              <th className="p-4 font-semibold pl-6">Transaction</th>
              <th className="p-4 font-semibold">Category</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold text-right">Amount</th>
              <th className="p-4 font-semibold text-right pr-6">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {isLoading ? (
              <tr><td colSpan="5" className="text-center p-8 text-slate-400 font-medium">Loading transactions...</td></tr>
            ) : filtered.length === 0 ? (
              <tr><td colSpan="5" className="text-center p-8 text-slate-400 font-medium">No transactions found. Click Add Transaction!</td></tr>
            ) : filtered.map((tx) => (
              <tr key={tx.id} className="hover:bg-white/[0.03] transition-colors group">
                <td className="p-4 pl-6">
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded-lg ${tx.type === 'income' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}`}>
                      {tx.type === 'income' ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
                    </div>
                    {editingId === tx.id ? (
                      <input
                        className="glass-input text-sm py-1.5 px-3 w-36"
                        value={editTitle}
                        onChange={e => setEditTitle(e.target.value)}
                      />
                    ) : (
                      <span className="font-medium text-slate-200 group-hover:text-white transition-colors">{tx.title}</span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-md bg-white/5 text-xs font-medium text-slate-300 border border-white/5 whitespace-nowrap">{tx.category}</span>
                </td>
                <td className="p-4 text-slate-400 text-sm whitespace-nowrap">
                  {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </td>
                <td className="p-4 text-right font-bold whitespace-nowrap">
                  {editingId === tx.id ? (
                    <input
                      className="glass-input text-sm py-1.5 px-3 w-24 text-right"
                      type="number"
                      value={editAmount}
                      onChange={e => setEditAmount(e.target.value)}
                    />
                  ) : (
                    <span className={tx.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}>
                      {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                    </span>
                  )}
                </td>
                <td className="p-4 pr-6 text-right whitespace-nowrap">
                  {editingId === tx.id ? (
                    <div className="flex gap-2 justify-end">
                      <button onClick={() => handleSaveEdit(tx)} className="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 font-semibold transition-colors">Save</button>
                      <button onClick={() => setEditingId(null)} className="text-xs px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 font-semibold transition-colors">Cancel</button>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(tx)} className="p-1.5 rounded-lg hover:bg-blue-500/20 text-slate-400 hover:text-blue-400 transition-colors">
                        <Pencil size={15} />
                      </button>
                      <button onClick={() => handleDelete(tx.id)} className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
