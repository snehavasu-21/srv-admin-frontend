
"use client";

import React, { useState } from "react";
import {
  Search, FileDown,
  ChevronLeft, ChevronRight,
  Filter, Edit2, CheckCircle2,
  ArrowDownCircle, Wallet, Users,
  Clock, IndianRupee,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const withdrawalsData = [
  { id: "187", userId: "1640", userName: "Pradeep Kumar",  phone: "9829555400", date: "2026-03-19", upiId: "9829555400@ybl",              points: "350",   status: "Approved" },
  { id: "186", userId: "1203", userName: "Sanjeev Kumar",  phone: "7087734521", date: "2026-03-18", upiId: "sk21700146602@okaxis",         points: "115",   status: "Approved" },
  { id: "185", userId: "794",  userName: "Gurpreet Singh", phone: "9781332040", date: "2026-03-18", upiId: "gff9656@okicici",              points: "100",   status: "Approved" },
  { id: "184", userId: "1515", userName: "Manoj Sharma",   phone: "9467698393", date: "2026-03-18", upiId: "manojsharmahr1998@oksbi",      points: "197.7", status: "Approved" },
  { id: "183", userId: "3072", userName: "Angrej Singh",   phone: "7710369844", date: "2026-03-18", upiId: "angrejrajpooto7-1@okaxis",     points: "100",   status: "Approved" },
  { id: "182", userId: "1641", userName: "Amit Sihag",     phone: "8107844354", date: "2026-03-18", upiId: "8107844354@ybl",               points: "220",   status: "Pending"  },
  { id: "181", userId: "869",  userName: "Pankaj",         phone: "8847095790", date: "2026-03-17", upiId: "pankaj38748@okhdfcbank",       points: "200",   status: "Approved" },
  { id: "180", userId: "2565", userName: "Rajdeep Singh",  phone: "9915479580", date: "2026-03-16", upiId: "rajdeep2749@okicici",          points: "453",   status: "Pending"  },
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

function StatusBadge({ status }) {
  if (status === "Approved") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
        <CheckCircle2 size={11} />
        Approved
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
      <Clock size={11} />
      Pending
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function WithdrawalPage() {
  const [searchTerm,  setSearchTerm]  = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const totalPoints   = withdrawalsData.reduce((acc, i) => acc + parseFloat(i.points), 0);
  const approvedCount = withdrawalsData.filter((i) => i.status === "Approved").length;
  const pendingCount  = withdrawalsData.filter((i) => i.status === "Pending").length;

  const filteredData = withdrawalsData.filter((item) => {
    const matchSearch =
      item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.upiId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus =
      statusFilter === "All Status" || item.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Withdrawals</h1>
          <p className="text-sm text-slate-500 mt-0.5">Review and process user payout requests</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:shadow-sm transition-all duration-200 text-sm font-medium">
          <FileDown size={15} />
          CSV Export
        </button>
      </div>

      {/* ── Summary Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard icon={Wallet}       label="Total Requests"    value={withdrawalsData.length} iconBg="bg-blue-100"   iconColor="text-blue-600"   borderAccent="border-t-blue-500"   />
        <StatCard icon={IndianRupee}  label="Total Points Paid" value={totalPoints.toFixed(1)} iconBg="bg-green-100"  iconColor="text-green-600"  borderAccent="border-t-green-500"  />
        <StatCard icon={CheckCircle2} label="Approved"          value={approvedCount}          iconBg="bg-emerald-100" iconColor="text-emerald-600" borderAccent="border-t-emerald-500" />
        <StatCard icon={Clock}        label="Pending"           value={pendingCount}           iconBg="bg-amber-100"  iconColor="text-amber-600"  borderAccent="border-t-amber-500"  />
      </div>

      {/* ── Table Section ── */}
      <SectionLabel>All Withdrawal Requests</SectionLabel>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option>All Status</option>
            <option>Pending</option>
            <option>Approved</option>
          </select>
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search by name or UPI ID..."
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
                {["ID", "User Details", "Contact", "Points & Date", "UPI ID", "Status", "Action"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors duration-150">

                  <td className="px-5 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>

                  {/* ID */}
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">
                    #{item.id}
                  </td>

                  {/* User Details */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {item.userName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 whitespace-nowrap">{item.userName}</p>
                        <p className="text-[11px] text-slate-400">User ID: {item.userId}</p>
                      </div>
                    </div>
                  </td>

                  {/* Contact */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-700">{item.phone}</p>
                  </td>

                  {/* Points & Date */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5 text-rose-500 font-semibold text-sm">
                      <ArrowDownCircle size={14} />
                      {item.points} pts
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">{item.date}</p>
                  </td>

                  {/* UPI ID */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-1 rounded-lg inline-block max-w-[160px] truncate">
                      {item.upiId}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={item.status} />
                  </td>

                  {/* Action */}
                  <td className="px-5 py-4">
                    <button
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-amber-500 hover:bg-amber-50 transition-all duration-200"
                      title="Edit"
                    >
                      <Edit2 size={15} />
                    </button>
                  </td>

                </tr>
              ))}

              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-slate-400">
                    No withdrawals found matching{" "}
                    <span className="font-semibold text-slate-600">"{searchTerm}"</span>
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
            <span className="text-slate-600 font-semibold">{filteredData.length}</span>{" "}
            of{" "}
            <span className="text-slate-600 font-semibold">{withdrawalsData.length}</span> requests
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
              19
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