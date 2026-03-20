"use client";

import React, { useState } from 'react';
import { 
  Search, Plus, FileDown, Eye, Edit2, 
  Trash2, QrCode, ChevronLeft, ChevronRight, 
  Filter 
} from "lucide-react";

export default function DealersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // ADDED MORE ROWS HERE
  const [dealers] = useState([
    { id: "3334", name: "Sandeep Singh", wallet: "0", dealerCode: "040159", reffCode: "—", email: "gillsandeepsingh39@gmail.com", phone: "9417320275", gst: "Sandeep Singh | 03HTZPS4177P1ZB" },
    { id: "3323", name: "Aman Juneja", wallet: "1,200", dealerCode: "271602", reffCode: "REF991", email: "adenterprisesindia@gmail.com", phone: "7889269954", gst: "Ad Enterprises | 03apppj8788n1zw" },
    { id: "3322", name: "Sagar Electronics", wallet: "450", dealerCode: "470678", reffCode: "—", email: "malhotraranjeet82@gmail.com", phone: "9465258788", gst: "Sagar | 03JEAPK5962N1Z2" },
    { id: "3318", name: "Puneet Kumar", wallet: "0", dealerCode: "716436", reffCode: "REF102", email: "puneetkukkar@gmail.com", phone: "9417345313", gst: "AHDP9529J | 03AHDPK9529J1Z7" },
    { id: "3315", name: "Rajesh Hardware", wallet: "5,600", dealerCode: "112233", reffCode: "—", email: "rajesh.hwd@gmail.com", phone: "9812345678", gst: "Rajesh | 03BCCPK1234J1Z1" },
    { id: "3310", name: "Vikram Electricals", wallet: "250", dealerCode: "998877", reffCode: "REF442", email: "vikram.elec@srv.com", phone: "9876543210", gst: "Vikram | 03DDPPK5566K1Z9" },
    { id: "3305", name: "Kiran Enterprises", wallet: "0", dealerCode: "554433", reffCode: "—", email: "kiran.ent@gmail.com", phone: "9412398745", gst: "Kiran | 03EEFPK7788L1Z5" },
    { id: "3298", name: "Mehta Solutions", wallet: "3,150", dealerCode: "223344", reffCode: "REF009", email: "mehta.sol@srv.com", phone: "9646127000", gst: "Mehta | 03FFGPK9900M1Z3" }
  ]);

  const filteredDealers = dealers.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.dealerCode.includes(searchTerm)
  );

  return (
    <div className="p-6 lg:p-8 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#1B254B]">Dealers Management</h1>
          <p className="text-slate-500 text-sm font-medium">Overview of SRV Electricals authorized dealers</p>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-slate-700 rounded-xl hover:bg-slate-50 transition-all font-bold shadow-sm border border-slate-200 text-sm">
            <FileDown size={18} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4318FF] text-white rounded-xl hover:bg-[#3311CC] transition-all font-bold shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] text-sm">
            <Plus size={18} /> Add Dealer
          </button>
        </div>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-white mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative w-full md:w-80 lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or code..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* TABLE SECTION */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-50">
                <th className="p-5 w-12 text-center">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
                </th>
                {["ID", "Dealer Details", "Wallet", "Dealer Code", "QR", "Contact & GST", "Action"].map((head) => (
                  <th key={head} className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredDealers.map((dealer) => (
                <tr key={dealer.id} className="hover:bg-slate-50/50 transition-all duration-200">
                  <td className="p-5 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-[#4318FF]" />
                  </td>
                  <td className="p-5 text-sm font-bold text-slate-500">{dealer.id}</td>
                  <td className="p-5">
                    <div className="font-bold text-[#1B254B] text-sm">{dealer.name}</div>
                    <div className="text-[11px] text-slate-400 font-medium truncate w-40">{dealer.email || "no-email@srv.com"}</div>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-bold text-xs border border-emerald-100">
                      ₹{dealer.wallet}
                    </span>
                  </td>
                  <td className="p-5">
                    <div className="text-sm font-bold text-[#4318FF]">{dealer.dealerCode}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">REF: {dealer.reffCode}</div>
                  </td>
                  <td className="p-5 text-center">
                    <div className="p-2 bg-[#F4F7FE] rounded-lg text-slate-600 hover:bg-[#4318FF] hover:text-white transition-all cursor-pointer inline-block shadow-sm">
                      <QrCode size={20} />
                    </div>
                  </td>
                  <td className="p-5">
                    <div className="text-xs text-[#1B254B] font-bold">{dealer.phone}</div>
                    <div className="text-[10px] text-slate-400 font-medium max-w-[150px] leading-tight mt-1">{dealer.gst}</div>
                  </td>
                  <td className="p-5">
                    <div className="flex items-center gap-1">
                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Eye size={18} /></button>
                      <button className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg transition-all"><Edit2 size={18} /></button>
                      <button className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-5 border-t border-slate-50 flex justify-between items-center">
           <span className="text-slate-400 font-bold text-xs uppercase tracking-widest font-sans">Showing {filteredDealers.length} of {dealers.length} Entries</span>
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