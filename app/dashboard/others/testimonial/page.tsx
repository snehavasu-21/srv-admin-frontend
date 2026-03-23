// "use client";

// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import { 
//   Search, ChevronDown, ChevronLeft, ChevronRight,
//   Trash2, Edit2, Plus, Star, Quote,
//   FileSpreadsheet, UserCircle, MessageSquare
// } from "lucide-react";

// export default function TestimonialPage() {
//   const [isActionOpen, setIsActionOpen] = useState(false);

//   // Data strictly based on your "Manage Testimonial" screenshot
//   const [testimonials] = useState([
//     { id: "8", name: "Sandeep Mishra", image: "/user1.jpg", review: "Great app for dealers and electricians. Easy to check wholesale prices and cashback in one place.", rate: "5", status: "Enable" },
//     { id: "3", name: "Anil Patil", image: "/user2.jpg", review: "Very useful app for dealers. I can view all wholesale prices, ongoing offers, and cashback details in one place. Saves a lot of time!", rate: "4", status: "Enable" },
//     { id: "1", name: "Himal Datta", image: "/user3.jpg", review: "Great app for dealers and electricians. Easy to check wholesale prices and cashback in one place.", rate: "4", status: "Enable" },
//   ]);

//   const exportTestimonials = () => {
//     const worksheet = XLSX.utils.json_to_sheet(testimonials);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Testimonials");
//     XLSX.writeFile(workbook, "SRV_Testimonials.xlsx");
//     setIsActionOpen(false);
//   };

//   return (
//     <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-['Inter',sans-serif] text-[#1B254B]">
      
//       {/* 1. TOP HEADER */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
//         <div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-[#1B254B]">Manage Testimonial</h1>
//           <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest italic">
//             SRV Electricals <span className="mx-2 text-slate-300">|</span> Customer Social Proof
//           </p>
//         </div>
//         <button className="flex items-center gap-2 px-6 py-3.5 bg-[#1D61E7] text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-[#1652c9] transition-all w-fit">
//           <Plus size={18} /> Add Testimonial
//         </button>
//       </div>

//       {/* 2. SEARCH & ACTION BAR */}
//       <div className="bg-white/80 backdrop-blur-md p-5 rounded-[24px] mb-8 shadow-sm border border-white flex flex-col md:flex-row justify-between items-center gap-4">
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//           <input 
//             type="text" 
//             placeholder="Search by name or review..." 
//             className="w-full pl-12 pr-4 py-3 bg-[#F4F7FE] border-none rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#4318FF]/10"
//           />
//         </div>

//         <div className="flex items-center gap-4">
//           <div className="flex items-center gap-2 mr-2">
//             <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
//             <span className="text-xs font-bold text-slate-500">Select All</span>
//           </div>
          
//           <div className="relative">
//             <button 
//               onClick={() => setIsActionOpen(!isActionOpen)}
//               className="flex items-center gap-2 px-6 py-2.5 bg-[#1D61E7] text-white rounded-xl text-xs font-bold shadow-md"
//             >
//               Action <ChevronDown size={14} />
//             </button>
//             {isActionOpen && (
//               <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 py-2 animate-in fade-in slide-in-from-top-2">
//                 <button onClick={exportTestimonials} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
//                   <FileSpreadsheet size={16} /> Export Excel
//                 </button>
//                 <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors">
//                   <Trash2 size={16} /> Delete Selected
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 3. TESTIMONIAL DATA TABLE */}
//       <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-[#F9FAFC]/50 border-b border-slate-50">
//                 <th className="p-6 w-12 text-center"></th>
//                 <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Id</th>
//                 <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">User Info</th>
//                 <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Review</th>
//                 <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Rate</th>
//                 <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Status</th>
//                 <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Action</th>
//               </tr>
//             </thead>
            
//             <tbody className="divide-y divide-slate-50">
//               {testimonials.map((item) => (
//                 <tr key={item.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
//                   <td className="p-6 text-center">
//                     <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
//                   </td>
                  
//                   <td className="p-6">
//                     <span className="text-sm font-medium text-slate-400">{item.id}</span>
//                   </td>
                  
//                   <td className="p-6">
//                     <div className="flex items-center gap-4">
//                       <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-white shadow-sm shrink-0">
//                          {/* Placeholder image for user */}
//                          <div className="absolute inset-0 bg-slate-100 flex items-center justify-center text-slate-400">
//                             <UserCircle size={24} />
//                          </div>
//                       </div>
//                       <div className="font-bold text-[14px] text-[#1B254B] truncate max-w-[120px]">
//                         {item.name}
//                       </div>
//                     </div>
//                   </td>

