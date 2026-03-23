// "use client";

// import React, { useState } from 'react';
// import { 
//   Search, Plus, FileDown, 
//   ChevronLeft, ChevronRight, 
//   Filter, ArrowUpRight 
// } from "lucide-react";

// export default function WalletHistoryPage() {
//   const [searchTerm, setSearchTerm] = useState("");
  
//   const [history] = useState([
//     { id: "24457", userName: "Amarjeet singh", description: "You have earned 0.5 from Junction Box 1 QRcode.", date: "2026-03-20 10:07:53", point: "0.5", type: "Credit" },
//     { id: "24456", userName: "Varinder", description: "You have earned 1 from FDB 4\" 19/40 PC QRcode.", date: "2026-03-20 10:07:18", point: "1", type: "Credit" },
//     { id: "24455", userName: "Amarjeet singh", description: "You have earned 0.5 from Junction Box 1 QRcode.", date: "2026-03-20 10:06:18", point: "0.5", type: "Credit" },
//     { id: "24454", userName: "Amarjeet singh", description: "You have earned 0.5 from Junction Box 1 QRcode.", date: "2026-03-20 10:05:31", point: "0.5", type: "Credit" },
//     { id: "24453", userName: "Amarjeet singh", description: "You have earned 0.5 from Junction Box 1 QRcode.", date: "2026-03-20 10:03:59", point: "0.5", type: "Credit" },
//     { id: "24452", userName: "Jagjeevan sharma", description: "You have earned 5 from 9x3 6L HZ Draw QRcode.", date: "2026-03-20 10:03:42", point: "5", type: "Credit" },
//     { id: "24451", userName: "Amarjeet singh", description: "You have earned 0.5 from Junction Box 1 QRcode.", date: "2026-03-20 10:03:01", point: "0.5", type: "Credit" },
//     { id: "24450", userName: "Jagjeevan sharma", description: "You have earned 5 from 9x3 6L HZ Draw QRcode.", date: "2026-03-20 10:02:52", point: "5", type: "Credit" },
//   ]);

//   const filteredHistory = history.filter(item => 
//     item.userName.toLowerCase().includes(searchTerm.toLowerCase()) || 
//     item.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="p-6 lg:p-8 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
//       {/* HEADER SECTION */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-2xl font-bold tracking-tight">Wallet History</h1>
//           <p className="text-slate-500 text-sm font-medium">Track all points and transactions</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold shadow-sm border border-slate-200 text-sm">
//             <FileDown size={18} /> Export
//           </button>
//           <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4318FF] text-white rounded-xl hover:bg-[#3311CC] transition-all font-bold shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] text-sm">
//             <Plus size={18} /> Add wallet history
//           </button>
//         </div>
//       </div>

