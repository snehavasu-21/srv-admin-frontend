"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Trash2, Edit2, Plus, Target, 
  FileSpreadsheet, Shield, TrendingUp, AlertCircle
} from "lucide-react";

export default function PlanRangePage() {
  const [isActionOpen, setIsActionOpen] = useState(false);

  // Data strictly based on your "Manage plan range" screenshot
  const [plans] = useState([
    { id: "4", name: "Platinum", minPoint: "701", maxPoint: "1000", status: "Enable" },
    { id: "3", name: "Gold", minPoint: "501", maxPoint: "700", status: "Enable" },
    { id: "2", name: "Silver", minPoint: "201", maxPoint: "500", status: "Enable" },
    { id: "1", name: "Bronze", minPoint: "0", maxPoint: "200", status: "Enable" },
  ]);

  const exportPlans = () => {
    const worksheet = XLSX.utils.json_to_sheet(plans);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Plan_Ranges");
    XLSX.writeFile(workbook, "SRV_Plan_Ranges.xlsx");
    setIsActionOpen(false);
  };

  return (
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-['Inter',sans-serif] text-[#1B254B]">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1B254B]">Manage Plan Range</h1>
          <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest italic">
            SRV Electricals <span className="mx-2 text-slate-300">|</span> Loyalty Tier Configuration
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3.5 bg-[#1D61E7] text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-[#1652c9] transition-all w-fit">
          <Plus size={18} /> Add Plan Range
        </button>
      </div>

      {/* 2. SEARCH & ACTION BAR */}
      <div className="bg-white/80 backdrop-blur-md p-5 rounded-[24px] mb-8 shadow-sm border border-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by plan name..." 
            className="w-full pl-12 pr-4 py-3 bg-[#F4F7FE] border-none rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#4318FF]/10"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 mr-2">
            <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
            <span className="text-xs font-bold text-slate-500">Select All</span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1D61E7] text-white rounded-xl text-xs font-bold shadow-md"
            >
              Action <ChevronDown size={14} />
            </button>
            {isActionOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 animate-in fade-in slide-in-from-top-2">
                <button onClick={exportPlans} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600">
                  <FileSpreadsheet size={16} /> Export to Excel
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50">
                  <Trash2 size={16} /> Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. PLAN RANGE TABLE */}
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F9FAFC]/50 border-b border-slate-50">
                <th className="p-6 w-12 text-center"></th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Id</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Plan Name</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Min Point</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Max Point</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Status</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {plans.map((plan) => (
                <tr key={plan.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
                  <td className="p-6 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
                  </td>
                  
                  <td className="p-6">
                    <span className="text-sm font-medium text-slate-400">{plan.id}</span>
                  </td>
                  
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                       <div className={`p-2 rounded-lg ${
                         plan.name === 'Platinum' ? 'bg-indigo-50 text-indigo-600' :
                         plan.name === 'Gold' ? 'bg-amber-50 text-amber-600' :
                         plan.name === 'Silver' ? 'bg-slate-50 text-slate-600' : 'bg-orange-50 text-orange-700'
                       }`}>
                         <Shield size={18} />
                       </div>
                       <span className="font-bold text-[15px] text-[#1B254B]">{plan.name}</span>
                    </div>
                  </td>

                  <td className="p-6 text-center text-sm font-bold text-slate-600 bg-slate-50/30">
                    <div className="flex items-center justify-center gap-1.5">
                      <Target size={14} className="text-blue-400" /> {plan.minPoint}
                    </div>
                  </td>

                  <td className="p-6 text-center text-sm font-black text-[#1B254B]">
                    <div className="flex items-center justify-center gap-1.5">
                      <TrendingUp size={14} className="text-emerald-400" /> {plan.maxPoint}
                    </div>
                  </td>

                  <td className="p-6 text-center">
                    <button className="px-4 py-1.5 bg-[#05CD99] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm">
                      {plan.status}
                    </button>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-3 bg-amber-400 text-white rounded-2xl shadow-md hover:scale-105 transition-all">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-3 bg-[#EE5D50] text-white rounded-2xl shadow-md hover:scale-105 transition-all">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. FOOTER */}
        <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-white/50">
           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
             <AlertCircle size={14} /> 4 Tiers Configured
           </p>
           <div className="flex items-center gap-2">
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 transition-all"><ChevronLeft size={18}/></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm shadow-xl shadow-blue-200">1</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 transition-all"><ChevronRight size={18}/></button>
           </div>
        </div>
      </div>
    </div>
  );
}