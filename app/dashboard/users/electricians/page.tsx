// "use client";

// import { Search, Plus, FileDown, Eye, Edit2, Trash2, QrCode, ChevronLeft, ChevronRight, Filter } from "lucide-react";

// export default function ElectriciansPage() {
//   const electricians = Array.from({ length: 8 }).map((_, i) => ({
//     id: (3347 - i).toString(),
//     name: i % 2 === 0 ? "Arshdeep Singh" : "Anmol Preet",
//     wallet: "1,250",
//     type: "Electrician",
//     dealerCode: "D-40159",
//     reffCode: "REF882",
//     email: "user@srv.com",
//     qrCode: "QR-9921",
//     phone: "9646127661"
//   }));

//   return (
//     <div className="p-6 lg:p-8 bg-[#F4F7FE] min-h-screen font-sans">
//       {/* HEADER */}
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-[#1B254B] tracking-tight">Electricians Directory</h1>
//           <p className="text-slate-500 text-sm font-medium">Manage your workforce and loyalty points</p>
//         </div>

//         <div className="flex items-center gap-3">
//           <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold shadow-sm border border-slate-200 text-sm">
//             <FileDown size={18} /> Export
//           </button>
//           <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4318FF] text-white rounded-xl hover:bg-[#3311CC] transition-all font-bold shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] text-sm">
//             <Plus size={18} /> Add New
//           </button>
//         </div>
//       </div>  

//       {/* SEARCH & FILTERS */}
//       <div className="bg-white p-4 rounded-2xl shadow-sm border border-white mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
//         <div className="relative w-full md:w-80 lg:w-96">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//           <input 
//             type="text" 
//             placeholder="Search by name..." 
//             className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-[#4318FF] outline-none text-sm font-medium transition-all"
//           />
//         </div>
        
//         <div className="flex items-center gap-3 w-full md:w-auto">
//            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F4F7FE] text-slate-600 rounded-xl text-sm font-bold border-none hover:bg-slate-100 transition-all">
//              <Filter size={16} /> Filters
//            </button>
//            <select className="flex-1 md:flex-none border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none bg-[#F4F7FE] text-slate-600">
//              <option>Bulk Actions</option>
//              <option>Delete Selected</option>
//            </select>
//         </div>
//       </div>

//       {/* DATA TABLE */}
//       <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
//         <div className="overflow-x-auto">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="border-b border-slate-50 bg-slate-50/30">
//                 <th className="p-5 w-12"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" /></th>
//                 {/* UPDATED: Titles are now text-slate-900 and font-black */}
//                 {["ID", "Name", "Wallet", "Dealer Code", "QR", "Phone", "Action"].map((head) => (
//                   <th key={head} className="p-5 text-[11px] font-black uppercase tracking-wider text-slate-900">
//                     {head}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-slate-50">
//               {electricians.map((user) => (
//                 <tr key={user.id} className="hover:bg-slate-50/50 transition-all duration-200 group">
//                   <td className="p-5"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" /></td>
//                   <td className="p-5 text-sm font-bold text-slate-500">{user.id}</td>
//                   <td className="p-5">
//                     {/* UPDATED: User Name is now font-medium (Not Bold) */}
//                     <div className="font-medium text-[#1B254B] text-sm">{user.name}</div>
//                     <div className="text-[11px] text-slate-400 font-medium truncate w-32">{user.email}</div>
//                   </td>
//                   <td className="p-5">
//                     <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-xs border border-emerald-100">
//                       ₹{user.wallet}
//                     </span>
//                   </td>
//                   <td className="p-5 text-sm font-bold text-blue-600/80">{user.dealerCode}</td>
                  
//                   <td className="p-5">
//                     <div className="p-2 bg-[#F4F7FE] rounded-lg text-slate-600 hover:bg-[#4318FF] hover:text-white transition-all cursor-pointer inline-block">
//                       <QrCode size={18} />
//                     </div>
//                   </td>

//                   {/* UPDATED: Phone is now font-medium (Not Bold) */}
//                   <td className="p-5 text-sm text-[#1B254B] font-medium">{user.phone}</td>
                  
//                   <td className="p-5">
//                     <div className="flex items-center gap-2">
//                       <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="View Details">
//                         <Eye size={18} />
//                       </button>
//                       <button className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all" title="Edit">
//                         <Edit2 size={18} />
//                       </button>
//                       <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Delete">
//                         <Trash2 size={18} />
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* PAGINATION */}
//         <div className="p-5 border-t border-slate-50 flex justify-between items-center">
//            <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Page 1 of 42</span>
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

