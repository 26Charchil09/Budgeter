"use client";

import { User, Wallet, Bell, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-1">Settings</h1>
        <p className="text-slate-400 font-medium">Manage your account preferences and application settings.</p>
      </div>

      <div className="space-y-6">
        {/* Profile Settings */}
        <div className="glass-card overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
            <User className="text-blue-400" size={20} />
            <h3 className="font-bold text-lg text-slate-100">Profile Information</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                <input type="text" className="glass-input font-medium" defaultValue="" placeholder="Enter your name" suppressHydrationWarning />
              </div>
              <div className="flex-1 space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                <input type="email" className="glass-input font-medium opacity-70 cursor-not-allowed" defaultValue="" placeholder="your@email.com" disabled suppressHydrationWarning />
              </div>
            </div>
            <button className="btn-primary w-fit text-sm px-6 py-3 font-bold border border-blue-500/50">Save Changes</button>
          </div>
        </div>

        {/* Preferences */}
        <div className="glass-card overflow-hidden">
          <div className="px-6 py-5 border-b border-white/5 bg-white/[0.02] flex items-center gap-3">
            <Wallet className="text-emerald-400" size={20} />
            <h3 className="font-bold text-lg text-slate-100">Currency & Format</h3>
          </div>
          <div className="p-6 space-y-6">
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex-1 space-y-2.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Default Currency</label>
                <select className="glass-input appearance-none bg-[#111827] font-medium" suppressHydrationWarning>
                  <option>USD ($)</option>
                  <option>EUR (€)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </div>
            <button className="btn-outline w-fit text-sm px-6 py-3 font-bold text-slate-300">Update Preferences</button>
          </div>
        </div>
      </div>
    </div>
  );
}
