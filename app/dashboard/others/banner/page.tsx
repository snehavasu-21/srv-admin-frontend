"use client";

import React, { useState } from 'react';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Trash2, Edit2, Plus, Layout, 
  ImageIcon, Eye, AlertCircle
} from "lucide-react";

export default function BannerPage() {
  const [isActionOpen, setIsActionOpen] = useState(false);

  const [banners] = useState([
    { id: "18", name: "Mcb Distribution Boxes", status: "Enable" },
    { id: "17", name: "Led Flood Lights", status: "Enable" },
    { id: "15", name: "Automatic Change Over Switch", status: "Enable" },
    { id: "14", name: "Appliances", status: "Enable" },
    { id: "13", name: "Change Over Switch", status: "Enable" },
  ]);

  return (
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      
      {/* 1. HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#1B254B]">Manage Banner</h1>
          <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#4318FF]"></span>
            SRV Electricals <span className="text-slate-300">|</span> Homepage Hero Visuals
          </p>
        </div>
        <button className="flex items-center gap-2 px-7 py-4 bg-[#4318FF] text-white rounded-[20px] font-bold text-sm shadow-xl shadow-[#4318FF]/20 hover:bg-[#3311CC] transition-all w-fit">
          <Plus size={20} /> Add Banner
        </button>
      </div>

      {/* 2. SEARCH & ACTION BAR */}
      <div className="bg-white/70 backdrop-blur-md p-5 rounded-[28px] mb-8 shadow-sm border border-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search banner name..." 
            className="w-full pl-12 pr-4 py-3.5 bg-[#F4F7FE]/50 border-none rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#4318FF]/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2">
            <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF] cursor-pointer" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select All</span>
          </div>
          
          <button 
            onClick={() => setIsActionOpen(!isActionOpen)}
            className="flex items-center gap-2 px-6 py-3 bg-[#1B254B] text-white rounded-xl text-xs font-bold shadow-lg hover:bg-black transition-all"
          >
            Action <ChevronDown size={14} />
          </button>
        </div>
      </div>

      {/* 3. BANNER TABLE */}
      <div className="bg-white rounded-[35px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="p-6 w-12 text-center"></th>
                {/* BOLD COLUMN NAMES */}
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B]">ID</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B]">Banner Name</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] text-center">Banner Image</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] text-center">Status</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {banners.map((banner) => (
                <tr key={banner.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
                  <td className="p-6 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF] cursor-pointer" />
                  </td>
                  
                  {/* NORMAL DATA WEIGHT */}
                  <td className="p-6">
                    <span className="text-xs font-bold text-slate-500  tracking-wider">{banner.id.padStart(2, '0')}</span>
                  </td>
                  
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                       <div className="p-2.5 bg-blue-50 text-[#4318FF] rounded-xl border border-blue-100">
                         <Layout size={18} />
                       </div>
                       <span className="font- text-[15px] text-[#1B254B] group-hover:text-[#4318FF] transition-colors">{banner.name}</span>
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="flex justify-center">
                      <div className="relative w-16 h-16 bg-slate-100 rounded-[20px] overflow-hidden border-2 border-white shadow-sm group-hover:shadow-md transition-all cursor-pointer">
                         <div className={`absolute inset-0 flex items-center justify-center bg-[#4318FF]/5`}>
                            <ImageIcon size={20} className="text-[#4318FF]/20" />
                         </div>
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all">
                            <Eye size={16} className="text-white opacity-0 group-hover:opacity-100 transition-all" />
                         </div>
                      </div>
                    </div>
                  </td>

                  <td className="p-6 text-center">
                    <span className="px-4 py-1.5 bg-[#05CD99] text-white text-[10px] font-bold uppercase tracking-widest rounded-lg shadow-sm">
                      {banner.status}
                    </span>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                       <button className="h-9 w-9 flex items-center justify-center bg-slate-50 text-amber-500 rounded-xl hover:bg-amber-500 hover:text-white transition-all">
                        <Edit2 size={15} />
                      </button>
                      <button className="h-9 w-9 flex items-center justify-center bg-slate-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. FOOTER */}
        <div className="p-8 border-t border-slate-50 flex justify-between items-center bg-slate-50/30">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
             <AlertCircle size={14} className="text-[#4318FF]" /> {banners.length} Active Slides
           </p>
           <div className="flex items-center gap-2">
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 transition-all"><ChevronLeft size={18}/></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm">1</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 transition-all"><ChevronRight size={18}/></button>
           </div>
        </div>
      </div>
    </div>
  );
}