import {
  Search, Plus, FileDown, Eye, Edit2, Trash2,
  QrCode, ChevronLeft, ChevronRight, Filter,
  Zap, Wallet, Users, CheckCircle2,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const electricians = Array.from({ length: 8 }).map((_, i) => ({
  id: (3347 - i).toString(),
  name: i % 2 === 0 ? "Arshdeep Singh" : "Anmol Preet",
  wallet: "1,250",
  type: "Electrician",
  dealerCode: "D-40159",
  reffCode: "REF882",
  email: "user@srv.com",
  qrCode: "QR-9921",
  phone: "9646127661",
  status: i % 3 === 0 ? "Pending" : "Active",
}));

// ─── Sub-components ───────────────────────────────────────────────────────────

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
      <div className="flex items-center justify-between">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
          <Icon size={18} />
        </div>
      </div>
      <div>
        <p className="text-2xl font-semibold text-slate-800">{value}</p>
        <p className="text-xs text-slate-500 mt-1">{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  if (status === "Active") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
        Active
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

export default function ElectriciansPage() {
  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Electricians</h1>
          <p className="text-sm text-slate-500 mt-0.5">Manage workforce and loyalty points</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:shadow-sm transition-all duration-200 text-sm font-medium">
            <FileDown size={15} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md">
            <Plus size={15} />
            Add Electrician
          </button>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <StatCard icon={Users}        label="Total Electricians" value="2,915" iconBg="bg-amber-100"  iconColor="text-amber-600"  borderAccent="border-t-amber-500" />
        <StatCard icon={CheckCircle2} label="Active"             value="2,257" iconBg="bg-green-100"  iconColor="text-green-600"  borderAccent="border-t-green-500" />
        <StatCard icon={Zap}          label="Pending KYC"        value="658"   iconBg="bg-red-100"    iconColor="text-red-500"    borderAccent="border-t-red-400" />
        {/* <StatCard icon={Wallet}       label="Total Wallet (₹)"   value="51.4K" iconBg="bg-blue-100"   iconColor="text-blue-600"   borderAccent="border-t-blue-500" /> */}
      </div>

      {/* ── Table Section ── */}
      <SectionLabel>All Electricians</SectionLabel>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by name, phone..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all">
            <Filter size={14} />
            Filter
          </button>
          <select className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
            <option>Bulk Actions</option>
            <option>Delete Selected</option>
            <option>Export Selected</option>
          </select>
        </div>
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
                {["ID", "Name", "Wallet", "Dealer Code", "Electrician Code", "QR Code", "Phone", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {electricians.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 transition-colors duration-150 group"
                >
                  <td className="px-5 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>

                  {/* ID */}
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">
                    #{user.id}
                  </td>

                  {/* Name + Email */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 whitespace-nowrap">{user.name}</p>
                        <p className="text-xs text-slate-400">{user.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Wallet */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
                      ₹{user.wallet}
                    </span>
                  </td>

                  {/* Dealer Code */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-blue-600">{user.dealerCode}</span>
                  </td>

                  {/* Electrician Code */}
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-purple-600">{user.reffCode}</span>
                  </td>

                  {/* QR Code */}
                  <td className="px-5 py-4">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-200">
                      <QrCode size={15} />
                    </button>
                  </td>

                  {/* Phone */}
                  <td className="px-5 py-4 text-sm text-slate-700 font-medium whitespace-nowrap">
                    {user.phone}
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={user.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 transition-all duration-200" title="View">
                        <Eye size={15} />
                      </button>
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
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-600 font-semibold">1–8</span> of <span className="text-slate-600 font-semibold">2,915</span> electricians
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronLeft size={14} />
            </button>
            {[1, 2, 3].map((n) => (
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
            <span className="text-slate-400 text-xs px-1">...</span>
            <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              42
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}