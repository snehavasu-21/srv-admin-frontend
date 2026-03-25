/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { 
  Search, Plus, FileDown, Eye, Edit2, Trash2, 
  Building2, CheckCircle2, XCircle, Filter,
  ChevronLeft, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Dealer {
  id: string;
  name: string;
  firmName: string;
  gstNo: string;
  city: string;
  phone: string;
  status: "Active" | "Pending";
}

const StatCard = ({ icon: Icon, label, value, iconBg, iconColor, borderAccent }: any) => (
  <div className={`bg-white rounded-xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3 shadow-sm transition-all hover:shadow-md`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}><Icon size={18} /></div>
    <div><p className="text-2xl font-semibold text-slate-800">{value}</p><p className="text-xs text-slate-500 mt-1">{label}</p></div>
  </div>
);

const INITIAL_DEALERS: Dealer[] = Array.from({ length: 8 }).map((_, i) => ({
  id: (501 + i).toString(),
  name: i % 2 === 0 ? "Rajesh Kumar" : "Anmol Preet",
  firmName: i % 2 === 0 ? "Rajesh Electricals" : "Preet Enterprises",
  gstNo: `03AAACV${1000 + i}R1Z5`,
  city: i % 2 === 0 ? "Ludhiana" : "Mansa",
  phone: "9876543210",
  status: i % 3 === 0 ? "Pending" : "Active",
}));

export default function DealersPage() {
  const router = useRouter();
  const [data, setData] = useState<Dealer[]>(INITIAL_DEALERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 1. Search Logic (Compiler friendly - bina useMemo ke)
  const filteredData = data.filter(dealer => {
    const search = searchTerm.toLowerCase();
    return (
      dealer.name.toLowerCase().includes(search) ||
      dealer.firmName.toLowerCase().includes(search) ||
      String(dealer.id).includes(search)
    );
  });

  // 2. Individual Delete
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this dealer?")) {
      setData(data.filter(item => item.id !== id));
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    }
  };

  // 3. Bulk Action Logic
  const handleBulkAction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const action = e.target.value;
    if (action === "delete" && selectedIds.length > 0) {
      if (confirm(`Delete ${selectedIds.length} selected dealers?`)) {
        setData(data.filter(item => !selectedIds.includes(item.id)));
        setSelectedIds([]);
      }
    }
    e.target.value = ""; // Dropdown reset
  };

  // 4. Checkbox Handlers
  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length && filteredData.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData.map(item => item.id));
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">
      
      {/* Header Section */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dealers</h1>
          <p className="text-sm text-slate-500">Manage your dealer network</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 transition-colors">
            <FileDown size={15} className="inline mr-2"/>Export
          </button>
          <Link href="/dashboard/users/dealers/add" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 transition-all">
            <Plus size={15} /> Add Dealer
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard icon={Building2} label="Total Dealers" value={data.length.toString()} iconBg="bg-blue-100" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
        <StatCard icon={CheckCircle2} label="Active" value="2,257" iconBg="bg-green-100" iconColor="text-green-600" borderAccent="border-t-green-500" />
        <StatCard icon={XCircle} label="Inactive" value="658" iconBg="bg-rose-100" iconColor="text-rose-500" borderAccent="border-t-rose-400" />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input 
                  type="text" 
                  placeholder="Search by name, firm or GST..." 
                  value={searchTerm} 
                  onChange={(e) => setSearchTerm(e.target.value)} 
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
                />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <select 
                onChange={handleBulkAction}
                className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium outline-none cursor-pointer hover:border-slate-300 transition-colors"
              >
                <option value="">Bulk Actions</option>
                <option value="delete">Delete Selected ({selectedIds.length})</option>
                <option value="enable">Enable Selected</option>
              </select>

              <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50">
                <Filter size={14} /> Filter
              </button>
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-4 w-10">
                  <input 
                    type="checkbox" 
                    className="rounded accent-blue-600 cursor-pointer"
                    checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                {["ID", "Dealer Details", "Firm Name", "GST Number", "City", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length > 0 ? (
                filteredData.map((dealer) => (
                  <tr key={dealer.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-5 py-4">
                      <input 
                        type="checkbox" 
                        className="rounded accent-blue-600 cursor-pointer"
                        checked={selectedIds.includes(dealer.id)}
                        onChange={() => toggleSelect(dealer.id)}
                      />
                    </td>
                    <td className="px-5 py-4 text-slate-400 text-xs">#{dealer.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-100">
                          {dealer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-700">{dealer.name}</p>
                          <p className="text-[11px] text-slate-400">{dealer.phone}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-600">{dealer.firmName}</td>
                    <td className="px-5 py-4 text-xs font-mono text-slate-500">{dealer.gstNo}</td>
                    <td className="px-5 py-4 text-slate-500">{dealer.city}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${dealer.status === "Active" ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${dealer.status === "Active" ? "bg-green-500" : "bg-amber-500"}`} />
                        {dealer.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md" title="View"><Eye size={15}/></button>
                        <button 
                          onClick={() => router.push(`/dashboard/users/dealers/add?id=${dealer.id}`)}
                          className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-md" 
                          title="Edit"
                        >
                          <Edit2 size={15}/>
                        </button>
                        <button 
                          onClick={() => handleDelete(dealer.id)}
                          className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-md" 
                          title="Delete"
                        >
                          <Trash2 size={15}/>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="px-5 py-10 text-center text-slate-400">No dealers found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Section */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">Showing {filteredData.length} results</p>
          <div className="flex gap-1">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors"><ChevronLeft size={14} /></button>
            <button className="w-8 h-8 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-sm">1</button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}