/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from 'react';
import { 
  Search, ChevronLeft, ChevronRight, Filter,
  Trash2, Bell, Send, User, Users, X,
  Calendar, Megaphone, CheckCircle2
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

interface NotificationEntry {
  id: string;
  type: "Individual User" | "All Users";
  name: string;
  title: string;
  date: string;
  msg: string;
}

interface SectionLabelProps {
  children: React.ReactNode;
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  iconBg: string;
  iconColor: string;
  borderAccent: string;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-8 mb-3 flex items-center gap-2">
      <span className="w-8 h-[1px] bg-slate-200"></span>
      {children}
    </p>
  );
}

function StatCard({ icon: Icon, label, value, iconBg, iconColor, borderAccent }: StatCardProps) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-default`}>
      <div className="flex items-center justify-between">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${iconBg} ${iconColor}`}>
          <Icon size={22} />
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-800 tracking-tight">{value}</p>
        <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function NotificationPage() {
  // 1. STATE
  const [notifications, setNotifications] = useState<NotificationEntry[]>([
    { id: "1", type: "Individual User", name: "Anmol Goyal", title: "Testing the push notification", date: "Mar-24-2026 07:03:55", msg: "This notification must be pushed in the notification panel of android mobile" },
    { id: "2", type: "Individual User", name: "Anmol desire", title: "App Update", date: "Mar-19-2026 11:01:37", msg: "testing push notification message" },
    { id: "7", type: "All Users", name: "0", title: "Price Update", date: "Feb-24-2026 04:58:04", msg: "The price of 4 way DD has been updated to Rs.306" },
    { id: "10", type: "All Users", name: "0", title: "Flash Sale", date: "Jan-24-2026 04:56:28", msg: "The price of 10 Way DD has been updated to Rs.441" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("All"); // "All", "All Users", "Individual User"
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: "", visible: false });
  
  // Form State
  const [formData, setFormData] = useState({
    type: "All Users" as "All Users" | "Individual User",
    name: "",
    title: "",
    msg: ""
  });

  // 2. LOGIC
  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: "", visible: false }), 3000);
  };

  // UPDATED LOGIC: Filter works with both Search and Type
  const filteredLogs = useMemo(() => {
    return notifications.filter(n => {
      const matchesSearch = n.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           n.msg.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           n.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = filterType === "All" || n.type === filterType;

      return matchesSearch && matchesType;
    });
  }, [notifications, searchTerm, filterType]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const newNote: NotificationEntry = {
      id: Date.now().toString().slice(-4),
      ...formData,
      name: formData.type === "All Users" ? "0" : formData.name,
      date: new Date().toLocaleString('en-US', { month: 'short', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }).replace(',', '')
    };
    
    setNotifications([newNote, ...notifications]);
    setIsPanelOpen(false);
    setFormData({ type: "All Users", name: "", title: "", msg: "" });
    showToast("Notification broadcasted successfully!");
  };

  const deleteLog = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    setConfirmDeleteId(null);
    showToast("Log entry deleted");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900 relative">
      
      {/* ── TOAST ── */}
      {toast.visible && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[120] flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">{toast.msg}</span>
        </div>
      )}

      {/* ── BROADCAST SIDE PANEL ── */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[100] transform transition-transform duration-500 ease-out ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="px-6 py-8 border-b flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <Megaphone size={20} className="text-blue-600" /> Create Broadcast
              </h3>
              <p className="text-xs text-slate-500 mt-1">Send push notifications to your users</p>
            </div>
            <button onClick={() => setIsPanelOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20}/></button>
          </div>
          
          <form onSubmit={handleSend} className="flex-1 overflow-y-auto p-8 space-y-6">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Select Target</label>
              <div className="flex gap-3 mt-2">
                {(["All Users", "Individual User"] as const).map((t) => (
                  <button key={t} type="button" onClick={() => setFormData({...formData, type: t})} className={`flex-1 py-3 rounded-xl text-xs font-bold border transition-all ${formData.type === t ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-500 hover:border-slate-300'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {formData.type === "Individual User" && (
              <div className="animate-in slide-in-from-top-2">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">User Search</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full mt-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Enter username..." />
              </div>
            )}

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Notification Title</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full mt-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="e.g. Weekly Update Available" />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Message Content</label>
              <textarea required rows={4} value={formData.msg} onChange={e => setFormData({...formData, msg: e.target.value})} className="w-full mt-2 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none resize-none" placeholder="Type your message details here..." />
            </div>
          </form>

          <div className="p-8 border-t bg-slate-50 flex gap-4">
            <button type="button" onClick={() => setIsPanelOpen(false)} className="flex-1 py-3.5 text-slate-600 font-bold text-sm">Cancel</button>
            <button onClick={handleSend} className="flex-[2] py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 shadow-xl shadow-blue-200 transition-all active:scale-95">
              <Send size={18}/> Send Now
            </button>
          </div>
        </div>
      </div>

      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Manage Notification</h1>
          <p className="text-sm text-slate-500 mt-1">Push Messaging Center and Broadcast Control</p>
        </div>
        <button onClick={() => setIsPanelOpen(true)} className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-bold shadow-lg shadow-blue-200 active:scale-95">
          <Megaphone size={16} />
          Broadcast Notification
        </button>
      </div>

      {/* ── OVERVIEW STATS (Engagement Removed) ── */}
      <SectionLabel>Delivery Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard icon={Send} label="Total Sent" value={notifications.length * 310} iconBg="bg-blue-50" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
        <StatCard icon={Users} label="Broadcasts" value={notifications.filter(n => n.type === 'All Users').length} iconBg="bg-purple-50" iconColor="text-purple-600" borderAccent="border-t-purple-500" />
      </div>

      {/* ── TABLE SECTION ── */}
      <SectionLabel>Notification Logs</SectionLabel>

      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search logs by title, user, or msg..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        
        {/* UPDATED: Functional Filter Dropdown */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-all">
            <Filter size={14} className="text-slate-400" />
            <select 
                value={filterType} 
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-xs font-bold uppercase tracking-wider"
            >
                <option value="All">All Types</option>
                <option value="All Users">Broadcasts</option>
                <option value="Individual User">Individual</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 w-12 text-[11px] font-bold uppercase tracking-wider text-slate-400">ID</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Target</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Recipient</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Title</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Timestamp</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">Status</th>
                <th className="px-6 py-4 text-right text-[11px] font-bold uppercase tracking-wider text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((note) => (
                <tr key={note.id} className="hover:bg-slate-50/80 transition-colors duration-150 group">
                  <td className="px-6 py-5 text-xs font-bold text-slate-400">#{note.id}</td>

                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase border ${
                      note.type === 'All Users' ? 'bg-purple-50 text-purple-700 border-purple-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {note.type === 'All Users' ? <Users size={10} /> : <User size={10} />}
                      {note.type}
                    </span>
                  </td>

                  <td className="px-6 py-5 font-bold text-sm text-slate-700">
                    {note.name === "0" ? <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded text-[10px] uppercase font-bold tracking-tight">Broadcast</span> : note.name}
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
                      <Bell size={14} className="text-amber-500" />
                      {note.title}
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <div className="flex flex-col text-xs font-semibold text-slate-500">
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {note.date.split(' ')[0]}</span>
                      <span className="ml-[18px] opacity-60 font-medium">{note.date.split(' ')[1]}</span>
                    </div>
                  </td>

                  <td className="px-6 py-5">
                    <p className="text-xs text-slate-400 font-medium italic line-clamp-1 max-w-[200px]">
                      &quot;{note.msg}&quot;
                    </p>
                  </td>

                  <td className="px-6 py-5 text-right">
                    <div className="flex justify-end">
                      {confirmDeleteId === note.id ? (
                        <div className="flex items-center bg-rose-50 border border-rose-100 rounded-lg overflow-hidden animate-in fade-in slide-in-from-right-2">
                           <button onClick={() => deleteLog(note.id)} className="px-3 py-1.5 text-[10px] font-bold text-rose-600 hover:bg-rose-100 border-r border-rose-100">Delete</button>
                           <button onClick={() => setConfirmDeleteId(null)} className="px-3 py-1.5 text-[10px] font-bold text-slate-400 hover:bg-white">No</button>
                        </div>
                      ) : (
                        <button onClick={() => setConfirmDeleteId(note.id)} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all">
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Showing <span className="text-slate-700">{filteredLogs.length}</span> entries
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all shadow-sm">
              <ChevronLeft size={16} />
            </button>
            <button className="w-9 h-9 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-lg shadow-blue-200">1</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all shadow-sm">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Overlay for Side Panel */}
      {isPanelOpen && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90] animate-in fade-in" onClick={() => setIsPanelOpen(false)}></div>}
    </div>
  );
}