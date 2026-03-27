/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useMemo } from "react";
import {
  Search, FileDown, ChevronLeft, ChevronRight,
  Filter, Edit2, CheckCircle2, ArrowDownCircle, Wallet,
  Clock, IndianRupee, LucideIcon, ChevronDown, X, Send
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

type WithdrawalStatus = "Approved" | "Pending";

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
  const styles = status === "Approved" 
    ? "bg-green-50 text-green-700 border-green-200" 
    : "bg-amber-50 text-amber-700 border-amber-200";
  const Icon = status === "Approved" ? CheckCircle2 : Clock;
  
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${styles}`}>
      <Icon size={11} /> {status}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WithdrawalPage() {
  // 1. Data State
  const [withdrawals, setWithdrawals] = useState<WithdrawalRequest[]>([
    { id: "187", userId: "1640", userName: "Pradeep Kumar", phone: "9829555400", date: "2026-03-19", upiId: "9829555400@ybl", points: "350", status: "Approved" },
    { id: "186", userId: "1203", userName: "Sanjeev Kumar", phone: "7087734521", date: "2026-03-18", upiId: "sk21700146602@okaxis", points: "115", status: "Approved" },
    { id: "182", userId: "1641", userName: "Amit Sihag", phone: "8107844354", date: "2026-03-18", upiId: "8107844354@ybl", points: "220", status: "Pending" },
    { id: "180", userId: "2565", userName: "Rajdeep Singh", phone: "9915479580", date: "2026-03-16", upiId: "rajdeep2749@okicici", points: "453", status: "Pending" },
  ]);

  // 2. UI State
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [editingItem, setEditingItem] = useState<WithdrawalRequest | null>(null);
  const [tempStatus, setTempStatus] = useState<WithdrawalStatus>("Pending");

  // 3. Logic: Filtering
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

  // 4. Logic: Stats
  const totalPoints = withdrawals.reduce((acc, i) => acc + parseFloat(i.points), 0);
  const approvedCount = withdrawals.filter((i) => i.status === "Approved").length;
  const pendingCount = withdrawals.filter((i) => i.status === "Pending").length;

  // 5. Handlers
  const openEditModal = (item: WithdrawalRequest) => {
    setEditingItem(item);
    setTempStatus(item.status);
  };

  const saveEdit = () => {
    if (editingItem) {
      setWithdrawals(prev => prev.map(item => 
        item.id === editingItem.id ? { ...item, status: tempStatus } : item
      ));
      setEditingItem(null);
    }
  };

  // --- NEW: CSV Export Logic ---
  const downloadCSV = () => {
    const headers = ["ID", "User ID", "User Name", "Phone", "Date", "UPI ID", "Points", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map(item => 
        [item.id, item.userId, `"${item.userName}"`, item.phone, item.date, item.upiId, item.points, item.status].join(",")
      )
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `withdrawals_report_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900 relative">
      
      {/* ── EDIT MODAL ── */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Edit2 size={16} className="text-blue-600" /> Update Request #{editingItem.id}
              </h3>
              <button onClick={() => setEditingItem(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
                <X size={18} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">User Details</label>
                <div className="mt-1 text-sm font-semibold text-slate-700">
                  {editingItem.userName} ({editingItem.phone})
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Payout Amount</label>
                <div className="mt-1 text-lg font-bold text-rose-600 flex items-center gap-1">
                  <ArrowDownCircle size={16}/> {editingItem.points} Points
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Update Status</label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setTempStatus("Pending")}
                    className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${tempStatus === "Pending" ? "bg-amber-50 border-amber-500 text-amber-700 shadow-sm" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                  >
                    Pending
                  </button>
                  <button 
                    onClick={() => setTempStatus("Approved")}
                    className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${tempStatus === "Approved" ? "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-sm" : "bg-white border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                  >
                    Approved
                  </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button onClick={() => setEditingItem(null)} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700">Cancel</button>
              <button onClick={saveEdit} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95">
                <Send size={14} /> Update Payout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Withdrawals</h1>
          <p className="text-sm text-slate-500 mt-0.5">Review and process user payout requests</p>
        </div>
        <button 
          onClick={downloadCSV}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium active:scale-95"
        >
          <FileDown size={15} /> CSV Export
        </button>
      </div>

      {/* ── Summary Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <StatCard icon={Wallet} label="Total Requests" value={withdrawals.length} iconBg="bg-blue-100" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
        <StatCard icon={IndianRupee} label="Total Points Paid" value={totalPoints.toFixed(1)} iconBg="bg-green-100" iconColor="text-green-600" borderAccent="border-t-green-500" />
        <StatCard icon={CheckCircle2} label="Approved" value={approvedCount} iconBg="bg-emerald-100" iconColor="text-emerald-600" borderAccent="border-t-emerald-500" />
        <StatCard icon={Clock} label="Pending" value={pendingCount} iconBg="bg-amber-100" iconColor="text-amber-600" borderAccent="border-t-amber-500" />
      </div>

      {/* ── Search & Filter ── */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 outline-none cursor-pointer appearance-none hover:bg-slate-100 transition-all"
            >
              <option>All Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
          </div>

          <div className="relative flex-1 md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search by name, ID or UPI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-4 w-10"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" /></th>
                {["ID", "User Details", "Contact", "Points", "UPI ID", "Status", "Action"].map((h) => (
                  <th key={h} className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                    <td className="px-5 py-4"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" /></td>
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
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-rose-600 font-bold text-sm"><ArrowDownCircle size={14} />{item.points} pts</div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="text-[11px] font-bold text-blue-600 bg-blue-50/50 border border-blue-100 px-2.5 py-1 rounded-lg inline-block max-w-[160px] truncate">{item.upiId}</span>
                    </td>
                    <td className="px-5 py-4"><StatusBadge status={item.status} /></td>
                    <td className="px-5 py-4">
                      <button onClick={() => openEditModal(item)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                        <Edit2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-slate-400 text-sm italic">No requests found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination Placeholder */}
        <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center bg-white">
          <p className="text-xs font-medium text-slate-400">Showing {filteredData.length} entries</p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 opacity-50"><ChevronLeft size={14}/></button>
            <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 opacity-50"><ChevronRight size={14}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}