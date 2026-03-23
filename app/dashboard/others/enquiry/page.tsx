// "use client";

// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import { 
//   Search, ChevronDown, ChevronLeft, ChevronRight,
//   Trash2, Edit2, MessageSquare, User, 
//   Clock, CheckCircle, FileSpreadsheet, Filter
// } from "lucide-react";

// export default function EnquiryPage() {
//   const [isActionOpen, setIsActionOpen] = useState(false);

//   // Data strictly based on your "Manage Inquiry" screenshot
//   const [enquiries] = useState([
//     { id: "9", userName: "Satnam Panchal", subject: "Scan problem", comment: "Scan problem aya raha h", response: "", type: "Pending", status: "Enable" },
//     { id: "8", userName: "-", subject: "Attention", comment: "Hi", response: "", type: "Pending", status: "Enable" },
//     { id: "7", userName: "HarpreetSinghSidhu", subject: "HarpreetSinghSidhu", comment: "Ok", response: "", type: "Pending", status: "Enable" },
//     { id: "6", userName: "NIKHIL SAINI", subject: "Pending my reward points", comment: "Pending my reward points", response: "When did you place your gift order and What was the shipping address", type: "In review", status: "Enable" },
//     { id: "5", userName: "Balvinder singh", subject: "New abadi gurdwara street 3 fazilka", comment: "New abadi gurdwara street 3 fazilka", response: "Sorry, I am unable to understand why you mention the address ?", type: "In review", status: "Enable" },
//   ]);

//   const exportEnquiries = () => {
//     const worksheet = XLSX.utils.json_to_sheet(enquiries);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
//     XLSX.writeFile(workbook, "SRV_Enquiry_Report.xlsx");
//     setIsActionOpen(false);
//   };

//   return (
//     <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-['Inter',sans-serif] text-[#1B254B]">
      
//       {/* 1. HEADER */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
//         <div>
//           <h1 className="text-3xl font-extrabold tracking-tight text-[#1B254B]">Manage Inquiry</h1>
//           <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest italic">
//             SRV Electricals <span className="mx-2 text-slate-300">|</span> Customer Support Portal
//           </p>
//         </div>
        
//         <div className="relative w-full lg:w-96">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//           <input 
//             type="text" 
//             placeholder="Search enquiries..." 
//             className="w-full pl-12 pr-4 py-3 bg-white border-none rounded-2xl text-sm font-semibold shadow-sm focus:ring-2 focus:ring-[#4318FF]/10 outline-none"
//           />
//         </div>
//       </div>

//       {/* 2. FILTERS & BULK ACTIONS */}
//       <div className="bg-white/80 backdrop-blur-md p-5 rounded-[24px] mb-8 shadow-sm border border-white flex flex-col md:flex-row justify-between items-center gap-4">
//         <div className="flex items-center gap-4 w-full md:w-auto">
//           <div className="relative group w-full md:w-48">
//              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
//              <select className="w-full pl-9 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl text-xs font-bold text-slate-600 outline-none cursor-pointer appearance-none">
//                <option>Inquiry Type</option>
//                <option>Pending</option>
//                <option>In Review</option>
//              </select>
//           </div>
//         </div>

//         <div className="flex items-center gap-3 w-full md:w-auto">
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
//                 <button onClick={exportEnquiries} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600">
//                   <FileSpreadsheet size={16} /> Export to Excel
//                 </button>
//                 <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50">
//                   <Trash2 size={16} /> Delete Selected
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* 3. ENQUIRY TABLE */}
//       <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-[#F9FAFC]/50 border-b border-slate-50">
//                 <th className="p-5 w-12 text-center"></th>
//                 <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Id</th>
//                 <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">User Name</th>
//                 <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Inquiry Subject / Comment</th>
//                 <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Inquiry Response</th>
//                 <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Inquiry Type</th>
//                 <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Status</th>
//                 <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Action</th>
//               </tr>
//             </thead>
            
