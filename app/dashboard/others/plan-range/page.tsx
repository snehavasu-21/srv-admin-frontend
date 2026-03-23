"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Trash2, Edit2, Plus, Target, 
  Shield, TrendingUp, AlertCircle
} from "lucide-react";

export default function PlanRangePage() {
  const [isActionOpen, setIsActionOpen] = useState(false);

  // Loyalty Tier Data
  const [plans] = useState([
    { id: "4", name: "Platinum", minPoint: "701", maxPoint: "1000", status: "Enable" },
    { id: "3", name: "Gold", minPoint: "501", maxPoint: "700", status: "Enable" },
    { id: "2", name: "Silver", minPoint: "201", maxPoint: "500", status: "Enable" },
    { id: "1", name: "Bronze", minPoint: "0", maxPoint: "200", status: "Enable" },
  ]);

  return (
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#1B254B]">Manage Plan Range</h1>
          <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#4318FF]"></span>
            SRV Electricals <span className="text-slate-300">|</span> Loyalty Tier Configuration
          </p>
        </div>
        <button className="flex items-center gap-2 px-7 py-4 bg-[#4318FF] text-white rounded-[20px] font-bold text-sm shadow-xl shadow-[#4318FF]/20 hover:bg-[#3311CC] hover:scale-105 transition-all w-fit">
          <Plus size={20} /> Add New Plan
        </button>
      </div>

      {/* 2. SEARCH & ACTION BAR */}
      <div className="bg-white/70 backdrop-blur-md p-5 rounded-[28px] mb-8 shadow-sm border border-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4318FF] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by plan name..." 
            className="w-full pl-12 pr-4 py-3.5 bg-[#F4F7FE]/50 border-none rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#4318FF]/10 transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
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
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 animate-in fade-in slide-in-from-top-2">
                <button className="w-full text-left px-4 py-3 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-[#4318FF] transition-all">Enable Selected</button>
                <button className="w-full text-left px-4 py-3 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-[#4318FF] transition-all">Disable Selected</button>
                <div className="h-[1px] bg-slate-50 my-1 mx-2"></div>
                <button className="w-full text-left px-4 py-3 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-all">Delete Selected</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. PLAN RANGE TABLE */}
      <div className="bg-white rounded-[35px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-50">
                <th className="p-6 w-12 text-center"></th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B]">ID</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B]">Tier Name</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] text-center">Min Threshold</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] text-center">Max Threshold</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] text-center">Status</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] text-right">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {plans.map((plan) => (
                <tr key={plan.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
                  <td className="p-6 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF] cursor-pointer" />
                  </td>
                  
                  <td className="p-6">
                    <span className="text-xs font-black text-slate-400  tracking-wider">{plan.id.padStart(2, '0')}</span>
                  </td>
                  
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                       
                       <span className="font- text-[15px] text-[#1B254B] group-hover:text-[#4318FF] transition-colors">{plan.name}</span>
                    </div>
                  </td>

                  <td className="p-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-lg text-sm font-bold text-slate-600 border border-slate-100">
                      <Target size={14} className="text-blue-400" /> {plan.minPoint} pts
                    </div>
                  </td>

                  <td className="p-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 rounded-lg text-sm font-black text-[#1B254B] border border-emerald-100">
                      <TrendingUp size={14} className="text-emerald-400" /> {plan.maxPoint} pts
                    </div>
                  </td>

                  <td className="p-6 text-center">
                    <span className="px-4 py-1.5 bg-[#05CD99] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
                      {plan.status}
                    </span>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2.5">
                       <button className="h-9 w-9 flex items-center justify-center bg-white border border-slate-100 text-amber-500 rounded-xl shadow-sm hover:bg-amber-500 hover:text-white transition-all">
                        <Edit2 size={15} />
                      </button>
                      <button className="h-9 w-9 flex items-center justify-center bg-white border border-slate-100 text-rose-500 rounded-xl shadow-sm hover:bg-rose-500 hover:text-white transition-all">
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
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
             <AlertCircle size={14} className="text-[#4318FF]" /> Loyalty Program Configuration Active
           </p>
           <div className="flex items-center gap-2">
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 hover:text-[#4318FF] transition-all"><ChevronLeft size={18}/></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm shadow-xl shadow-[#4318FF]/20">1</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-400 transition-all"><ChevronRight size={18}/></button>
           </div>
        </div>
      </div>
    </div>
  );
}