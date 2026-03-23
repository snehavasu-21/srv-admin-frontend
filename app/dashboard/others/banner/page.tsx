// "use client";

// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import { 
//   Search, ChevronDown, ChevronLeft, ChevronRight,
//   Trash2, Edit2, Plus, Layout, 
//   FileSpreadsheet, Image as ImageIcon, Eye, AlertCircle
// } from "lucide-react";

// export default function BannerPage() {
//   const [isActionOpen, setIsActionOpen] = useState(false);

//   // Data strictly based on your "Manage Banner" screenshot
//   const [banners] = useState([
//     { id: "18", name: "Mcb Distribution Boxes", image: "/banner1.jpg", status: "Enable" },
//     { id: "17", name: "Led Flood Lights", image: "/banner2.jpg", status: "Enable" },
//     { id: "15", name: "Automatic Change Over Switch", image: "/banner3.jpg", status: "Enable" },
//     { id: "14", name: "Appliances", image: "/banner4.jpg", status: "Enable" },
//     { id: "13", name: "Change Over Switch", image: "/banner5.jpg", status: "Enable" },
//   ]);

//   const exportBanners = () => {
//     const worksheet = XLSX.utils.json_to_sheet(banners);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Banners");
//     XLSX.writeFile(workbook, "SRV_Banners_Report.xlsx");
//     setIsActionOpen(false);
//   };

//   return (
//     <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-['Inter',sans-serif] text-[#1B254B]">
      
//       {/* 1. HEADER */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
//         <div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-[#1B254B]">Manage Banner</h1>
//           <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest italic">
//             SRV Electricals <span className="mx-2 text-slate-300">|</span> Homepage Hero Visuals
//           </p>
//         </div>
//         <button className="flex items-center gap-2 px-6 py-3.5 bg-[#1D61E7] text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-[#1652c9] transition-all w-fit">
//           <Plus size={18} /> Add Banner
//         </button>
//       </div>

//       {/* 2. SEARCH & FILTERS */}
//       <div className="bg-white/80 backdrop-blur-md p-5 rounded-[24px] mb-8 shadow-sm border border-white flex flex-col md:flex-row justify-between items-center gap-4">
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//           <input 
//             type="text" 
//             placeholder="Search banner name..." 
//             className="w-full pl-12 pr-4 py-3 bg-[#F4F7FE] border-none rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#4318FF]/10"
//           />
//         </div>

//         <div className="flex items-center gap-4 w-full md:w-auto">
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
//                 <button onClick={exportBanners} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600">
//                   <FileSpreadsheet size={16} /> Export Banners
//                 </button>
//                 <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50">
//                   <Trash2 size={16} /> Delete Selected
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 3. BANNER TABLE */}
//       <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-[#F9FAFC]/50 border-b border-slate-50">
//                 <th className="p-6 w-12 text-center"></th>
//                 <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Id</th>
//                 <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Banner Name</th>
//                 <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Banner Image</th>
//                 <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Status</th>
//                 <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Action</th>
//               </tr>
//             </thead>
            
//             <tbody className="divide-y divide-slate-50">
//               {banners.map((banner) => (
//                 <tr key={banner.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
//                   <td className="p-6 text-center">
//                     <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
//                   </td>
                  
//                   <td className="p-6">
//                     <span className="text-sm font-medium text-slate-400 tracking-tight">{banner.id}</span>
//                   </td>
                  
//                   <td className="p-6">
//                     <div className="flex items-center gap-3">
//                        <div className="p-2.5 bg-blue-50 text-[#1D61E7] rounded-xl">
//                          <Layout size={18} />
//                        </div>
//                        <span className="font-bold text-[15px] text-[#1B254B]">{banner.name}</span>
//                     </div>
//                   </td>

