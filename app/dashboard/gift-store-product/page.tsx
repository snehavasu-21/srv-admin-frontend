// "use client";

// import React, { useState } from 'react';
// import { 
//   Search, Plus, Edit2, Trash2, 
//   ChevronLeft, ChevronRight, Filter, 
//   Image as ImageIcon, Award,
//   CheckCircle2, XCircle, ChevronDown
// } from "lucide-react";

// export default function GiftStorePremium() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isActionOpen, setIsActionOpen] = useState(false);
  
//   const [gifts] = useState([
//     { id: "17", type: "Electrician", name: "Electrician Bag", points: "500", status: "Enable" },
//     { id: "16", type: "Electrician", name: "Drill Machine", points: "1200", status: "Enable" },
//     { id: "15", type: "Electrician", name: "Electric Water Geyser", points: "3500", status: "Enable" },
//     { id: "14", type: "Electrician", name: "BLDS Ceiling Fan (5 Blade)", points: "2800", status: "Enable" },
//     { id: "13", type: "Electrician", name: "BLDS Ceiling Fan (4 Blade)", points: "2400", status: "Enable" },
//     { id: "12", type: "Electrician", name: "Electric Chimney", points: "4500", status: "Enable" },
//   ]);

//   return (
//     <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      
//       {/* HEADER SECTION */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-[#1B254B]">Gift Store Inventory</h1>
//           <p className="text-slate-500 text-sm font-medium">Manage rewards and points for SRV Electricals</p>
//         </div>
//         <button className="flex items-center gap-2 px-6 py-3 bg-[#4318FF] text-white rounded-2xl hover:bg-[#3311CC] transition-all font-bold text-sm shadow-[0_4px_14px_0_rgba(67,24,255,0.39)]">
//           <Plus size={18} /> Add New Gift
//         </button>
//       </div>

//       {/* SEARCH & FILTERS */}
//       <div className="bg-white/80 backdrop-blur-md p-4 rounded-[24px] mb-6 shadow-sm border border-white flex flex-col md:flex-row gap-4 items-center">
//         <div className="relative flex-1 w-full">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={19} />
//           <input 
//             type="text" 
//             placeholder="Search gifts..." 
//             className="w-full pl-12 pr-4 py-3 bg-[#F4F7FE] border-none rounded-2xl outline-none text-sm font-medium focus:ring-2 focus:ring-[#4318FF]/10 transition-all"
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
        
//         <div className="flex items-center gap-3 w-full md:w-auto relative">
//           <button className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-100 text-slate-600 rounded-2xl text-sm font-bold hover:bg-slate-50 transition-all shadow-sm">
//             <Filter size={18} /> Filter
//           </button>

//           <div className="relative">
//             <button 
//               onClick={() => setIsActionOpen(!isActionOpen)}
//               className="flex items-center gap-2 px-6 py-3 bg-[#1D61E7] text-white rounded-2xl text-sm font-bold shadow-md hover:bg-[#1652c9] transition-all"
//             >
//               Action <ChevronDown size={16} className={`transition-transform ${isActionOpen ? 'rotate-180' : ''}`} />
//             </button>

//             {isActionOpen && (
//               <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden py-2">
//                 <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Bulk Options</div>
//                 <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
//                   <CheckCircle2 size={18} /> Enable Selected
//                 </button>
//                 <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors">
//                   <XCircle size={18} /> Disable Selected
//                 </button>
//                 <div className="h-[1px] bg-slate-50 my-1 mx-2"></div>
//                 <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 transition-colors">
//                   <Trash2 size={18} /> Delete Selected
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* TABLE CONTAINER */}
//       <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="border-b border-slate-50 bg-slate-50/30">
//                 <th className="p-6 w-16 text-center">
//                    <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
//                 </th>
//                 {/* UPDATED: Header titles font-black and text-slate-900 */}
//                 {["ID", "Gift Detail", "Category", "Status", "Action"].map((head) => (
//                   <th key={head} className={`p-6 text-[11px] font-black uppercase tracking-wider text-slate-900 ${head === "Action" ? "text-right" : head === "Status" || head === "Category" ? "text-center" : ""}`}>
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
            
//             <tbody className="divide-y divide-slate-50">
//               {gifts.map((gift) => (
//                 <tr key={gift.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
//                   <td className="p-6 text-center">
//                     <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
//                   </td>
                  
//                   <td className="p-6">
//                     <span className="text-sm font-bold text-slate-400 ">{gift.id}</span>
//                   </td>
                  
//                   <td className="p-6">
//                     <div className="flex items-center gap-5">
//                       <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:border-[#4318FF]/20 transition-all">
//                         <ImageIcon size={22} className="text-[#4318FF]/20" />
//                       </div>
//                       <div>
//                         {/* UPDATED: Name font is font-medium */}
//                         <div className="font-medium text-[15px] text-[#1B254B] whitespace-nowrap">{gift.name}</div>
//                         <div className="mt-1 inline-flex items-center gap-1.5 px-2 py-0.5 bg-amber-50 text-amber-600 rounded-lg text-[10px] font-black border border-amber-100/50 uppercase">
//                             <Award size={12} /> {gift.points} Points
//                         </div>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="p-6 text-center">
//                     <span className="text-[10px] font-black text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-xl uppercase tracking-widest">
//                       {gift.type}
//                     </span>
//                   </td>

