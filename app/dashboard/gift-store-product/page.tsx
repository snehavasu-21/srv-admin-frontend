"use client";

import React, { useState } from 'react';
import { 
  Search, Plus, Edit2, Trash2, 
  ChevronLeft, ChevronRight, Filter, 
  Image as ImageIcon, Award, MoreHorizontal,
  CheckCircle2, XCircle, ChevronDown, Download
} from "lucide-react";

// Add this to your globals.css or ensure the Inter font is loaded in your layout
// @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

export default function GiftStorePremium() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  
  const [gifts] = useState([
    { id: "17", type: "Electrician", name: "Electrician Bag", points: "500", status: "Enable" },
    { id: "16", type: "Electrician", name: "Drill Machine", points: "1200", status: "Enable" },
    { id: "15", type: "Electrician", name: "Electric Water Geyser", points: "3500", status: "Enable" },
    { id: "14", type: "Electrician", name: "BLDS Ceiling Fan (5 Blade)", points: "2800", status: "Enable" },
    { id: "13", type: "Electrician", name: "BLDS Ceiling Fan (4 Blade)", points: "2400", status: "Enable" },
    { id: "12", type: "Electrician", name: "Electric Chimney", points: "4500", status: "Enable" },
  ]);

  return (
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-['Inter',sans-serif] text-[#1B254B]">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1B254B]">Gift Store Inventory</h1>
          <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest italic">
            SRV Electricals <span className="mx-2 text-slate-300">|</span> Management Portal
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#4318FF] text-white rounded-2xl hover:shadow-xl hover:shadow-[#4318FF]/20 transition-all font-bold text-sm">
          <Plus size={18} /> Add New Gift
        </button>
      </div>

      {/* SEARCH & TOP ACTION BAR */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-[24px] mb-6 shadow-sm border border-white flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
          <input 
            type="text" 
            placeholder="Search gifts..." 
            className="w-full pl-12 pr-4 py-3 bg-[#F4F7FE] border-none rounded-2xl outline-none text-sm font-semibold focus:ring-2 focus:ring-[#4318FF]/10 transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto relative">
          <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
            <Filter size={18} /> Filter
          </button>

          {/* ACTION BUTTON WITH DROPDOWN (LINKED HERE) */}
          <div className="relative">
            <button 
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="flex items-center gap-2 px-6 py-3 bg-[#1D61E7] text-white rounded-2xl text-sm font-bold shadow-md hover:bg-[#1652c9] transition-all"
            >
              Action <ChevronDown size={16} className={`transition-transform ${isActionOpen ? 'rotate-180' : ''}`} />
            </button>

            {isActionOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Bulk Options</div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                  <CheckCircle2 size={18} /> Enable Selected
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors">
                  <XCircle size={18} /> Disable Selected
                </button>
                <div className="h-[1px] bg-slate-50 my-1 mx-2"></div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors">
                  <Trash2 size={18} /> Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-50 bg-[#F9FAFC]/50">
                <th className="p-6 w-16 text-center">
                   <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
                </th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ID</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Gift Detail</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Category</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {gifts.map((gift) => (
                <tr key={gift.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
                  <td className="p-6 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
                  </td>
                  
                  {/* DARKENED ID FONT */}
                  <td className="p-6">
                    <span className="text-sm font-bold text-[#1B254B] group-hover:text-[#4318FF] transition-colors">{gift.id}</span>
                  </td>
                  
                  <td className="p-6">
                    <div className="flex items-center gap-5">
                      <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm transition-transform duration-500">
                        <ImageIcon size={24} className="text-[#4318FF]/20" />
                      </div>
                      <div>
                        <div className="font-bold text-[15px] text-[#1B254B] uppercase tracking-tight">{gift.name}</div>
                        <div className="mt-1 inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-bold border border-amber-100/50">
                            <Award size={12} /> {gift.points} POINTS
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-6 text-center">
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-xl uppercase tracking-widest">
                      {gift.type}
                    </span>
                  </td>

                  <td className="p-6 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase shadow-sm ${
                      gift.status === 'Enable' ? 'bg-[#05CD99] text-white' : 'bg-slate-400 text-white'
                    }`}>
                        {gift.status}
                    </span>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl transition-all shadow-sm border border-transparent">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm border border-transparent">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-6 border-t border-slate-50 flex justify-end bg-white/50">
           <div className="flex items-center gap-2">
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronLeft size={18}/></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-bold text-sm">1</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-500 font-bold text-sm">2</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronRight size={18}/></button>
           </div>
        </div>
      </div>

      {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
    </div>
  );
}