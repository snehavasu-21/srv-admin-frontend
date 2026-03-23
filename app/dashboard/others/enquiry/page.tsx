"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Trash2, Edit2, MessageSquare, User, Phone,
  Clock, CheckCircle, Filter, Mail
} from "lucide-react";

export default function EnquiryPage() {
  const [isActionOpen, setIsActionOpen] = useState(false);

  const [enquiries] = useState([
    { id: "9", userName: "Satnam Panchal", phone: "+91 98765-43210", subject: "Scan problem", comment: "Scan problem aya raha h", response: "", type: "Pending", status: "Enable" },
    { id: "8", userName: "Guest User", phone: "Not Available", subject: "Attention", comment: "Hi", response: "", type: "Pending", status: "Enable" },
    { id: "7", userName: "Harpreet Singh Sidhu", phone: "+91 99887-76655", subject: "HarpreetSinghSidhu", comment: "Ok", response: "", type: "Pending", status: "Enable" },
    { id: "6", userName: "NIKHIL SAINI", phone: "+91 90123-45678", subject: "Pending my reward points", comment: "Pending my reward points", response: "When did you place your gift order...", type: "In review", status: "Enable" },
    { id: "5", userName: "Balvinder singh", phone: "+91 91234-56789", subject: "New abadi gurdwara street 3 fazilka", comment: "New abadi gurdwara street 3 fazilka", response: "Sorry, I am unable to understand...", type: "In review", status: "Enable" },
  ]);

  return (
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-[#1B254B]">Manage Enquiry</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#4318FF]"></span>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">SRV Support Center</p>
          </div>
        </div>
        
        <div className="relative w-full lg:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#4318FF] transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or subject..." 
            className="w-full pl-12 pr-4 py-3.5 bg-white border-none rounded-[20px] text-sm font-medium shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] focus:ring-2 focus:ring-[#4318FF]/10 outline-none transition-all"
          />
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-[35px] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] border border-white/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] border-b border-slate-100">ID</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] border-b border-slate-100">User Info</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] border-b border-slate-100">Subject & Comment</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] border-b border-slate-100">Response</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] border-b border-slate-100 text-center">Type</th>
                <th className="p-6 text-[11px] font-black uppercase tracking-widest text-[#1B254B] border-b border-slate-100 text-center">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {enquiries.map((item) => (
                <tr key={item.id} className="group hover:bg-[#F4F7FE]/30 transition-all duration-300">
                  <td className="p-6">
                    <span className="text-xs font-black text-slate-400">0{item.id}</span>
                  </td>
                  
                  <td className="p-6">
                    <div className="flex flex-col gap-1">
                      {/* USER NAME - CLEAR & READABLE */}
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-[#4318FF]/5 flex items-center justify-center text-[#4318FF]">
                          <User size={14} />
                        </div>
                        <span className="text-[14px] font-semi text-[#1B254B]">{item.userName}</span>
                      </div>
                      {/* PHONE - SUBTLE BUT CLEAR */}
                      <div className="flex items-center gap-2 text-slate-400 ml-9">
                        <Phone size={10} />
                        <span className="text-[11px] font-medium">{item.phone}</span>
                      </div>
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="max-w-[240px]">
                      <h4 className="text-[13px] font- text-[#1B254B] mb-1 group-hover:text-[#4318FF] transition-colors line-clamp-1">
                        {item.subject}
                      </h4>
                      <p className="text-[12px] font-medium text-slate-500 line-clamp-1 italic">
                        &quot;{item.comment}&quot;
                      </p>
                    </div>
                  </td>

                  <td className="p-6">
                    {item.response ? (
                      <div className="inline-flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-xl border border-emerald-100 text-emerald-600 text-[11px] font-semibold shadow-sm">
                        <MessageSquare size={12} className="shrink-0" />
                        <span className="line-clamp-1">{item.response}</span>
                      </div>
                    ) : (
                      <div className="text-[10px] font-bold text-grey-300 uppercase tracking-tighter flex items-center gap-1">
                         <Clock size={12} /> Pending Response
                      </div>
                    )}
                  </td>

                  <td className="p-6 text-center">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      item.type === 'Pending' 
                      ? 'bg-amber-50 text-amber-500 border border-amber-100' 
                      : 'bg-blue-50 text-blue-500 border border-blue-100'
                    }`}>
                      {item.type}
                    </span>
                  </td>

                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <button className="h-9 w-9 flex items-center justify-center bg-white border border-slate-100 text-amber-500 rounded-xl shadow-sm hover:bg-amber-500 hover:text-white hover:shadow-amber-200 transition-all duration-300">
                         <Edit2 size={15}/>
                       </button>
                       <button className="h-9 w-9 flex items-center justify-center bg-white border border-slate-100 text-rose-500 rounded-xl shadow-sm hover:bg-rose-500 hover:text-white hover:shadow-rose-200 transition-all duration-300">
                         <Trash2 size={15}/>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="p-6 bg-slate-50/30 flex justify-between items-center border-t border-slate-50">
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">SRV Admin v2.0</span>
           <div className="flex items-center gap-1.5">
             <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-white text-slate-400 hover:text-[#4318FF] border border-slate-100 shadow-sm transition-all"><ChevronLeft size={16}/></button>
             <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-xs shadow-lg shadow-[#4318FF]/30">1</button>
             <button className="h-9 w-9 flex items-center justify-center rounded-xl bg-white text-slate-400 border border-slate-100 shadow-sm transition-all"><ChevronRight size={16}/></button>
           </div>
        </div>
      </div>
    </div>
  );
}