//                   <td className="p-6">
//                     <div className="relative max-w-[400px]">
//                       <Quote className="absolute -left-2 -top-2 text-blue-100 -z-10" size={32} />
//                       <p className="text-[13px] leading-relaxed font-semibold text-slate-500 italic line-clamp-2">
//                         {item.review}
//                       </p>
//                     </div>
//                   </td>

//                   <td className="p-6 text-center">
//                     <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-600 rounded-xl">
//                       <Star size={14} fill="currentColor" />
//                       <span className="text-sm font-black">{item.rate}</span>
//                     </div>
//                   </td>

//                   <td className="p-6 text-center">
//                     <button className="px-4 py-1.5 bg-[#05CD99] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm shadow-emerald-50">
//                       {item.status}
//                     </button>
//                   </td>

//                   <td className="p-6 text-right">
//                     <div className="flex items-center justify-end gap-2">
//                        <button title="Edit" className="p-3 bg-amber-400 text-white rounded-2xl shadow-md hover:scale-105 transition-all">
//                         <Edit2 size={16} />
//                       </button>
//                       <button title="Delete" className="p-3 bg-[#EE5D50] text-white rounded-2xl shadow-md hover:scale-105 transition-all">
//                         <Trash2 size={16} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* 4. FOOTER */}
//         <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-white/50">
//            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
//              <MessageSquare size={14} /> 3 Reviews Posted
//            </p>
//            <div className="flex items-center gap-2">
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronLeft size={18}/></button>
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm shadow-lg shadow-blue-200">1</button>
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronRight size={18}/></button>
//            </div>
//         </div>
//       </div>

//       {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
//     </div>
//   );
// }




"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Trash2, Edit2, Plus, Star, Quote,
  FileSpreadsheet, UserCircle, MessageSquare, AlertCircle
} from "lucide-react";

export default function TestimonialPage() {
  const [isActionOpen, setIsActionOpen] = useState(false);

  // Data strictly based on your "Manage Testimonial" screenshot
  const [testimonials] = useState([
    { id: "8", name: "Sandeep Mishra", image: "/user1.jpg", review: "Great app for dealers and electricians. Easy to check wholesale prices and cashback in one place.", rate: "5", status: "Enable" },
    { id: "3", name: "Anil Patil", image: "/user2.jpg", review: "Very useful app for dealers. I can view all wholesale prices, ongoing offers, and cashback details in one place. Saves a lot of time!", rate: "4", status: "Enable" },
    { id: "1", name: "Himal Datta", image: "/user3.jpg", review: "Great app for dealers and electricians. Easy to check wholesale prices and cashback in one place.", rate: "4", status: "Enable" },
  ]);

  const exportTestimonials = () => {
    const worksheet = XLSX.utils.json_to_sheet(testimonials);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Testimonials");
    XLSX.writeFile(workbook, "SRV_Testimonials_Report.xlsx");
    setIsActionOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Testimonial</h1>
          <p className="text-sm text-slate-500 mt-0.5">SRV Electricals | Customer Social Proof</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm">
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {/* 2. SEARCH & ACTION BAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search by name or review..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 mr-2">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
            <span className="text-xs font-semibold text-slate-500">Select All</span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all"
            >
              Action <ChevronDown size={14} />
            </button>
            {isActionOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2">
                <button onClick={exportTestimonials} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  <FileSpreadsheet size={14} /> Export Excel
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
                  <Trash2 size={14} /> Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. TESTIMONIAL DATA TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-4 w-12 text-center"></th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Id</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">User Info</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Review</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Rate</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Status</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {testimonials.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-5 py-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>
                  
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-slate-400">#{item.id}</span>
                  </td>
                  
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-400 shrink-0 border border-slate-200 group-hover:border-blue-200 transition-all">
                        <UserCircle size={20} />
                      </div>
                      <span className="font-semibold text-sm text-slate-800">{item.name}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="relative max-w-[380px]">
                      <Quote className="absolute -left-2 -top-1.5 text-blue-500/10" size={24} />
                      <p className="text-xs leading-relaxed text-slate-500 italic line-clamp-2 pl-4">
                        {item.review}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-600 border border-amber-100 rounded-lg">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-bold">{item.rate}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase border border-emerald-100 rounded-lg">
                      {item.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button title="Edit" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                        <Edit2 size={14} />
                      </button>
                      <button title="Delete" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. FOOTER */}
        <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center bg-white">
           <p className="text-xs font-medium text-slate-400 flex items-center gap-2">
             <MessageSquare size={14} /> {testimonials.length} Reviews Found
           </p>
           <div className="flex items-center gap-1.5">
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
               <ChevronLeft size={14}/>
             </button>
             <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm">1</button>
             <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
               <ChevronRight size={14}/>
             </button>
           </div>
        </div>
      </div>

      {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
    </div>
  );
}