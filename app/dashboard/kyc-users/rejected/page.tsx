"use client";

import { useState } from "react";
import { Search, Eye, ChevronLeft, ChevronRight, Filter, UserX, Users, AlertCircle } from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const usersData = [
  { id: "3334", name: "Sandeep Singh", phone: "9417320275", address: "Mari Nauabad, Punjab", status: "Incomplete" },
  { id: "3327", name: "-",             phone: "8571063074", address: "-",                    status: "Incomplete" },
  { id: "3323", name: "Aman Juneja",   phone: "7889269954", address: "Khuban, Punjab",       status: "Incomplete" },
  { id: "3312", name: "Puneet Kumar",  phone: "9417345313", address: "Fazilka, Punjab",      status: "Incomplete" },
  { id: "3303", name: "Manjeet Singh", phone: "7009976900", address: "Mansa, Punjab",        status: "Incomplete" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RejectedKYCPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = usersData.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
            <UserX className="text-red-500" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Rejected KYC Users</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage users with Rejected KYC details</p>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-2 gap-16">
        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-blue-500 p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
            <Users size={20} className="text-blue-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-800">{usersData.length}</p>
            <p className="text-xs text-slate-500 mt-1">Total Users</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-red-400 p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
            <UserX size={20} className="text-red-500" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-800">{usersData.length}</p>
            <p className="text-xs text-slate-500 mt-1">Rejected KYC</p>
          </div>
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <SectionLabel>All Users</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all">
          <Filter size={14} />
          Filters
        </button>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["User ID", "Name", "Phone", "Address", "Status", "Action"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors duration-150">

                  <td className="px-5 py-4 text-sm font-medium text-slate-500">
                    {user.id}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-800">
                    {user.name}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-700">
                    {user.phone}
                  </td>

                  <td className="px-5 py-4 text-sm text-slate-500 max-w-[200px] truncate">
                    {user.address}
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                      {user.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 transition-all duration-200" title="View Details">
                      <Eye size={15} />
                    </button>
                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-400">
                    No users found matching{" "}
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
            Page <span className="text-slate-600 font-semibold">1</span> of{" "}
            <span className="text-slate-600 font-semibold">10</span>
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

    </div>
  );
}