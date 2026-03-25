/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { 
  Search, Plus, FileDown, Edit2, Trash2, 
  Filter, LayoutGrid, AlertCircle, RotateCcw 
} from "lucide-react";
import Link from "next/link";

// --- Mock Data ---
const INITIAL_DATA = [
  { id: "37", name: "PVC Casing Batten", colorCode: "#000000", image: null, status: "Enable" },
  { id: "36", name: "PVC Conduit Bend", colorCode: "#000000", image: null, status: "Enable" },
  { id: "35", name: "PVC Conduit Pipe", colorCode: "#000000", image: null, status: "Disable" },
  { id: "34", name: "Kitkat Fuses", colorCode: "#000000", image: null, status: "Enable" },
  { id: "33", name: "Surface Type PVC MCB", colorCode: "#000000", image: null, status: "Enable" },
  { id: "32", name: "Fan Rods", colorCode: "#000000", image: null, status: "Disable" },
];

export default function CategoryPage() {
  const [data, setData] = useState(INITIAL_DATA);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // --- Filter State ---
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const filterRef = useRef<HTMLDivElement>(null);

  // --- Modal State ---
  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; type: 'single' | 'bulk'; targetId?: string }>({
    isOpen: false,
    type: 'single'
  });

  // --- Click Outside Handler ---
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
    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, data, statusFilter]);

  // --- Runnable Export Function ---
  const handleExport = () => {
    const headers = ["ID,Category Name,Color Code,Status"];
    const rows = filteredData.map(cat => `${cat.id},${cat.name},${cat.colorCode},${cat.status}`);
    const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `categories_export_${new Date().toLocaleDateString()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Delete Logic ---
  const executeDelete = () => {
    if (confirmModal.type === 'single' && confirmModal.targetId) {
      setData(prev => prev.filter(item => item.id !== confirmModal.targetId));
      setSelectedIds(prev => prev.filter(i => i !== confirmModal.targetId));
    } else if (confirmModal.type === 'bulk') {
      setData(prev => prev.filter(item => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    }
    setConfirmModal({ isOpen: false, type: 'single' });
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length) setSelectedIds([]);
    else setSelectedIds(filteredData.map(item => item.id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans relative">
      
      {/* --- CUSTOM MODAL --- */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <AlertCircle size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Delete Category</h3>
              <p className="text-sm text-slate-500 mt-2">Are you sure you want to delete {confirmModal.type === 'bulk' ? 'selected categories' : 'this category'}? This action is permanent.</p>
            </div>
            <div className="flex border-t border-slate-100">
              <button onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })} className="flex-1 px-4 py-4 text-sm font-semibold text-slate-600 hover:bg-slate-50 border-r border-slate-100 transition-colors">Cancel</button>
              <button onClick={executeDelete} className="flex-1 px-4 py-4 text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 border border-purple-200 shadow-sm">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Manage Categories</h1>
            <p className="text-sm text-slate-500">SRV Electricals Product Lines</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm hover:bg-slate-50 active:scale-95 transition-all"
          >
            <FileDown size={16} /> Export
          </button>
          <Link 
            href="/dashboard/product/category/add" 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:bg-blue-700 active:scale-95 transition-all"
          >
            <Plus size={16} /> Add Category
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-2 relative" ref={filterRef}>
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`px-4 py-2 border rounded-lg text-sm flex items-center gap-2 transition-all ${isFilterOpen ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              >
                <Filter size={16} /> Filter
                {statusFilter !== "All" && <span className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />}
              </button>

              {/* Filter Dropdown */}
              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-xl z-50 p-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-50">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status Filter</span>
                    <button onClick={() => setStatusFilter("All")} className="text-[10px] text-blue-600 font-bold flex items-center gap-1 hover:underline">
                      <RotateCcw size={10}/> Reset
                    </button>
                  </div>
                  <div className="space-y-2">
                    {["All", "Enable", "Disable"].map((status) => (
                      <label key={status} className="flex items-center gap-2 p-2 hover:bg-slate-50 rounded-lg cursor-pointer transition-colors">
                        <input 
                          type="radio" 
                          name="status" 
                          checked={statusFilter === status} 
                          onChange={() => setStatusFilter(status)}
                          className="w-4 h-4 accent-blue-600" 
                        />
                        <span className="text-xs font-medium text-slate-600">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <select 
                onChange={(e) => e.target.value === "delete" && selectedIds.length > 0 && setConfirmModal({isOpen: true, type: 'bulk'})}
                className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 outline-none cursor-pointer bg-white font-medium hover:border-slate-300 transition-all"
              >
                 <option value="">Bulk Action</option>
                 <option value="delete">Delete Selected ({selectedIds.length})</option>
              </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4 w-10 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                    checked={selectedIds.length === filteredData.length && filteredData.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">Color</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((cat) => (
                <tr key={cat.id} className={`hover:bg-slate-50/50 transition-colors ${selectedIds.includes(cat.id) ? 'bg-blue-50/50' : ''}`}>
                  <td className="px-6 py-4 text-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                      checked={selectedIds.includes(cat.id)}
                      onChange={() => setSelectedIds(prev => prev.includes(cat.id) ? prev.filter(i => i !== cat.id) : [...prev, cat.id])}
                    />
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-xs">#{cat.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{cat.name}</td>
                  <td className="px-6 py-4">
                    <div className="w-5 h-5 rounded-full border border-slate-200 shadow-inner" style={{ backgroundColor: cat.colorCode }}></div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold border uppercase ${cat.status === 'Enable' ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/dashboard/product/category/add?id=${cat.id}&name=${encodeURIComponent(cat.name)}&color=${encodeURIComponent(cat.colorCode)}`}
                        className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-colors"
                      >
                        <Edit2 size={16}/>
                      </Link>
                      <button 
                        onClick={() => setConfirmModal({ isOpen: true, type: 'single', targetId: cat.id })}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16}/>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredData.length === 0 && (
            <div className="py-20 text-center text-slate-400 text-sm italic">
              No categories found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}