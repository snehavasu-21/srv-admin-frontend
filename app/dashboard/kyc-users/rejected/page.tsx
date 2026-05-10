/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, ChangeEvent } from "react";
import { 
  Search, Eye, ChevronLeft, ChevronRight, 
  UserX, Users, X
} from "lucide-react";

// ─── Types & Interfaces ──────────────────────────────────────────────────────

interface RejectedUser {
  id: string;
  name: string;
  phone: string;
  address: string;
  status: "Rejected" | "Action Required";
}

interface SectionLabelProps {
  children: React.ReactNode;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const usersData: RejectedUser[] = [
  { id: "3334", name: "Sandeep Singh", phone: "9417320275", address: "Mari Nauabad, Punjab", status: "Rejected" },
  { id: "3327", name: "-",             phone: "8571063074", address: "-",                    status: "Rejected" },
  { id: "3323", name: "Aman Juneja",   phone: "7889269954", address: "Khuban, Punjab",       status: "Rejected" },
  { id: "3312", name: "Puneet Kumar",  phone: "9417345313", address: "Fazilka, Punjab",      status: "Rejected" },
  { id: "3303", name: "Manjeet Singh", phone: "7009976900", address: "Mansa, Punjab",         status: "Rejected" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function RejectedKYCPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [viewUser, setViewUser] = useState<RejectedUser | null>(null);

  // --- Filtering Logic (Search Only) ---
  const filtered = usersData.filter((u) => {
    return u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.phone.includes(searchTerm);
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans relative">

      {/* ── View Details Modal ── */}
      {viewUser && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setViewUser(null)} />
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-[111] overflow-hidden animate-in zoom-in duration-200 font-sans">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">KYC User Details</h3>
              <button onClick={() => setViewUser(null)} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><X size={18} className="text-slate-500" /></button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="flex justify-between border-b border-slate-50 pb-2"> <span className="text-slate-500">User ID:</span> <span className="font-bold text-blue-600">#{viewUser.id}</span> </div>
              <div className="flex justify-between border-b border-slate-50 pb-2"> <span className="text-slate-500">Name:</span> <span className="text-slate-800 font-semibold">{viewUser.name}</span> </div>
              <div className="flex justify-between border-b border-slate-50 pb-2"> <span className="text-slate-500">Phone:</span> <span className="text-slate-800">{viewUser.phone}</span> </div>
              <div className="flex justify-between border-b border-slate-50 pb-2"> <span className="text-slate-500">Address:</span> <span className="text-slate-800 text-right max-w-[200px]">{viewUser.address}</span> </div>
              <div className="flex justify-between"> <span className="text-slate-500">Status:</span> <span className="px-2 py-0.5 rounded-full bg-red-50 text-red-700 text-[11px] font-bold border border-red-200">{viewUser.status}</span> </div>
            </div>
          </div>
        </div>
      )}

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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
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

      {/* ── Search ── */}
      <SectionLabel>All Users</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 relative">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
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
                  <td className="px-5 py-4 text-sm font-medium text-slate-500">{user.id}</td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-800">{user.name}</td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-700">{user.phone}</td>
                  <td className="px-5 py-4 text-sm text-slate-500 max-w-[200px] truncate">{user.address}</td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-50 text-red-700 border border-red-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button 
                      onClick={() => setViewUser(user)}
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 transition-all duration-200" title="View Details">
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-slate-400">
                    No users found matching{" "}
                    <span className="font-semibold text-slate-600">&quot;{searchTerm}&quot;</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between font-sans">
          <p className="text-xs text-slate-400 font-medium">
            Page <span className="text-slate-600 font-semibold">{currentPage}</span> of{" "}
            <span className="text-slate-600 font-semibold">10</span>
          </p>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            {[1, 2].map((n) => (
              <button
                key={n}
                onClick={() => setCurrentPage(n)}
                className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all ${
                  n === currentPage
                    ? "bg-blue-600 text-white shadow-sm"
                    : "bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100"
                }`}
              >
                {n}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(p => Math.min(10, p + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}