//       {/* FILTERS & SEARCH */}
//       <div className="bg-white p-4 rounded-2xl shadow-sm border border-white mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
//         <div className="flex items-center gap-4 w-full md:w-auto">
//             <select className="border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none bg-[#F4F7FE] text-slate-600 min-w-[150px]">
//                 <option>All User</option>
//                 <option>Electrician</option>
//                 <option>Dealer</option>
//             </select>
//             <div className="relative flex-1 md:w-80 lg:w-96">
//                 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//                 <input 
//                     type="text" 
//                     placeholder="Search here..." 
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-[#4318FF] outline-none text-sm font-medium transition-all"
//                 />
//             </div>
//         </div>
        
//         <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F4F7FE] text-slate-600 rounded-xl text-sm font-bold border-none hover:bg-slate-100 transition-all">
//             <Filter size={16} /> Filters
//         </button>
//       </div>

//       {/* MAIN TABLE SECTION */}
//       <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-slate-50 bg-slate-50/30">
//                 <th className="p-5 w-12 text-center">
//                   <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
//                 </th>
//                 {/* UPDATED: Header titles are now font-black and darker */}
//                 {["Id", "User Name", "Wallet Description", "Transaction Date", "Point", "Payment Type"].map((head) => (
//                   <th key={head} className="p-5 text-[11px] font-black uppercase tracking-wider text-slate-900">
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {filteredHistory.map((item) => (
//                 <tr key={item.id} className="hover:bg-slate-50/50 transition-all duration-200">
//                   <td className="p-5 text-center">
//                     <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
//                   </td>
//                   <td className="p-5 text-sm font-bold text-slate-500">{item.id}</td>
//                   <td className="p-5">
//                     {/* UPDATED: Name font is now font-medium (Not Bold) */}
//                     <div className="font-medium text-[#1B254B] text-sm whitespace-nowrap">
//                         {item.userName}
//                     </div>
//                   </td>
//                   <td className="p-5">
//                     <div className="text-xs text-slate-600 font-medium max-w-[320px] leading-relaxed">
//                         {item.description}
//                     </div>
//                   </td>
//                   <td className="p-5 text-xs font-bold text-slate-500 whitespace-nowrap">
//                     {item.date}
//                   </td>
//                   <td className="p-5">
//                     <div className="flex items-center gap-1.5 text-[#05CD99] font-bold">
//                         <ArrowUpRight size={14} />
//                         <span className="text-sm">{item.point}</span>
//                     </div>
//                   </td>
//                   <td className="p-5">
//                     <span className="px-3 py-1 rounded-lg font-bold text-[10px] uppercase tracking-wider border bg-emerald-50 text-emerald-600 border-emerald-100">
//                       {item.type}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="p-5 border-t border-slate-50 flex justify-between items-center bg-[#fcfcfc]">
//            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Showing {filteredHistory.length} Entries</span>
//            <div className="flex items-center gap-2">
//              <button className="p-2 rounded-lg bg-[#F4F7FE] hover:bg-slate-100 transition-all text-slate-600"><ChevronLeft size={16}/></button>
//              <button className="w-8 h-8 rounded-lg bg-[#4318FF] text-white font-bold text-xs shadow-md">1</button>
//              <button className="w-8 h-8 rounded-lg bg-transparent text-slate-400 font-bold text-xs hover:bg-[#F4F7FE]">2</button>
//              <button className="p-2 rounded-lg bg-[#F4F7FE] hover:bg-slate-100 transition-all text-slate-600"><ChevronRight size={16}/></button>
//            </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";

import React, { useState } from "react";
import {
  Search, Plus, FileDown,
  ChevronLeft, ChevronRight,
  Filter, ArrowUpRight, ArrowDownLeft,
  Wallet, TrendingUp, Users, Receipt,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const historyData = [
  { id: "24457", userName: "Amarjeet Singh",   description: "You have earned 0.5 from Junction Box 1 QRcode.",    date: "2026-03-20 10:07:53", point: "0.5", type: "Credit" },
  { id: "24456", userName: "Varinder",         description: "You have earned 1 from FDB 4\" 19/40 PC QRcode.",   date: "2026-03-20 10:07:18", point: "1",   type: "Credit" },
  { id: "24455", userName: "Amarjeet Singh",   description: "You have earned 0.5 from Junction Box 1 QRcode.",    date: "2026-03-20 10:06:18", point: "0.5", type: "Credit" },
  { id: "24454", userName: "Amarjeet Singh",   description: "You have earned 0.5 from Junction Box 1 QRcode.",    date: "2026-03-20 10:05:31", point: "0.5", type: "Credit" },
  { id: "24453", userName: "Amarjeet Singh",   description: "You have earned 0.5 from Junction Box 1 QRcode.",    date: "2026-03-20 10:03:59", point: "0.5", type: "Credit" },
  { id: "24452", userName: "Jagjeevan Sharma", description: "You have earned 5 from 9x3 6L HZ Draw QRcode.",      date: "2026-03-20 10:03:42", point: "5",   type: "Credit" },
  { id: "24451", userName: "Amarjeet Singh",   description: "You have earned 0.5 from Junction Box 1 QRcode.",    date: "2026-03-20 10:03:01", point: "0.5", type: "Credit" },
  { id: "24450", userName: "Jagjeevan Sharma", description: "You have earned 5 from 9x3 6L HZ Draw QRcode.",      date: "2026-03-20 10:02:52", point: "5",   type: "Credit" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
}

function StatCard({ icon: Icon, label, value, iconBg, iconColor, borderAccent }) {
  return (
    <div
      className={`bg-white rounded-xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3
        transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer`}
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-2xl font-semibold text-slate-800">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{label}</p>
      </div>
    </div>
  );
}

function TypeBadge({ type }) {
  if (type === "Credit") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
        <ArrowUpRight size={11} />
        Credit
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
      <ArrowDownLeft size={11} />
      Debit
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WalletHistoryPage() {
  const [searchTerm, setSearchTerm]   = useState("");
  const [userFilter, setUserFilter]   = useState("All User");

  const totalPoints   = historyData.reduce((acc, i) => acc + parseFloat(i.point), 0);
  const creditCount   = historyData.filter((i) => i.type === "Credit").length;
  const uniqueUsers   = [...new Set(historyData.map((i) => i.userName))].length;

  const filteredHistory = historyData.filter((item) => {
    const matchSearch =
      item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Wallet History</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track all points and transactions</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:shadow-sm transition-all duration-200 text-sm font-medium">
            <FileDown size={15} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md">
            <Plus size={15} />
            Add Entry
          </button>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={Receipt}   label="Total Transactions" value={historyData.length}        iconBg="bg-blue-100"   iconColor="text-blue-600"   borderAccent="border-t-blue-500"   />
        <StatCard icon={TrendingUp} label="Total Points Earned" value={totalPoints.toFixed(1)} iconBg="bg-green-100"  iconColor="text-green-600"  borderAccent="border-t-green-500"  />
        <StatCard icon={Wallet}    label="Total Money Withdrawal"      value={creditCount}              iconBg="bg-emerald-100" iconColor="text-emerald-600" borderAccent="border-t-emerald-500" />
        <StatCard icon={Users}     label="Total Gift Withdrawal"        value={uniqueUsers}              iconBg="bg-purple-100" iconColor="text-purple-600" borderAccent="border-t-purple-500" />
      </div>

      {/* ── Table Section ── */}
      <SectionLabel>Transaction Log</SectionLabel>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option>All User</option>
            <option>Electrician</option>
            <option>Dealer</option>
          </select>
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all">
          <Filter size={14} />
          Filter
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3.5 w-10">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                </th>
                {["ID", "User Name", "Description", "Date & Time", "Points", "Type"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredHistory.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors duration-150">

                  <td className="px-5 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>

                  {/* ID */}
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">
                    #{item.id}
                  </td>

                  {/* User Name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {item.userName.charAt(0)}
                      </div>
                      <p className="text-sm font-medium text-slate-800 whitespace-nowrap">{item.userName}</p>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="px-5 py-4">
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed">{item.description}</p>
                  </td>

                  {/* Date & Time */}
                  <td className="px-5 py-4 whitespace-nowrap">
                    <p className="text-xs font-medium text-slate-700">{item.date.split(" ")[0]}</p>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.date.split(" ")[1]}</p>
                  </td>

                  {/* Points */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 text-green-600 font-semibold">
                      <ArrowUpRight size={13} />
                      <span className="text-sm">{item.point}</span>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="px-5 py-4">
                    <TypeBadge type={item.type} />
                  </td>

                </tr>
              ))}

              {filteredHistory.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-slate-400">
                    No transactions found matching{" "}
                    <span className="font-semibold text-slate-600">&quot;{searchTerm}&quot;</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">
            Showing{" "}
            <span className="text-slate-600 font-semibold">{filteredHistory.length}</span>{" "}
            of{" "}
            <span className="text-slate-600 font-semibold">{historyData.length}</span> entries
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronLeft size={14} />
            </button>
            {[1, 2].map((n) => (
              <button
                key={n}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                  n === 1
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {n}
              </button>
            ))}
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}