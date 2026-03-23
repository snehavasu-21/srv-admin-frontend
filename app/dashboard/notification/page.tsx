"use client";

import React, { useState } from 'react';
import { 
  Search, ChevronLeft, ChevronRight,
  Trash2, Bell, Send, User, Users,
  Calendar, Megaphone, Info
} from "lucide-react";

export default function NotificationPage() {
  const [notifications] = useState([
    { id: "1", type: "Individual User", name: "Anmol Goyal", title: "Testing the push notification", date: "Dec-26-2025 07:03:55", msg: "This notification must be pushed in the notification panel of android mobile" },
    { id: "2", type: "Individual User", name: "Anmol desire", title: "Anmol Goyal", date: "Nov-19-2025 11:01:37", msg: "testing push notification message" },
    { id: "7", type: "All Users", name: "0", title: "Price Update", date: "Oct-24-2025 04:58:04", msg: "The price of 4 way DD has been updated to Rs.306" },
    { id: "10", type: "All Users", name: "0", title: "Price Update", date: "Oct-24-2025 04:56:28", msg: "The price of 10 Way DD has been updated to Rs.441" },
  ]);

  return (
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-sans text-[#1B254B]">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-[#1B254B]">Manage Notification</h1>
          <p className="text-slate-500 text-sm font-medium">SRV Push Messaging Center</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 bg-[#4318FF] text-white rounded-2xl font-bold text-sm shadow-[0_4px_14px_0_rgba(67,24,255,0.39)] hover:bg-[#3311CC] transition-all w-fit">
          <Megaphone size={18} /> Broadcast Notification
        </button>
      </div>

      {/* SEARCH BAR */}
      <div className="bg-white/80 backdrop-blur-md p-5 rounded-[24px] mb-8 shadow-sm border border-white">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by title or user..." 
            className="w-full pl-12 pr-4 py-3 bg-[#F4F7FE] border-none rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#4318FF]/10 transition-all"
          />
        </div>
      </div>

      {/* NOTIFICATION DATA TABLE */}
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/30 border-b border-slate-50">
                {["Id", "Target", "User Name", "Title", "Date & Time", "Message", "Action"].map((head) => (
                  <th key={head} className={`p-6 text-[10px] font-black uppercase tracking-widest text-slate-900 ${head === "Action" ? "text-right" : ""}`}>
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {notifications.map((note) => (
                <tr key={note.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
                  <td className="p-6">
                    <span className="text-xs font-bold text-slate-400 ">{note.id}</span>
                  </td>
                  
                  <td className="p-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${
                      note.type === 'All Users' 
                        ? 'bg-purple-50 text-purple-600 border-purple-100' 
                        : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      {note.type === 'All Users' ? <Users size={12} /> : <User size={12} />}
                      {note.type}
                    </div>
                  </td>
                  
                  <td className="p-6">
                    {/* LIGHTER FONT FOR USER NAME */}
                    {note.name === "0" ? (
                      <span className="text-slate-400 flex items-center gap-1.5 text-[14px] font-medium italic">
                        <Info size={14} className="text-slate-300" /> All Subscribers
                      </span>
                    ) : (
                      <span className="text-slate-600 font-semibold text-[14px]">
                        {note.name}
                      </span>
                    )}
                  </td>

                  <td className="p-6">
                    <div className="flex items-center gap-2 font-bold text-[13px] text-[#1B254B]">
                      <Bell size={14} className="text-amber-500" />
                      {note.title}
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase">
                      <Calendar size={14} className="text-slate-300" />
                      {note.date}
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="max-w-[280px] group/msg relative cursor-help">
                      <p className="text-[13px] text-slate-500 font-medium line-clamp-1 italic bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                        &quot;{note.msg}&quot;
                      </p>
                      <div className="invisible group-hover/msg:visible opacity-0 group-hover/msg:opacity-100 absolute bottom-full left-0 mb-2 bg-[#1B254B] text-white p-4 rounded-2xl text-xs z-50 w-72 shadow-2xl transition-all duration-300">
                        <div className="font-black uppercase text-[10px] text-slate-400 mb-2 border-b border-slate-700 pb-1">Full Message</div>
                        {note.msg}
                        <div className="absolute top-full left-6 -mt-1 border-8 border-transparent border-t-[#1B254B]"></div>
                      </div>
                    </div>
                  </td>

                  <td className="p-6 text-right">
                    <button className="p-3 bg-rose-50 text-rose-500 rounded-2xl hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-200 transition-all duration-300">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-slate-50/20">
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
             <Send size={14} className="text-blue-500" /> Broadcast History Logs
           </p>
           <div className="flex items-center gap-2">
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronLeft size={18}/></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm shadow-xl shadow-[#4318FF]/20">1</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-500 font-bold text-sm hover:bg-slate-50 transition-all">2</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 hover:text-[#4318FF] transition-all"><ChevronRight size={18}/></button>
           </div>
        </div>
      </div>
    </div>
  );
}