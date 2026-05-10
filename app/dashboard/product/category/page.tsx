/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { 
  Search, Plus, FileDown, Edit2, Trash2, 
  Filter, LayoutGrid, AlertCircle, X, Save, Image as ImageIcon, CheckCircle2
} from "lucide-center";
import Link from "next/link";

const INITIAL_DATA = [
  { id: "37", name: "PVC Casing Batten", colorCode: "#000000", status: "Enable", image: "https://via.placeholder.com/40" },
  { id: "36", name: "PVC Conduit Bend", colorCode: "#2563eb", status: "Enable", image: "https://via.placeholder.com/40" },
  { id: "35", name: "PVC Conduit Pipe", colorCode: "#dc2626", status: "Disable", image: "https://via.placeholder.com/40" },
  { id: "34", name: "Kitkat Fuses", colorCode: "#16a34a", status: "Enable", image: "https://via.placeholder.com/40" },
  { id: "33", name: "Surface Type PVC MCB", colorCode: "#ca8a04", status: "Enable", image: "https://via.placeholder.com/40" },
  { id: "32", name: "Fan Rods", colorCode: "#4b5563", status: "Disable", image: "https://via.placeholder.com/40" },
];

export default function CategoryPage() {
  // FIXED: Using initializer function to prevent cascading renders
  const [data, setData] = useState<any[]>(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("srv_categories");
      return savedData ? JSON.parse(savedData) : INITIAL_DATA;
    }
    return INITIAL_DATA;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const filterRef = useRef<HTMLDivElement>(null);

  const [confirmModal, setConfirmModal] = useState<{ isOpen: boolean; type: 'single' | 'bulk' | 'bulk-status'; targetId?: string; statusToSet?: string }>({
    isOpen: false,
    type: 'single'
  });

  const [editModal, setEditModal] = useState<{ isOpen: boolean; category: any | null }>({
    isOpen: false,
    category: null
  });

  const [messageBox, setMessageBox] = useState<{ isOpen: boolean; title: string; message: string }>({
    isOpen: false,
    title: "",
    message: ""
  });

  // Ensure initial data is in localStorage after first mount
  useEffect(() => {
    if (!localStorage.getItem("srv_categories")) {
      localStorage.setItem("srv_categories", JSON.stringify(INITIAL_DATA));
    }
  }, []);

  // Helper to sync state and storage
  const updateDataAndStorage = (newData: any[]) => {
    setData(newData);
    localStorage.setItem("srv_categories", JSON.stringify(newData));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, data, statusFilter]);

  const showCenterMessage = (title: string, msg: string) => {
    setMessageBox({ isOpen: true, title, message: msg });
    setTimeout(() => setMessageBox(prev => ({ ...prev, isOpen: false })), 2500);
  };

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

  const executeAction = () => {
    let newData = [...data];
    if (confirmModal.type === 'single' && confirmModal.targetId) {
      newData = newData.filter(item => item.id !== confirmModal.targetId);
      setSelectedIds(prev => prev.filter(i => i !== confirmModal.targetId));
      showCenterMessage("Deleted!", "Category has been removed.");
    } else if (confirmModal.type === 'bulk') {
      newData = newData.filter(item => !selectedIds.includes(item.id));
      setSelectedIds([]);
      showCenterMessage("Success!", "Selected categories removed.");
    } else if (confirmModal.type === 'bulk-status' && confirmModal.statusToSet) {
      newData = newData.map(item => 
        selectedIds.includes(item.id) ? { ...item, status: confirmModal.statusToSet! } : item
      );
      setSelectedIds([]);
      showCenterMessage("Updated!", `Status set to ${confirmModal.statusToSet}.`);
    }
    updateDataAndStorage(newData);
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

  const handleEditSave = () => {
    if (!editModal.category) return;
    const newData = data.map(item => 
      item.id === editModal.category.id ? { ...editModal.category } : item
    );
    updateDataAndStorage(newData);
    setEditModal({ isOpen: false, category: null });
    showCenterMessage("Saved!", "Category details updated successfully.");
  };

  const handleBulkAction = (action: string) => {
    if (selectedIds.length === 0) return;
    if (action === "delete") setConfirmModal({ isOpen: true, type: 'bulk' });
    else if (action === "Enable" || action === "Disable") setConfirmModal({ isOpen: true, type: 'bulk-status', statusToSet: action });
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData.length && filteredData.length > 0) setSelectedIds([]);
    else setSelectedIds(filteredData.map(item => item.id));
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans relative text-slate-900">
      
      {/* ─── MESSAGE BOX ─── */}
      {messageBox.isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/10 backdrop-blur-[2px]">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xs overflow-hidden border border-slate-100 animate-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle2 size={28} />
              </div>
              <h3 className="font-bold text-slate-800">{messageBox.title}</h3>
              <p className="text-xs text-slate-500 mt-1">{messageBox.message}</p>
            </div>
            <button onClick={() => setMessageBox({...messageBox, isOpen: false})} className="w-full py-3 bg-slate-50 border-t border-slate-100 text-xs font-bold text-slate-600 cursor-pointer">Dismiss</button>
          </div>
        </div>
      )}

      {/* ─── EDIT MODAL ─── */}
      {editModal.isOpen && editModal.category && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-bold text-slate-800">Edit Category #{editModal.category.id}</h3>
              <button onClick={() => setEditModal({ isOpen: false, category: null })} className="text-slate-400 hover:text-slate-600 transition-colors hover:rotate-90 cursor-pointer"><X size={20} /></button>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Image URL</label>
                <div className="flex gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 border overflow-hidden flex-shrink-0">
                        <img src={editModal.category.image} className="w-full h-full object-cover" alt="preview" />
                    </div>
                    <input type="text" value={editModal.category.image} onChange={(e) => setEditModal({...editModal, category: {...editModal.category, image: e.target.value}})} className="flex-1 px-4 bg-slate-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Category Name</label>
                <input type="text" value={editModal.category.name} onChange={(e) => setEditModal({ ...editModal, category: { ...editModal.category, name: e.target.value } })} className="w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Color Code</label>
                  <div className="flex gap-2 p-1.5 bg-slate-50 border rounded-xl items-center">
                    <div className="relative w-10 h-10 shrink-0 overflow-hidden rounded-lg border border-slate-200">
                      <input 
                        type="color" 
                        value={editModal.category.colorCode} 
                        onChange={(e) => setEditModal({ ...editModal, category: { ...editModal.category, colorCode: e.target.value } })} 
                        className="absolute inset-[-8px] w-[200%] h-[200%] cursor-pointer" 
                      />
                    </div>
                    <input 
                      type="text" 
                      value={editModal.category.colorCode} 
                      onChange={(e) => setEditModal({ ...editModal, category: { ...editModal.category, colorCode: e.target.value } })}
                      className="flex-1 bg-transparent text-xs font-mono font-bold uppercase outline-none px-1"
                      placeholder="#000000"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 block">Status</label>
                  <select value={editModal.category.status} onChange={(e) => setEditModal({ ...editModal, category: { ...editModal.category, status: e.target.value } })} className="w-full px-3 py-[11px] bg-slate-50 border rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer">
                    <option value="Enable">Enable</option>
                    <option value="Disable">Disable</option>
                  </select>
                </div>
              </div>

              <button onClick={handleEditSave} className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-all active:scale-[0.98] shadow-lg shadow-blue-100 cursor-pointer"><Save size={16} /> Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── CONFIRMATION MODAL ─── */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border ${confirmModal.type.includes('status') ? 'bg-blue-50 text-blue-500 border-blue-100' : 'bg-rose-50 text-rose-500 border-rose-100'}`}><AlertCircle size={32} /></div>
              <h3 className="text-lg font-bold">Confirmation</h3>
              <p className="text-sm text-slate-500 mt-2">Are you sure you want to proceed?</p>
            </div>
            <div className="flex border-t border-slate-100">
              <button onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })} className="flex-1 px-4 py-4 text-sm font-semibold border-r hover:bg-slate-50 transition-colors text-slate-600 cursor-pointer">Cancel</button>
              <button onClick={executeAction} className={`flex-1 px-4 py-4 text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer ${confirmModal.type.includes('status') ? 'text-blue-600' : 'text-rose-600'}`}>Confirm</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 shadow-inner"><LayoutGrid size={24} /></div>
          <div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">Manage Categories</h1>
            <p className="text-sm text-slate-500 font-medium">SRV Electricals Product Lines</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-600 hover:bg-slate-50 transition-all shadow-sm font-semibold cursor-pointer"><FileDown size={16} /> Export</button>
          <Link href="/dashboard/product/category/add" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-100"><Plus size={16} /> Add Category</Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search categories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/10" />
          </div>
          <div className="flex items-center gap-2 relative" ref={filterRef}>
            <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`px-4 py-2.5 border rounded-lg text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${isFilterOpen ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white text-slate-600'}`}><Filter size={16} /> Filter</button>
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-100 shadow-2xl rounded-2xl z-50 p-4 animate-in slide-in-from-top-2">
                {["All", "Enable", "Disable"].map((s) => (
                  <label key={s} className={`flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-colors ${statusFilter === s ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-50 text-slate-600'}`}>
                    <input type="radio" checked={statusFilter === s} onChange={() => {setStatusFilter(s); setIsFilterOpen(false);}} className="hidden" />
                    <span className="text-xs font-bold">{s}</span>
                    {statusFilter === s && <CheckCircle2 size={14} />}
                  </label>
                ))}
              </div>
            )}
            <select onChange={(e) => {handleBulkAction(e.target.value); e.target.value=""}} className="px-4 py-2.5 border border-slate-200 rounded-lg text-sm font-bold text-slate-600 outline-none hover:bg-slate-50 cursor-pointer">
                <option value="">Bulk Action</option>
                <option value="Enable">Enable Selected</option>
                <option value="Disable">Disable Selected</option>
                <option value="delete">Delete Selected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 text-slate-400 font-bold uppercase text-[10px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 w-10 text-center"><input type="checkbox" checked={selectedIds.length === filteredData.length && filteredData.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded accent-blue-600 cursor-pointer" /></th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">Color</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((cat) => (
                <tr key={cat.id} className={`group transition-colors ${selectedIds.includes(cat.id) ? 'bg-blue-50/40' : 'hover:bg-slate-50/50'}`}>
                  <td className="px-6 py-4 text-center"><input type="checkbox" checked={selectedIds.includes(cat.id)} onChange={() => setSelectedIds(prev => prev.includes(cat.id) ? prev.filter(i => i !== cat.id) : [...prev, cat.id])} className="w-4 h-4 rounded accent-blue-600 cursor-pointer" /></td>
                  <td className="px-6 py-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shadow-sm">
                        {cat.image ? <img src={cat.image} className="w-full h-full object-cover" alt={cat.name} /> : <ImageIcon size={18} className="text-slate-300" />}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-400 font-mono text-[11px]">#{cat.id}</td>
                  <td className="px-6 py-4 font-bold text-slate-700">{cat.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full border border-slate-200 shadow-inner" style={{ backgroundColor: cat.colorCode }}></div>
                      <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">{cat.colorCode}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider ${cat.status === 'Enable' ? 'bg-green-50 border-green-100 text-green-600' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>{cat.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setEditModal({ isOpen: true, category: { ...cat } })} className="p-2 text-amber-500 hover:bg-amber-100 rounded-lg transition-all active:scale-90 cursor-pointer"><Edit2 size={16}/></button>
                      <button onClick={() => setConfirmModal({ isOpen: true, type: 'single', targetId: cat.id })} className="p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-all active:scale-90 cursor-pointer"><Trash2 size={16}/></button>
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