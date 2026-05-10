/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Search, Plus, FileDown, Eye, Edit2, Trash2,
  QrCode, Filter, Zap, CheckCircle2,
  XCircle, Users, AlertCircle, RotateCcw, ChevronLeft, ChevronRight, X
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// --- Interfaces ---
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
  status: "Active" | "Inactive";
}

// Ye tab chalega jab localStorage khali ho
const DEFAULT_DATA: Electrician[] = Array.from({ length: 8 }).map((_, i) => ({
  id: (3347 - i).toString(),
  name: i % 2 === 0 ? "Arshdeep Singh" : "Anmol Preet",
  wallet: (1250 + (i * 100)).toLocaleString(),
  type: i % 4 === 0 ? "Pro" : "Standard",
  dealerCode: `D-401${59 + i}`,
  reffCode: `REF88${2 + i}`,
  email: "user@srv.com",
  qrCode: `QR-992${1 + i}`,
  phone: "9646127661",
  status: i % 3 === 0 ? "Inactive" : "Active",
}));

// --- Sub-components ---
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3 flex items-center gap-2">
     <span className="w-8 h-[1px] bg-slate-200"></span> {children}
  </p>
);

const StatCard = ({ icon: Icon, label, value, iconBg, iconColor, borderAccent }: any) => (
  <div className={`bg-white rounded-xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md shadow-sm group cursor-default`}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${iconBg} ${iconColor}`}><Icon size={18} /></div>
    <div><p className="text-2xl font-semibold text-slate-800">{value}</p><p className="text-xs text-slate-500 mt-1">{label}</p></div>
  </div>
);

const StatusBadge = ({ status }: { status: "Active" | "Inactive" }) => (
  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border cursor-pointer ${status === "Active" ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-50 text-slate-700 border-slate-200"}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${status === "Active" ? "bg-green-500" : "bg-slate-400"}`} /> {status}
  </span>
);

