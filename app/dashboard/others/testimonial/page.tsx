"use client";

import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Trash2, Edit2, Plus, Star, Quote,
  FileSpreadsheet, UserCircle, MessageSquare, 
  X, Save, CheckCircle2, AlertTriangle
} from "lucide-react";

// --- Types ---
interface Testimonial {
  id: string;
  name: string;
  review: string;
  rate: string;
  status: "Enable" | "Disable";
}

export default function TestimonialPage() {
  // 1. STATE
  const [testimonials, setTestimonials] = useState<Testimonial[]>([
    { id: "8", name: "Sandeep Mishra", review: "Great app for dealers and electricians. Easy to check wholesale prices and cashback in one place.", rate: "5", status: "Enable" },
    { id: "3", name: "Anil Patil", review: "Very useful app for dealers. I can view all wholesale prices, ongoing offers, and cashback details.", rate: "4", status: "Enable" },
    { id: "1", name: "Himal Datta", review: "Great app for dealers and electricians. Easy to check wholesale prices and cashback in one place.", rate: "4", status: "Enable" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: "", visible: false });

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    review: "",
    rate: "5",
    status: "Enable" as "Enable" | "Disable"
  });

  // 2. LOGIC
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

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({ name: "", review: "", rate: "5", status: "Enable" });
    setIsPanelOpen(true);
  };

  const handleOpenEdit = (item: Testimonial) => {
    setEditingId(item.id);
    setFormData({ name: item.name, review: item.review, rate: item.rate, status: item.status });
    setIsPanelOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setTestimonials(prev => prev.map(t => t.id === editingId ? { ...t, ...formData } : t));
      showToast("Testimonial updated");
    } else {
      const newEntry: Testimonial = {
        id: (Math.max(...testimonials.map(t => parseInt(t.id)), 0) + 1).toString(),
        ...formData
      };
      setTestimonials([newEntry, ...testimonials]);
      showToast("Testimonial added");
    }
    setIsPanelOpen(false);
  };

  const deleteItem = (id: string) => {
    setTestimonials(prev => prev.filter(t => t.id !== id));
    setConfirmDeleteId(null);
    showToast("Testimonial deleted");
  };

  const toggleStatus = (id: string) => {
    setTestimonials(prev => prev.map(t => 
      t.id === id ? { ...t, status: t.status === "Enable" ? "Disable" : "Enable" } : t
    ));
    showToast("Status changed");
  };

  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(testimonials);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Testimonials");
    XLSX.writeFile(workbook, "SRV_Testimonials.xlsx");
    setIsActionOpen(false);
    showToast("Report Downloaded");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900 relative overflow-hidden">
      
      {/* --- TOAST --- */}
      {toast.visible && (
        <div className="fixed bottom-10 right-10 z-[110] flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl animate-in fade-in slide-in-from-right-10">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">{toast.msg}</span>
        </div>
      )}

      {/* --- SIDE PANEL (ADD/EDIT) --- */}
      <div className={`fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[100] transform transition-transform duration-300 ease-in-out ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col">
          <div className="px-6 py-6 border-b flex justify-between items-center bg-slate-50">
            <div>
              <h3 className="text-lg font-bold text-slate-800">{editingId ? 'Edit' : 'Create'} Testimonial</h3>
              <p className="text-xs text-slate-500">Enter user details and review</p>
            </div>
            <button onClick={() => setIsPanelOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20}/></button>
          </div>
          
          <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">User Name</label>
              <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none" placeholder="Enter name" />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rating (1-5)</label>
              <select value={formData.rate} onChange={e => setFormData({...formData, rate: e.target.value})} className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none">
                {[5, 4, 3, 2, 1].map(num => <option key={num} value={num}>{num} Stars</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Review Message</label>
              <textarea required rows={4} value={formData.review} onChange={e => setFormData({...formData, review: e.target.value})} className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 outline-none resize-none" placeholder="Write the customer review here..." />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Display Status</label>
              <div className="flex gap-3 mt-1.5">
                {["Enable", "Disable"].map((s) => (
                  <button key={s} type="button" onClick={() => setFormData({...formData, status: s as any})} className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${formData.status === s ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500'}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </form>

          <div className="p-6 border-t bg-slate-50 flex gap-3">
            <button type="button" onClick={() => setIsPanelOpen(false)} className="flex-1 py-3 text-slate-600 font-bold text-sm">Cancel</button>
            <button onClick={handleSave} className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-200"><Save size={18}/> Save Changes</button>
          </div>
        </div>
      </div>

      {/* --- HEADER --- */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Testimonial</h1>
          <p className="text-sm text-slate-500 mt-0.5">SRV Electricals | Customer Social Proof</p>
        </div>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-md">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {/* --- CONTROLS --- */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or review..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative">
            <button 
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100"
            >
              Action <ChevronDown size={14} />
            </button>
            {isActionOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2 animate-in fade-in zoom-in-95">
                <button onClick={exportExcel} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  <FileSpreadsheet size={14} /> Export Excel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- DATA TABLE --- */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4 w-12 text-center"><input type="checkbox" className="w-4 h-4 rounded accent-blue-600" /></th>
                <th className="px-5 py-4">Id</th>
                <th className="px-5 py-4">User Info</th>
                <th className="px-5 py-4">Review Content</th>
                <th className="px-5 py-4 text-center">Rate</th>
                <th className="px-5 py-4 text-center">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-5 py-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded accent-blue-600" />
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">#{item.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-200 group-hover:border-blue-200 transition-all">
                        <UserCircle size={20} />
                      </div>
                      <span className="font-semibold text-sm text-slate-800">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="relative max-w-[320px]">
                      <Quote className="absolute -left-2 -top-1.5 text-blue-500/10" size={24} />
                      <p className="text-xs leading-relaxed text-slate-500 italic line-clamp-2 pl-4">{item.review}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg">
                      <Star size={10} fill="currentColor" />
                      <span className="text-xs font-bold">{item.rate}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button 
                      onClick={() => toggleStatus(item.id)}
                      className={`px-3 py-1 text-[10px] font-bold uppercase border rounded-lg transition-colors ${item.status === 'Enable' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                      {item.status}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {confirmDeleteId === item.id ? (
                        <div className="flex items-center bg-rose-50 border border-rose-100 rounded-lg overflow-hidden animate-in fade-in slide-in-from-right-2">
                           <button onClick={() => deleteItem(item.id)} className="px-3 py-1.5 text-[10px] font-bold text-rose-600 hover:bg-rose-100 border-r border-rose-100">Delete</button>
                           <button onClick={() => setConfirmDeleteId(null)} className="px-3 py-1.5 text-[10px] font-bold text-slate-400 hover:bg-white">No</button>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => handleOpenEdit(item)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all"><Edit2 size={14} /></button>
                          <button onClick={() => setConfirmDeleteId(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"><Trash2 size={14} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center bg-white">
           <p className="text-xs font-medium text-slate-400 flex items-center gap-2">
             <MessageSquare size={14} /> {filteredData.length} Reviews Found
           </p>
           <div className="flex items-center gap-1.5">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 opacity-50"><ChevronLeft size={14}/></button>
             <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 opacity-50"><ChevronRight size={14}/></button>
           </div>
        </div>
      </div>

      {/* Background Overlay for Panel */}
      {isPanelOpen && <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[90]" onClick={() => setIsPanelOpen(false)}></div>}
    </div>
  );
}