//                   <td className="p-6">
//                     <div className="flex justify-center">
//                       <div className="relative w-20 h-20 bg-slate-100 rounded-[20px] overflow-hidden border-4 border-white shadow-sm group-hover:shadow-md transition-all">
//                          {/* Placeholder colors simulating your screenshot thumbnails */}
//                          <div className={`absolute inset-0 flex items-center justify-center opacity-80 ${
//                            banner.id === '18' ? 'bg-blue-400' : 
//                            banner.id === '17' ? 'bg-indigo-600' :
//                            banner.id === '15' ? 'bg-purple-600' :
//                            banner.id === '14' ? 'bg-orange-400' : 'bg-blue-300'
//                          }`}>
//                             <ImageIcon size={20} className="text-white/40" />
//                          </div>
//                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 flex items-center justify-center transition-all">
//                             <Eye size={16} className="text-white opacity-0 group-hover:opacity-100 transition-all" />
//                          </div>
//                       </div>
//                     </div>
//                   </td>

//                   <td className="p-6 text-center">
//                     <button className="px-4 py-1.5 bg-[#05CD99] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm hover:scale-105 transition-transform">
//                       {banner.status}
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

//         {/* 4. PAGINATION */}
//         <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-white/50">
//            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
//              <AlertCircle size={14} /> {banners.length} Active Banners
//            </p>
//            <div className="flex items-center gap-2">
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronLeft size={18}/></button>
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm shadow-xl shadow-blue-200">1</button>
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
  Trash2, Edit2, Plus, Layout, 
  FileSpreadsheet, Image as ImageIcon, Eye, AlertCircle
} from "lucide-react";

export default function BannerPage() {
  const [isActionOpen, setIsActionOpen] = useState(false);

  // Data strictly based on your "Manage Banner" screenshot
  const [banners] = useState([
    { id: "18", name: "Mcb Distribution Boxes", image: "/banner1.jpg", status: "Enable" },
    { id: "17", name: "Led Flood Lights", image: "/banner2.jpg", status: "Enable" },
    { id: "15", name: "Automatic Change Over Switch", image: "/banner3.jpg", status: "Enable" },
    { id: "14", name: "Appliances", image: "/banner4.jpg", status: "Enable" },
    { id: "13", name: "Change Over Switch", image: "/banner5.jpg", status: "Enable" },
  ]);

  const exportBanners = () => {
    const worksheet = XLSX.utils.json_to_sheet(banners);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Banners");
    XLSX.writeFile(workbook, "SRV_Banners_Report.xlsx");
    setIsActionOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900">
      
      {/* 1. HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Banner</h1>
          <p className="text-sm text-slate-500 mt-0.5">SRV Electricals | Homepage Hero Visuals</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm">
          <Plus size={16} /> Add Banner
        </button>
      </div>

      {/* 2. SEARCH & FILTERS */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search banner name..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 mr-2">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
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
                <button onClick={exportBanners} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50">
                  <FileSpreadsheet size={14} /> Export Banners
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50">
                  <Trash2 size={14} /> Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. BANNER TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-4 w-12 text-center"></th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Id</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Banner Name</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Banner Image</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Status</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {banners.map((banner) => (
                <tr key={banner.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-5 py-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>
                  
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-slate-400">#{banner.id}</span>
                  </td>
                  
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg">
                         <Layout size={14} />
                       </div>
                       <span className="font-semibold text-sm text-slate-800">{banner.name}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-center">
                      <div className="relative w-14 h-14 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 group-hover:border-blue-200 transition-all">
                         <div className={`absolute inset-0 flex items-center justify-center opacity-60 ${
                            banner.id === '18' ? 'bg-blue-400' : 
                            banner.id === '17' ? 'bg-indigo-600' :
                            banner.id === '15' ? 'bg-purple-600' :
                            banner.id === '14' ? 'bg-orange-400' : 'bg-blue-300'
                         }`}>
                            <ImageIcon size={18} className="text-white" />
                         </div>
                         <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 flex items-center justify-center transition-all">
                            <Eye size={14} className="text-white opacity-0 group-hover:opacity-100" />
                         </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase border border-emerald-100 rounded-lg">
                      {banner.status}
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

        {/* 4. PAGINATION */}
        <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center bg-white">
           <p className="text-xs font-medium text-slate-400 flex items-center gap-2">
             <AlertCircle size={14} /> {banners.length} Active Banners
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