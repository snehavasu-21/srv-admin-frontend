"use client";

import React, { useState } from 'react';
import { 
  Search, ChevronLeft, ChevronRight,
  Trash2, Bell, Send, User, Users,
  Calendar, MessageSquare, AlertCircle, Megaphone
} from "lucide-react";

export default function NotificationPage() {
  // Data strictly based on your "Manage Notification" screenshot
  const [notifications] = useState([
    { id: "1", type: "Individual User", name: "Anmol Goyal", title: "Testing the push notification", date: "Dec-26-2025 07:03:55", msg: "This notification must be pushed in the notification panel of android mobile" },
    { id: "2", type: "Individual User", name: "Anmol desire", title: "Anmol Goyal", date: "Nov-19-2025 11:01:37", msg: "testing push notification message" },
    { id: "7", type: "All Users", name: "0", title: "Price Update", date: "Oct-24-2025 04:58:04", msg: "The price of 4 way DD has been updated to Rs.306" },
    { id: "10", type: "All Users", name: "0", title: "Price Update", date: "Oct-24-2025 04:56:28", msg: "The price of 10 Way DD has been updated to Rs.441" },
  ]);

  return (
    <div className="p-6 lg:p-10 bg-[#F4F7FE] min-h-screen font-['Inter',sans-serif] text-[#1B254B]">
      
      {/* 1. TOP HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[#1B254B]">Manage Notification</h1>
          <p className="text-slate-500 text-xs font-bold mt-1 uppercase tracking-widest italic">
            SRV Electricals <span className="mx-2 text-slate-300">|</span> Push Messaging Center
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3.5 bg-[#1D61E7] text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-[#1652c9] transition-all w-fit">
          <Megaphone size={18} /> Broadcast a Notification
        </button>
      </div>

      {/* 2. SEARCH BAR */}
      <div className="bg-white/80 backdrop-blur-md p-5 rounded-[24px] mb-8 shadow-sm border border-white">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search notifications..." 
            className="w-full pl-12 pr-4 py-3 bg-[#F4F7FE] border-none rounded-2xl text-sm font-semibold outline-none focus:ring-2 focus:ring-[#4318FF]/10"
          />
        </div>
      </div>

      {/* 3. NOTIFICATION DATA TABLE */}
      <div className="bg-white rounded-[32px] shadow-[0_20px_60px_-10px_rgba(0,0,0,0.03)] border border-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F9FAFC]/50 border-b border-slate-50">
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Id</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Target</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">User Name</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Title</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Date & Time</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Message</th>
                <th className="p-6 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {notifications.map((note) => (
                <tr key={note.id} className="group hover:bg-[#F4F7FE]/50 transition-all duration-300">
                  <td className="p-6">
                    <span className="text-sm font-medium text-slate-400">{note.id}</span>
                  </td>
                  
                  <td className="p-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                      note.type === 'All Users' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {note.type === 'All Users' ? <Users size={12} /> : <User size={12} />}
                      {note.type}
                    </div>
                  </td>
                  
                  <td className="p-6 font-bold text-[14px] text-[#1B254B]">
                    {note.name === "0" ? <span className="text-slate-300 italic">Broadcast</span> : note.name}
                  </td>

                  <td className="p-6">
                    <div className="flex items-center gap-2 font-bold text-[13px] text-slate-700">
                      <Bell size={14} className="text-amber-400" />
                      {note.title}
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                      <Calendar size={14} />
                      {note.date}
                    </div>
                  </td>

                  <td className="p-6">
                    <div className="max-w-[300px] group/msg relative">
                      <p className="text-[13px] text-slate-500 font-medium line-clamp-1 italic">
                        "{note.msg}"
                      </p>
                      <div className="hidden group-hover/msg:block absolute top-0 left-0 bg-[#1B254B] text-white p-3 rounded-xl text-xs z-20 w-64 shadow-2xl">
                        {note.msg}
                      </div>
                    </div>
                  </td>

                  <td className="p-6 text-right">
                    <button className="p-3 bg-[#EE5D50] text-white rounded-2xl shadow-md hover:scale-110 transition-all">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 4. FOOTER */}
        <div className="p-6 border-t border-slate-50 flex justify-between items-center bg-white/50">
           <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
             <Send size={14} /> Total 10 Notifications Sent
           </p>
           <div className="flex items-center gap-2">
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 transition-all"><ChevronLeft size={18}/></button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#4318FF] text-white font-black text-sm shadow-xl shadow-blue-200">1</button>
             <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-[#F4F7FE] text-slate-400 transition-all"><ChevronRight size={18}/></button>
           </div>
        </div>
      </div>
    </div>
  );
}