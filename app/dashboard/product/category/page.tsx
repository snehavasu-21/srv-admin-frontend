"use client";

import React, { useState } from 'react';
import { 
  Search, Plus, FileDown, Edit2, 
  Trash2, ChevronLeft, ChevronRight, 
  Filter, Image as ImageIcon, CheckCircle2, XCircle 
} from "lucide-react";

export default function CategoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Sample Data from your screenshots
  const [categories] = useState([
    { id: "37", name: "PVC Casing Batten", colorCode: "#000000", status: "Enable" },
    { id: "36", name: "PVC CONDUIT BEND", colorCode: "#000000", status: "Enable" },
    { id: "35", name: "PVC CONDUIT PIPE", colorCode: "#000000", status: "Enable" },
    { id: "34", name: "Kitkat Fuses", colorCode: "#000000", status: "Enable" },
    { id: "33", name: "SURFACE TYPE PVC MCB", colorCode: "#000000", status: "Enable" },
    { id: "32", name: "Fan Rods", colorCode: "#000000", status: "Enable" },
    { id: "29", name: "Knife Type Change Over Switches", colorCode: "#000000", status: "Enable" },
    { id: "28", name: "PVC Junction Box", colorCode: "#000000", status: "Enable" },
  ]);

  const filteredCategories = categories.filter(cat => 
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-3 lg:p-4 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Category</h1>
          <p className="text-slate-500 text-sm font-medium">Organize and manage SRV Electricals product lines</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold shadow-sm border border-slate-200 text-sm">
            <FileDown size={18} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4318FF] text-white rounded-xl hover:bg-[#3311CC] transition-all font-bold shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] text-sm">
            <Plus size={18} /> Add Category
          </button>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-white mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search category here..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-[#4318FF] outline-none text-sm font-medium transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
           <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F4F7FE] text-slate-600 rounded-xl text-sm font-bold border-none hover:bg-slate-100 transition-all">
             <Filter size={16} /> Filters
           </button>
           <select className="flex-1 md:flex-none border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none bg-[#F4F7FE] text-slate-600">
             <option>Action</option>
             <option>Enable Selected</option>
             <option>Disable Selected</option>
           </select>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="p-5 w-12 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
                </th>
                {["Id", "Category Name", "Color Code", "Image", "Status", "Action"].map((head) => (
                  <th key={head} className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredCategories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/50 transition-all duration-200">
                  <td className="p-5 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
                  </td>
                  <td className="p-5 text-sm font-bold text-slate-500">{cat.id}</td>
                  <td className="p-5">
                    <div className="font-bold text-[#1B254B] text-sm">{cat.name}</div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: cat.colorCode }}></div>
                        <span className="text-xs font-mono text-slate-500">{cat.colorCode}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="w-12 h-12 rounded-xl bg-[#F4F7FE] flex items-center justify-center border border-slate-100">
                        <ImageIcon size={20} className="text-slate-300" />
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg font-bold text-[10px] uppercase w-fit">
                      <CheckCircle2 size={12}/>
                      {cat.status}
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <button className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-xl transition-all shadow-sm">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-all shadow-sm">
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
        <div className="p-5 border-t border-slate-50 flex justify-between items-center bg-[#fcfcfc]">
           <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Showing {filteredCategories.length} Items</span>
           <div className="flex items-center gap-2">
             <button className="p-2 rounded-lg bg-[#F4F7FE] hover:bg-slate-100 transition-all text-slate-600"><ChevronLeft size={16}/></button>
             <button className="w-8 h-8 rounded-lg bg-[#4318FF] text-white font-bold text-xs shadow-md">1</button>
             <button className="p-2 rounded-lg bg-[#F4F7FE] hover:bg-slate-100 transition-all text-slate-600"><ChevronRight size={16}/></button>
           </div>
        </div>
      </div>
    </div>
  );
}