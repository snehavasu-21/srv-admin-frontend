"use client";

import React, { useState } from 'react';
import { 
  Search, Plus, Package, Edit2, Trash2, 
  ChevronLeft, ChevronRight, Filter, FileDown 
} from "lucide-react";

export default function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [products, setProducts] = useState([
    { id: "302", category: "PVC Casing Batten", name: "PVC Casing Batten", oriPrice: "76", offerPrice: "45.6", status: "Enable", featured: "Disable" },
    { id: "301", category: "PVC Casing Batten", name: "PVC Casing Batten", oriPrice: "70", offerPrice: "42", status: "Enable", featured: "Disable" },
    { id: "300", category: "PVC Casing Batten", name: "PVC Casing Batten", oriPrice: "51", offerPrice: "30.6", status: "Enable", featured: "Disable" },
    { id: "299", category: "PVC CONDUIT BEND", name: "Conduit Bend Medium 2.5\"", oriPrice: "91", offerPrice: "54.6", status: "Enable", featured: "Disable" },
    { id: "298", category: "PVC CONDUIT PIPE", name: "Conduit Pipe Medium 1.50\"", oriPrice: "356", offerPrice: "213.6", status: "Enable", featured: "Disable" },
  ]);

  const toggleStatus = (id: string, newStatus: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
  };

  const toggleFeatured = (id: string, newStatus: string) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, featured: newStatus } : p));
  };

  return (
    <div className="p-6 lg:p-8 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      
      {/* HEADER SECTION - Matching Category Page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1B254B]">Manage Products</h1>
          <p className="text-slate-500 text-sm font-medium">Inventory management for SRV Electricals</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold shadow-sm border border-slate-200 text-sm">
            <FileDown size={18} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4318FF] text-white rounded-xl hover:bg-[#3311CC] transition-all font-bold shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] text-sm">
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {/* SEARCH & FILTERS - Category Style */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-white mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search products here..." 
            className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-[#4318FF]/20 outline-none text-sm font-medium transition-all placeholder:text-slate-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
           <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F4F7FE] text-slate-600 rounded-xl text-sm font-bold border-none hover:bg-slate-100 transition-all">
             <Filter size={16} /> Filters
           </button>
           <select className="border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none bg-[#F4F7FE] text-slate-600 cursor-pointer">
             <option>All Categories</option>
             <option>PVC Casing</option>
             <option>Conduit Pipe</option>
           </select>
        </div>
      </div>

      {/* MAIN TABLE CONTAINER - Shadow and Border from Category Page */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50 bg-[#F9FAFC]/50">
                <th className="p-5 w-14 text-center">
                   <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
                </th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Id</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Product</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Category</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-center">Featured</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-center">Status</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-slate-400">Price</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-widest text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {products.map((prod) => (
                <tr key={prod.id} className="group hover:bg-slate-50/50 transition-all duration-200">
                  <td className="p-5 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
                  </td>
                  <td className="p-5 text-sm font-bold text-slate-400 italic">{prod.id}</td>
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F4F7FE] flex items-center justify-center border border-slate-100 group-hover:border-[#4318FF]/20 transition-colors">
                        <Package size={18} className="text-[#4318FF]/40" />
                      </div>
                      <span className="font-bold text-sm text-[#1B254B]">{prod.name}</span>
                    </div>
                  </td>
                  <td className="p-5 text-sm font-semibold text-slate-500">{prod.category}</td>
                  
                  {/* FEATURED TOGGLE - Minimal Design */}
                  <td className="p-5">
                    <div className="flex bg-[#F4F7FE] p-1 rounded-xl w-[130px] mx-auto border border-slate-100 shadow-inner">
                      <button 
                        onClick={() => toggleFeatured(prod.id, 'Enable')}
                        className={`flex-1 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${prod.featured === 'Enable' ? 'bg-[#4318FF] text-white shadow-sm' : 'text-slate-400 hover:text-[#4318FF]'}`}
                      >Enable</button>
                      <button 
                        onClick={() => toggleFeatured(prod.id, 'Disable')}
                        className={`flex-1 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${prod.featured === 'Disable' ? 'bg-[#EE5D50] text-white shadow-sm' : 'text-slate-400 hover:text-[#EE5D50]'}`}
                      >Disable</button>
                    </div>
                  </td>

                  {/* STATUS TOGGLE - Success Color */}
                  <td className="p-5">
                    <div className="flex bg-[#F4F7FE] p-1 rounded-xl w-[130px] mx-auto border border-slate-100 shadow-inner">
                      <button 
                        onClick={() => toggleStatus(prod.id, 'Enable')}
                        className={`flex-1 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${prod.status === 'Enable' ? 'bg-[#05CD99] text-white shadow-sm' : 'text-slate-400 hover:text-[#05CD99]'}`}
                      >Enable</button>
                      <button 
                        onClick={() => toggleStatus(prod.id, 'Disable')}
                        className={`flex-1 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${prod.status === 'Disable' ? 'bg-[#EE5D50] text-white shadow-sm' : 'text-slate-400 hover:text-[#EE5D50]'}`}
                      >Disable</button>
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="font-bold text-[#1B254B] text-sm">₹{prod.offerPrice}</div>
                    <div className="text-[10px] text-slate-300 font-bold line-through">₹{prod.oriPrice}</div>
                  </td>
                  
                  <td className="p-5">
                    <div className="flex items-center justify-end gap-2">
                      <button title="Edit" className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-xl transition-all shadow-sm">
                        <Edit2 size={16} />
                      </button>
                      <button title="Delete" className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-all shadow-sm">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER - Category Style */}
        <div className="p-5 border-t border-slate-50 flex justify-between items-center bg-[#fcfcfc]">
           <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">SRV Electricals Inventory Control</span>
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