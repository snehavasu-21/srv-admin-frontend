"use client";

import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Trash2, Edit2, Plus, Image as ImageIcon,
  FileSpreadsheet, Tag, AlertCircle, Eye, X, Save, CheckCircle2
} from "lucide-react";

// --- Types ---
interface Offer {
  id: string;
  offerName: string;
  offerImage: string;
  status: "Enable" | "Disable";
}

export default function OfferPage() {
  // 1. STATE MANAGEMENT
  const [offers, setOffers] = useState<Offer[]>([
    { id: "5", offerName: "Diwali Offer", offerImage: "/diwali-banner.jpg", status: "Disable" },
    { id: "4", offerName: "New Year Sale", offerImage: "/new-year.jpg", status: "Enable" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingOffer, setEditingOffer] = useState<Offer | null>(null);
  const [toast, setToast] = useState<{ msg: string; visible: boolean }>({ msg: "", visible: false });

  // Form State
  const [formData, setFormData] = useState({
    offerName: "",
    status: "Enable" as "Enable" | "Disable"
  });

  // 2. LOGIC HANDLERS
  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: "", visible: false }), 3000);
  };

  const filteredOffers = useMemo(() => {
    return offers.filter(o => o.offerName.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [offers, searchTerm]);

  const handleOpenAdd = () => {
    setEditingOffer(null);
    setFormData({ offerName: "", status: "Enable" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (offer: Offer) => {
    setEditingOffer(offer);
    setFormData({ offerName: offer.offerName, status: offer.status });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOffer) {
      setOffers(prev => prev.map(o => o.id === editingOffer.id ? { ...o, ...formData } : o));
      showToast("Offer updated successfully");
    } else {
      const newOffer: Offer = {
        id: (Math.max(...offers.map(o => parseInt(o.id)), 0) + 1).toString(),
        offerImage: "/placeholder.jpg",
        ...formData
      };
      setOffers([newOffer, ...offers]);
      showToast("New offer added");
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this offer?")) {
      setOffers(prev => prev.filter(o => o.id !== id));
      showToast("Offer removed");
    }
  };

  const toggleStatus = (id: string) => {
    setOffers(prev => prev.map(o => 
      o.id === id ? { ...o, status: o.status === "Enable" ? "Disable" : "Enable" } : o
    ));
  };

  const exportOffers = () => {
    const worksheet = XLSX.utils.json_to_sheet(offers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Offers");
    XLSX.writeFile(workbook, "SRV_Offers_Report.xlsx");
    setIsActionOpen(false);
    showToast("Exporting to Excel...");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900 relative">
      
      {/* --- TOAST NOTIFICATION --- */}
      {toast.visible && (
        <div className="fixed bottom-10 right-10 z-[110] flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl animate-bounce">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">{toast.msg}</span>
        </div>
      )}

      {/* --- MODAL (ADD/EDIT) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <form onSubmit={handleSave} className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">{editingOffer ? 'Edit' : 'Add'} Offer</h3>
              <X className="cursor-pointer text-slate-400 hover:text-slate-600" onClick={() => setIsModalOpen(false)} />
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Offer Name</label>
                <input 
                  required 
                  value={formData.offerName} 
                  onChange={e => setFormData({...formData, offerName: e.target.value})} 
                  className="w-full mt-1 px-4 py-2 bg-slate-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20" 
                  placeholder="e.g. Festival Bonanza"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Status</label>
                <select 
                  value={formData.status} 
                  onChange={e => setFormData({...formData, status: e.target.value as any})} 
                  className="w-full mt-1 px-4 py-2 bg-slate-50 border rounded-xl outline-none"
                >
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </select>
              </div>
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3">
                <ImageIcon className="text-blue-500 mt-0.5" size={18} />
                <p className="text-[11px] text-blue-700 leading-relaxed">
                  Note: In this demo, a placeholder image will be assigned. Image upload functionality requires a backend or cloud storage integration.
                </p>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-500 text-sm font-bold">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
                <Save size={16}/> Save Offer
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- MAIN UI --- */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Offer</h1>
          <p className="text-sm text-slate-500 mt-0.5">SRV Electricals | Promotional Campaigns</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-sm"
        >
          <Plus size={16} /> Add Offer
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by offer name..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative">
            <button 
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all"
            >
              Action <ChevronDown size={14} />
            </button>
            {isActionOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2">
                <button onClick={exportOffers} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  <FileSpreadsheet size={14} /> Export Offers
                </button>
                <button 
                  onClick={() => { setIsActionOpen(false); showToast("Selection logic required"); }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                >
                  <Trash2 size={14} /> Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-4 w-12 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded accent-blue-600" />
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Id</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Offer Name</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Offer Image</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Status</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {filteredOffers.map((offer) => (
                <tr key={offer.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-5 py-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded accent-blue-600" />
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-slate-400">#{offer.id}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 flex items-center justify-center bg-amber-50 text-amber-600 rounded-lg">
                         <Tag size={14} />
                       </div>
                       <span className="font-semibold text-sm text-slate-800">{offer.offerName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-center">
                      <div className="relative w-24 h-12 bg-slate-100 rounded-lg overflow-hidden border border-slate-200 group-hover:border-blue-200 transition-all">
                         <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-400 to-rose-500 text-white opacity-80">
                            <ImageIcon size={16} className="text-white" />
                         </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button 
                      onClick={() => toggleStatus(offer.id)}
                      className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase rounded-lg border shadow-sm transition-all ${
                        offer.status === 'Disable' 
                        ? 'bg-rose-50 text-rose-700 border-rose-100 hover:bg-rose-100' 
                        : 'bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100'
                      }`}
                    >
                      {offer.status}
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button 
                        onClick={() => handleOpenEdit(offer)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        onClick={() => handleDelete(offer.id)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredOffers.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-slate-400 text-sm">
                    No offers found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center bg-white">
           <p className="text-xs font-medium text-slate-400 flex items-center gap-2">
             <AlertCircle size={14} /> {filteredOffers.length} {filteredOffers.length === 1 ? 'Offer' : 'Offers'} Found
           </p>
           <div className="flex items-center gap-1.5">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 opacity-50 cursor-not-allowed">
               <ChevronLeft size={14}/>
             </button>
             <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 opacity-50 cursor-not-allowed">
               <ChevronRight size={14}/>
             </button>
           </div>
        </div>
      </div>

      {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
    </div>
  );
}