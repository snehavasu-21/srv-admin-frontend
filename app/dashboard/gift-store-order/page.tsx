// "use client";

// import React, { useState } from 'react';
// import * as XLSX from 'xlsx'; 
// import { 
//   Search, ChevronDown, ChevronLeft, ChevronRight,
//   Download, Calendar, CheckCircle2, 
//   XCircle, Trash2, Edit2, Eye, Printer,
//   FileSpreadsheet
// } from "lucide-react";

// export default function GiftStoreOrderPage() {
//   const [isActionOpen, setIsActionOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");

//   const [orders] = useState([
//     { id: "62", userName: "Manjeet singh", productName: "Electrician Bag", receiverName: "Nsjwja", receiverPhone: "7009524322", address: "X9HR+78 Green Valley Colony, Mansa, Punjab, India", points: "75", date: "2026-03-14", status: "Rejected" },
//     { id: "61", userName: "Amit sihag", productName: "Electrician Bag", receiverName: "Sumit choudhary", receiverPhone: "8107844354", address: "Priya electrical gadakhera", points: "75", date: "2026-02-28", status: "Rejected" },
//     { id: "60", userName: "Amit sihag", productName: "BLDS Ceiling Fan (4 Blade)", receiverName: "Sumit choudhary", receiverPhone: "8107844354", address: "Priya electrical gadakhera", points: "1500", date: "2026-02-26", status: "Rejected" },
//     { id: "59", userName: "Anil", productName: "Drill Machine", receiverName: "Anil Kumar", receiverPhone: "6375055052", address: "6MR2+7RM, Shiv Colony, Chirawa, Rajasthan 333026, India", points: "750", date: "2026-02-13", status: "Delivered" },
//     { id: "58", userName: "Sanjeev Kumar", productName: "Electrician Bag", receiverName: "SURAJ", receiverPhone: "7087734521", address: "Guru Har Sahai, Punjab 152022, India", points: "75", date: "2026-02-12", status: "Delivered" },
//   ]);

//   const exportToExcel = () => {
//     const worksheet = XLSX.utils.json_to_sheet(orders);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
//     XLSX.writeFile(workbook, "SRV_Gift_Orders.xlsx");
//     setIsActionOpen(false);
//   };

//   const handlePrint = () => {
//     window.print();
//   };

//   return (
//     <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      
//       {/* HEADER SECTION */}
//       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 print:hidden">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight text-[#1B254B]">Manage User Redeem</h1>
//           <p className="text-slate-500 text-sm font-medium">Order fulfillment for SRV Electricals</p>
//         </div>
//         <div className="flex items-center gap-3">
//           <button 
//             onClick={handlePrint}
//             className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all"
//           >
//             <Printer size={18} /> Print Report
//           </button>
//         </div>
//       </div>

//       {/* FILTERS & SEARCH */}
//       <div className="bg-white/80 backdrop-blur-md p-6 rounded-[24px] mb-8 shadow-sm border border-white print:hidden">
//         <div className="flex flex-col xl:flex-row gap-4 items-end">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 w-full">
//             <div className="md:col-span-1">
//               <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Search Order</label>
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
//                 <input 
//                   type="text" 
//                   placeholder="Search here..." 
//                   className="w-full pl-10 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#4318FF]/10 transition-all"
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </div>
//             </div>
//             <div>
//               <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Redeem Status</label>
//               <select className="w-full px-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl text-sm font-bold outline-none cursor-pointer text-slate-600 appearance-none">
//                 <option>All Status</option>
//                 <option>Delivered</option>
//                 <option>Rejected</option>
//                 <option>Pending</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">Start Date</label>
//               <input type="date" className="w-full px-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl text-sm font-bold text-slate-600 outline-none" />
//             </div>
//             <div>
//               <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 ml-1">End Date</label>
//               <input type="date" className="w-full px-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl text-sm font-bold text-slate-600 outline-none" />
//             </div>
//           </div>
//           <div className="flex gap-3 w-full xl:w-auto">
//             <button className="flex-1 xl:flex-none px-8 py-2.5 bg-[#4318FF] text-white rounded-xl font-bold text-sm shadow-md hover:bg-[#3311CC] transition-all">Apply</button>
//             <button className="flex-1 xl:flex-none px-8 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl font-bold text-sm shadow-sm hover:bg-slate-50 transition-all">Reset</button>
//           </div>
//         </div>
//       </div>

