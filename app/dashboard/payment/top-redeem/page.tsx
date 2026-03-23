"use client";

import React, { useState } from 'react';
import { 
  Search, FileDown, Eye, Trophy, Calendar, 
  ArrowRight, TrendingUp, ShoppingBag
} from "lucide-react";

export default function TopRedeemPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  const [report] = useState([
    { rank: 1, userId: "1640", name: "Pradeep Kumar", phone: "9829555400", dealerCode: "424591", salesCode: "N/A", wallet: "200.9", totalOrders: "1", totalPoints: "3,000.00", lastRedeem: "2026-01-21" },
    { rank: 2, userId: "1641", name: "Amit sihag", phone: "8107844354", dealerCode: "816504", salesCode: "N/A", wallet: "115.5", totalOrders: "3", totalPoints: "2,325.00", lastRedeem: "2026-02-28" },
    { rank: 3, userId: "2225", name: "Anil", phone: "6375055052", dealerCode: "744548", salesCode: "N/A", wallet: "342.1", totalOrders: "1", totalPoints: "750.00", lastRedeem: "2026-02-13" },
    { rank: 4, userId: "794", name: "Gurpreet Singh", phone: "9781332040", dealerCode: "252246", salesCode: "N/A", wallet: "13.8", totalOrders: "1", totalPoints: "750.00", lastRedeem: "2025-12-11" },
    { rank: 5, userId: "825", name: "Harpreet singh", phone: "9465319762", dealerCode: "419926", salesCode: "428199", wallet: "216.6", totalOrders: "1", totalPoints: "175.00", lastRedeem: "2026-01-25" },
    { rank: 6, userId: "3292", name: "Manjeet singh", phone: "7009976900", dealerCode: "N/A", salesCode: "N/A", wallet: "25", totalOrders: "1", totalPoints: "75.00", lastRedeem: "2026-03-14" },
    { rank: 7, userId: "1203", name: "Sanjeev Kumar", phone: "7087734521", dealerCode: "505914", salesCode: "N/A", wallet: "0.5", totalOrders: "1", totalPoints: "75.00", lastRedeem: "2026-02-12" },
  ]);

  // Function to get color based on rank
  const getRankStyle = (rank: number) => {
    switch(rank) {
      case 1: return "bg-amber-100 text-amber-600 shadow-sm border border-amber-200"; // Gold
      case 2: return "bg-slate-200 text-slate-700 shadow-sm border border-slate-300"; // Silver
      case 3: return "bg-orange-100 text-orange-600 shadow-sm border border-orange-200"; // Bronze
      case 4: return "bg-blue-100 text-blue-600";
      case 5: return "bg-purple-100 text-purple-600";
      case 6: return "bg-pink-100 text-pink-600";
      case 7: return "bg-cyan-100 text-cyan-600";
      default: return "bg-indigo-50 text-indigo-500";
    }
  };

  return (
    <div className="p-6 lg:p-8 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <Trophy className="text-amber-500" size={24} />
            Top 20 Electricians Report
          </h1>
          <p className="text-slate-500 text-sm font-medium">Performance tracking for SRV Electricals</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-[#4318FF]/10 text-[#4318FF] rounded-xl font-bold text-sm">
            <FileDown size={18} /> CSV Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4318FF] text-white rounded-xl hover:bg-[#3311CC] transition-all font-bold shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] text-sm">
            <ShoppingBag size={18} /> View Gift Store Orders
          </button>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Rank</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Electrician Info</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Contact</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Codes</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Wallet</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Points Summary</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">Last Activity</th>
                <th className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {report.map((item) => (
                <tr key={item.userId} className="hover:bg-slate-50/50 transition-all duration-200">
                  <td className="p-5">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-extrabold text-sm transition-transform hover:scale-110 cursor-default ${getRankStyle(item.rank)}`}>
                      {item.rank}
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="font-bold text-[#1B254B] text-sm">{item.name}</div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">UID: {item.userId}</div>
                  </td>
                  <td className="p-5 text-sm font-bold text-[#1B254B]">{item.phone}</td>
                  <td className="p-5">
                    <div className="text-[10px] font-bold text-slate-500">DLR: <span className="text-[#4318FF]">{item.dealerCode}</span></div>
                    <div className="text-[10px] font-bold text-slate-500">SLS: <span className={item.salesCode === "N/A" ? "text-slate-300" : "text-emerald-500"}>{item.salesCode}</span></div>
                  </td>
                  <td className="p-5">
                    <div className="text-sm font-bold text-[#1B254B]">₹{item.wallet}</div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm">
                        <TrendingUp size={14} />
                        {item.totalPoints}
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{item.totalOrders} Orders</div>
                  </td>
                  <td className="p-5 text-xs text-slate-500 font-bold">
                    <div className="flex items-center gap-1.5">
                        <Calendar size={14} className="text-slate-300" />
                        {item.lastRedeem}
                    </div>
                  </td>
                  <td className="p-5">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-[#4318FF] hover:bg-[#4318FF] hover:text-white hover:border-[#4318FF] rounded-xl transition-all font-bold text-[10px] uppercase mx-auto shadow-sm">
                      View Orders <ArrowRight size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}