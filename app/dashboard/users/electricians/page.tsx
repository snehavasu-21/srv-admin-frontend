"use client";

import React, { useState, useMemo } from "react";
import {
  Search, Plus, FileDown, Eye, Edit2, Trash2,
  QrCode, ChevronLeft, ChevronRight, Filter,
  Zap, Wallet, Users, CheckCircle2, LucideIcon
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

interface Electrician {
  id: string;
  name: string;
  wallet: string;
  type: string;
  dealerCode: string;
  reffCode: string;
  email: string;
  qrCode: string;
  phone: string;
  status: "Active" | "Pending";
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconBg: string;
  iconColor: string;
  borderAccent: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
    {children}
  </p>
);

const StatCard = ({ icon: Icon, label, value, iconBg, iconColor, borderAccent }: StatCardProps) => (
  <div
    className={`bg-white rounded-xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3
      transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer`}
  >
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
      <Icon size={18} />
    </div>
    <div>
      <p className="text-2xl font-semibold text-slate-800">{value}</p>
      <p className="text-xs text-slate-500 mt-1">{label}</p>
    </div>
  </div>
);

const StatusBadge = ({ status }: { status: "Active" | "Pending" }) => {
  const styles = status === "Active" 
    ? "bg-green-50 text-green-700 border-green-200" 
    : "bg-amber-50 text-amber-700 border-amber-200";
  const dotColor = status === "Active" ? "bg-green-500" : "bg-amber-500";

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor} inline-block`} />
      {status}
    </span>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────

const MOCK_DATA: Electrician[] = Array.from({ length: 8 }).map((_, i) => ({
  id: (3347 - i).toString(),
  name: i % 2 === 0 ? "Arshdeep Singh" : "Anmol Preet",
  wallet: (1250 + (i * 100)).toLocaleString(),
  type: "Electrician",
  dealerCode: `D-401${59 + i}`,
  reffCode: `REF88${2 + i}`,
  email: "user@srv.com",
  qrCode: `QR-992${1 + i}`,
  phone: "9646127661",
  status: i % 3 === 0 ? "Pending" : "Active",
}));

export default function ElectriciansPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter logic
  const filteredData = useMemo(() => {
    return MOCK_DATA.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.id.includes(searchTerm)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Electricians</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage workforce and loyalty points</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium">
            <FileDown size={15} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-sm">
            <Plus size={15} /> Add Electrician
          </button>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard icon={Users} label="Total Electricians" value="2,915" iconBg="bg-amber-100" iconColor="text-amber-600" borderAccent="border-t-amber-500" />
        <StatCard icon={CheckCircle2} label="Active" value="2,257" iconBg="bg-green-100" iconColor="text-green-600" borderAccent="border-t-green-500" />
        <StatCard icon={Zap} label="Pending KYC" value="658" iconBg="bg-red-100" iconColor="text-red-500" borderAccent="border-t-red-400" />
      </div>

      {/* ── Table Section ── */}
      <SectionLabel>All Electricians</SectionLabel>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by name, phone or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center justify-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 grow sm:grow-0">
            <Filter size={14} /> Filter
          </button>
          <select className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium outline-none grow sm:grow-0">
            <option>Bulk Actions</option>
            <option>Delete Selected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-4 w-10">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                </th>
                {["ID", "Name", "Wallet", "Dealer Code", "Electrician Code", "QR", "Phone", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-5 py-4">
                      <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                    </td>
                    <td className="px-5 py-4 text-xs font-medium text-slate-400">#{user.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold border border-slate-200 uppercase">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-slate-700 whitespace-nowrap">{user.name}</p>
                          <p className="text-[11px] text-slate-400">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-md border border-blue-100">{user.wallet} Pts</span>
                    </td>
                    <td className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">{user.dealerCode}</td>
                    <td className="px-5 py-4 text-xs font-semibold text-purple-600 uppercase">{user.reffCode}</td>
                    <td className="px-5 py-4">
                      <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                        <QrCode size={14} />
                      </button>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600 font-medium">{user.phone}</td>
                    <td className="px-5 py-4"><StatusBadge status={user.status} /></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md" title="View"><Eye size={15} /></button>
                        <button className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-md" title="Edit"><Edit2 size={15} /></button>
                        <button className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-md" title="Delete"><Trash2 size={15} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="px-5 py-12 text-center text-slate-400">
                    <p className="text-sm">No electricians found matching "{searchTerm}"</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-600 font-semibold">{filteredData.length}</span> results
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50"><ChevronLeft size={14} /></button>
            <button className="w-8 h-8 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-md shadow-blue-100">1</button>
            <button className="w-8 h-8 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50">2</button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}