export default function ElectriciansPage() {
  const router = useRouter();
  const filterRef = useRef<HTMLDivElement>(null);
  
  // --- States ---
  const [data, setData] = useState<Electrician[]>([]); // Start with empty
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewingUser, setViewingUser] = useState<Electrician | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [typeFilter, setTypeFilter] = useState<string>("All");

  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; type: 'single' | 'bulk'; targetId?: string }>({
    isOpen: false,
    type: 'single'
  });

  // --- Persistence Logic ---
  // Load data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("electricians_list");
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      setData(DEFAULT_DATA);
      localStorage.setItem("electricians_list", JSON.stringify(DEFAULT_DATA));
    }
  }, []);

  // Update localStorage whenever data changes
  const updateData = (newData: Electrician[]) => {
    setData(newData);
    localStorage.setItem("electricians_list", JSON.stringify(newData));
  };

  // --- Click Outside Filter ---
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Filter Logic ---
  const filteredData = useMemo(() => {
    return data.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            user.phone.includes(searchTerm) || 
                            user.id.includes(searchTerm);
      const matchesStatus = statusFilter === "All" || user.status === statusFilter;
      const matchesType = typeFilter === "All" || user.type === typeFilter;
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, data, statusFilter, typeFilter]);

  // --- Export Logic ---
  const handleExport = () => {
    const headers = ["ID", "Name", "Email", "Phone", "Wallet", "Dealer Code", "Ref Code", "Status"];
    const csvContent = [
      headers.join(","),
      ...filteredData.map(u => [u.id, u.name, u.email, u.phone, u.wallet, u.dealerCode, u.reffCode, u.status].join(","))
    ].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", `electricians_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Deletion Logic ---
  const executeDelete = () => {
    let newData;
    if (confirmModal.type === 'single' && confirmModal.targetId) {
      newData = data.filter(item => item.id !== confirmModal.targetId);
      setSelectedIds(selectedIds.filter(sid => sid !== confirmModal.targetId));
    } else {
      newData = data.filter(item => !selectedIds.includes(item.id));
      setSelectedIds([]);
    }
    updateData(newData);
    setConfirmModal({ isOpen: false, type: 'single' });
  };

  const handleBulkAction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "delete" && selectedIds.length > 0) {
      setConfirmModal({ isOpen: true, type: 'bulk' });
    }
    e.target.value = ""; 
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans relative">
      
      {/* View Details Modal */}
      {viewingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer" onClick={() => setViewingUser(null)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-[101] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="text-sm font-bold text-slate-800">Electrician Profile</h3>
              <button onClick={() => setViewingUser(null)} className="p-1 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"><X size={18} className="text-slate-500" /></button>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center text-xl font-bold">{viewingUser.name.charAt(0)}</div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">{viewingUser.name}</h4>
                  <StatusBadge status={viewingUser.status} />
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Wallet Points</p>
                  <p className="text-sm font-bold text-blue-600">{viewingUser.wallet} Pts</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm"><span className="text-slate-400">ID:</span> <span className="text-slate-700 font-medium">#{viewingUser.id}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Email:</span> <span className="text-slate-700 font-medium">{viewingUser.email}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Phone:</span> <span className="text-slate-700 font-medium">{viewingUser.phone}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Dealer Code:</span> <span className="text-slate-700 font-medium">{viewingUser.dealerCode}</span></div>
                <div className="flex justify-between text-sm"><span className="text-slate-400">Referral Code:</span> <span className="text-slate-700 font-medium">{viewingUser.reffCode}</span></div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100">
              <button onClick={() => setViewingUser(null)} className="w-full py-2.5 bg-slate-800 text-white rounded-xl text-sm font-bold hover:bg-slate-900 transition-all cursor-pointer">Close Details</button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer" onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-[101] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Confirm Deletion</h3>
              <p className="text-sm text-slate-500 mt-2">Are you sure you want to remove this data? This action cannot be undone.</p>
            </div>
            <div className="flex border-t border-slate-100">
              <button onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })} className="flex-1 px-4 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 border-r border-slate-100 cursor-pointer">Cancel</button>
              <button onClick={executeDelete} className="flex-1 px-4 py-4 text-sm font-semibold text-rose-600 hover:bg-rose-50 cursor-pointer">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 tracking-tight">Electricians</h1>
          <p className="text-sm text-slate-500">Manage workforce</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 cursor-pointer transition-colors shadow-sm"><FileDown size={15} /> Export</button>
          <Link href="/dashboard/users/electricians/add" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-all cursor-pointer active:scale-95">
            <Plus size={15} /> Add Electrician
          </Link>
        </div>
      </div>

      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Total Electricians" value={data.length.toString()} iconBg="bg-blue-100" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
        <StatCard icon={CheckCircle2} label="Active" value={data.filter(d => d.status === "Active").length.toString()} iconBg="bg-green-100" iconColor="text-green-600" borderAccent="border-t-green-500" />
        <StatCard icon={XCircle} label="Inactive" value={data.filter(d => d.status === "Inactive").length.toString()} iconBg="bg-slate-100" iconColor="text-slate-500" borderAccent="border-t-slate-400" />
        <StatCard icon={Zap} label="Pro Members" value={data.filter(d => d.type === "Pro").length.toString()} iconBg="bg-purple-100" iconColor="text-purple-600" borderAccent="border-t-purple-500" />
      </div>

      <SectionLabel>All Electricians</SectionLabel>
      
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input type="text" placeholder="Search by name, ID or phone..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/10 transition-all" />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto relative" ref={filterRef}>
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium transition-all cursor-pointer ${isFilterOpen ? 'bg-blue-600 text-white border-blue-600 shadow-md' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}><Filter size={14} /> Filter</button>

          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-xl z-50 p-4 animate-in slide-in-from-top-2 duration-200">
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-50">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Table Filters</span>
                <button onClick={() => {setStatusFilter("All"); setTypeFilter("All")}} className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"><RotateCcw size={10}/> Reset</button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1.5 uppercase">Status</label>
                  <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500 transition-colors cursor-pointer">
                    <option value="All">All Statuses</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1.5 uppercase">Account Type</label>
                  <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500 transition-colors cursor-pointer">
                    <option value="All">All Types</option>
                    <option value="Pro">Pro</option>
                    <option value="Standard">Standard</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          <select onChange={handleBulkAction} className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium outline-none cursor-pointer hover:border-slate-300 transition-all">
            <option value="">Bulk Actions</option>
            <option value="delete">Delete Selected ({selectedIds.length})</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-4 w-10">
                  <input type="checkbox" checked={filteredData.length > 0 && selectedIds.length === filteredData.length} onChange={() => {
                    if (selectedIds.length === filteredData.length) setSelectedIds([]);
                    else setSelectedIds(filteredData.map(item => item.id));
                  }} className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
                </th>
                {["ID", "Name", "Wallet", "Dealer", "Ref Code", "QR", "Phone", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 group transition-colors cursor-pointer">
                  <td className="px-5 py-4">
                    <input type="checkbox" checked={selectedIds.includes(user.id)} onChange={(e) => {e.stopPropagation(); setSelectedIds(prev => prev.includes(user.id) ? prev.filter(i => i !== user.id) : [...prev, user.id])}} className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
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
                  <td className="px-5 py-4"><button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all cursor-pointer"><QrCode size={14} /></button></td>
                  <td className="px-5 py-4 text-sm text-slate-600">{user.phone}</td>
                  <td className="px-5 py-4"><StatusBadge status={user.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={(e) => {e.stopPropagation(); setViewingUser(user)}} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors cursor-pointer"><Eye size={15} /></button>
                      <button 
                        onClick={(e) => {e.stopPropagation(); router.push(`/dashboard/users/electricians/edit?id=${user.id}`)}} 
                        className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-md transition-colors cursor-pointer"
                      >
                        <Edit2 size={15} />
                      </button>
                      <button onClick={(e) => {e.stopPropagation(); setConfirmModal({ isOpen: true, type: 'single', targetId: user.id })}} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-slate-400 text-sm italic">No results found matching your current filters.</p>
              <button onClick={() => {setSearchTerm(""); setStatusFilter("All"); setTypeFilter("All")}} className="mt-2 text-xs text-blue-600 font-semibold hover:underline cursor-pointer">Clear all filters</button>
            </div>
          )}
        </div>
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
          <p className="text-xs text-slate-400 font-medium">Showing {filteredData.length} records</p>
          <div className="flex gap-1">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer transition-all"><ChevronLeft size={14} /></button>
            <button className="w-8 h-8 rounded-lg text-xs font-bold bg-blue-600 text-white cursor-pointer shadow-md shadow-blue-200">1</button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 cursor-pointer transition-all"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}