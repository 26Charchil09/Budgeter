"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import BudgetCard from '@/components/BudgetCard';
import { Plus, Loader2, X, DollarSign, Tag } from 'lucide-react';

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState('Food & Dining');
  const [limit, setLimit] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    setLoading(true);
    const [txsRes, bdgRes] = await Promise.all([
      supabase.from('transactions').select('*'),
      supabase.from('budgets').select('*')
    ]);
    if (txsRes.data) setTransactions(txsRes.data);
    if (bdgRes.data) setBudgets(bdgRes.data);
    setLoading(false);
  };

  const handleCreateBudget = async (e) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.from('budgets').upsert({
      category,
      amount_limit: parseFloat(limit)
    }, { onConflict: 'user_id,category' });

    if (error) { alert('Error: ' + error.message); }
    else { setShowForm(false); setLimit(''); fetchData(); }
    setSaving(false);
  };

  const handleDeleteBudget = async (id) => {
    if (!confirm('Delete this budget?')) return;
    await supabase.from('budgets').delete().eq('id', id);
    fetchData();
  };

  const colors = ["bg-indigo-500", "bg-emerald-500", "bg-cyan-500", "bg-amber-500", "bg-rose-500", "bg-purple-500"];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-1">Budgets</h1>
          <p className="text-slate-400 font-medium">Set spending limits and track your compliance.</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary sm:w-auto text-sm px-5 py-2.5 hover:scale-105 border border-indigo-500/50"
        >
          <Plus size={18} strokeWidth={3} />
          <span className="font-bold">Set Budget</span>
        </button>
      </div>

      {loading ? (
        <div className="flex py-20 items-center justify-center text-slate-400">
          <Loader2 className="animate-spin mr-2" /> Fetching budgets...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {budgets.map((b, i) => {
            const spent = transactions
              .filter(t => t.category === b.category && t.type === 'expense')
              .reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);
            return (
              <BudgetCard
                key={b.id}
                category={b.category}
                spent={spent}
                limit={b.amount_limit}
                colorClasses={colors[i % colors.length]}
                onDelete={() => handleDeleteBudget(b.id)}
              />
            );
          })}
          {budgets.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 glass-card border border-dashed border-white/10">
              <p className="text-slate-400 font-medium">No budgets yet.</p>
              <p className="text-slate-500 text-sm mt-1">Click "Set Budget" to get started!</p>
            </div>
          )}
        </div>
      )}

      {/* Budget Creation Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-background/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="glass-card p-6 w-full max-w-md shadow-2xl shadow-black animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Set a Budget</h3>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} className="text-slate-400" />
              </button>
            </div>
            <form onSubmit={handleCreateBudget} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
                <div className="relative">
                  <Tag size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="glass-input pl-12 appearance-none bg-[#111827] font-medium"
                  >
                    <option>Food & Dining</option>
                    <option>Transportation</option>
                    <option>Utilities</option>
                    <option>Entertainment</option>
                    <option>Shopping</option>
                    <option>Salary</option>
                    <option>Health</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Monthly Limit ($)</label>
                <div className="relative">
                  <DollarSign size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={limit}
                    onChange={e => setLimit(e.target.value)}
                    className="glass-input pl-12 text-2xl font-black tracking-tight py-4"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <button type="submit" disabled={saving} className="btn-primary mt-4 !py-3 font-bold border border-indigo-500/50">
                {saving ? <Loader2 size={18} className="animate-spin" /> : <Plus size={18} />}
                Save Budget
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