//       {/* MAIN TABLE CONTAINER */}
//       <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        
//         <div className="p-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/20 print:hidden">
//           <div className="flex items-center gap-2">
//             <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
//             <span className="text-xs font-bold text-slate-500">Select All Orders</span>
//           </div>
          
//           <div className="relative">
//             <button 
//               onClick={() => setIsActionOpen(!isActionOpen)}
//               className="flex items-center gap-2 px-6 py-2.5 bg-[#1D61E7] text-white rounded-xl text-xs font-bold shadow-md hover:bg-[#1652c9] transition-all"
//             >
//               Action <ChevronDown size={14} className={`transition-transform ${isActionOpen ? 'rotate-180' : ''}`} />
//             </button>
//             {isActionOpen && (
//               <div className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 z-50 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200">
//                 <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 mb-1">Status Updates</div>
//                 <button className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors">
//                   <CheckCircle2 size={16} /> Mark Delivered
//                 </button>
//                 <button className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors">
//                   <XCircle size={16} /> Mark Rejected
//                 </button>
//                 <div className="px-4 py-2 text-[10px] font-black text-slate-400 uppercase tracking-widest border-t border-b border-slate-50 my-1">Reports</div>
//                 <button 
//                   onClick={exportToExcel}
//                   className="w-full flex items-center gap-3 px-4 py-2 text-[11px] font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
//                 >
//                   <FileSpreadsheet size={16} /> Export Excel
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-slate-50/30 border-b border-slate-50">
//                 <th className="p-5 w-12 text-center print:hidden"></th>
//                 {/* UPDATED: Header titles font-black and text-slate-900 */}
//                 {["Id", "User / Product", "Receiver Info", "Address", "Points/Date", "Status", "Action"].map((head) => (
//                   <th key={head} className={`p-5 text-[10px] font-black uppercase tracking-widest text-slate-900 ${head === "Action" ? "text-right print:hidden" : head === "Status" || head === "Points/Date" ? "text-center" : ""}`}>
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
            
