/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useRef } from 'react';
import { 
  Search, ChevronDown, Trash2, Edit2, Plus, Layout, 
  ImageIcon, AlertCircle, X, Save, CheckCircle2, Upload, FileSpreadsheet
} from "lucide-react";

interface Banner {
  id: string;
  name: string;
  status: "Enable" | "Disable";
  image?: string;
}

export default function BannerPage() {
  const [banners, setBanners] = useState<Banner[]>([
    { id: "18", name: "Mcb Distribution Boxes", status: "Enable" },
    { id: "17", name: "Led Flood Lights", status: "Enable" },
    { id: "15", name: "Automatic Change Over Switch", status: "Enable" },
    { id: "14", name: "Appliances", status: "Enable" },
    { id: "13", name: "Change Over Switch", status: "Enable" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [modalType, setModalType] = useState<"form" | "delete" | null>(null);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({ name: "", status: "Enable" as "Enable" | "Disable", image: "" });
  const [pendingDeleteId, setPendingDeleteId] = useState<string | "bulk" | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  const triggerNotification = () => {
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const filteredBanners = useMemo(() => {
    return banners.filter(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [banners, searchTerm]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBanner) {
      setBanners(prev => prev.map(b => b.id === editingBanner.id ? { ...b, ...formData } : b));
    } else {
      const newId = banners.length > 0 ? (Math.max(...banners.map(b => parseInt(b.id))) + 1).toString() : "1";
      setBanners([{ id: newId, ...formData }, ...banners]);
    }
    setModalType(null);
    triggerNotification();
  };

  const handleBulkAction = (action: "Enable" | "Disable" | "Delete") => {
    if (selectedIds.length === 0) return;
    if (action === "Delete") {
      setBanners(prev => prev.filter(b => !selectedIds.includes(b.id)));
    } else {
      setBanners(prev => prev.map(b => selectedIds.includes(b.id) ? { ...b, status: action } : b));
    }
    setSelectedIds([]);
    setIsActionOpen(false);
    triggerNotification();
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900 relative overflow-x-hidden">
      
      {/* ── NOTIFICATION ── */}
      {showNotification && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-xl shadow-2xl animate-in slide-in-from-top-5">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-bold">Image saved successfully!</span>
        </div>
      )}

      {/* ── MODALS ── */}
      {modalType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
            {modalType === "form" && (
              <form onSubmit={handleSave}>
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <h3 className="font-bold text-slate-800">{editingBanner ? 'Edit Banner' : 'Add Banner'}</h3>
                  <button type="button" onClick={() => setModalType(null)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 cursor-pointer"><X size={18} /></button>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Banner Image</label>
                    <div onClick={() => fileInputRef.current?.click()} className="mt-1 h-32 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center bg-slate-50 cursor-pointer overflow-hidden">
                      {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <div className="text-center"><Upload size={20} className="mx-auto text-slate-400"/><span className="text-[10px] text-slate-400 block mt-1">Click to Upload</span></div>}
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Banner Name</label>
                    <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Status</label>
                    <select value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value as any})} className="w-full mt-1 px-4 py-2 border rounded-lg outline-none cursor-pointer">
                      <option value="Enable">Enable</option>
                      <option value="Disable">Disable</option>
                    </select>
                  </div>
                </div>
                <div className="px-6 py-4 bg-slate-50 border-t flex justify-end gap-3">
                  <button type="button" onClick={() => setModalType(null)} className="px-4 py-2 text-sm font-semibold text-slate-500 cursor-pointer">Cancel</button>
                  <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold flex items-center gap-2 cursor-pointer shadow-md"><Save size={14}/> Save</button>
                </div>
              </form>
            )}

            {modalType === "delete" && (
              <div className="p-6 text-center">
                <AlertCircle size={32} className="mx-auto text-rose-600 mb-4" />
                <h3 className="text-lg font-bold text-slate-800">Are you sure?</h3>
                <p className="text-sm text-slate-500 mt-2">This action will permanently delete the selected banner.</p>
                <div className="flex gap-3 mt-8">
                  <button onClick={() => setModalType(null)} className="flex-1 px-4 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold cursor-pointer">Cancel</button>
                  <button onClick={() => { 
                    if(pendingDeleteId === "bulk") setBanners(prev => prev.filter(b => !selectedIds.includes(b.id)));
                    else setBanners(prev => prev.filter(b => b.id !== pendingDeleteId));
                    setSelectedIds([]); setModalType(null); triggerNotification();
                  }} className="flex-1 px-4 py-2.5 bg-rose-600 text-white rounded-xl font-bold cursor-pointer shadow-lg shadow-rose-200">Delete</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 1. HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Banner</h1>
          <p className="text-sm text-slate-500 mt-0.5">SRV Electricals | Homepage Hero Visuals</p>
        </div>
        <button onClick={() => { setEditingBanner(null); setFormData({name:"", status:"Enable", image:""}); setModalType("form"); }} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-sm cursor-pointer">
          <Plus size={16} /> Add Banner
        </button>
      </div>

      {/* 2. SEARCH & ACTION BAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="Search banner name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none" />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2">
            <input type="checkbox" checked={selectedIds.length === filteredBanners.length && filteredBanners.length > 0} onChange={() => setSelectedIds(selectedIds.length === filteredBanners.length ? [] : filteredBanners.map(b => b.id))} className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
            <span className="text-xs font-semibold text-slate-500 cursor-pointer" onClick={() => setSelectedIds(selectedIds.length === filteredBanners.length ? [] : filteredBanners.map(b => b.id))}>Select All</span>
          </div>
          <div className="relative">
            <button onClick={() => setIsActionOpen(!isActionOpen)} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all cursor-pointer">
              Action ({selectedIds.length}) <ChevronDown size={14} />
            </button>
            {isActionOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2">
                <button onClick={() => handleBulkAction("Enable")} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-emerald-600 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50"><CheckCircle2 size={14} /> Enable Selected</button>
                <button onClick={() => handleBulkAction("Disable")} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-50 cursor-pointer transition-colors border-b border-slate-50"><X size={14} /> Disable Selected</button>
                <button onClick={() => { setPendingDeleteId("bulk"); setModalType("delete"); setIsActionOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-slate-50 cursor-pointer transition-colors"><Trash2 size={14} /> Delete Selected</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-4 w-12"></th>
                <th className="px-5 py-4">Id</th>
                <th className="px-5 py-4">Banner Name</th>
                <th className="px-5 py-4 text-center">Status</th>
                <th className="px-5 py-4 text-right pr-8">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredBanners.map((banner) => (
                <tr key={banner.id} className="group hover:bg-slate-50/80 transition-all">
                  <td className="px-5 py-4 text-center">
                    <input type="checkbox" checked={selectedIds.includes(banner.id)} onChange={() => setSelectedIds(prev => prev.includes(banner.id) ? prev.filter(i => i !== banner.id) : [...prev, banner.id])} className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">#{banner.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg overflow-hidden border">
                         {banner.image ? <img src={banner.image} className="w-full h-full object-cover" /> : <Layout size={14} />}
                       </div>
                       <span className="font-semibold text-sm text-slate-800">{banner.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`px-3 py-1 text-[10px] font-bold uppercase border rounded-lg cursor-default ${banner.status === "Enable" ? "bg-emerald-50 text-emerald-700 border-emerald-100" : "bg-slate-50 text-slate-500 border-slate-200"}`}>
                      {banner.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 pr-8 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => { setEditingBanner(banner); setFormData({name:banner.name, status:banner.status, image:banner.image || ""}); setModalType("form"); }} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"><Edit2 size={14} /></button>
                      <button onClick={() => { setPendingDeleteId(banner.id); setModalType("delete"); }} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all cursor-pointer"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
    </div>
  );
}