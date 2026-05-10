/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useState, useMemo, useRef } from 'react';
import { 
  Search, Trash2, Edit2, Plus, 
  Image as ImageIcon, X, 
  Save, CheckCircle2, Upload, ChevronDown, Eye, EyeOff
} from "lucide-react";

interface Offer {
  id: string;
  offerName: string;
  offerImage: string;
  status: "Enable" | "Disable";
}

export default function OfferPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const tableFileInputRef = useRef<HTMLInputElement>(null);
  
  // --- STATE ---
  const [offers, setOffers] = useState<Offer[]>([
    { id: "5", offerName: "Diwali Offer", offerImage: "", status: "Disable" },
    { id: "4", offerName: "New Year Sale", offerImage: "", status: "Enable" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [toast, setToast] = useState({ msg: "", visible: false });
  const [activeTableId, setActiveTableId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    offerName: "",
    offerImage: "",
    status: "Enable" as "Enable" | "Disable"
  });

  // --- HANDLERS ---
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isTable: boolean = false) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      if (isTable && activeTableId) {
        setOffers(prev => prev.map(o => o.id === activeTableId ? { ...o, offerImage: imageUrl } : o));
        showToast("Image updated");
      } else {
        setFormData(prev => ({ ...prev, offerImage: imageUrl }));
      }
      e.target.value = ""; 
    }
  };

  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: "", visible: false }), 3000);
  };

  const filteredOffers = useMemo(() => {
    return offers.filter(o => o.offerName.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [offers, searchTerm]);

  // Selection Logic
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredOffers.map(o => o.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  // Bulk Actions Logic
  const bulkStatusUpdate = (status: "Enable" | "Disable") => {
    setOffers(prev => prev.map(o => selectedIds.includes(o.id) ? { ...o, status } : o));
    showToast(`Offers ${status.toLowerCase()}d`);
    setIsActionOpen(false);
  };

  const bulkDelete = () => {
    setOffers(prev => prev.filter(o => !selectedIds.includes(o.id)));
    setSelectedIds([]);
    showToast("Selected offers deleted");
    setIsActionOpen(false);
  };

  const handleOpenAdd = () => {
    setEditingOffer(null);
    setFormData({ offerName: "", offerImage: "", status: "Enable" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({ offerName: offer.offerName, offerImage: offer.offerImage, status: offer.status });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOffer) {
      setOffers(prev => prev.map(o => o.id === editingOffer.id ? { ...o, ...formData } : o));
      showToast("Offer updated");
    } else {
      const newId = (Math.max(...offers.map(o => parseInt(o.id)), 0) + 1).toString();
      setOffers([{ id: newId, ...formData }, ...offers]);
      showToast("New offer added");
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900 relative">
      
      <input type="file" ref={fileInputRef} onChange={(e) => handleImageUpload(e)} accept="image/*" className="hidden" />
      <input type="file" ref={tableFileInputRef} onChange={(e) => handleImageUpload(e, true)} accept="image/*" className="hidden" />

      {/* TOAST Notification */}
      {toast.visible && (
        <div className="fixed top-10 left-1/2 -translate-x-1/2 z-[120] flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl animate-in slide-in-from-top-4">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-bold">{toast.msg}</span>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <form onSubmit={handleSave} className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">{editingOffer ? 'Edit' : 'Add'} Offer</h3>
              <X className="cursor-pointer text-slate-400 hover:text-rose-500 transition-colors" onClick={() => setIsModalOpen(false)} />
            </div>
            
            <div className="p-6 space-y-5">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Offer Banner</label>
                <div 
                  onClick={() => fileInputRef.current?.click()} 
                  className="group relative w-full h-44 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all overflow-hidden"
                >
                  {formData.offerImage ? (
                    <>
                      <img src={formData.offerImage} alt="Preview" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <Upload className="text-white" size={24} />
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <ImageIcon size={24} className="text-slate-300 mx-auto mb-2" />
                      <p className="text-xs font-bold text-slate-500">Upload Banner</p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Offer Name</label>
                <input required value={formData.offerName} onChange={e => setFormData({...formData, offerName: e.target.value})} className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none" />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </select>
              </div>
            </div>

            <div className="p-6 bg-slate-50 flex justify-end gap-3">
              <button type="submit" className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold cursor-pointer hover:bg-blue-700">
                <Save size={16} className="inline mr-2"/> Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TOP HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Manage Offers</h1>
        <button onClick={handleOpenAdd} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 transition-all cursor-pointer">
          <Plus size={18} /> Add New Offer
        </button>
      </div>

      {/* SEARCH & BULK ACTIONS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by offer name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/10"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          {/* Select All Checkbox */}
          <div className="flex items-center gap-2 px-2">
            <input 
              type="checkbox" 
              checked={filteredOffers.length > 0 && selectedIds.length === filteredOffers.length}
              onChange={handleSelectAll}
              className="w-4 h-4 rounded accent-blue-600 cursor-pointer" 
            />
            <span className="text-xs font-bold text-slate-500">Select All</span>
          </div>

          {/* Action Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all cursor-pointer"
            >
              Action <ChevronDown size={14} className={`transition-transform ${isActionOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {isActionOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 overflow-hidden">
                  <button 
                    disabled={selectedIds.length === 0}
                    onClick={() => bulkStatusUpdate("Enable")}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-emerald-600 hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Eye size={14} /> Enable Selected
                  </button>
                  <button 
                    disabled={selectedIds.length === 0}
                    onClick={() => bulkStatusUpdate("Disable")}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <EyeOff size={14} /> Disable Selected
                  </button>
                  <div className="h-[1px] bg-slate-100 my-1"></div>
                  <button 
                    disabled={selectedIds.length === 0}
                    onClick={bulkDelete}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <Trash2 size={14} /> Delete Selected
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 w-12 text-center"></th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Id</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">Offer Name</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Preview & Change</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredOffers.map((offer) => (
                <tr key={offer.id} className={`hover:bg-slate-50/50 transition-all cursor-pointer ${selectedIds.includes(offer.id) ? 'bg-blue-50/40' : ''}`} onClick={() => handleSelectOne(offer.id)}>
                  <td className="px-6 py-4 text-center">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(offer.id)}
                      onChange={(e) => { e.stopPropagation(); handleSelectOne(offer.id); }}
                      className="w-4 h-4 rounded accent-blue-600 cursor-pointer" 
                    />
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-400">#{offer.id}</td>
                  <td className="px-6 py-4 font-bold text-sm text-slate-700">{offer.offerName}</td>
                  
                  <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-24 h-14 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 flex items-center justify-center">
                        {offer.offerImage ? (
                          <img src={offer.offerImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon size={16} className="text-slate-300" />
                        )}
                      </div>
                      <button 
                        onClick={() => {
                          setActiveTableId(offer.id);
                          tableFileInputRef.current?.click();
                        }}
                        className="text-[9px] flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 transition-colors bg-blue-50 px-2 py-1 rounded cursor-pointer"
                      >
                        <Upload size={10} /> Choose File
                      </button>
                    </div>
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 text-[10px] font-black rounded-lg ${offer.status === 'Enable' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'}`}>
                      {offer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                      <button onClick={() => handleOpenEdit(offer)} className="p-2 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"><Edit2 size={14} /></button>
                      <button onClick={() => setOffers(prev => prev.filter(o => o.id !== offer.id))} className="p-2 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"><Trash2 size={14} /></button>
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