//             <tbody className="divide-y divide-slate-50">
//               {enquiries.map((item) => (
//                 <tr key={item.id} className="group hover:bg-[#F4F7FE]/50 transition-all">
//                   <td className="p-5 text-center">
//                     <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
//                   </td>
//                   <td className="p-5 text-xs font-bold text-slate-400">{item.id}</td>
//                   <td className="p-5">
//                     <div className="flex items-center gap-2">
//                       <div className="p-2 bg-blue-50 text-[#4318FF] rounded-lg"><User size={14}/></div>
//                       <span className="text-[13px] font-bold text-[#1B254B]">{item.userName || "N/A"}</span>
//                     </div>
//                   </td>
//                   <td className="p-5">
//                     <div className="text-[13px] font-extrabold text-[#1B254B] mb-1">{item.subject}</div>
//                     <div className="text-[11px] font-medium text-slate-500 max-w-[200px] line-clamp-2 italic">"{item.comment}"</div>
//                   </td>
//                   <td className="p-5">
//                     {item.response ? (
//                       <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50/50 p-2 rounded-lg border border-emerald-100 flex gap-2">
//                         <MessageSquare size={12} className="shrink-0 mt-0.5" />
//                         {item.response}
//                       </div>
//                     ) : (
//                       <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">No Response Yet</span>
//                     )}
//                   </td>
//                   <td className="p-5 text-center">
//                     <div className="flex flex-col items-center gap-1">
//                       {item.type === "Pending" ? (
//                         <span className="flex items-center gap-1 text-[10px] font-black text-amber-500 uppercase"><Clock size={10}/> Pending</span>
//                       ) : (
//                         <span className="flex items-center gap-1 text-[10px] font-black text-blue-500 uppercase"><CheckCircle size={10}/> In Review</span>
//                       )}
//                     </div>
//                   </td>
//                   <td className="p-5 text-center">
//                     <button className="px-4 py-1.5 bg-[#05CD99] text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-sm">
//                       {item.status}
//                     </button>
//                   </td>
//                   <td className="p-5 text-right">
//                     <div className="flex items-center justify-end gap-2">
//                        <button className="p-2.5 bg-amber-400 text-white rounded-xl shadow-md hover:scale-105 transition-transform"><Edit2 size={14}/></button>
//                        <button className="p-2.5 bg-[#EE5D50] text-white rounded-xl shadow-md hover:scale-105 transition-transform"><Trash2 size={14}/></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="p-6 border-t border-slate-50 flex justify-end bg-white/50">
//            <div className="flex items-center gap-2">
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 transition-all"><ChevronLeft size={18}/></button>
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm">1</button>
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 transition-all"><ChevronRight size={18}/></button>
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
  Trash2, Edit2, MessageSquare, User, 
  Clock, CheckCircle, FileSpreadsheet, Filter
} from "lucide-react";

export default function EnquiryPage() {
  const [isActionOpen, setIsActionOpen] = useState(false);

  // Data strictly based on your "Manage Inquiry" screenshot
  const [enquiries] = useState([
    { id: "9", userName: "Satnam Panchal", subject: "Scan problem", comment: "Scan problem aya raha h", response: "", type: "Pending", status: "Enable" },
    { id: "8", userName: "-", subject: "Attention", comment: "Hi", response: "", type: "Pending", status: "Enable" },
    { id: "7", userName: "HarpreetSinghSidhu", subject: "HarpreetSinghSidhu", comment: "Ok", response: "", type: "Pending", status: "Enable" },
    { id: "6", userName: "NIKHIL SAINI", subject: "Pending my reward points", comment: "Pending my reward points", response: "When did you place your gift order and What was the shipping address", type: "In review", status: "Enable" },
    { id: "5", userName: "Balvinder singh", subject: "New abadi gurdwara street 3 fazilka", comment: "New abadi gurdwara street 3 fazilka", response: "Sorry, I am unable to understand why you mention the address ?", type: "In review", status: "Enable" },
  ]);

  const exportEnquiries = () => {
    const worksheet = XLSX.utils.json_to_sheet(enquiries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
    XLSX.writeFile(workbook, "SRV_Enquiry_Report.xlsx");
    setIsActionOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900">
      
      {/* 1. HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Inquiry</h1>
          <p className="text-sm text-slate-500 mt-0.5">SRV Electricals | Customer Support Portal</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search enquiries..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 2. FILTERS & BULK ACTIONS */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
             <select className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 outline-none cursor-pointer appearance-none hover:bg-slate-100 transition-all">
               <option>Inquiry Type</option>
               <option>Pending</option>
               <option>In Review</option>
             </select>
             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 mr-2">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
            <span className="text-xs font-semibold text-slate-500">Select All</span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
            >
              Action <ChevronDown size={14} />
            </button>
            {isActionOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2">
                <button onClick={exportEnquiries} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  <FileSpreadsheet size={14} /> Export to Excel
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
                  <Trash2 size={14} /> Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. ENQUIRY TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-4 w-12 text-center"></th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Id</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">User Name</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Inquiry Subject / Comment</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Inquiry Response</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Inquiry Type</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Status</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {enquiries.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-5 py-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">#{item.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg">
                        <User size={14}/>
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{item.userName || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-bold text-slate-800 mb-0.5">{item.subject}</div>
                    <div className="text-xs text-slate-500 max-w-[220px] line-clamp-2 italic">"{item.comment}"</div>
                  </td>
                  <td className="px-5 py-4">
                    {item.response ? (
                      <div className="text-[11px] leading-relaxed font-medium text-emerald-700 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100 flex gap-2">
                        <MessageSquare size={12} className="shrink-0 mt-0.5 text-emerald-500" />
                        {item.response}
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">Pending Response</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex justify-center">
                      {item.type === "Pending" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold uppercase border border-amber-100">
                          <Clock size={10}/> Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold uppercase border border-blue-100">
                          <CheckCircle size={10}/> In Review
                        </span>
                      )}
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
                        <Edit2 size={14}/>
                       </button>
                       <button title="Delete" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all">
                        <Trash2 size={14}/>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center bg-white">
          <p className="text-xs font-medium text-slate-400">Showing {enquiries.length} customer inquiries</p>
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