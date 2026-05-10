/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search, FileDown, ChevronLeft, ChevronRight,
  Filter, Edit2, CheckCircle2, ArrowDownCircle, Wallet,
  Clock, IndianRupee, LucideIcon, ChevronDown, X, Send, Trash2, AlertCircle, Check
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

// Added "Rejected" to match the image requirements
type WithdrawalStatus = "Approved" | "Pending" | "Rejected";

interface WithdrawalRequest {
  id: string;
  userId: string;
  userName: string;
  phone: string;
  date: string;
  upiId: string;
  points: string;
  status: WithdrawalStatus;
}

interface SectionLabelProps { children: React.ReactNode; }

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconBg: string;
  iconColor: string;
  borderAccent: string;
}

// ─── Custom Toast Component ─────────────────────────────────────────────────

function Toast({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed bottom-6 right-6 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl shadow-2xl border animate-in slide-in-from-right-10 duration-300 ${
      type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-rose-50 border-rose-200 text-rose-800'
    }`}>
      {type === 'success' ? <Check size={18} className="text-emerald-500" /> : <AlertCircle size={18} className="text-rose-500" />}
      <p className="text-sm font-bold">{message}</p>
      <button onClick={onClose} className="ml-2 hover:opacity-70 cursor-pointer"><X size={14} /></button>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: SectionLabelProps) {
  return <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">{children}</p>;
}

function StatCard({ icon: Icon, label, value, iconBg, iconColor, borderAccent }: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}><Icon size={18} /></div>
      <div>
        <p className="text-2xl font-semibold text-slate-800">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: WithdrawalStatus }) {
  let styles = "bg-amber-50 text-amber-700 border-amber-200";
  let Icon = Clock;

  if (status === "Approved") {
    styles = "bg-green-50 text-green-700 border-green-200";
    Icon = CheckCircle2;
  } else if (status === "Rejected") {
    styles = "bg-rose-50 text-rose-700 border-rose-200";
    Icon = AlertCircle;
  }
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${styles}`}>
      <Icon size={11} /> {status}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WithdrawalPage() {
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([
    { id: "187", userId: "1640", userName: "Pradeep Kumar", phone: "9829555400", date: "2026-03-19", upiId: "9829555400@ybl", points: "350", status: "Approved" },
    { id: "186", userId: "1203", userName: "Sanjeev Kumar", phone: "7087734521", date: "2026-03-18", upiId: "sk21700146602@okaxis", points: "115", status: "Approved" },
    { id: "182", userId: "1641", userName: "Amit Sihag", phone: "8107844354", date: "2026-03-18", upiId: "8107844354@ybl", points: "220", status: "Pending" },
    { id: "180", userId: "2565", userName: "Rajdeep Singh", phone: "9915479580", date: "2026-03-16", upiId: "rajdeep2749@okicici", points: "453", status: "Pending" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [editingItem, setEditingItem] = useState<WithdrawalRequest | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toast, setToast] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

  const filteredData = useMemo(() => {
    return withdrawals.filter((item) => {
      const matchesSearch =
        item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.upiId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.includes(searchTerm);
      const matchesStatus = statusFilter === "All Status" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [withdrawals, searchTerm, statusFilter]);

  const totalPoints = withdrawals.reduce((acc, i) => acc + parseFloat(i.points), 0);
  const approvedCount = withdrawals.filter((i) => i.status === "Approved").length;
  const pendingCount = withdrawals.filter((i) => i.status === "Pending").length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) setSelectedIds(filteredData.map(item => item.id));
    else setSelectedIds([]);
  };

  const handleSelectItem = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const confirmDelete = () => {
    setWithdrawals(prev => prev.filter(item => !selectedIds.includes(item.id)));
    setSelectedIds([]);
    setShowDeleteConfirm(false);
    setToast({ message: "Items deleted successfully", type: 'success' });
  };

  const openEditModal = (item: WithdrawalRequest) => {
    setEditingItem({ ...item });
  };

  const saveEdit = () => {
    if (editingItem) {
      setWithdrawals(prev => prev.map(item => item.id === editingItem.id ? editingItem : item));
      setEditingItem(null);
      setToast({ message: "Withdrawal updated successfully", type: 'success' });
    }
  };

  const downloadCSV = () => {
    const headers = ["ID", "User ID", "User Name", "Phone", "Date", "UPI ID", "Points", "Status"];
    const csvContent = [headers.join(","), ...filteredData.map(item => [item.id, item.userId, `"${item.userName}"`, item.phone, item.date, item.upiId, item.points, item.status].join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `withdrawals.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setToast({ message: "CSV Exported", type: 'success' });
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900 relative">
      
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl p-6 text-center">
            <Trash2 size={28} className="text-rose-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold">Confirm Delete?</h3>
            <p className="text-sm text-slate-500 mt-2">Delete {selectedIds.length} records?</p>
            <div className="mt-8 flex gap-3">
              <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 px-4 py-3 bg-slate-100 rounded-xl font-bold">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 px-4 py-3 bg-rose-500 text-white rounded-xl font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── NEW EDIT FORM (MATCHING SCREENSHOT) ────────────────────────────────── */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="px-8 py-5 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-medium text-slate-600">Edit withdrawal</h3>
              <button 
                onClick={() => setEditingItem(null)} 
                className="flex items-center gap-2 px-4 py-1.5 bg-[#1e5bb9] text-white rounded text-sm font-normal hover:bg-blue-700 transition-all"
              >
                <ChevronLeft size={16} /> Back
              </button>
            </div>
            
            {/* Modal Body */}
            <div className="p-10 space-y-5">
              
              <div className="flex flex-col md:flex-row md:items-center">
                <label className="md:w-1/4 text-sm text-slate-600 font-medium">User Name:-</label>
                <div className="md:w-3/4 relative">
                  <select className="w-full bg-[#f4f4f4] border border-slate-300 rounded p-2.5 text-sm text-slate-600 outline-none appearance-none" disabled>
                    <option>{editingItem.userName}</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center">
                <label className="md:w-1/4 text-sm text-slate-600 font-medium">Mobile Number :-</label>
                <input className="md:w-3/4 bg-[#f4f4f4] border border-slate-300 rounded p-2.5 text-sm text-slate-600 outline-none" value={editingItem.phone} readOnly />
              </div>

              <div className="flex flex-col md:flex-row md:items-center">
                <label className="md:w-1/4 text-sm text-slate-600 font-medium">Withdrawal UPI ID :-</label>
                <input className="md:w-3/4 bg-[#f4f4f4] border border-slate-300 rounded p-2.5 text-sm text-slate-600 outline-none" value={editingItem.upiId} readOnly />
              </div>

              <div className="flex flex-col md:flex-row md:items-center">
                <label className="md:w-1/4 text-sm text-slate-600 font-medium">Withdrawal point :-</label>
                <input className="md:w-3/4 bg-white border border-slate-300 rounded p-2.5 text-sm text-slate-600 outline-none focus:border-blue-500" value={editingItem.points} onChange={e => setEditingItem({...editingItem, points: e.target.value})} />
              </div>

              <div className="flex flex-col md:flex-row md:items-center">
                <label className="md:w-1/4 text-sm text-slate-600 font-medium">Withdrawal Date :-</label>
                <input type="date" className="md:w-3/4 bg-white border border-slate-300 rounded p-2.5 text-sm text-slate-600 outline-none focus:border-blue-500" value={editingItem.date} onChange={e => setEditingItem({...editingItem, date: e.target.value})} />
              </div>

              <div className="flex flex-col md:flex-row md:items-center">
                <label className="md:w-1/4 text-sm text-slate-600 font-medium">Withdrawal Type :-</label>
                <div className="md:w-3/4 relative">
                  <select 
                    className="w-full bg-white border border-slate-300 rounded p-2.5 text-sm text-slate-600 outline-none appearance-none cursor-pointer focus:border-blue-500" 
                    value={editingItem.status} 
                    onChange={e => setEditingItem({...editingItem, status: e.target.value as WithdrawalStatus})}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                </div>
              </div>

              <div className="flex gap-2 pt-4 md:ml-[25%]">
                <button onClick={saveEdit} className="px-8 py-2 bg-[#1e5bb9] text-white rounded text-sm font-bold hover:bg-blue-700 transition-all">Save</button>
                <button onClick={() => setEditingItem(null)} className="px-8 py-2 bg-[#e54b3c] text-white rounded text-sm font-bold hover:bg-rose-600 transition-all">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── MAIN TABLE UI ────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Withdrawals</h1>
          <p className="text-sm text-slate-500 mt-0.5">Review and process user payout requests</p>
        </div>
        <div className="flex gap-2">
          {selectedIds.length > 0 && (
            <button onClick={() => setShowDeleteConfirm(true)} className="flex items-center gap-2 px-4 py-2 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl hover:bg-rose-100 transition-all text-sm font-bold cursor-pointer">
              <Trash2 size={15} /> Delete ({selectedIds.length})
            </button>
          )}
          <button onClick={downloadCSV} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 text-sm font-medium cursor-pointer"><FileDown size={15} /> CSV Export</button>
        </div>
      </div>

      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Wallet} label="Total Requests" value={withdrawals.length} iconBg="bg-blue-100" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
        <StatCard icon={IndianRupee} label="Total Points Paid" value={totalPoints.toFixed(1)} iconBg="bg-green-100" iconColor="text-green-600" borderAccent="border-t-green-500" />
        <StatCard icon={CheckCircle2} label="Approved" value={approvedCount} iconBg="bg-emerald-100" iconColor="text-emerald-600" borderAccent="border-t-emerald-500" />
        <StatCard icon={Clock} label="Pending" value={pendingCount} iconBg="bg-amber-100" iconColor="text-amber-600" borderAccent="border-t-amber-500" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 outline-none cursor-pointer appearance-none">
              <option>All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
          </div>
          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search by name, ID or UPI..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-4 w-10">
                  <input type="checkbox" className="w-4 h-4 cursor-pointer accent-blue-600" onChange={handleSelectAll} checked={selectedIds.length === filteredData.length && filteredData.length > 0} />
                </th>
                {["ID", "User Details", "Contact", "Points", "UPI ID", "Status", "Action"].map((h) => (
                  <th key={h} className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className={`group hover:bg-slate-50/80 transition-all cursor-pointer ${selectedIds.includes(item.id) ? 'bg-blue-50/40' : ''}`} onClick={() => handleSelectItem(item.id)}>
                    <td className="px-5 py-4" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" className="w-4 h-4 cursor-pointer accent-blue-600" checked={selectedIds.includes(item.id)} onChange={() => handleSelectItem(item.id)} />
                    </td>
                    <td className="px-5 py-4 text-xs font-medium text-slate-400">#{item.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center text-xs font-bold border border-rose-100">{item.userName.charAt(0)}</div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-800">{item.userName}</span>
                          <span className="text-[10px] text-slate-400 font-medium">User ID: {item.userId}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm font-medium text-slate-700">{item.phone}</td>
                    <td className="px-5 py-4"><div className="flex items-center gap-1.5 text-rose-600 font-bold text-sm"><ArrowDownCircle size={14} />{item.points} pts</div></td>
                    <td className="px-5 py-4"><span className="text-[11px] font-bold text-blue-600 bg-blue-50/50 border border-blue-100 px-2.5 py-1 rounded-lg inline-block truncate max-w-[150px]">{item.upiId}</span></td>
                    <td className="px-5 py-4"><StatusBadge status={item.status} /></td>
                    <td className="px-5 py-4">
                      <button onClick={(e) => { e.stopPropagation(); openEditModal(item); }} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 cursor-pointer transition-all"><Edit2 size={14} /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-slate-400 text-sm italic">No records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}