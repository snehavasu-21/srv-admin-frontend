

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
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900">
      
      {/* 1. TOP HEADER SECTION */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Offer</h1>
          <p className="text-sm text-slate-500 mt-0.5">SRV Electricals | Promotional Campaigns</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm">
          <Plus size={16} /> Add Offer
        </button>
      </div>

      {/* 2. SEARCH & ACTIONS BAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by offer name..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 mr-2">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
            <span className="text-xs font-semibold text-slate-500">Select All</span>
          </div>
          
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
                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
                  <Trash2 size={14} /> Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. OFFERS TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-4 w-12 text-center"></th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Id</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Offer Name</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Offer Image</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Status</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {offers.map((offer) => (
                <tr key={offer.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-5 py-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
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
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all">
                            <Eye size={14} className="text-white opacity-0 group-hover:opacity-100" />
                         </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase rounded-lg border shadow-sm transition-all ${
                      offer.status === 'Disable' 
                      ? 'bg-rose-50 text-rose-700 border-rose-100' 
                      : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                    }`}>
                      {offer.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button title="Edit Offer" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                        <Edit2 size={14} />
                      </button>
                      <button title="Delete Offer" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION FOOTER */}
        <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center bg-white">
           <p className="text-xs font-medium text-slate-400 flex items-center gap-2">
             <AlertCircle size={14} /> {offers.length} Offer Found
           </p>
           <div className="flex items-center gap-1.5">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
               <ChevronLeft size={14}/>
             </button>
             <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
               <ChevronRight size={14}/>
             </button>
           </div>
        </div>
      </div>

      {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
    </div>
  );
}