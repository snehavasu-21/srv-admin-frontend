// "use client";

// import React, { useState } from 'react';
// import { 
//   Search, Plus, Package, Edit2, Trash2, 
//   ChevronLeft, ChevronRight, Filter, FileDown 
// } from "lucide-react";

// export default function ProductListPage() {
//   const [searchTerm, setSearchTerm] = useState("");
  
//   const [products, setProducts] = useState([
//     { id: "302", category: "PVC Casing Batten", name: "PVC Casing Batten", oriPrice: "76", offerPrice: "45.6", status: "Enable", featured: "Disable" },
//     { id: "301", category: "PVC Casing Batten", name: "PVC Casing Batten", oriPrice: "70", offerPrice: "42", status: "Enable", featured: "Disable" },
//     { id: "300", category: "PVC Casing Batten", name: "PVC Casing Batten", oriPrice: "51", offerPrice: "30.6", status: "Enable", featured: "Disable" },
//     { id: "299", category: "PVC CONDUIT BEND", name: "Conduit Bend Medium 2.5\"", oriPrice: "91", offerPrice: "54.6", status: "Enable", featured: "Disable" },
//     { id: "298", category: "PVC CONDUIT PIPE", name: "Conduit Pipe Medium 1.50\"", oriPrice: "356", offerPrice: "213.6", status: "Enable", featured: "Disable" },
//   ]);

//   const toggleStatus = (id: string, newStatus: string) => {
//     setProducts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
//   };

//   return (
//     <div className="p-6 lg:p-8 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      
//       {/* HEADER SECTION */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight text-[#1B254B]">Manage Products</h1>
//           <p className="text-slate-500 text-sm font-medium">Inventory management for SRV Electricals</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold shadow-sm border border-slate-200 text-sm">
//             <FileDown size={18} /> Export
//           </button>
//           <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4318FF] text-white rounded-xl hover:bg-[#3311CC] transition-all font-bold shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] text-sm">
//             <Plus size={18} /> Add Product
//           </button>
//         </div>
//       </div>

//       {/* SEARCH & FILTERS */}
//       <div className="bg-white p-4 rounded-2xl shadow-sm border border-white mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//           <input 
//             type="text" 
//             placeholder="Search products here..." 
//             className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-[#4318FF]/20 outline-none text-sm font-medium transition-all placeholder:text-slate-400"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
        
//         <div className="flex items-center gap-3 w-full md:w-auto">
//            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F4F7FE] text-slate-600 rounded-xl text-sm font-bold border-none hover:bg-slate-100 transition-all">
//              <Filter size={16} /> Filters
//            </button>
//            <select className="border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none bg-[#F4F7FE] text-slate-600 cursor-pointer">
//              <option>All Categories</option>
//              <option>PVC Casing</option>
//              <option>Conduit Pipe</option>
//            </select>
//         </div>
//       </div>

//       {/* MAIN TABLE CONTAINER */}
//       <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-slate-50 bg-slate-50/30">
//                 <th className="p-5 w-14 text-center">
//                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
//                 </th>
//                 {/* UPDATED: Header titles font-black and text-slate-900 */}
//                 {["Id", "Product", "Category", "Status", "Price", "Action"].map((head) => (
//                   <th key={head} className={`p-5 text-[11px] font-black uppercase tracking-widest text-slate-900 ${head === "Action" ? "text-right" : head === "Status" ? "text-center" : ""}`}>
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
            
//             <tbody className="divide-y divide-slate-50">
//               {products.map((prod) => (
//                 <tr key={prod.id} className="group hover:bg-slate-50/50 transition-all duration-200">
//                   <td className="p-5 text-center">
//                     <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
//                   </td>
//                   <td className="p-5 text-sm font-bold text-slate-400 ">{prod.id}</td>
//                   <td className="p-5">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 rounded-xl bg-[#F4F7FE] flex items-center justify-center border border-slate-100 group-hover:border-[#4318FF]/20 transition-colors">
//                         <Package size={18} className="text-[#4318FF]/40" />
//                       </div>
//                       {/* UPDATED: Name font is font-medium */}
//                       <span className="font-medium text-sm text-[#1B254B] whitespace-nowrap">{prod.name}</span>
//                     </div>
//                   </td>
//                   <td className="p-5 text-sm font-semibold text-slate-500 whitespace-nowrap">{prod.category}</td>
                  
//                   <td className="p-5">
//                     <div className="flex bg-[#F4F7FE] p-1 rounded-xl w-[130px] mx-auto border border-slate-100 shadow-inner">
//                       <button 
//                         onClick={() => toggleStatus(prod.id, 'Enable')}
//                         className={`flex-1 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${prod.status === 'Enable' ? 'bg-[#05CD99] text-white shadow-sm' : 'text-slate-400 hover:text-[#05CD99]'}`}
//                       >Enable</button>
//                       <button 
//                         onClick={() => toggleStatus(prod.id, 'Disable')}
//                         className={`flex-1 py-1 rounded-lg text-[9px] font-black uppercase transition-all ${prod.status === 'Disable' ? 'bg-[#EE5D50] text-white shadow-sm' : 'text-slate-400 hover:text-[#EE5D50]'}`}
//                       >Disable</button>
//                     </div>
//                   </td>

//                   <td className="p-5">
//                     <div className="font-bold text-[#1B254B] text-sm whitespace-nowrap">₹{prod.offerPrice}</div>
//                     <div className="text-[10px] text-slate-300 font-bold line-through">₹{prod.oriPrice}</div>
//                   </td>
                  
