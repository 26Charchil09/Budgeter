"use client";

import { PieChart, Trash2 } from 'lucide-react';

export default function BudgetCard({
  category = "Development Tools",
  spent = 150,
  limit = 200,
  colorClasses = "bg-blue-500",
  onDelete
}) {
  const percentage = Math.min(100, Math.round((spent / limit) * 100));
  const isOverBudget = spent > limit;
  const isWarning = percentage >= 80 && !isOverBudget;

  return (
    <div className="glass-card p-5 group flex flex-col hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 border-white/5">
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 group-hover:scale-105 transition-transform shadow-inner text-slate-200">
            <PieChart size={18} />
          </div>
          <div>
            <h4 className="font-bold text-slate-200 tracking-tight">{category}</h4>
            <p className="text-xs font-medium text-slate-400">{percentage}% used</p>
          </div>
        </div>
        {onDelete && (
          <button
            onClick={onDelete}
            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
          >
            <Trash2 size={15} />
          </button>
        )}
      </div>

      <div className="mt-auto space-y-2.5">
        <div className="flex justify-between text-sm items-end font-medium">
          <span className="font-extrabold text-lg tracking-tight text-white">${spent.toLocaleString()}</span>
          <span className="text-slate-400">/ ${Number(limit).toLocaleString()}</span>
        </div>

        <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-1000 ease-out shadow-lg ${
              isOverBudget ? 'bg-rose-500' : isWarning ? 'bg-amber-500' : colorClasses
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        {isOverBudget && (
          <p className="text-xs text-rose-400 font-semibold mt-2 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 inline-block" />
            Over budget by ${(spent - limit).toLocaleString()}
          </p>
        )}
      </div>
    </div>
  );
}
