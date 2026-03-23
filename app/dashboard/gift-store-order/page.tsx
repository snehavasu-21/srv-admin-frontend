"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx'; // Import for Excel Export
import { 
  Search, Filter, ChevronDown, ChevronLeft, ChevronRight,
  Download, Calendar, CheckCircle2, 
  XCircle, Trash2, Edit2, Eye, Printer,
  FileSpreadsheet, FileText
} from "lucide-react";

export default function GiftStoreOrderPage() {
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [orders] = useState([
    { id: "62", userName: "Manjeet singh", productName: "Electrician Bag", receiverName: "Nsjwja", receiverPhone: "7009524322", address: "X9HR+78 Green Valley Colony, Mansa, Punjab, India", points: "75", date: "2026-03-14", status: "Rejected" },
    { id: "61", userName: "Amit sihag", productName: "Electrician Bag", receiverName: "Sumit choudhary", receiverPhone: "8107844354", address: "Priya electrical gadakhera", points: "75", date: "2026-02-28", status: "Rejected" },
    { id: "60", userName: "Amit sihag", productName: "BLDS Ceiling Fan (4 Blade)", receiverName: "Sumit choudhary", receiverPhone: "8107844354", address: "Priya electrical gadakhera", points: "1500", date: "2026-02-26", status: "Rejected" },
    { id: "59", userName: "Anil", productName: "Drill Machine", receiverName: "Anil Kumar", receiverPhone: "6375055052", address: "6MR2+7RM, Shiv Colony, Chirawa, Rajasthan 333026, India", points: "750", date: "2026-02-13", status: "Delivered" },
    { id: "58", userName: "Sanjeev Kumar", productName: "Electrician Bag", receiverName: "SURAJ", receiverPhone: "7087734521", address: "Guru Har Sahai, Punjab 152022, India", points: "75", date: "2026-02-12", status: "Delivered" },
  ]);

  // --- EXPORT TO EXCEL FUNCTION ---
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, "SRV_Gift_Orders.xlsx");
    setIsActionOpen(false);
  };

  // --- PRINT / PDF FUNCTION ---
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-['Inter',sans-serif] text-[#1B254B]">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 print:hidden">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1B254B]">Manage User Redeem</h1>
          <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest italic">
            SRV Electricals <span className="mx-2 text-slate-300">|</span> Order Fulfillment
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
          >
            <Printer size={18} /> Print Report
          </button>
        </div>
      </div>

      {/* 2. FILTERS & SEARCH BAR */}
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-[24px] mb-8 shadow-sm border border-white print:hidden">
        <div className="flex flex-col xl:flex-row gap-4 items-end">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 w-full">
            <div className="md:col-span-1 relative">
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Search Order</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search here..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#4318FF]/10"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Redeem Status</label>
              <select className="w-full px-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl text-sm font-semibold outline-none cursor-pointer appearance-none">
                <option>All Status</option>
                <option>Delivered</option>
                <option>Rejected</option>
                <option>Pending</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Start Date</label>
              <input type="date" className="w-full px-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl text-sm font-semibold outline-none" />
            </div>
            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">End Date</label>
              <input type="date" className="w-full px-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl text-sm font-semibold outline-none" />
            </div>
          </div>
          <div className="flex gap-3 w-full xl:w-auto">
            <button className="flex-1 xl:flex-none px-8 py-2.5 bg-[#1D61E7] text-white rounded-xl font-bold text-sm shadow-md hover:bg-[#1652c9] transition-all">Apply</button>
            <button className="flex-1 xl:flex-none px-8 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">Reset</button>
          </div>
        </div>
      </div>

      {/* 3. MAIN DATA TABLE */}
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        
        <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-[#F9FAFC]/30 print:hidden">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
            <span className="text-xs font-bold text-slate-500">Select All Orders</span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="flex items-center gap-2 px-6 py-2 bg-[#1D61E7] text-white rounded-xl text-xs font-bold shadow-md"
            >
              Action <ChevronDown size={14} />
            </button>
            {isActionOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Bulk Actions</div>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
                  <CheckCircle2 size={16} /> Mark Delivered
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors">
                  <XCircle size={16} /> Mark Rejected
                </button>
                <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-y border-slate-50 my-1">Export Options</div>
                {/* FUNCTIONAL EXCEL EXPORT */}
                <button 
                  onClick={exportToExcel}
                  className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <FileSpreadsheet size={16} /> Export Excel
                </button>
                <button 
                  onClick={handlePrint}
                  className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                >
                  <Download size={16} /> Download PDF
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#F9FAFC]/50 border-b border-slate-50">
                <th className="p-5 w-12 text-center print:hidden"></th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Id</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">User / Product</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Receiver Info</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Address</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Points/Date</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Status</th>
                <th className="p-5 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-right print:hidden">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {orders.map((order) => (
                <tr key={order.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
                  <td className="p-5 text-center print:hidden">
                    <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
                  </td>
                  <td className="p-5">
                    <span className="text-sm font-medium text-slate-500 tracking-tight">{order.id}</span>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-[14px] text-[#1B254B]">{order.userName}</div>
                    <button className="text-[11px] text-[#4318FF] font-black flex items-center gap-1 mt-0.5 hover:underline print:text-black">
                      <Eye size={12} className="print:hidden" /> {order.productName}
                    </button>
                  </td>
                  <td className="p-5">
                    <div className="text-[13px] font-bold text-[#1B254B]">{order.receiverName}</div>
                    <div className="text-[11px] font-semibold text-slate-400">{order.receiverPhone}</div>
                  </td>
                  <td className="p-5">
                    <div className="max-w-[180px] text-[11px] leading-relaxed font-semibold text-slate-500 line-clamp-2 print:line-clamp-none">
                      {order.address}
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <div className="text-[13px] font-black text-emerald-600">{order.points} Pts</div>
                    <div className="text-[10px] text-slate-400 font-bold flex items-center justify-center gap-1 mt-1 uppercase tracking-tighter">
                      <Calendar size={10} /> {order.date}
                    </div>
                  </td>
                  <td className="p-5 text-center">
                    <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
                      order.status === 'Delivered' ? 'bg-[#05CD99] text-white shadow-emerald-100' : 'bg-[#EE5D50] text-white shadow-rose-100'
                    }`}>
                        {order.status}
                    </span>
                  </td>
                  <td className="p-5 text-right print:hidden">
                    <div className="flex items-center justify-end gap-2">
                       <button className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white rounded-xl transition-all shadow-sm">
                        <Edit2 size={14} />
                      </button>
                      <button className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-500 hover:text-white rounded-xl transition-all shadow-sm">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. PAGINATION FOOTER */}
        <div className="p-6 border-t border-slate-50 flex justify-end bg-white/50 print:hidden">
           <div className="flex items-center gap-2">
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronLeft size={18}/></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm shadow-xl shadow-[#4318FF]/20">1</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 font-bold text-sm">2</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronRight size={18}/></button>
           </div>
        </div>
      </div>

      {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
    </div>
  );
}