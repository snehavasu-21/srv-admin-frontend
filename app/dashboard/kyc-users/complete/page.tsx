"use client";

import React, { useState, ChangeEvent } from "react";
import { 
  Search, Eye, ChevronLeft, ChevronRight, 
  Filter, UserCheck, Users 
} from "lucide-react";

// ─── Types & Interfaces ──────────────────────────────────────────────────────

interface UserKYC {
  id: string;
  name: string;
  phone: string;
  aadhaarFront: string;
  aadhaarBack: string;
  pan: string;
  status: "Completed" | "Pending" | "Rejected";
}

interface SectionLabelProps {
  children: React.ReactNode;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const usersData: UserKYC[] = [
  { id: "3351", name: "Gurlal Singh",    phone: "9781406883", aadhaarFront: "-", aadhaarBack: "-", pan: "-", status: "Completed" },
  { id: "3350", name: "Jagseer Singh",   phone: "9417437685", aadhaarFront: "-", aadhaarBack: "-", pan: "-", status: "Completed" },
  { id: "3349", name: "Jagdeep Kumar",   phone: "9781879905", aadhaarFront: "-", aadhaarBack: "-", pan: "-", status: "Completed" },
  { id: "3348", name: "-",               phone: "9001464212", aadhaarFront: "-", aadhaarBack: "-", pan: "-", status: "Completed" },
  { id: "3347", name: "-",               phone: "8955205040", aadhaarFront: "-", aadhaarBack: "-", pan: "-", status: "Completed" },
  { id: "3346", name: "-",               phone: "7087040764", aadhaarFront: "-", aadhaarBack: "-", pan: "-", status: "Completed" },
  { id: "3345", name: "Arshdeep Singh",  phone: "9988533182", aadhaarFront: "-", aadhaarBack: "-", pan: "-", status: "Completed" },
  { id: "3344", name: "Arshpreet Singh", phone: "9646127661", aadhaarFront: "-", aadhaarBack: "-", pan: "-", status: "Completed" },
  { id: "3343", name: "Sarabjit Singh",  phone: "7009172474", aadhaarFront: "-", aadhaarBack: "-", pan: "-", status: "Completed" },
  { id: "3342", name: "Ram Lubhaya",     phone: "9779745208", aadhaarFront: "-", aadhaarBack: "-", pan: "-", status: "Completed" },
];

// ─── Reusable Components ──────────────────────────────────────────────────────

const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function CompletedKYCPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredUsers = usersData.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm)
  );

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <UserCheck className="text-green-600" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Completed KYC Users</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage users with completed KYC</p>
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
        
        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-green-500 p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <UserCheck size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-800">{usersData.length}</p>
            <p className="text-xs text-slate-500 mt-1">Completed KYC</p>
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
            onChange={handleSearchChange}
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
                {["User ID", "Name", "Phone", "Aadhaar Front", "Aadhaar Back", "PAN Card", "Status", "Action"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
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
                  <td className="px-5 py-4 text-sm text-slate-400">
                    {user.aadhaarFront}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400">
                    {user.aadhaarBack}
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-400">
                    {user.pan}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button 
                      className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 transition-all duration-200" 
                      title="View Details"
                    >
                      <Eye size={15} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-slate-400">
                    No users found matching{" "}
                    <span className="font-semibold text-slate-600">&quot;{searchTerm}&quot;</span>
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
            <span className="text-slate-600 font-semibold">25</span>
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