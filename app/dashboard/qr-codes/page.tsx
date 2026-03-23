"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Download, Calendar, Trash2, Edit2, Eye, 
  FileSpreadsheet, Plus, QrCode, Hash, Layers
} from "lucide-react";

export default function ManageQRCodePage() {
  const [isActionOpen, setIsActionOpen] = useState(false);

  // Data strictly based on your "Manage QR Codes" screenshot
  const [qrCodes] = useState([
    { id: "1195", productName: "CC RG 4\" 18/60 PC", batchNo: "1535", date: "2026-03-20", point: "2", qty: "4000" },
    { id: "1193", productName: "CC PL 4.5\" 24/60 PC", batchNo: "1534", date: "2026-03-20", point: "2", qty: "1000" },
    { id: "1192", productName: "CC NP 3.5\" 14/56 PC", batchNo: "1533", date: "2026-03-20", point: "1", qty: "3500" },
    { id: "1191", productName: "ACO 63A FP", batchNo: "1532", date: "2026-03-20", point: "50", qty: "40" },
    { id: "1190", productName: "ACO 63A DP", batchNo: "1531", date: "2026-03-20", point: "25", qty: "300" },
    { id: "1189", productName: "ACO 30A DP", batchNo: "1530", date: "2026-03-20", point: "15", qty: "500" },
    { id: "1188", productName: "MAIN SWCH 100A TP", batchNo: "1529", date: "2026-03-20", point: "50", qty: "5" },
  ]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(qrCodes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "QR_Codes");
    XLSX.writeFile(workbook, "SRV_QR_Codes_List.xlsx");
    setIsActionOpen(false);
  };

  return (
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-['Inter',sans-serif] text-[#1B254B]">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1B254B]">Manage QR Codes</h1>
          <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest italic">
            SRV Electricals <span className="mx-2 text-slate-300">|</span> Batch Generation Control
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#1D61E7] text-white rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-[#1652c9] transition-all w-fit">
          <Plus size={18} /> Add QR Code
        </button>
      </div>

      {/* 2. SEARCH & ACTION BAR */}
      <div className="bg-white/80 backdrop-blur-md p-5 rounded-[24px] mb-8 shadow-sm border border-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by product or batch..." 
            className="w-full pl-12 pr-4 py-3 bg-[#F4F7FE] border-none rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#4318FF]/10"
          />
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="flex items-center gap-2 mr-2">
            <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap">Select All</span>
          </div>
          
          <div className="relative w-full md:w-auto">
            <button 
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#1D61E7] text-white rounded-xl text-xs font-bold shadow-md"
            >
              Action <ChevronDown size={14} />
            </button>
            {isActionOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                <button onClick={exportToExcel} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-[#4318FF] transition-colors">
                  <FileSpreadsheet size={16} /> Bulk Export Excel
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors">
                  <Trash2 size={16} /> Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. QR CODES TABLE */}
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFC]/50 border-b border-slate-50">
                <th className="p-6 w-12 text-center"></th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Id</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Product Name</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Batch Details</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Points</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Quantity</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {qrCodes.map((qr) => (
                <tr key={qr.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
                  <td className="p-6 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
                  </td>
                  
                  <td className="p-6">
                    <span className="text-sm font-medium text-slate-400 tracking-tight">{qr.id}</span>
                  </td>
                  
                  <td className="p-6">
                    <div className="font-bold text-[14px] text-[#1B254B] flex items-center gap-2">
                       <QrCode size={16} className="text-[#4318FF]" /> {qr.productName}
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="flex flex-col gap-1">
                      <div className="text-[12px] font-bold text-slate-600 flex items-center gap-1">
                        <Hash size={12} /> {qr.batchNo}
                      </div>
                      <div className="text-[10px] font-black text-slate-400 flex items-center gap-1 uppercase">
                        <Calendar size={10} /> {qr.date}
                      </div>
                    </div>
                  </td>

                  <td className="p-6 text-center">
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg text-xs font-black">
                      {qr.point} Pts
                    </span>
                  </td>

                  <td className="p-6 text-center">
                    <div className="text-[14px] font-black text-[#1B254B] flex items-center justify-center gap-1">
                      <Layers size={14} className="text-slate-300" /> {qr.qty}
                    </div>
                  </td>

                  {/* ACTION ICONS BASED ON SCREENSHOT */}
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                       <button title="View" className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Eye size={18} />
                      </button>
                      <button title="Download" className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-lg transition-colors">
                        <Download size={18} />
                      </button>
                      <button title="Export Excel" className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <FileSpreadsheet size={18} />
                      </button>
                      <button title="Edit" className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button title="Delete" className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 size={18} />
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
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing 7 entries</p>
           <div className="flex items-center gap-2">
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronLeft size={18}/></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm shadow-xl shadow-[#4318FF]/20">1</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronRight size={18}/></button>
           </div>
        </div>
      </div>

      {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
    </div>
  );
}