/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useMemo } from "react";
import {
  Search, Plus, FileDown, Eye, Edit2,
  Trash2, QrCode, ChevronLeft, ChevronRight,
  Filter, Building2, Wallet, CheckCircle2, AlertCircle, LucideIcon
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

interface Dealer {
  id: string;
  name: string;
  wallet: string;
  dealerCode: string;
  reffCode: string;
  email: string;
  phone: string;
  gst: string;
  status: "Active" | "Pending";
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: number | string;
  iconBg: string;
  iconColor: string;
  borderAccent: string;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
    {children}
  </p>
);

const StatCard = ({ icon: Icon, label, value, iconBg, iconColor, borderAccent }: StatCardProps) => (
  <div
    className={`bg-white rounded-xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3
      transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer shadow-sm`}
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

const StatusBadge = ({ status }: { status: "Active" | "Pending" }) => {
  const isActive = status === "Active";
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
      isActive ? "bg-green-50 text-green-700 border-green-200" : "bg-amber-50 text-amber-700 border-amber-200"
    }`}>
      <span className={`w-1.5 h-1.5 rounded-full inline-block ${isActive ? "bg-green-500" : "bg-amber-500"}`} />
      {status}
    </span>
  );
};

// ─── Mock Data ────────────────────────────────────────────────────────────────

const INITIAL_DEALERS: Dealer[] = [
  { id: "3334", name: "Sandeep Singh", wallet: "0", dealerCode: "040159", reffCode: "—", email: "gillsandeepsingh39@gmail.com", phone: "9417320275", gst: "Sandeep Singh | 03HTZPS4177P1ZB", status: "Active" },
  { id: "3323", name: "Aman Juneja", wallet: "1,200", dealerCode: "271602", reffCode: "REF991", email: "adenterprisesindia@gmail.com", phone: "7889269954", gst: "Ad Enterprises | 03apppj8788n1zw", status: "Active" },
  { id: "3322", name: "Sagar Electronics", wallet: "450", dealerCode: "470678", reffCode: "—", email: "malhotraranjeet82@gmail.com", phone: "9465258788", gst: "Sagar | 03JEAPK5962N1Z2", status: "Pending" },
  { id: "3318", name: "Puneet Kumar", wallet: "0", dealerCode: "716436", reffCode: "REF102", email: "puneetkukkar@gmail.com", phone: "9417345313", gst: "AHDP9529J | 03AHDPK9529J1Z7", status: "Active" },
  { id: "3315", name: "Rajesh Hardware", wallet: "5,600", dealerCode: "112233", reffCode: "—", email: "rajesh.hwd@gmail.com", phone: "9812345678", gst: "Rajesh | 03BCCPK1234J1Z1", status: "Active" },
  { id: "3310", name: "Vikram Electricals", wallet: "250", dealerCode: "998877", reffCode: "REF442", email: "vikram.elec@srv.com", phone: "9876543210", gst: "Vikram | 03DDPPK5566K1Z9", status: "Pending" },
  { id: "3305", name: "Kiran Enterprises", wallet: "0", dealerCode: "554433", reffCode: "—", email: "kiran.ent@gmail.com", phone: "9412398745", gst: "Kiran | 03EEFPK7788L1Z5", status: "Active" },
  { id: "3298", name: "Mehta Solutions", wallet: "3,150", dealerCode: "223344", reffCode: "REF009", email: "mehta.sol@srv.com", phone: "9646127000", gst: "Mehta | 03FFGPK9900M1Z3", status: "Active" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DealersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDealers = useMemo(() => {
    return INITIAL_DEALERS.filter(
      (d) =>
        d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.dealerCode.includes(searchTerm) ||
        d.phone.includes(searchTerm)
    );
  }, [searchTerm]);

  const stats = useMemo(() => ({
    total: INITIAL_DEALERS.length,
    active: INITIAL_DEALERS.filter(d => d.status === "Active").length,
    pending: INITIAL_DEALERS.filter(d => d.status === "Pending").length
  }), []);

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Dealers</h1>
          <p className="text-sm text-slate-500 mt-0.5">Overview of authorized dealers</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium shadow-sm">
            <FileDown size={15} /> Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-md shadow-blue-100">
            <Plus size={15} /> Add Dealer
          </button>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard icon={Building2} label="Total Dealers" value={stats.total} iconBg="bg-indigo-100" iconColor="text-indigo-600" borderAccent="border-t-indigo-500" />
        <StatCard icon={CheckCircle2} label="Active" value={stats.active} iconBg="bg-green-100" iconColor="text-green-600" borderAccent="border-t-green-500" />
        <StatCard icon={AlertCircle} label="Pending" value={stats.pending} iconBg="bg-amber-100" iconColor="text-amber-600" borderAccent="border-t-amber-500" />
      </div>

      {/* ── Table Section ── */}
      <SectionLabel>All Dealers</SectionLabel>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by name, code or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all grow sm:grow-0 justify-center">
            <Filter size={14} /> Filter
          </button>
          <select className="px-3 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium outline-none grow sm:grow-0">
            <option>Bulk Actions</option>
            <option>Delete Selected</option>
            <option>Export Selected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-4 w-10">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                </th>
                {["ID", "Dealer Details", "Wallet", "Dealer Code", "QR", "Contact & GST", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-4 text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDealers.map((dealer) => (
                <tr key={dealer.id} className="hover:bg-slate-50/80 transition-all duration-150 group">
                  <td className="px-5 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">#{dealer.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center text-xs font-bold border border-indigo-100 uppercase">
                        {dealer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700 whitespace-nowrap">{dealer.name}</p>
                        <p className="text-[11px] text-slate-400 truncate max-w-[150px]">{dealer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 whitespace-nowrap">
                    <span className="text-xs font-bold px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md border border-emerald-100">
                      ₹{dealer.wallet}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs font-bold text-blue-600">{dealer.dealerCode}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">REF: {dealer.reffCode}</p>
                  </td>
                  <td className="px-5 py-4">
                    <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                      <QrCode size={14} />
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-xs font-semibold text-slate-600">{dealer.phone}</p>
                    <p className="text-[9px] text-slate-400 max-w-[150px] leading-tight mt-1 group-hover:text-slate-500 transition-colors uppercase">{dealer.gst}</p>
                  </td>
                  <td className="px-5 py-4"><StatusBadge status={dealer.status} /></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-md" title="View"><Eye size={15} /></button>
                      <button className="p-1.5 text-amber-500 hover:bg-amber-50 rounded-md" title="Edit"><Edit2 size={15} /></button>
                      <button className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-md" title="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDealers.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-16 text-center">
                    <div className="flex flex-col items-center gap-2">
                       <Building2 size={32} className="text-slate-200" />
                       <p className="text-sm text-slate-400">No dealers found matching "{searchTerm}"</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-600 font-semibold">{filteredDealers.length}</span> of <span className="text-slate-600 font-semibold">{stats.total}</span> dealers
          </p>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors"><ChevronLeft size={14} /></button>
            <button className="w-8 h-8 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-md shadow-blue-100">1</button>
            <button className="w-8 h-8 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50">2</button>
            <button className="p-2 border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-colors"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}