//             <tbody className="divide-y divide-slate-50">
//               {orders.map((order) => (
//                 <tr key={order.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
//                   <td className="p-5 text-center print:hidden">
//                     <input type="checkbox" className="w-4 h-4 rounded-md border-slate-300 accent-[#4318FF]" />
//                   </td>
//                   <td className="p-5">
//                     <span className="text-sm font-bold text-slate-400 ">{order.id}</span>
//                   </td>
//                   <td className="p-5">
//                     {/* UPDATED: User name is font-medium */}
//                     <div className="font-medium text-[14px] text-[#1B254B] whitespace-nowrap">{order.userName}</div>
//                     <button className="text-[11px] text-[#4318FF] font-black flex items-center gap-1 mt-0.5 hover:underline print:text-black">
//                       <Eye size={12} className="print:hidden" /> {order.productName}
//                     </button>
//                   </td>
//                   <td className="p-5">
//                     <div className="text-[13px] font-bold text-[#1B254B] whitespace-nowrap">{order.receiverName}</div>
//                     <div className="text-[11px] font-bold text-slate-400">{order.receiverPhone}</div>
//                   </td>
//                   <td className="p-5">
//                     <div className="max-w-[200px] text-[11px] leading-relaxed font-medium text-slate-500 line-clamp-2 print:line-clamp-none">
//                       {order.address}
//                     </div>
//                   </td>
//                   <td className="p-5 text-center">
//                     <div className="text-[13px] font-black text-emerald-600 whitespace-nowrap">{order.points} Pts</div>
//                     <div className="text-[10px] text-slate-400 font-black flex items-center justify-center gap-1 mt-1 uppercase">
//                       <Calendar size={10} /> {order.date}
//                     </div>
//                   </td>
//                   <td className="p-5 text-center">
//                     <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-sm ${
//                       order.status === 'Delivered' ? 'bg-[#05CD99] text-white shadow-emerald-100' : 'bg-[#EE5D50] text-white shadow-rose-100'
//                     }`}>
//                         {order.status}
//                     </span>
//                   </td>
//                   <td className="p-5 text-right print:hidden">
//                     <div className="flex items-center justify-end gap-2">
//                        <button className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-xl transition-all shadow-sm">
//                         <Edit2 size={14} />
//                       </button>
//                       <button className="p-2.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl transition-all shadow-sm">
//                         <Trash2 size={14} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION FOOTER */}
//         <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-slate-50/20 print:hidden">
//            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest italic">Inventory Records</span>
//            <div className="flex items-center gap-2">
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronLeft size={18}/></button>
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm shadow-xl shadow-[#4318FF]/20">1</button>
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 font-bold text-sm transition-all hover:bg-slate-50">2</button>
//              <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronRight size={18}/></button>
//            </div>
//         </div>
//       </div>

//       {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
//     </div>
//   );
// }




"use client";

import React, { useState } from "react";
import {
  Search, ChevronDown, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle, Trash2, Edit2, Eye,
  Printer, FileSpreadsheet, ShoppingBag,
  Calendar, Package, Clock,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const ordersData = [
  { id: "62", userName: "Manjeet Singh",  productName: "Electrician Bag",           receiverName: "Nsjwja",           receiverPhone: "7009524322", address: "X9HR+78 Green Valley Colony, Mansa, Punjab, India",                    points: "75",   date: "2026-03-14", status: "Rejected"  },
  { id: "61", userName: "Amit Sihag",     productName: "Electrician Bag",           receiverName: "Sumit Choudhary",  receiverPhone: "8107844354", address: "Priya Electrical Gadakhera",                                           points: "75",   date: "2026-02-28", status: "Rejected"  },
  { id: "60", userName: "Amit Sihag",     productName: "BLDS Ceiling Fan (4 Blade)",receiverName: "Sumit Choudhary",  receiverPhone: "8107844354", address: "Priya Electrical Gadakhera",                                           points: "1500", date: "2026-02-26", status: "Rejected"  },
  { id: "59", userName: "Anil",           productName: "Drill Machine",             receiverName: "Anil Kumar",       receiverPhone: "6375055052", address: "6MR2+7RM, Shiv Colony, Chirawa, Rajasthan 333026, India",              points: "750",  date: "2026-02-13", status: "Delivered" },
  { id: "58", userName: "Sanjeev Kumar",  productName: "Electrician Bag",           receiverName: "Suraj",            receiverPhone: "7087734521", address: "Guru Har Sahai, Punjab 152022, India",                                  points: "75",   date: "2026-02-12", status: "Delivered" },
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
    <div className={`bg-white rounded-xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer`}>
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

function StatusBadge({ status }) {
  if (status === "Delivered") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
        Delivered
      </span>
    );
  }
  if (status === "Rejected") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-200">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-500 inline-block" />
        Rejected
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
      Pending
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function GiftStoreOrderPage() {
  const [actionOpen,    setActionOpen]    = useState(false);
  const [searchTerm,    setSearchTerm]    = useState("");
  const [statusFilter,  setStatusFilter]  = useState("All Status");
  const [fromDate,      setFromDate]      = useState("");
  const [toDate,        setToDate]        = useState("");

  const deliveredCount = ordersData.filter((o) => o.status === "Delivered").length;
  const rejectedCount  = ordersData.filter((o) => o.status === "Rejected").length;
  const pendingCount   = ordersData.filter((o) => o.status === "Pending").length;

  const filtered = ordersData.filter((o) => {
    const matchSearch =
      o.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.productName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = statusFilter === "All Status" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans print:bg-white print:p-0">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2 print:hidden">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <ShoppingBag className="text-blue-600" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Manage User Redeem</h1>
            <p className="text-sm text-slate-500 mt-0.5">Order fulfillment for SRV Electricals</p>
          </div>
        </div>
        <button
          onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:shadow-sm transition-all duration-200 text-sm font-medium"
        >
          <Printer size={15} />
          Print Report
        </button>
      </div>

      {/* ── Stats ── */}
      <div className="print:hidden">
        <SectionLabel>Overview</SectionLabel>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <StatCard icon={Package}      label="Total Orders"  value={ordersData.length} iconBg="bg-blue-100"   iconColor="text-blue-600"   borderAccent="border-t-blue-500"   />
          <StatCard icon={CheckCircle2} label="Delivered"     value={deliveredCount}    iconBg="bg-green-100"  iconColor="text-green-600"  borderAccent="border-t-green-500"  />
          <StatCard icon={XCircle}      label="Rejected"      value={rejectedCount}     iconBg="bg-rose-100"   iconColor="text-rose-500"   borderAccent="border-t-rose-400"   />
          <StatCard icon={Clock}        label="Pending"       value={pendingCount}      iconBg="bg-amber-100"  iconColor="text-amber-600"  borderAccent="border-t-amber-500"  />
        </div>
      </div>

      {/* ── Filters ── */}
      <div className="print:hidden">
        <SectionLabel>Filters</SectionLabel>
        <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
          <div className="flex flex-wrap items-end gap-3">
            {/* Search */}
            <div className="flex-1 min-w-[180px]">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                <input
                  type="text"
                  placeholder="Search by user or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
              </div>
            </div>

            {/* Status */}
            <div className="min-w-[140px]">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              >
                <option>All Status</option>
                <option>Delivered</option>
                <option>Rejected</option>
                <option>Pending</option>
              </select>
            </div>

            {/* From */}
            <div className="min-w-[150px]">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">Start Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* To */}
            <div className="min-w-[150px]">
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">End Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm">
                Apply
              </button>
              <button
                onClick={() => { setSearchTerm(""); setStatusFilter("All Status"); setFromDate(""); setToDate(""); }}
                className="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Table ── */}
      <SectionLabel>All Orders</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">

        {/* Table toolbar */}
        <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between print:hidden">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
            <span className="text-xs font-medium text-slate-500">Select All</span>
          </div>
          <div className="relative">
            <button
              onClick={() => setActionOpen(!actionOpen)}
              className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all"
            >
              Action
              <ChevronDown size={14} className={`transition-transform duration-200 ${actionOpen ? "rotate-180" : ""}`} />
            </button>
            {actionOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl border border-slate-200 shadow-lg z-50 overflow-hidden py-1">
                <p className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Status Updates
                </p>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-green-50 hover:text-green-600 transition-colors">
                  <CheckCircle2 size={14} /> Mark Delivered
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-rose-50 hover:text-rose-600 transition-colors">
                  <XCircle size={14} /> Mark Rejected
                </button>
                <div className="h-px bg-slate-100 mx-2 my-1" />
                <p className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                  Reports
                </p>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <FileSpreadsheet size={14} /> Export Excel
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3.5 w-10 print:hidden">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                </th>
                {["ID", "User / Product", "Receiver Info", "Address", "Points & Date", "Status", "Actions"].map((h) => (
                  <th
                    key={h}
                    className={`px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap ${h === "Actions" ? "print:hidden" : ""}`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50 transition-colors duration-150">

                  {/* Checkbox */}
                  <td className="px-5 py-4 print:hidden">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>

                  {/* ID */}
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">
                    #{order.id}
                  </td>

                  {/* User / Product */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-800 whitespace-nowrap">{order.userName}</p>
                    <button className="flex items-center gap-1 text-[11px] text-blue-600 font-medium mt-0.5 hover:underline">
                      <Eye size={11} className="print:hidden" />
                      {order.productName}
                    </button>
                  </td>

                  {/* Receiver Info */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-800 whitespace-nowrap">{order.receiverName}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{order.receiverPhone}</p>
                  </td>

                  {/* Address */}
                  <td className="px-5 py-4">
                    <p className="text-xs text-slate-500 max-w-[200px] leading-relaxed line-clamp-2">
                      {order.address}
                    </p>
                  </td>

                  {/* Points & Date */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-green-600">{order.points} pts</p>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                      <Calendar size={11} />
                      {order.date}
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={order.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4 print:hidden">
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-amber-500 hover:bg-amber-50 transition-all duration-200" title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 transition-all duration-200" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-slate-400">
                    No orders found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between print:hidden">
          <p className="text-xs text-slate-400 font-medium">
            Showing{" "}
            <span className="text-slate-600 font-semibold">{filtered.length}</span>{" "}
            of{" "}
            <span className="text-slate-600 font-semibold">{ordersData.length}</span> orders
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

      {actionOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setActionOpen(false)} />
      )}

    </div>
  );
}