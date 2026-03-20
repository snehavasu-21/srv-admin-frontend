"use client";

import { Search, Plus, FileDown, Eye, Edit2, Trash2, QrCode, ChevronLeft, ChevronRight, Filter } from "lucide-react";

export default function ElectriciansPage() {
  const electricians = Array.from({ length: 8 }).map((_, i) => ({
    id: (3347 - i).toString(),
    name: i % 2 === 0 ? "Arshdeep Singh" : "Anmol Preet",
    wallet: "1,250",
    type: "Electrician",
    dealerCode: "D-40159",
    reffCode: "REF882",
    email: "user@srv.com",
    qrCode: "QR-9921",
    phone: "9646127661"
  }));

  return (
    <div className="p-6 lg:p-8 bg-[#F4F7FE] min-h-screen font-sans">
      {/* HEADER - SLEEK & MODERN */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1B254B] tracking-tight">Electricians Directory</h1>
          <p className="text-slate-500 text-sm font-medium">Manage your workforce and loyalty points</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold shadow-sm border border-slate-200 text-sm">
            <FileDown size={18} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4318FF] text-white rounded-xl hover:bg-[#3311CC] transition-all font-bold shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] text-sm">
            <Plus size={18} /> Add New
          </button>
        </div>
      </div>  

      {/* SEARCH & FILTERS - COMPACT & FUNCTIONAL */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-white mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80 lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name..." 
            className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-[#4318FF] outline-none text-sm font-medium transition-all"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
           <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F4F7FE] text-slate-600 rounded-xl text-sm font-bold border-none hover:bg-slate-100 transition-all">
             <Filter size={16} /> Filters
           </button>
           <select className="flex-1 md:flex-none border-none rounded-xl px-4 py-2.5 text-sm font-bold outline-none bg-[#F4F7FE] text-slate-600">
             <option>Bulk Actions</option>
             <option>Delete Selected</option>
           </select>
        </div>
      </div>

      {/* OPTIMIZED DATA TABLE */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="p-5 w-12"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" /></th>
                {["ID", "Name", "Wallet", "Dealer Code", "QR", "Phone", "Action"].map((head) => (
                  <th key={head} className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {electricians.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-all duration-200 group">
                  <td className="p-5"><input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" /></td>
                  <td className="p-5 text-sm font-bold text-slate-500">{user.id}</td>
                  <td className="p-5">
                    <div className="font-bold text-[#1B254B] text-sm">{user.name}</div>
                    <div className="text-[11px] text-slate-400 font-medium truncate w-32">{user.email}</div>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-xs border border-emerald-100">
                      ₹{user.wallet}
                    </span>
                  </td>
                  <td className="p-5 text-sm font-bold text-blue-600/80">{user.dealerCode}</td>
                  
                  <td className="p-5">
                    <div className="p-2 bg-[#F4F7FE] rounded-lg text-slate-600 hover:bg-[#4318FF] hover:text-white transition-all cursor-pointer inline-block">
                      <QrCode size={18} />
                    </div>
                  </td>

                  <td className="p-5 text-sm text-[#1B254B] font-bold">{user.phone}</td>
                  
                  <td className="p-5">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all" title="Edit">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* COMPACT PAGINATION */}
        <div className="p-5 border-t border-slate-50 flex justify-between items-center">
           <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Page 1 of 42</span>
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