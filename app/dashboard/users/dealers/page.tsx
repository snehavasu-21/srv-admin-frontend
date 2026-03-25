/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Search, Plus, FileDown, Eye, Edit2, Trash2, 
  Building2, CheckCircle2, XCircle, Filter,
  ChevronLeft, ChevronRight, AlertCircle, X, RotateCcw
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
  city: i % 4 === 0 ? "Ludhiana" : i % 4 === 1 ? "Mansa" : i % 4 === 2 ? "Bathinda" : "Patiala",
  phone: "9876543210",
  status: i % 3 === 0 ? "Pending" : "Active",
}));

export default function DealersPage() {
  const router = useRouter();
  const filterRef = useRef<HTMLDivElement>(null);
  
  // --- States ---
  const [data, setData] = useState<Dealer[]>(INITIAL_DEALERS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Filter Criteria
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [cityFilter, setCityFilter] = useState<string>("All");

  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; type: 'single' | 'bulk'; targetId?: string }>({
    isOpen: false,
    type: 'single'
  });

  // --- Close filter on click outside ---
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
  const filteredData = data.filter(dealer => {
    const matchesSearch = dealer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dealer.firmName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dealer.id.includes(searchTerm);
    
    const matchesStatus = statusFilter === "All" || dealer.status === statusFilter;
    const matchesCity = cityFilter === "All" || dealer.city === cityFilter;

    return matchesSearch && matchesStatus && matchesCity;
  });

  const cities = Array.from(new Set(data.map(d => d.city)));

  // --- Actions ---
  const executeDelete = () => {
    if (confirmModal.type === 'single' && confirmModal.targetId) {
      setData(data.filter(item => item.id !== confirmModal.targetId));
      setSelectedIds(selectedIds.filter(sid => sid !== confirmModal.targetId));
    } else if (confirmModal.type === 'bulk') {
      setData(data.filter(item => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
    setConfirmModal({ isOpen: false, type: 'single' });
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length && filteredData.length > 0) setSelectedIds([]);
    else setSelectedIds(filteredData.map(item => item.id));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans relative">
      
      {/* Custom Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm relative z-[101] overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Confirm Deletion</h3>
              <p className="text-sm text-slate-500 mt-2">Are you sure you want to remove this data?</p>
            </div>
            <div className="flex border-t border-slate-100">
              <button onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })} className="flex-1 px-4 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
              <button onClick={executeDelete} className="flex-1 px-4 py-4 text-sm font-semibold text-rose-600 hover:bg-rose-50">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dealers</h1>
          <p className="text-sm text-slate-500">Manage your dealer network</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 flex items-center gap-2">
            <FileDown size={15}/> Export
          </button>
          <Link href="/dashboard/users/dealers/add" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 transition-all">
            <Plus size={15} /> Add Dealer
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <StatCard icon={Building2} label="Total Dealers" value={data.length.toString()} iconBg="bg-blue-100" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
        <StatCard icon={CheckCircle2} label="Active" value={data.filter(d => d.status === "Active").length} iconBg="bg-green-100" iconColor="text-green-600" borderAccent="border-t-green-500" />
        <StatCard icon={XCircle} label="Pending" value={data.filter(d => d.status === "Pending").length} iconBg="bg-amber-100" iconColor="text-amber-600" borderAccent="border-t-amber-400" />
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input type="text" placeholder="Search by name, firm or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto relative" ref={filterRef}>
              <select 
                onChange={(e) => e.target.value === "delete" && setConfirmModal({isOpen: true, type: 'bulk'})} 
                className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium outline-none cursor-pointer"
              >
                <option value="">Bulk Actions</option>
                <option value="delete">Delete Selected ({selectedIds.length})</option>
              </select>

              {/* Filter Button */}
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${isFilterOpen ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >
                <Filter size={14} /> Filter
                {(statusFilter !== "All" || cityFilter !== "All") && <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />}
              </button>

              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-xl z-50 p-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-50">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filters</span>
                    <button onClick={() => {setStatusFilter("All"); setCityFilter("All")}} className="text-[10px] text-blue-600 font-bold hover:underline flex items-center gap-1">
                      <RotateCcw size={10}/> Reset
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">Status</label>
                      <select 
                        value={statusFilter} 
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
                      >
                        <option value="All">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 block mb-1.5">City</label>
                      <select 
                        value={cityFilter} 
                        onChange={(e) => setCityFilter(e.target.value)}
                        className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-blue-500"
                      >
                        <option value="All">All Cities</option>
                        {cities.map(city => (
                          <option key={city} value={city}>{city}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/50 border-b border-slate-100">
              <tr>
                <th className="px-5 py-4 w-10">
                  <input type="checkbox" className="rounded accent-blue-600 cursor-pointer" checked={selectedIds.length === filteredData.length && filteredData.length > 0} onChange={toggleSelectAll} />
                </th>
                {["ID", "Dealer Details", "Firm Name", "GST Number", "City", "Status", "Actions"].map(h => (
                  <th key={h} className="px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((dealer) => (
                <tr key={dealer.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <input type="checkbox" className="rounded accent-blue-600 cursor-pointer" checked={selectedIds.includes(dealer.id)} onChange={() => setSelectedIds(prev => prev.includes(dealer.id) ? prev.filter(i => i !== dealer.id) : [...prev, dealer.id])} />
                  </td>
                  <td className="px-5 py-4 text-slate-400 text-xs">#{dealer.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center text-xs font-bold border border-blue-100">{dealer.name.charAt(0)}</div>
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
                    <div className="flex gap-1">
                      <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md transition-colors"><Eye size={15}/></button>
                      <button onClick={() => router.push(`/dashboard/users/dealers/add?id=${dealer.id}`)} className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-md transition-colors"><Edit2 size={15}/></button>
                      <button onClick={() => setConfirmModal({ isOpen: true, type: 'single', targetId: dealer.id })} className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-md transition-colors"><Trash2 size={15}/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-20 text-center text-slate-400 text-sm">No dealers found matching your criteria.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination placeholder */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400 font-medium">
          Showing {filteredData.length} results
          <div className="flex gap-1">
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"><ChevronLeft size={14} /></button>
            <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}