"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Trash2, Edit2, Plus, Image as ImageIcon,
  FileSpreadsheet, Tag, AlertCircle, Eye
} from "lucide-react";

export default function OfferPage() {
  const [isActionOpen, setIsActionOpen] = useState(false);

  // Data strictly based on SRV Electricals "Manage Offer" screenshot
  const [offers] = useState([
    { id: "5", offerName: "Diwali Offer", offerImage: "/diwali-banner.jpg", status: "Disable" },
    { id: "4", offerName: "New Year Sale", offerImage: "/new-year.jpg", status: "Enable" },
  ]);

  const exportOffers = () => {
    const worksheet = XLSX.utils.json_to_sheet(offers);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Offers");
    XLSX.writeFile(workbook, "SRV_Offers_Report.xlsx");
    setIsActionOpen(false);
  };

  return (
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      
      {/* 1. TOP HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#1B254B]">Manage Offer</h1>
          <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#4318FF]"></span>
            SRV Electricals <span className="text-slate-300">|</span> Promotional Campaigns
          </p>
        </div>
        <button className="flex items-center gap-2 px-7 py-4 bg-[#4318FF] text-white rounded-[20px] font-bold text-sm shadow-xl shadow-[#4318FF]/20 hover:bg-[#3311CC] hover:scale-105 transition-all w-fit">
          <Plus size={20} /> Add New Offer
        </button>
      </div>

      {/* 2. SEARCH & ACTIONS BAR */}
      <div className="bg-white/70 backdrop-blur-md p-5 rounded-[28px] mb-8 shadow-sm border border-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4318FF] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by offer name..." 
            className="w-full pl-12 pr-4 py-3.5 bg-[#F4F7FE]/50 border-none rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#4318FF]/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 mr-2">
            <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF] cursor-pointer" />
            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Select All</span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-[#1B254B] text-white rounded-xl text-xs font-bold shadow-lg hover:bg-black transition-all"
            >
              Action <ChevronDown size={14} />
            </button>
            {isActionOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-[20px] shadow-2xl border border-slate-100 z-50 py-2 animate-in fade-in slide-in-from-top-2">
                <button onClick={exportOffers} className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-[#4318FF] transition-all">
                  <FileSpreadsheet size={16} /> Export to Excel
                </button>
                <div className="h-[1px] bg-slate-50 my-1 mx-2"></div>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all">
                  <Trash2 size={16} /> Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. OFFERS TABLE */}
      <div className="bg-white rounded-[35px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="p-6 w-12 text-center"></th>
                {/* HEADERS ARE BOLD & DARK */}
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B]">ID</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B]">Offer Name</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] text-center">Preview Image</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] text-center">Current Status</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {offers.map((offer) => (
                <tr key={offer.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
                  <td className="p-6 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF] cursor-pointer" />
                  </td>
                  
                  <td className="p-6">
                    <span className="text-xs font-black text-slate-400 ">{offer.id.padStart(2, '0')}</span>
                  </td>
                  
                  <td className="p-6">
                    <div className="font- text-[15px] text-[#1B254B] flex items-center gap-3 group-hover:text-[#4318FF] transition-colors">
                       <div className="p-2.5 bg-amber-50 text-amber-500 rounded-xl group-hover:bg-[#4318FF] group-hover:text-white transition-all">
                         <Tag size={16} />
                       </div>
                       {offer.offerName}
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="flex justify-center">
                      <div className="relative w-32 h-16 bg-slate-100 rounded-2xl overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-all">
                         <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-500 to-[#4318FF] text-white">
                            <ImageIcon size={20} className="opacity-40" />
                         </div>
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 flex items-center justify-center transition-all">
                            <Eye size={16} className="text-white opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all" />
                         </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-6 text-center">
                    <button className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm transition-all ${
                      offer.status === 'Disable' 
                      ? 'bg-[#EE5D50] text-white shadow-rose-100 hover:bg-rose-600' 
                      : 'bg-[#05CD99] text-white shadow-emerald-100 hover:bg-emerald-600'
                    }`}>
                      {offer.status}
                    </button>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                       <button title="Edit Offer" className="h-10 w-10 flex items-center justify-center bg-white border border-slate-100 text-amber-500 rounded-xl shadow-sm hover:bg-amber-500 hover:text-white hover:scale-110 transition-all duration-300">
                        <Edit2 size={16} />
                      </button>
                      <button title="Delete Offer" className="h-10 w-10 flex items-center justify-center bg-white border border-slate-100 text-rose-500 rounded-xl shadow-sm hover:bg-rose-500 hover:text-white hover:scale-110 transition-all duration-300">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION FOOTER */}
        <div className="p-8 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
             <AlertCircle size={14} className="text-[#4318FF]" /> Showing {offers.length} Promotional Offers
           </p>
           <div className="flex items-center gap-2">
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-[#4318FF] transition-all"><ChevronLeft size={18}/></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm shadow-xl shadow-[#4318FF]/20">1</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 transition-all"><ChevronRight size={18}/></button>
           </div>
        </div>
      </div>

      {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
    </div>
  );
}