"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronLeft, ChevronRight, 
  Download, QrCode, Calendar, 
  FileArchive, ShieldCheck, Clock
} from "lucide-react";

export default function AllQRCodesPage() {
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
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1B254B]">View QR Codes</h1>
          <p className="text-slate-500 text-sm font-medium">Complete QR Inventory for SRV Electricals</p>
        </div>
        
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search QR Number..." 
            className="w-full pl-12 pr-4 py-3 bg-white border-none rounded-2xl text-sm font-medium shadow-sm focus:ring-2 focus:ring-[#4318FF]/10 outline-none transition-all"
          />
        </div>
      </div>

      {/* DOWNLOAD ALL ACTION */}
      <div className="mb-8">
        <button 
          onClick={exportAllData}
          className="flex items-center gap-3 px-8 py-4 bg-[#4318FF] text-white rounded-2xl font-bold text-sm shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] hover:bg-[#3311CC] transition-all"
        >
          <FileArchive size={20} /> Download All (Excel + ZIP)
        </button>
      </div>

      {/* QR CODES DATA TABLE */}
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-50">
                {["Id", "QR Code Number", "QR Image", "Point", "Batch", "Gen / Redeem Date", "Status", "Action"].map((head) => (
                  <th key={head} className={`p-5 text-[10px] font-black uppercase tracking-widest text-slate-900 ${head === "Action" ? "text-right" : head === "QR Image" || head === "Point" || head === "Batch" || head === "Status" ? "text-center" : ""}`}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {qrList.map((qr) => (
                <tr key={qr.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
                  <td className="p-5">
                    <span className="text-xs font-bold text-slate-400 ">{qr.id}</span>
                  </td>
                  
                  <td className="p-5">
                    <div className="text-[13px] font-bold text-[#1B254B] font-mono tracking-tight bg-slate-50 px-3 py-2 rounded-xl border border-slate-100 group-hover:border-blue-100 transition-colors">
                      {qr.codeNumber}
                    </div>
                  </td>

                  <td className="p-5">
                    <div className="flex justify-center">
                      <div className="p-2 bg-white border-2 border-slate-100 rounded-2xl shadow-sm group-hover:border-[#4318FF]/20 group-hover:shadow-md transition-all duration-300">
                        <QrCode size={40} className="text-[#1B254B]" strokeWidth={1.5} />
                      </div>
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <span className="text-sm font-black text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-xl border border-emerald-100/50">
                      {qr.points}
                    </span>
                  </td>

                  <td className="p-5 text-center text-[13px] font-bold text-slate-600">
                    <span className="bg-slate-100 px-3 py-1 rounded-lg">B-{qr.batch}</span>
                  </td>

                  <td className="p-5">
                    <div className="flex flex-col gap-1.5">
                      <div className="text-[10px] font-black text-slate-400 flex items-center gap-1.5 uppercase">
                        <Clock size={12} className="text-blue-400" /> <span className="text-slate-600">Gen:</span> {qr.genDate}
                      </div>
                      <div className="text-[10px] font-black text-slate-400 flex items-center gap-1.5 uppercase">
                        <ShieldCheck size={12} className="text-emerald-400" /> <span className="text-slate-600">Red:</span> {qr.redeemDate}
                      </div>
                    </div>
                  </td>

                  <td className="p-5 text-center">
                    <span className="px-4 py-2 bg-[#EE5D50] text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-sm shadow-rose-100">
                      {qr.status}
                    </span>
                  </td>

                  <td className="p-5 text-right">
                    <button className="px-5 py-2.5 bg-[#4318FF]/10 text-[#4318FF] hover:bg-[#4318FF] hover:text-white rounded-xl text-[11px] font-black transition-all flex items-center gap-2 ml-auto shadow-sm group-hover:shadow-md">
                      <Download size={14} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION FOOTER */}
        <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-slate-50/20">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Showing 6 entries in inventory</p>
           <div className="flex items-center gap-2">
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronLeft size={18}/></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm shadow-xl shadow-[#4318FF]/20">1</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-all">2</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronRight size={18}/></button>
           </div>
        </div>
      </div>
    </div>
  );
}