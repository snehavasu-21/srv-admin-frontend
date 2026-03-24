"use client";

import React, { useState } from 'react';
import { 
  Search, ChevronLeft, ChevronRight, Filter,
  Trash2, Bell, Send, User, Users,
  Calendar, MessageSquare, Megaphone
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

interface NotificationEntry {
  id: string;
  type: "Individual User" | "All Users" | string;
  name: string;
  title: string;
  date: string;
  msg: string;
}

interface SectionLabelProps {
  children: React.ReactNode;
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  iconBg: string;
  iconColor: string;
  borderAccent: string;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
}

function StatCard({ icon: Icon, label, value, iconBg, iconColor, borderAccent }: StatCardProps) {
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationPage() {
  const [notifications] = useState<NotificationEntry[]>([
    { id: "1", type: "Individual User", name: "Anmol Goyal", title: "Testing the push notification", date: "Dec-26-2025 07:03:55", msg: "This notification must be pushed in the notification panel of android mobile" },
    { id: "2", type: "Individual User", name: "Anmol desire", title: "Anmol Goyal", date: "Nov-19-2025 11:01:37", msg: "testing push notification message" },
    { id: "7", type: "All Users", name: "0", title: "Price Update", date: "Oct-24-2025 04:58:04", msg: "The price of 4 way DD has been updated to Rs.306" },
    { id: "10", type: "All Users", name: "0", title: "Price Update", date: "Oct-24-2025 04:56:28", msg: "The price of 10 Way DD has been updated to Rs.441" },
  ]);

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Notification</h1>
          <p className="text-sm text-slate-500 mt-0.5">Push Messaging Center and Broadcast Control</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md">
            <Megaphone size={15} />
            Broadcast Notification
          </button>
        </div>
      </div>

      {/* ── Overview Stats ── */}
      <SectionLabel>Delivery Overview</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <StatCard icon={Send} label="Total Sent" value="1,240" iconBg="bg-blue-100" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
        <StatCard icon={Users} label="Broadcasts" value="85" iconBg="bg-purple-100" iconColor="text-purple-600" borderAccent="border-t-purple-500" />
        <StatCard icon={MessageSquare} label="Open Rate" value="92%" iconBg="bg-emerald-100" iconColor="text-emerald-600" borderAccent="border-t-emerald-500" />
      </div>

      {/* ── Table Section ── */}
      <SectionLabel>Notification Logs</SectionLabel>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search notifications..."
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
            <option>Delete Logs</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3.5 w-10 text-[11px] font-semibold uppercase tracking-wider text-slate-500">ID</th>
                {["Target", "User Name", "Title", "Date & Time", "Message", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {notifications.map((note) => (
                <tr key={note.id} className="hover:bg-slate-50 transition-colors duration-150 group">
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">
                    #{note.id}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                      note.type === 'All Users' 
                        ? 'bg-purple-50 text-purple-700 border-purple-100' 
                        : 'bg-blue-50 text-blue-700 border-blue-100'
                    }`}>
                      {note.type === 'All Users' ? <Users size={10} /> : <User size={10} />}
                      {note.type}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-medium text-sm text-slate-800">
                    {note.name === "0" ? <span className="text-slate-400 italic font-normal">Broadcast</span> : note.name}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Bell size={14} className="text-amber-500" />
                      {note.title}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                      <Calendar size={14} className="text-slate-400" />
                      {note.date}
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-xs text-slate-500 font-medium line-clamp-1 max-w-[250px] italic">
                      &quot;{note.msg}&quot;
                    </p>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button className="w-9 h-9 flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 transition-all duration-200" title="Delete Log">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-600 font-semibold">1–4</span> of <span className="text-slate-600 font-semibold">10</span> sent notifications
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}