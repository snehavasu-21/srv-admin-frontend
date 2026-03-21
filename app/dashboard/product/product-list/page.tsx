"use client";

import React, { useState } from 'react';
import { 
  Search, Plus, FileDown, Edit3, Trash2, Filter, 
  Package, Tag, Eye, MoreVertical, CheckCircle2, 
  XCircle, LayoutGrid, List
} from "lucide-react";

export default function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Data as per your 'Manage Product' screenshot
  const [products] = useState([
    { id: "302", category: "PVC Casing Batten", name: "PVC Casing Batten", oriPrice: "76", offerPrice: "45.6", status: "Enable", featured: "Disable" },
    { id: "301", category: "PVC Casing Batten", name: "PVC Casing Batten", oriPrice: "70", offerPrice: "42", status: "Enable", featured: "Disable" },
    { id: "300", category: "PVC Casing Batten", name: "PVC Casing Batten", oriPrice: "51", offerPrice: "30.6", status: "Enable", featured: "Disable" },
    { id: "299", category: "PVC CONDUIT BEND", name: "Conduit Bend Medium 2.5\"", oriPrice: "91", offerPrice: "54.6", status: "Enable", featured: "Disable" },
    { id: "298", category: "PVC CONDUIT PIPE", name: "Conduit Pipe Medium 1.50\"", oriPrice: "356", offerPrice: "213.6", status: "Enable", featured: "Disable" },
  ]);

  return (
    <div className="p-3 lg:p-4 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-5">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1B254B] flex items-center gap-3">
            <Package className="text-[#4318FF]" size={32} />
            Product Inventory
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Manage SRV Electricals' high-performance product catalog</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-3 bg-white text-slate-700 rounded-2xl hover:bg-slate-50 transition-all font-bold shadow-sm border border-slate-100 text-sm">
            <FileDown size={18} /> Export List
          </button>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#4318FF] to-[#3311CC] text-white rounded-2xl hover:shadow-[0_10px_20px_rgba(67,24,255,0.3)] transition-all font-bold text-sm shadow-lg">
            <Plus size={20} /> Add New Product
          </button>
        </div>
      </div>

      {/* SEARCH & FILTERS PANEL */}
      <div className="bg-white/70 backdrop-blur-md p-6 rounded-[24px] shadow-sm border border-white mb-8 flex flex-col lg:flex-row justify-between items-center gap-5">
        <div className="relative w-full lg:w-[400px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#4318FF]" size={20} />
          <input 
            type="text" 
            placeholder="Search by product name or ID..." 
            className="w-full pl-14 pr-6 py-3.5 bg-white border-none rounded-[18px] focus:ring-2 focus:ring-[#4318FF]/20 outline-none text-sm font-semibold shadow-inner transition-all"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-4 w-full lg:w-auto">
           <select className="flex-1 lg:flex-none h-12 px-6 bg-white border-none rounded-[18px] text-sm font-bold text-slate-600 outline-none shadow-sm cursor-pointer hover:bg-slate-50">
             <option>All Categories</option>
             <option>PVC Casing</option>
             <option>Conduit Pipe</option>
           </select>
           <div className="flex bg-[#F4F7FE] p-1.5 rounded-[18px]">
              <button className="p-2 bg-white text-[#4318FF] rounded-xl shadow-sm"><LayoutGrid size={18}/></button>
              <button className="p-2 text-slate-400 hover:text-[#4318FF] transition-all"><List size={18}/></button>
           </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {products.map((prod) => (
          <div key={prod.id} className="group relative bg-white rounded-[32px] overflow-hidden border border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-2xl transition-all duration-300">
            
            {/* IMAGE PREVIEW AREA */}
            <div className="h-52 bg-gradient-to-br from-[#F8F9FF] to-white flex items-center justify-center relative overflow-hidden">
               {/* Placeholder Icon - Actual image can go here */}
               <Package size={60} className="text-[#4318FF]/10 group-hover:scale-110 transition-transform duration-500" />
               <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black text-[#4318FF] uppercase border border-white/50 shadow-sm">
                  #{prod.id}
               </div>
               <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm text-slate-400 rounded-full hover:text-rose-500 transition-colors">
                  <MoreVertical size={16} />
               </button>
            </div>

            {/* PRODUCT CONTENT */}
            <div className="p-6">
              <div className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest mb-1">{prod.category}</div>
              <h3 className="text-lg font-extrabold text-[#1B254B] mb-4 line-clamp-1 group-hover:text-[#4318FF] transition-colors">{prod.name}</h3>

              {/* PRICING BLOCK */}
              <div className="flex items-center justify-between bg-[#F4F7FE] p-3 rounded-2xl mb-4 border border-white">
                <div>
                   <div className="text-[9px] font-bold text-slate-400 uppercase">Offer Price</div>
                   <div className="text-lg font-black text-[#05CD99]">₹{prod.offerPrice}</div>
                </div>
                <div className="text-right">
                   <div className="text-[9px] font-bold text-slate-400 uppercase line-through italic">M.R.P</div>
                   <div className="text-sm font-bold text-slate-400">₹{prod.oriPrice}</div>
                </div>
              </div>

              {/* STATUS & ACTIONS */}
              <div className="flex items-center justify-between pt-2">
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase border ${
                  prod.status === 'Enable' 
                  ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
                  : 'bg-rose-50 text-rose-600 border-rose-100'
                }`}>
                  <div className={`w-1.5 h-1.5 rounded-full ${prod.status === 'Enable' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                  {prod.status}
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="p-2.5 bg-[#4318FF]/5 text-[#4318FF] hover:bg-[#4318FF] hover:text-white rounded-xl transition-all border border-[#4318FF]/10">
                    <Edit3 size={16} />
                  </button>
                  <button className="p-2.5 bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white rounded-xl transition-all border border-rose-100">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* FEATURED RIBBON (IF APPLICABLE) */}
            {prod.featured === 'Enable' && (
              <div className="absolute top-0 right-0 p-1">
                 <div className="bg-amber-400 text-white text-[9px] font-black px-3 py-1 rounded-bl-xl shadow-md">FEATURED</div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}