//                   <td className="p-6 text-center">
//                     <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase shadow-sm ${
//                       gift.status === 'Enable' ? 'bg-[#05CD99] text-white' : 'bg-slate-400 text-white'
//                     }`}>
//                         {gift.status}
//                     </span>
//                   </td>

//                   <td className="p-6 text-right">
//                     <div className="flex items-center justify-end gap-2">
//                        <button className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-xl transition-all shadow-sm">
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
//         <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-slate-50/20">
//            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">SRV Reward Store</span>
//            <div className="flex items-center gap-2">
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronLeft size={18}/></button>
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-bold text-sm shadow-md">1</button>
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-100 text-slate-500 font-bold text-sm">2</button>
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronRight size={18}/></button>
//            </div>
//         </div>
//       </div>

//       {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
//     </div>
//   );
// }





"use client";

import React, { useState } from "react";
import {
  Search, Plus, Edit2, Trash2,
  ChevronLeft, ChevronRight, Filter,
  Image as ImageIcon, Award, Gift,
  CheckCircle2, XCircle, ChevronDown,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const giftsData = [
  { id: "17", type: "Electrician", name: "Electrician Bag",          points: "500",  status: "Enable" },
  { id: "16", type: "Electrician", name: "Drill Machine",            points: "1200", status: "Enable" },
  { id: "15", type: "Electrician", name: "Electric Water Geyser",    points: "3500", status: "Enable" },
  { id: "14", type: "Electrician", name: "BLDS Ceiling Fan (5 Blade)", points: "2800", status: "Enable" },
  { id: "13", type: "Electrician", name: "BLDS Ceiling Fan (4 Blade)", points: "2400", status: "Enable" },
  { id: "12", type: "Electrician", name: "Electric Chimney",          points: "4500", status: "Enable" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
}

function StatCard({ icon: Icon, label, value, iconBg, iconColor, borderAccent }) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-2xl font-semibold text-slate-800">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{label}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GiftStorePage() {
  const [searchTerm,   setSearchTerm]   = useState("");
  const [actionOpen,   setActionOpen]   = useState(false);

  const filtered = giftsData.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const enabledCount  = giftsData.filter((g) => g.status === "Enable").length;
  const totalPoints   = giftsData.reduce((acc, g) => acc + parseInt(g.points), 0);

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <Gift className="text-amber-600" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Gift Store Inventory</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage rewards and points for SRV Electricals</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md">
          <Plus size={15} />
          Add New Gift
        </button>
      </div>

      {/* ── Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-3 gap-4">
        <StatCard icon={Gift}         label="Total Gifts"    value={giftsData.length} iconBg="bg-amber-100"  iconColor="text-amber-600"  borderAccent="border-t-amber-500"  />
        <StatCard icon={CheckCircle2} label="Active Gifts"   value={enabledCount}     iconBg="bg-green-100"  iconColor="text-green-600"  borderAccent="border-t-green-500"  />
        <StatCard icon={Award}        label="Max Points"     value="4,500"            iconBg="bg-purple-100" iconColor="text-purple-600" borderAccent="border-t-purple-500" />
      </div>

      {/* ── Search + Filter ── */}
      <SectionLabel>All Gifts</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search gifts..."
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

          {/* Action dropdown */}
          <div className="relative">
            <button
              onClick={() => setActionOpen(!actionOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all"
            >
              Bulk Action
              <ChevronDown size={14} className={`transition-transform duration-200 ${actionOpen ? "rotate-180" : ""}`} />
            </button>
            {actionOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden py-1">
                <p className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Bulk Options
                </p>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-green-50 hover:text-green-600 transition-colors">
                  <CheckCircle2 size={14} /> Enable Selected
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-amber-50 hover:text-amber-600 transition-colors">
                  <XCircle size={14} /> Disable Selected
                </button>
                <div className="h-px bg-slate-100 mx-2 my-1" />
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-rose-500 hover:bg-rose-50 transition-colors">
                  <Trash2 size={14} /> Delete Selected
                </button>
              </div>
            )}
          </div>
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
                {["ID", "Gift Detail", "Category", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((gift) => (
                <tr key={gift.id} className="hover:bg-slate-50 transition-colors duration-150 group">

                  {/* Checkbox */}
                  <td className="px-5 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>

                  {/* ID */}
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">
                    #{gift.id}
                  </td>

                  {/* Gift Detail */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center flex-shrink-0 group-hover:bg-amber-100 transition-colors">
                        <ImageIcon size={18} className="text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 whitespace-nowrap">{gift.name}</p>
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 bg-amber-50 text-amber-600 border border-amber-200 rounded-md text-[10px] font-semibold">
                          <Award size={10} />
                          {gift.points} pts
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                      {gift.type}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                      gift.status === "Enable"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-slate-100 text-slate-500 border-slate-200"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full inline-block ${gift.status === "Enable" ? "bg-green-500" : "bg-slate-400"}`} />
                      {gift.status}
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
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-400">
                    No gifts found matching{" "}
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
            <span className="text-slate-600 font-semibold">{giftsData.length}</span> gifts
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronLeft size={14} />
            </button>
            {[1, 2].map((n) => (
              <button
                key={n}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                  n === 1
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {n}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Backdrop for dropdown */}
      {actionOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setActionOpen(false)} />
      )}

    </div>
  );
}