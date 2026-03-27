/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useMemo, useRef } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Trash2, Edit2, Plus, Star, Quote,
  FileSpreadsheet, UserCircle, MessageSquare, 
  X, Save, CheckCircle2, Upload, Eye, ArrowLeft
} from "lucide-react";

// --- Types ---
interface Testimonial {
  id: string;
  name: string;
  review: string;
  rate: string;
  status: "Enable" | "Disable";
  image?: string;
}

export default function TestimonialPage() {
  // --- STATE ---
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { id: "8", name: "Sandeep Mishra", review: "Great app for dealers and electricians. Easy to check wholesale prices.", rate: "5", status: "Enable" },
    { id: "3", name: "Anil Patil", review: "Very useful app for dealers. I can view all wholesale prices.", rate: "4", status: "Enable" },
    { id: "1", name: "Himal Datta", review: "Great app for dealers and electricians.", rate: "4", status: "Enable" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"list" | "add" | "view">("list");
  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<Testimonial | null>(null);
  const [viewingItem, setViewingItem] = useState<Testimonial | null>(null);
  const [toast, setToast] = useState({ msg: "", visible: false });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState({ name: "", review: "", rate: "5", status: "Enable" as "Enable" | "Disable", image: "" });

  // --- LOGIC ---
  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: "", visible: false }), 3000);
  };

  const filteredData = useMemo(() => {
    return testimonials.filter(t => 
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      t.review.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [testimonials, searchTerm]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedId(e.target.checked ? filteredData.map(t => t.id) : []);
  };

  const handleSelectOne = (id: string) => {
    setSelectedId(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkAction = (action: "Enable" | "Disable" | "Delete") => {
    if (selectedId.length === 0) return;
    if (action === "Delete") {
      setTestimonials(prev => prev.filter(t => !selectedId.includes(t.id)));
      showToast(`${selectedId.length} Items Deleted`);
    } else {
      setTestimonials(prev => prev.map(t => selectedId.includes(t.id) ? { ...t, status: action } : t));
      showToast(`${selectedId.length} Items ${action}d`);
    }
    setSelectedId([]);
    setIsActionOpen(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingItem) {
      setTestimonials(prev => prev.map(t => t.id === editingItem.id ? { ...t, ...formData } : t));
      showToast("Testimonial Updated");
    } else {
      const newEntry = { id: Date.now().toString(), ...formData };
      setTestimonials([newEntry, ...testimonials]);
      showToast("Testimonial Added");
    }
    setViewMode("list");
  };

  // --- RENDER: ADD/EDIT FORM ---
  if (viewMode === "add") {
    return (
      <div className="min-h-screen bg-white font-sans">
        <div className="sticky top-0 z-50 bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
          <h1 className="text-xl font-semibold text-slate-800">{editingItem ? "Edit" : "Add"} Testimonial</h1>
          <button onClick={() => setViewMode("list")} className="bg-[#1e67be] text-white px-6 py-2 rounded-md flex items-center gap-2 text-sm font-bold shadow-md cursor-pointer hover:bg-blue-700 transition-all">
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        <div className="max-w-5xl mx-auto p-10">
          <form onSubmit={handleSave} className="border border-slate-200 rounded-sm p-10 shadow-sm bg-white space-y-6">
            <div className="grid grid-cols-[250px_1fr] gap-4 items-center py-4 border-b border-slate-50">
              <label className="text-sm font-medium text-slate-700">Testimonial Name :-</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-sm outline-none focus:border-blue-500" />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start py-4 border-b border-slate-50">
              <div>
                <label className="text-sm font-medium text-slate-700">Select Image :-</label>
                <p className="text-[11px] text-red-600 font-bold mt-1">(Recommended resolution: 300x300 or Square)</p>
              </div>
              <div className="flex items-center gap-2 border border-slate-300 p-1 rounded-sm bg-white">
                <input type="file" className="text-xs flex-1 cursor-pointer" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if(file) setFormData({...formData, image: URL.createObjectURL(file)});
                }}/>
                <span className="bg-slate-100 px-3 py-1 text-[10px] text-slate-500 font-bold border-l uppercase">Category Image</span>
              </div>
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-start py-4 border-b border-slate-50">
              <label className="text-sm font-medium text-slate-700">Testimonial Review :-</label>
              <textarea required rows={4} value={formData.review} onChange={e => setFormData({...formData, review: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-sm outline-none resize-none" />
            </div>

            <div className="grid grid-cols-[250px_1fr] gap-4 items-center py-4">
              <label className="text-sm font-medium text-slate-700">Testimonial Rate :-</label>
              <input type="number" min="1" max="5" value={formData.rate} onChange={e => setFormData({...formData, rate: e.target.value})} className="w-full px-4 py-2 border border-slate-300 rounded-sm outline-none" />
            </div>

            <div className="flex items-center gap-4 mt-8 pt-6 border-t">
              <button type="submit" className="px-12 py-2.5 bg-[#1e67be] text-white rounded-md text-sm font-bold shadow-md cursor-pointer hover:bg-blue-700 transition-all">Save</button>
              <button type="button" onClick={() => setViewMode("list")} className="px-12 py-2.5 bg-[#e74c3c] text-white rounded-md text-sm font-bold shadow-md cursor-pointer hover:bg-red-600 transition-all">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8 font-sans">
      {toast.visible && (
        <div className="fixed top-10 right-10 z-[100] bg-slate-900 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 animate-bounce">
          <CheckCircle2 size={18} className="text-emerald-400" /> {toast.msg}
        </div>
      )}

      {/* VIEW MODAL */}
      {viewMode === "view" && viewingItem && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="p-6 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Review Details</h3>
              <X className="cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => setViewMode("list")} />
            </div>
            <div className="p-8 text-center space-y-4">
               <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
                  {viewingItem.image ? <img src={viewingItem.image} className="w-full h-full object-cover" /> : <UserCircle size={48} className="text-slate-300" />}
               </div>
               <h2 className="text-xl font-bold">{viewingItem.name}</h2>
               <div className="flex justify-center gap-1 text-amber-500">
                  {Array.from({length: Number(viewingItem.rate)}).map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
               </div>
               <p className="text-slate-600 italic">"{viewingItem.review}"</p>
               <span className={`inline-block px-4 py-1 rounded-full text-xs font-bold ${viewingItem.status === 'Enable' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{viewingItem.status}</span>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Manage Testimonial</h1>
          <p className="text-sm text-slate-500">SRV Electricals | Social Proofing</p>
        </div>
        <button onClick={() => { setEditingItem(null); setFormData({name:"", review:"", rate:"5", status:"Enable", image:""}); setViewMode("add"); }} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 shadow-lg font-bold transition-all cursor-pointer">
          <Plus size={18} /> Add Testimonial
        </button>
      </div>

      {/* CONTROLS */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6 flex justify-between items-center shadow-sm">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="Search reviews..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" />
        </div>

        {/* --- FIXED ACTION BUTTON DESIGN --- */}
        <div className="relative">
          <button 
            onClick={() => setIsActionOpen(!isActionOpen)} 
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-bold shadow-sm cursor-pointer hover:bg-slate-50 transition-all"
          >
            Action ({selectedId.length}) <ChevronDown size={14} className="text-slate-400" />
          </button>
          {isActionOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 z-50 py-2 overflow-hidden">
              <button onClick={() => handleBulkAction("Enable")} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50 cursor-pointer transition-colors"><CheckCircle2 size={14} /> Enable Selected</button>
              <button onClick={() => handleBulkAction("Disable")} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-400 hover:bg-slate-50 cursor-pointer transition-colors"><X size={14} /> Disable Selected</button>
              <div className="h-px bg-slate-100 my-1"></div>
              <button onClick={() => handleBulkAction("Delete")} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer transition-colors"><Trash2 size={14} /> Delete Selected</button>
            </div>
          )}
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr className="text-[11px] font-bold uppercase text-slate-500 tracking-widest">
              <th className="px-6 py-5 text-center w-16">
                <input type="checkbox" checked={selectedId.length === filteredData.length && filteredData.length > 0} onChange={handleSelectAll} className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
              </th>
              <th className="px-6 py-5">Id</th>
              <th className="px-6 py-5">User Details</th>
              <th className="px-6 py-5">Content</th>
              <th className="px-6 py-5 text-center">Rate</th>
              <th className="px-6 py-5 text-center">Status</th>
              <th className="px-6 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filteredData.map((item) => (
              <tr key={item.id} className={`group transition-all ${selectedId.includes(item.id) ? 'bg-blue-50/50' : 'hover:bg-slate-50/80'}`}>
                <td className="px-6 py-4 text-center">
                  <input type="checkbox" checked={selectedId.includes(item.id)} onChange={() => handleSelectOne(item.id)} className="w-4 h-4 rounded accent-blue-600 cursor-pointer" />
                </td>
                <td className="px-6 py-4 text-xs font-bold text-slate-400">#{item.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                      {item.image ? <img src={item.image} className="w-full h-full object-cover" /> : <UserCircle className="text-slate-300" size={24} />}
                    </div>
                    <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-xs text-slate-500 line-clamp-1 max-w-xs">"{item.review}"</p>
                </td>
                <td className="px-6 py-4 text-center">
                   <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-600 rounded-lg border border-amber-100 text-[10px] font-black">
                     <Star size={10} fill="currentColor" /> {item.rate}
                   </div>
                </td>
                <td className="px-6 py-4 text-center">
                   <button onClick={() => {
                     setTestimonials(prev => prev.map(t => t.id === item.id ? { ...t, status: t.status === "Enable" ? "Disable" : "Enable" } : t));
                     showToast("Status Changed");
                   }} className={`text-[10px] font-black uppercase px-3 py-1 rounded-lg border cursor-pointer transition-all ${item.status === 'Enable' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-100 hover:bg-slate-100'}`}>
                     {item.status}
                   </button>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => { setViewingItem(item); setViewMode("view"); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"><Eye size={16} /></button>
                    <button onClick={() => { setEditingItem(item); setFormData({name:item.name, review:item.review, rate:item.rate, status:item.status, image:item.image || ""}); setViewMode("add"); }} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"><Edit2 size={16} /></button>
                    <button onClick={() => { setTestimonials(prev => prev.filter(t => t.id !== item.id)); showToast("Deleted"); }} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all cursor-pointer"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
    </div>
  );
}