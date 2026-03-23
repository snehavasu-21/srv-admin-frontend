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

  // Data based on SRV Electricals Batch Generation
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
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1B254B]">Manage QR Codes</h1>
          <p className="text-slate-500 text-sm font-medium italic">SRV Batch Generation Control</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#4318FF] text-white rounded-2xl font-bold text-sm shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] hover:bg-[#3311CC] transition-all">
          <Plus size={18} /> Add QR Code
        </button>
      </div>

      {/* SEARCH & ACTION BAR */}
      <div className="bg-white/80 backdrop-blur-md p-5 rounded-[24px] mb-8 shadow-sm border border-white flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search product or batch..." 
            className="w-full pl-12 pr-4 py-3 bg-[#F4F7FE] border-none rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#4318FF]/10 transition-all"
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
              className="w-full md:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-[#1D61E7] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#1652c9] transition-all"
            >
              Action <ChevronDown size={14} className={`transition-transform ${isActionOpen ? 'rotate-180' : ''}`} />
            </button>
            {isActionOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2">
                <button onClick={exportToExcel} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-[#4318FF] transition-colors">
                  <FileSpreadsheet size={16} /> Bulk Export Excel
                </button>
                <div className="h-[1px] bg-slate-50 my-1 mx-2"></div>
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors">
                  <Trash2 size={16} /> Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* QR CODES TABLE */}
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-50">
                <th className="p-6 w-12 text-center"></th>
                {["Id", "Product Name", "Batch Details", "Points", "Quantity", "Action"].map((head) => (
                  <th key={head} className={`p-6 text-[10px] font-black uppercase tracking-widest text-slate-900 ${head === "Action" ? "text-right" : head === "Points" || head === "Quantity" ? "text-center" : ""}`}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {qrCodes.map((qr) => (
                <tr key={qr.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
                  <td className="p-6 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
                  </td>
                  
                  <td className="p-6">
                    <span className="text-sm font-bold text-slate-400 ">{qr.id}</span>
                  </td>
                  
                  <td className="p-6">
                    <div className="font-medium text-[14px] text-[#1B254B] flex items-center gap-2 whitespace-nowrap">
                       
                       {qr.productName}
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="flex flex-col">
                      <div className="text-[12px] font-bold text-slate-700 flex items-center gap-1">
                        <Hash size={12} className="text-slate-400" /> {qr.batchNo}
                      </div>
                      <div className="text-[10px] font-black text-slate-400 flex items-center gap-1 uppercase mt-0.5">
                        <Calendar size={10} /> {qr.date}
                      </div>
                    </div>
                  </td>

                  <td className="p-6 text-center">
                    <span className="bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase border border-emerald-100/50">
                      {qr.point} Pts
                    </span>
                  </td>

                  <td className="p-6 text-center">
                    <div className="text-[14px] font-black text-[#1B254B] flex items-center justify-center gap-1.5">
                      <Layers size={14} className="text-slate-300" /> {qr.qty}
                    </div>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-1">
                       <button title="View" className="p-2 text-blue-500 hover:bg-blue-50 rounded-xl transition-all">
                        <Eye size={18} />
                      </button>
                      <button title="Download PDF" className="p-2 text-emerald-500 hover:bg-emerald-50 rounded-xl transition-all">
                        <Download size={18} />
                      </button>
                      <button title="Edit Batch" className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
                        <Edit2 size={18} />
                      </button>
                      <button title="Delete" className="p-2 text-rose-500 hover:bg-rose-50 rounded-xl transition-all">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-slate-50/20">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">SRV Batch Records</p>
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