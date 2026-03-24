
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
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900">
      
      {/* 1. HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Inquiry</h1>
          <p className="text-sm text-slate-500 mt-0.5">SRV Electricals | Customer Support Portal</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            placeholder="Search enquiries..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 2. FILTERS & BULK ACTIONS */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
             <select className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 outline-none cursor-pointer appearance-none hover:bg-slate-100 transition-all">
               <option>Inquiry Type</option>
               <option>Pending</option>
               <option>In Review</option>
             </select>
             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 mr-2">
            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
            <span className="text-xs font-semibold text-slate-500">Select All</span>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setIsActionOpen(!isActionOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm"
            >
              Action <ChevronDown size={14} />
            </button>
            {isActionOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2">
                <button onClick={exportEnquiries} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                  <FileSpreadsheet size={14} /> Export to Excel
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
                  <Trash2 size={14} /> Delete Selected
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 3. ENQUIRY TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-4 w-12 text-center"></th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Id</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">User Name</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Inquiry Subject / Comment</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Inquiry Response</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Inquiry Type</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Status</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {enquiries.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-5 py-4 text-center">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">#{item.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg">
                        <User size={14}/>
                      </div>
                      <span className="text-sm font-semibold text-slate-800">{item.userName || "N/A"}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="text-sm font-bold text-slate-800 mb-0.5">{item.subject}</div>
                    <div className="text-xs text-slate-500 max-w-[220px] line-clamp-2 italic">"{item.comment}"</div>
                  </td>
                  <td className="px-5 py-4">
                    {item.response ? (
                      <div className="text-[11px] leading-relaxed font-medium text-emerald-700 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100 flex gap-2">
                        <MessageSquare size={12} className="shrink-0 mt-0.5 text-emerald-500" />
                        {item.response}
                      </div>
                    ) : (
                      <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">Pending Response</span>
                    )}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex justify-center">
                      {item.type === "Pending" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold uppercase border border-amber-100">
                          <Clock size={10}/> Pending
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold uppercase border border-blue-100">
                          <CheckCircle size={10}/> In Review
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className="inline-flex px-3 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase border border-emerald-100 rounded-lg">
                      {item.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                       <button title="Edit" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
                        <Edit2 size={14}/>
                       </button>
                       <button title="Delete" className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all">
                        <Trash2 size={14}/>
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center bg-white">
          <p className="text-xs font-medium text-slate-400">Showing {enquiries.length} customer inquiries</p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronLeft size={14}/>
            </button>
            <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronRight size={14}/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}