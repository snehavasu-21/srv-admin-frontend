"use client";

import React, { useState } from 'react';
import { 
  Search, Plus, FileDown, 
  ChevronLeft, ChevronRight, 
  Filter, ArrowUpRight 
} from "lucide-react";

export default function WalletHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [history] = useState([
    { id: "24457", userName: "Amarjeet singh", description: "You have earned 0.5 from Junction Box 1 QRcode.", date: "2026-03-20 10:07:53", point: "0.5", type: "Credit" },
    { id: "24456", userName: "Varinder", description: "You have earned 1 from FDB 4\" 19/40 PC QRcode.", date: "2026-03-20 10:07:18", point: "1", type: "Credit" },
    { id: "24455", userName: "Amarjeet singh", description: "You have earned 0.5 from Junction Box 1 QRcode.", date: "2026-03-20 10:06:18", point: "0.5", type: "Credit" },
    { id: "24454", userName: "Amarjeet singh", description: "You have earned 0.5 from Junction Box 1 QRcode.", date: "2026-03-20 10:05:31", point: "0.5", type: "Credit" },
    { id: "24453", userName: "Amarjeet singh", description: "You have earned 0.5 from Junction Box 1 QRcode.", date: "2026-03-20 10:03:59", point: "0.5", type: "Credit" },
    { id: "24452", userName: "Jagjeevan sharma", description: "You have earned 5 from 9x3 6L HZ Draw QRcode.", date: "2026-03-20 10:03:42", point: "5", type: "Credit" },
    { id: "24451", userName: "Amarjeet singh", description: "You have earned 0.5 from Junction Box 1 QRcode.", date: "2026-03-20 10:03:01", point: "0.5", type: "Credit" },
    { id: "24450", userName: "Jagjeevan sharma", description: "You have earned 5 from 9x3 6L HZ Draw QRcode.", date: "2026-03-20 10:02:52", point: "5", type: "Credit" },
  ]);

  const filteredHistory = history.filter(item => 
    item.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Wallet History</h1>
          <p className="text-slate-500 text-sm font-medium">Track all points and transactions</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold shadow-sm border border-slate-200 text-sm">
            <FileDown size={18} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4318FF] text-white rounded-xl hover:bg-[#3311CC] transition-all font-bold shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] text-sm">
            <Plus size={18} /> Add wallet history
          </button>
        </div>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-white mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
            <select className="border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none bg-[#F4F7FE] text-slate-600 min-w-[150px]">
                <option>All User</option>
                <option>Electrician</option>
                <option>Dealer</option>
            </select>
            <div className="relative flex-1 md:w-80 lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search here..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-[#4318FF] outline-none text-sm font-medium transition-all"
                />
            </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F4F7FE] text-slate-600 rounded-xl text-sm font-bold border-none hover:bg-slate-100 transition-all">
            <Filter size={16} /> Filters
        </button>
      </div>

      {/* MAIN TABLE SECTION */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="p-5 w-12 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
                </th>
                {["Id", "User Name", "Wallet Description", "Transaction Date", "Point", "Payment Type"].map((head) => (
                  <th key={head} className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-all duration-200">
                  <td className="p-5 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
                  </td>
                  <td className="p-5 text-sm font-bold text-slate-500">{item.id}</td>
                  <td className="p-5">
                    <div className="font-bold text-[#1B254B] text-sm">
                        {item.userName}
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="text-xs text-slate-600 font-medium max-w-[320px] leading-relaxed">
                        {item.description}
                    </div>
                  </td>
                  <td className="p-5 text-xs font-bold text-slate-500 whitespace-nowrap">
                    {item.date}
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-1.5 text-[#05CD99] font-bold">
                        <ArrowUpRight size={14} />
                        <span className="text-sm">{item.point}</span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider border bg-emerald-50 text-emerald-600 border-emerald-100">
                      {item.type}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-5 border-t border-slate-50 flex justify-between items-center bg-[#fcfcfc]">
           <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Showing {filteredHistory.length} Entries</span>
           <div className="flex items-center gap-2">
             <button className="p-2 rounded-lg bg-[#F4F7FE] hover:bg-slate-100 transition-all text-slate-600"><ChevronLeft size={16}/></button>
             <button className="w-8 h-8 rounded-lg bg-[#4318FF] text-white font-bold text-xs shadow-md">1</button>
             <button className="w-8 h-8 rounded-lg bg-transparent text-slate-400 font-bold text-xs hover:bg-[#F4F7FE]">2</button>
             <button className="p-2 rounded-lg bg-[#F4F7FE] hover:bg-slate-100 transition-all text-slate-600"><ChevronRight size={16}/></button>
           </div>
        </div>
      </div>
    </div>
  );
}