// "use client";

// import React, { useState } from 'react';
// import { 
//   Search, Plus, FileDown, Edit2, 
//   Trash2, ChevronLeft, ChevronRight, 
//   Filter, Image as ImageIcon, CheckCircle2, XCircle 
// } from "lucide-react";

// export default function CategoryPage() {
//   const [searchTerm, setSearchTerm] = useState("");
  
//   const [categories] = useState([
//     { id: "37", name: "PVC Casing Batten", colorCode: "#000000", status: "Enable" },
//     { id: "36", name: "PVC CONDUIT BEND", colorCode: "#000000", status: "Enable" },
//     { id: "35", name: "PVC CONDUIT PIPE", colorCode: "#000000", status: "Enable" },
//     { id: "34", name: "Kitkat Fuses", colorCode: "#000000", status: "Enable" },
//     { id: "33", name: "SURFACE TYPE PVC MCB", colorCode: "#000000", status: "Enable" },
//     { id: "32", name: "Fan Rods", colorCode: "#000000", status: "Enable" },
//     { id: "29", name: "Knife Type Change Over Switches", colorCode: "#000000", status: "Enable" },
//     { id: "28", name: "PVC Junction Box", colorCode: "#000000", status: "Enable" },
//   ]);

//   const filteredCategories = categories.filter(cat => 
//     cat.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-3 lg:p-4 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">Manage Category</h1>
//           <p className="text-slate-500 text-sm font-medium">Organize and manage SRV Electricals product lines</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold shadow-sm border border-slate-200 text-sm">
//             <FileDown size={18} /> Export
//           </button>
//           <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4318FF] text-white rounded-xl hover:bg-[#3311CC] transition-all font-bold shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] text-sm">
//             <Plus size={18} /> Add Category
//           </button>
//         </div>
//       </div>

//       {/* SEARCH & FILTERS */}
//       <div className="bg-white p-4 rounded-2xl shadow-sm border border-white mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//           <input 
//             type="text" 
//             placeholder="Search category here..." 
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-[#4318FF] outline-none text-sm font-medium transition-all"
//           />
//         </div>
        
//         <div className="flex items-center gap-3 w-full md:w-auto">
//            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F4F7FE] text-slate-600 rounded-xl text-sm font-bold border-none hover:bg-slate-100 transition-all">
//              <Filter size={16} /> Filters
//            </button>
//            <select className="flex-1 md:flex-none border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none bg-[#F4F7FE] text-slate-600">
//              <option>Bulk Action</option>
//              <option>Enable Selected</option>
//              <option>Disable Selected</option>
//            </select>
//         </div>
//       </div>

//       {/* TABLE SECTION */}
//       <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-slate-50 bg-slate-50/30">
//                 <th className="p-5 w-12 text-center">
//                   <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
//                 </th>
//                 {/* UPDATED: Header titles are now font-black and text-slate-900 */}
//                 {["Id", "Category Name", "Color Code", "Image", "Status", "Action"].map((head) => (
//                   <th key={head} className="p-5 text-[11px] font-black uppercase tracking-wider text-slate-900">
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {filteredCategories.map((cat) => (
//                 <tr key={cat.id} className="hover:bg-slate-50/50 transition-all duration-200">
//                   <td className="p-5 text-center">
//                     <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
//                   </td>
//                   <td className="p-5 text-sm font-bold text-slate-500">{cat.id}</td>
//                   <td className="p-5">
//                     {/* UPDATED: Name font is now font-medium (Soft) */}
//                     <div className="font-medium text-[#1B254B] text-sm whitespace-nowrap">{cat.name}</div>
//                   </td>
//                   <td className="p-5">
//                     <div className="flex items-center gap-2">
//                         <div className="w-4 h-4 rounded-full border border-slate-200" style={{ backgroundColor: cat.colorCode }}></div>
//                         <span className="text-xs font-mono text-slate-500">{cat.colorCode}</span>
//                     </div>
//                   </td>
//                   <td className="p-5">
//                     <div className="w-10 h-10 rounded-xl bg-[#F4F7FE] flex items-center justify-center border border-slate-100">
//                         <ImageIcon size={18} className="text-slate-300" />
//                     </div>
//                   </td>
//                   <td className="p-5">
//                     <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg font-bold text-[10px] uppercase w-fit">
//                       <CheckCircle2 size={12}/>
//                       {cat.status}
//                     </div>
//                   </td>
//                   <td className="p-5">
//                     <div className="flex items-center gap-2">
//                       <button className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-xl transition-all shadow-sm">
//                         <Edit2 size={16} />
//                       </button>
//                       <button className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-all shadow-sm">
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="p-5 border-t border-slate-50 flex justify-between items-center bg-[#fcfcfc]">
//            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Showing {filteredCategories.length} Items</span>
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
  Search, Plus, FileDown, Edit2,
  Trash2, ChevronLeft, ChevronRight,
  Filter, Image as ImageIcon, CheckCircle2, LayoutGrid,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const categoriesData = [
  { id: "37", name: "PVC Casing Batten",               colorCode: "#000000", status: "Enable" },
  { id: "36", name: "PVC Conduit Bend",                colorCode: "#000000", status: "Enable" },
  { id: "35", name: "PVC Conduit Pipe",                colorCode: "#000000", status: "Enable" },
  { id: "34", name: "Kitkat Fuses",                    colorCode: "#000000", status: "Enable" },
  { id: "33", name: "Surface Type PVC MCB",            colorCode: "#000000", status: "Enable" },
  { id: "32", name: "Fan Rods",                        colorCode: "#000000", status: "Enable" },
  { id: "29", name: "Knife Type Change Over Switches", colorCode: "#000000", status: "Enable" },
  { id: "28", name: "PVC Junction Box",                colorCode: "#000000", status: "Enable" },
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

export default function CategoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = categoriesData.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
            <LayoutGrid className="text-purple-600" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Manage Categories</h1>
            <p className="text-sm text-slate-500 mt-0.5">Organize SRV Electricals product lines</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:shadow-sm transition-all duration-200 text-sm font-medium">
            <FileDown size={15} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md">
            <Plus size={15} />
            Add Category
          </button>
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <SectionLabel>All Categories</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search category..."
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
            <option>Bulk Action</option>
            <option>Enable Selected</option>
            <option>Disable Selected</option>
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
                {["ID", "Category Name", "Color Code", "Image", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50 transition-colors duration-150">

                  {/* Checkbox */}
                  <td className="px-5 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>

                  {/* ID */}
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">
                    #{cat.id}
                  </td>

                  {/* Category Name */}
                  <td className="px-5 py-4 text-sm font-medium text-slate-800 whitespace-nowrap">
                    {cat.name}
                  </td>

                  {/* Color Code */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-5 h-5 rounded-full border border-slate-200 flex-shrink-0"
                        style={{ backgroundColor: cat.colorCode }}
                      />
                      <span className="text-xs font-mono text-slate-500">{cat.colorCode}</span>
                    </div>
                  </td>

                  {/* Image */}
                  <td className="px-5 py-4">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center">
                      <ImageIcon size={16} className="text-slate-400" />
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
                      <CheckCircle2 size={11} />
                      {cat.status}
                    </span>
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
                    No categories found matching{" "}
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
            <span className="text-slate-600 font-semibold">{categoriesData.length}</span> categories
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