"use client";

import React, { useState } from 'react';
import { 
  Search, FileDown, 
  ChevronLeft, ChevronRight, 
  Filter, Edit2, CheckCircle2,
  ArrowDownCircle
} from "lucide-react";

export default function WithdrawalPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Data as per your Manage Withdrawal screenshot
  const [withdrawals] = useState([
    { id: "187", userId: "1640", userName: "Pradeep Kumar", phone: "9829555400", date: "2026-03-19", upiId: "9829555400@ybl", points: "350", status: "Approved" },
    { id: "186", userId: "1203", userName: "Sanjeev Kumar", phone: "7087734521", date: "2026-03-18", upiId: "sk21700146602@okaxis", points: "115", status: "Approved" },
    { id: "185", userId: "794", userName: "Gurpreet Singh", phone: "9781332040", date: "2026-03-18", upiId: "gff9656@okicici", points: "100", status: "Approved" },
    { id: "184", userId: "1515", userName: "Manoj Sharma", phone: "9467698393", date: "2026-03-18", upiId: "manojsharmahr1998@oksbi", points: "197.7", status: "Approved" },
    { id: "183", userId: "3072", userName: "Angrej Singh", phone: "7710369844", date: "2026-03-18", upiId: "angrejrajpooto7-1@okaxis", points: "100", status: "Approved" },
    { id: "182", userId: "1641", userName: "Amit sihag", phone: "8107844354", date: "2026-03-18", upiId: "8107844354@ybl", points: "220", status: "Approved" },
    { id: "181", userId: "869", userName: "Pankaj", phone: "8847095790", date: "2026-03-17", upiId: "pankaj38748@okhdfcbank", points: "200", status: "Approved" },
    { id: "180", userId: "2565", userName: "Rajdeep Singh", phone: "9915479580", date: "2026-03-16", upiId: "rajdeep2749@okicici", points: "453", status: "Approved" },
  ]);

  const filteredData = withdrawals.filter(item => 
    item.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.upiId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Withdrawal</h1>
          <p className="text-slate-500 text-sm font-medium">Review and process user payout requests</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold shadow-sm border border-slate-200 text-sm">
            <FileDown size={18} /> CSV Export
          </button>
        </div>
      </div>

      {/* SEARCH & FILTERS */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-white mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-4 w-full md:w-auto">
            <select className="border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none bg-[#F4F7FE] text-slate-600 min-w-[150px]">
                <option>All User</option>
                <option>Pending</option>
                <option>Approved</option>
            </select>
            <div className="relative flex-1 md:w-80 lg:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by name or UPI..." 
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

      {/* TABLE SECTION */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="p-5 w-12 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
                </th>
                {["Id", "User Details", "Contact Info", "Withdrawal Details", "UPI ID", "Status", "Action"].map((head) => (
                  <th key={head} className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-all duration-200">
                  <td className="p-5 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
                  </td>
                  <td className="p-5 text-sm font-bold text-slate-500">{item.id}</td>
                  <td className="p-5">
                    <div className="font-bold text-[#1B254B] text-sm">{item.userName}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">User ID: {item.userId}</div>
                  </td>
                  <td className="p-5 text-sm font-bold text-[#1B254B]">
                    {item.phone}
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-rose-500 font-bold text-sm">
                        <ArrowDownCircle size={16} className="text-rose-400" />
                        {item.points} Points
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium mt-0.5">{item.date}</div>
                  </td>
                  <td className="p-5">
                    <div className="text-xs font-bold text-[#4318FF] bg-blue-50 px-2 py-1 rounded-lg inline-block">
                        {item.upiId}
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-[10px] uppercase border border-emerald-100 w-fit">
                        <CheckCircle2 size={12} />
                        {item.status}
                    </div>
                  </td>
                  <td className="p-5">
                    <button className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-xl transition-all shadow-sm">
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-5 border-t border-slate-50 flex justify-between items-center bg-[#fcfcfc]">
           <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Page 1 of 19</span>
           <div className="flex items-center gap-2">
             <button className="p-2 rounded-lg bg-[#F4F7FE] hover:bg-slate-100 transition-all text-slate-600"><ChevronLeft size={16}/></button>
             <button className="w-8 h-8 rounded-lg bg-[#4318FF] text-white font-bold text-xs shadow-md">1</button>
             <button className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-400 font-bold text-xs hover:bg-[#F4F7FE]">2</button>
             <button className="p-2 rounded-lg bg-[#F4F7FE] hover:bg-slate-100 transition-all text-slate-600"><ChevronRight size={16}/></button>
           </div>
        </div>
      </div>
    </div>
  );
}