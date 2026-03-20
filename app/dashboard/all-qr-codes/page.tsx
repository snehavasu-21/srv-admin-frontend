"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronLeft, ChevronRight, 
  Download, QrCode, Calendar, 
  FileArchive, ShieldCheck, Clock
} from "lucide-react";

export default function AllQRCodesPage() {
  // Data strictly based on your "View QR Codes" screenshot
  const [qrList] = useState([
    { id: "7332367", codeNumber: "53989E0ECE445F602DA2", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332370", codeNumber: "4C2CAA73057FBF8446C5", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332374", codeNumber: "4D71FB18B8A7765F9A71", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332369", codeNumber: "031D61E28AAAD67E7303", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332372", codeNumber: "EFD79117BEB99819F7C5", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332371", codeNumber: "7EEED61AE16CAC02F941", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
  ]);

  const exportAllData = () => {
    const worksheet = XLSX.utils.json_to_sheet(qrList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All_QR_Codes");
    XLSX.writeFile(workbook, "SRV_All_QR_Data.xlsx");
  };

  return (
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-['Inter',sans-serif] text-[#1B254B]">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1B254B]">View QR Codes</h1>
          <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest italic">
            SRV Electricals <span className="mx-2 text-slate-300">|</span> Complete QR Inventory
          </p>
        </div>
        
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search QR Number..." 
            className="w-full pl-12 pr-4 py-3 bg-white border-none rounded-2xl text-sm font-semibold shadow-sm focus:ring-2 focus:ring-[#4318FF]/10 outline-none"
          />
        </div>
      </div>

      {/* 2. DOWNLOAD ALL ACTION */}
      <div className="mb-6">
        <button 
          onClick={exportAllData}
          className="flex items-center gap-3 px-6 py-3.5 bg-[#1D61E7] text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-[#1652c9] transition-all"
        >
          <FileArchive size={20} /> Download All (Excel + ZIP)
        </button>
      </div>

      {/* 3. QR CODES DATA TABLE */}
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F9FAFC]/50 border-b border-slate-50">
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Id</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">QR Code Number</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">QR Image</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Point</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Batch</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Gen / Redeem Date</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Redeem Status</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {qrList.map((qr) => (
                <tr key={qr.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
                  <td className="p-5">
                    <span className="text-xs font-bold text-slate-400">{qr.id}</span>
                  </td>
                  
                  <td className="p-5">
                    <div className="text-[13px] font-bold text-[#1B254B] font-mono tracking-tight bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                      {qr.codeNumber}
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="flex justify-center">
                      <div className="p-1.5 bg-white border-2 border-slate-100 rounded-xl shadow-sm group-hover:border-[#4318FF]/20 transition-colors">
                        <QrCode size={42} className="text-[#1B254B]" strokeWidth={1.5} />
                      </div>
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                      {qr.points}
                    </span>
                  </td>

                  <td className="p-5 text-center text-[13px] font-bold text-slate-500">
                    {qr.batch}
                  </td>

                  <td className="p-5">
                    <div className="flex flex-col gap-1">
                      <div className="text-[11px] font-black text-slate-400 flex items-center gap-1.5 uppercase">
                        <Clock size={12} className="text-blue-400" /> Gen: {qr.genDate}
                      </div>
                      <div className="text-[11px] font-black text-slate-400 flex items-center gap-1.5 uppercase">
                        <ShieldCheck size={12} className="text-emerald-400" /> Red: {qr.redeemDate}
                      </div>
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <span className="px-4 py-1.5 bg-[#EE5D50] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm shadow-rose-100">
                      {qr.status}
                    </span>
                  </td>

                  <td className="p-5 text-right">
                    <button className="px-5 py-2 bg-[#1D61E7]/10 text-[#1D61E7] hover:bg-[#1D61E7] hover:text-white rounded-xl text-xs font-black transition-all flex items-center gap-2 ml-auto shadow-sm">
                      <Download size={14} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION */}
        <div className="p-6 border-t border-slate-50 flex justify-end bg-white/50">
           <div className="flex items-center gap-2">
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronLeft size={18}/></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm">1</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 font-bold text-sm">2</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronRight size={18}/></button>
           </div>
        </div>
      </div>
    </div>
  );
}