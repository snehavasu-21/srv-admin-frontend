/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useMemo, useRef } from "react";
import {
  Search, Plus, Edit2, Trash2,
  ChevronLeft, ChevronRight, Filter,
  Image as ImageIcon, Award, Gift as GiftIcon,
  CheckCircle2, XCircle, ChevronDown, X, Save,
  Upload
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

interface Gift {
  id: string;
  type: string;
  name: string;
  mrp: string; // Added MRP
  points: string;
  description: string; // Added Description
  status: "Enable" | "Disable";
  image?: string;
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
    <div className={`bg-white rounded-2xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-pointer`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${iconBg} ${iconColor}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-800 tracking-tight">{value}</p>
        <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

export default function GiftStorePage() {
  // 1. STATE
  const [gifts, setGifts] = useState<Gift[]>([
    { id: "17", type: "Electrician", name: "Electrician Bag", mrp: "1200", points: "500", description: "Tool kit bag", status: "Enable" },
    { id: "16", type: "Electrician", name: "Drill Machine", mrp: "3500", points: "1200", description: "Power drill", status: "Enable" },
    { id: "15", type: "Dealer", name: "Digital Multimeter", mrp: "2000", points: "3500", description: "Testing tool", status: "Enable" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [actionOpen, setActionOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: "", visible: false });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    mrp: "",
    type: "Electrician",
    points: "",
    description: "",
    status: "Enable" as "Enable" | "Disable",
    image: ""
  });

  // 2. LOGIC
  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: "", visible: false }), 3000);
  };

  const filtered = useMemo(() => {
    return gifts.filter((g) => {
      const matchesSearch = g.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterCategory === "All" || g.type === filterCategory;
      return matchesSearch && matchesFilter;
    });
  }, [gifts, searchTerm, filterCategory]);

  const enabledCount = gifts.filter((g) => g.status === "Enable").length;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filtered.map(g => g.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkEnable = () => {
    if (selectedIds.length === 0) return;
    setGifts(prev => prev.map(g => selectedIds.includes(g.id) ? { ...g, status: "Enable" } : g));
    showToast(`Enabled ${selectedIds.length} items`);
    setSelectedIds([]);
    setActionOpen(false);
  };

  const handleBulkDisable = () => {
    if (selectedIds.length === 0) return;
    setGifts(prev => prev.map(g => selectedIds.includes(g.id) ? { ...g, status: "Disable" } : g));
    showToast(`Disabled ${selectedIds.length} items`);
    setSelectedIds([]);
    setActionOpen(false);
  };

  const handleBulkDelete = () => {
    if (selectedIds.length === 0) return;
    setGifts(prev => prev.filter(g => !selectedIds.includes(g.id)));
    showToast(`Deleted ${selectedIds.length} items`);
    setSelectedIds([]);
    setActionOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, image: reader.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: "", mrp: "", type: "Electrician", points: "", description: "", status: "Enable", image: "" });
    setIsPanelOpen(true);
  };

  const handleOpenEdit = (gift: Gift) => {
    setEditingId(gift.id);
    setFormData({ name: gift.name, mrp: gift.mrp, type: gift.type, points: gift.points, description: gift.description, status: gift.status, image: gift.image || "" });
    setIsPanelOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setGifts(prev => prev.map(g => g.id === editingId ? { ...g, ...formData } : g));
      showToast(`${formData.name} updated`);
    } else {
      const newId = gifts.length > 0 ? (Math.max(...gifts.map(g => parseInt(g.id))) + 1).toString() : "1";
      const newGift: Gift = { id: newId, ...formData };
      setGifts([newGift, ...gifts]);
      showToast("New gift added");
    }
    setIsPanelOpen(false);
  };

  const deleteGift = (id: string) => {
    setGifts(prev => prev.filter(g => g.id !== id));
    setConfirmDeleteId(null);
    showToast("Gift removed");
  };

  const toggleStatus = (id: string) => {
    setGifts(prev => prev.map(g => g.id === id ? { ...g, status: g.status === "Enable" ? "Disable" : "Enable" } : g));
    showToast("Status updated");
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

      {/* ── MODAL PANEL (FIXED CONTENT) ── */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer" onClick={() => setIsPanelOpen(false)}></div>
          
          <div className="relative w-full max-w-xl bg-white shadow-2xl rounded-3xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="h-full flex flex-col">
              <div className="px-6 py-5 border-b flex justify-between items-center bg-slate-50">
                <h3 className="text-xl font-bold text-slate-800">{editingId ? 'Edit Redeem Product' : 'Add Redeem Product'}</h3>
                <button onClick={() => setIsPanelOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"><X size={20}/></button>
              </div>
              
              <form onSubmit={handleSave} className="overflow-y-auto p-8 space-y-5 max-h-[75vh]">
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-600">Name :-</label>
                  <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="Product Name" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-600">MRP :-</label>
                  <input type="number" required value={formData.mrp} onChange={e => setFormData({...formData, mrp: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="0.00" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-600">User Type :-</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none cursor-pointer">
                    <option value="Electrician">Electrician</option>
                    <option value="Dealer">Dealer</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-600">Select Image :-</label>
                  <div className="flex items-center gap-4 p-3 border border-slate-200 rounded-xl bg-slate-50">
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="px-3 py-1.5 bg-white border border-slate-300 rounded text-[11px] font-bold shadow-sm hover:bg-slate-100 transition-all">Choose File</button>
                    <span className="text-xs text-slate-400">{formData.image ? "File selected" : "No file chosen"}</span>
                    {formData.image && <img src={formData.image} alt="prev" className="w-10 h-10 rounded object-cover ml-auto" />}
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                  </div>
                  <p className="text-[10px] text-red-500 font-bold">(Recommended resolution: 300x300, 400x400 or Square Image)</p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-600">Points :-</label>
                  <input type="number" required value={formData.points} onChange={e => setFormData({...formData, points: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="Points" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-bold text-slate-600">Description :-</label>
                  <textarea rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none resize-none" placeholder="Product details..." />
                </div>
              </form>

              <div className="p-8 border-t bg-slate-50 flex justify-center gap-4">
                <button onClick={handleSave} className="px-12 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 shadow-lg cursor-pointer transition-all active:scale-95">Save</button>
                <button type="button" onClick={() => setIsPanelOpen(false)} className="px-12 py-3 bg-rose-500 text-white rounded-xl font-bold text-sm hover:bg-rose-600 shadow-lg cursor-pointer transition-all">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── HEADER (PEHLE JAISA) ── */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 flex items-center justify-center shadow-inner">
            <GiftIcon className="text-amber-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Gift Store Inventory</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage rewards and points for SRV Electricals</p>
          </div>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-bold shadow-lg shadow-blue-200 active:scale-95 cursor-pointer">
          <Plus size={18} />
          Add New Gift
        </button>
      </div>

      {/* ── STATS (PEHLE JAISA) ── */}
      <SectionLabel>Inventory Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard icon={GiftIcon} label="Total Gifts" value={gifts.length} iconBg="bg-amber-50" iconColor="text-amber-600" borderAccent="border-t-amber-500" />
        <StatCard icon={CheckCircle2} label="Active Gifts" value={enabledCount} iconBg="bg-emerald-50" iconColor="text-emerald-600" borderAccent="border-t-emerald-500" />
        <StatCard icon={Award} label="Highest Points" value={gifts.length > 0 ? Math.max(...gifts.map(g => parseInt(g.points) || 0)).toLocaleString() : 0} iconBg="bg-purple-50" iconColor="text-purple-600" borderAccent="border-t-purple-500" />
      </div>

      {/* ── SEARCH + FILTER (PEHLE JAISA) ── */}
      <SectionLabel>All Store Items</SectionLabel>
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search gifts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 group">
            <Filter size={14} className="text-slate-400" />
            <select 
              value={filterCategory} 
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-transparent py-2.5 text-sm font-semibold text-slate-600 outline-none cursor-pointer pl-2 pr-1"
            >
              <option value="All">All Categories</option>
              <option value="Electrician">Electrician</option>
              <option value="Dealer">Dealer</option>
            </select>
          </div>

          <div className="relative">
            <button
              onClick={() => setActionOpen(!actionOpen)}
              className={`flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold transition-all cursor-pointer ${selectedIds.length > 0 ? 'text-blue-600 border-blue-200 bg-blue-50' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              Bulk Action {selectedIds.length > 0 && `(${selectedIds.length})`} <ChevronDown size={14} className={`transition-transform duration-200 ${actionOpen ? "rotate-180" : ""}`} />
            </button>
            {actionOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-100 shadow-2xl z-50 overflow-hidden py-2 animate-in fade-in zoom-in-95">
                <button onClick={handleBulkEnable} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"><CheckCircle2 size={14} className="text-emerald-500" /> Enable Selected</button>
                <button onClick={handleBulkDisable} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer transition-colors"><XCircle size={14} className="text-amber-500" /> Disable Selected</button>
                <div className="h-px bg-slate-100 mx-2 my-2" />
                <button onClick={handleBulkDelete} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 cursor-pointer transition-colors"><Trash2 size={14} /> Delete Selected</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── TABLE (PEHLE JAISA) ── */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 w-12 text-center">
                  <input type="checkbox" checked={filtered.length > 0 && selectedIds.length === filtered.length} onChange={handleSelectAll} className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                </th>
                {["ID", "Gift Detail", "Category", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((gift) => (
                <tr key={gift.id} className={`hover:bg-slate-50/80 transition-colors duration-150 group cursor-pointer ${selectedIds.includes(gift.id) ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-6 py-5 text-center">
                    <input type="checkbox" checked={selectedIds.includes(gift.id)} onChange={() => handleSelectOne(gift.id)} className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-400">#{gift.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0">
                        {gift.image ? <img src={gift.image} alt={gift.name} className="w-full h-full object-cover" /> : <ImageIcon size={20} className="text-amber-400" />}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 whitespace-nowrap">{gift.name}</p>
                        <span className="inline-flex items-center gap-1.5 mt-1.5 px-2.5 py-0.5 bg-amber-100/50 text-amber-700 border border-amber-200 rounded-lg text-[10px] font-bold uppercase">
                          <Award size={12} /> {gift.points} pts
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">{gift.type}</span>
                  </td>
                  <td className="px-6 py-5">
                    <button onClick={() => toggleStatus(gift.id)} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-bold uppercase border transition-all cursor-pointer ${gift.status === "Enable" ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100" : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"}`}>
                      {gift.status}
                    </button>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => handleOpenEdit(gift)} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"><Edit2 size={16} /></button>
                      <button onClick={() => setConfirmDeleteId(gift.id)} className="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer"><Trash2 size={16} /></button>
                      {confirmDeleteId === gift.id && <button onClick={() => deleteGift(gift.id)} className="text-rose-600 text-[10px] font-bold underline ml-2">Confirm?</button>}
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