//                   <td className="p-5">
//                     <div className="flex items-center justify-end gap-2">
//                       <button title="Edit" className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-xl transition-all shadow-sm">
//                         <Edit2 size={16} />
//                       </button>
//                       <button title="Delete" className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-all shadow-sm">
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION FOOTER */}
//         <div className="p-5 border-t border-slate-50 flex justify-between items-center bg-[#fcfcfc]">
//            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">Inventory Control</span>
//            <div className="flex items-center gap-2">
//              <button className="p-2 rounded-lg bg-[#F4F7FE] hover:bg-slate-100 transition-all text-slate-600"><ChevronLeft size={16}/></button>
//              <button className="w-8 h-8 rounded-lg bg-[#4318FF] text-white font-bold text-xs shadow-md">1</button>
//              <button className="p-2 rounded-lg bg-[#F4F7FE] hover:bg-slate-100 transition-all text-slate-600"><ChevronRight size={16}/></button>
//            </div>
//         </div>
//       </div>
//     </div>
//   );
// }




"use client";

import React, { useState } from "react";
import {
  Search, Plus, Package, Edit2, Trash2,
  ChevronLeft, ChevronRight, Filter, FileDown,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const productsData = [
  { id: "302", category: "PVC Casing Batten",  name: "PVC Casing Batten",          oriPrice: "76",  offerPrice: "45.6",  status: "Enable",  featured: "Disable" },
  { id: "301", category: "PVC Casing Batten",  name: "PVC Casing Batten",          oriPrice: "70",  offerPrice: "42",    status: "Enable",  featured: "Disable" },
  { id: "300", category: "PVC Casing Batten",  name: "PVC Casing Batten",          oriPrice: "51",  offerPrice: "30.6",  status: "Enable",  featured: "Disable" },
  { id: "299", category: "PVC Conduit Bend",   name: "Conduit Bend Medium 2.5\"",  oriPrice: "91",  offerPrice: "54.6",  status: "Enable",  featured: "Disable" },
  { id: "298", category: "PVC Conduit Pipe",   name: "Conduit Pipe Medium 1.50\"", oriPrice: "356", offerPrice: "213.6", status: "Disable", featured: "Disable" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts]     = useState(productsData);

  const toggleStatus = (id, newStatus) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const enabledCount  = products.filter((p) => p.status === "Enable").length;
  const disabledCount = products.filter((p) => p.status === "Disable").length;

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Package className="text-orange-600" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Manage Products</h1>
            <p className="text-sm text-slate-500 mt-0.5">Inventory management for SRV Electricals</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:shadow-sm transition-all duration-200 text-sm font-medium">
            <FileDown size={15} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md">
            <Plus size={15} />
            Add Product
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-orange-500 p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Package size={18} className="text-orange-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-800">{products.length}</p>
            <p className="text-xs text-slate-500 mt-1">Total Products</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-green-500 p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <Package size={18} className="text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-800">{enabledCount}</p>
            <p className="text-xs text-slate-500 mt-1">Enabled</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-rose-400 p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
            <Package size={18} className="text-rose-500" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-800">{disabledCount}</p>
            <p className="text-xs text-slate-500 mt-1">Disabled</p>
          </div>
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <SectionLabel>All Products</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all">
            <Filter size={14} />
            Filter
          </button>
          <select className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
            <option>All Categories</option>
            <option>PVC Casing Batten</option>
            <option>PVC Conduit Bend</option>
            <option>PVC Conduit Pipe</option>
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3.5 w-10">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                </th>
                {["ID", "Product", "Category", "Status", "Price", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50 transition-colors duration-150 group">

                  {/* Checkbox */}
                  <td className="px-5 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>

                  {/* ID */}
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">
                    #{prod.id}
                  </td>

                  {/* Product */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                        <Package size={16} className="text-orange-500" />
                      </div>
                      <span className="text-sm font-medium text-slate-800 whitespace-nowrap">{prod.name}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg whitespace-nowrap">
                      {prod.category}
                    </span>
                  </td>

                  {/* Status Toggle */}
                  <td className="px-5 py-4">
                    <div className="flex bg-slate-100 p-0.5 rounded-lg w-[120px] border border-slate-200">
                      <button
                        onClick={() => toggleStatus(prod.id, "Enable")}
                        className={`flex-1 py-1.5 rounded-md text-[10px] font-semibold transition-all duration-200 ${
                          prod.status === "Enable"
                            ? "bg-green-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-green-600"
                        }`}
                      >
                        Enable
                      </button>
                      <button
                        onClick={() => toggleStatus(prod.id, "Disable")}
                        className={`flex-1 py-1.5 rounded-md text-[10px] font-semibold transition-all duration-200 ${
                          prod.status === "Disable"
                            ? "bg-rose-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-rose-500"
                        }`}
                      >
                        Disable
                      </button>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">₹{prod.offerPrice}</p>
                    <p className="text-xs text-slate-400 line-through mt-0.5">₹{prod.oriPrice}</p>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-amber-500 hover:bg-amber-50 transition-all duration-200" title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 transition-all duration-200" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-slate-400">
                    No products found matching{" "}
                    <span className="font-semibold text-slate-600">"{searchTerm}"</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">
            Showing{" "}
            <span className="text-slate-600 font-semibold">{filtered.length}</span>{" "}
            of{" "}
            <span className="text-slate-600 font-semibold">{products.length}</span> products
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}