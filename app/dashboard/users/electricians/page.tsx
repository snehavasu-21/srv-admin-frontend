/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useMemo } from "react";
import {
  Search, Plus, FileDown, Eye, Edit2, Trash2,
  QrCode, ChevronLeft, ChevronRight, Filter,
  Zap, Wallet, Users, CheckCircle2, LucideIcon,
  XCircle
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- Interfaces & Mock Data remain same ---
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

const INITIAL_DATA: Electrician[] = Array.from({ length: 8 }).map((_, i) => ({
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

// --- Sub-components (StatCard, StatusBadge, etc.) same as before ---
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">{children}</p>
);

const StatCard = ({ icon: Icon, label, value, iconBg, iconColor, borderAccent }: any) => (
  <div className={`bg-white rounded-xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md shadow-sm`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}><Icon size={18} /></div>
    <div><p className="text-2xl font-semibold text-slate-800">{value}</p><p className="text-xs text-slate-500 mt-1">{label}</p></div>
  </div>
);

const StatusBadge = ({ status }: { status: "Active" | "Pending" }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${status === "Active" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${status === "Active" ? "bg-green-500" : "bg-amber-500"}`} /> {status}
  </span>
);

export default function ElectriciansPage() {
  const router = useRouter();
  const [data, setData] = useState<Electrician[]>(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Individual Delete
  const handleDelete = (id: string) => {
    if (confirm("Are you sure?")) {
      setData(data.filter(item => item.id !== id));
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    }
  };

  // Checkbox Toggle
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Select All
  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) setSelectedIds([]);
    else setSelectedIds(data.map(item => item.id));
  };

  // --- BULK ACTION FUNCTIONALITY ---
  const handleBulkAction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const action = e.target.value;
    if (action === "delete" && selectedIds.length > 0) {
      if (confirm(`Delete ${selectedIds.length} selected items?`)) {
        setData(data.filter(item => !selectedIds.includes(item.id)));
        setSelectedIds([]);
      }
    }
    e.target.value = ""; // Reset dropdown
  };

  const filteredData = useMemo(() => {
    return data.filter(user => 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.phone.includes(searchTerm) || user.id.includes(searchTerm)
    );
  }, [searchTerm, data]);

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div><h1 className="text-xl font-semibold text-slate-800">Electricians</h1><p className="text-sm text-slate-500">Manage workforce</p></div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium"><FileDown size={15} /> Export</button>
          <Link href="/dashboard/users/electricians/add" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm"><Plus size={15} /> Add Electrician</Link>
        </div>
      </div>

      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Total Electricians" value={data.length.toString()} iconBg="bg-blue-100" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
        <StatCard icon={CheckCircle2} label="Active" value="2,257" iconBg="bg-green-100" iconColor="text-green-600" borderAccent="border-t-green-500" />
        <StatCard icon={XCircle} label="Inactive" value="458" iconBg="bg-rose-100" iconColor="text-rose-500" borderAccent="border-t-rose-400" />
        <StatCard icon={Zap} label="Pro Active" value="200" iconBg="bg-amber-100" iconColor="text-amber-600" borderAccent="border-t-amber-500" />
      </div>

      <SectionLabel>All Electricians</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium"><Filter size={14} /> Filter</button>
          
          {/* Updated Bulk Action Dropdown */}
          <select 
            onChange={handleBulkAction}
            className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium outline-none cursor-pointer"
          >
            <option value="">Bulk Actions</option>
            <option value="delete">Delete Selected ({selectedIds.length})</option>
            <option value="enable">Enable Selected</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-4 w-10">
                  <input type="checkbox" checked={selectedIds.length === data.length} onChange={toggleSelectAll} className="w-4 h-4 rounded accent-blue-600" />
                </th>
                {["ID", "Name", "Wallet", "Dealer Code", "Electrician Code", "QR", "Phone", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 group">
                  <td className="px-5 py-4">
                    <input type="checkbox" checked={selectedIds.includes(user.id)} onChange={() => toggleSelect(user.id)} className="w-4 h-4 rounded accent-blue-600" />
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400">#{user.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xs font-bold border border-slate-200">{user.name.charAt(0)}</div>
                      <div><p className="text-sm font-semibold text-slate-700">{user.name}</p><p className="text-[11px] text-slate-400">{user.email}</p></div>
                    </div>
                  </td>
                  <td className="px-5 py-4"><span className="text-xs font-bold px-2 py-1 bg-blue-50 text-blue-600 rounded-md border border-blue-100">{user.wallet} Pts</span></td>
                  <td className="px-5 py-4 text-xs font-semibold text-slate-500 uppercase">{user.dealerCode}</td>
                  <td className="px-5 py-4 text-xs font-semibold text-purple-600 uppercase">{user.reffCode}</td>
                  <td className="px-5 py-4"><button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-blue-600 hover:text-white"><QrCode size={14} /></button></td>
                  <td className="px-5 py-4 text-sm text-slate-600">{user.phone}</td>
                  <td className="px-5 py-4"><StatusBadge status={user.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md"><Eye size={15} /></button>
                      <button onClick={() => router.push(`/dashboard/users/electricians/add?id=${user.id}`)} className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-md"><Edit2 size={15} /></button>
                      <button onClick={() => handleDelete(user.id)} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-md"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}