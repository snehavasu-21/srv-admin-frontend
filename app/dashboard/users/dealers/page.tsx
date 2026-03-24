"use client";

import React, { useState } from "react";
import {
  Search, Plus, FileDown, Eye, Edit2,
  Trash2, QrCode, ChevronLeft, ChevronRight,
  Filter, Building2, CheckCircle2, XCircle,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const dealersData = [
  { id: "3334", name: "Sandeep Singh",      wallet: "0",     dealerCode: "040159", reffCode: "—",      email: "gillsandeepsingh39@gmail.com", phone: "9417320275", gst: "Sandeep Singh | 03HTZPS4177P1ZB",   status: "Active"   },
  { id: "3323", name: "Aman Juneja",        wallet: "1,200", dealerCode: "271602", reffCode: "REF991", email: "adenterprisesindia@gmail.com",  phone: "7889269954", gst: "Ad Enterprises | 03apppj8788n1zw", status: "Active"   },
  { id: "3322", name: "Sagar Electronics",  wallet: "450",   dealerCode: "470678", reffCode: "—",      email: "malhotraranjeet82@gmail.com",   phone: "9465258788", gst: "Sagar | 03JEAPK5962N1Z2",          status: "Inactive" },
  { id: "3318", name: "Puneet Kumar",       wallet: "0",     dealerCode: "716436", reffCode: "REF102", email: "puneetkukkar@gmail.com",        phone: "9417345313", gst: "AHDP9529J | 03AHDPK9529J1Z7",     status: "Active"   },
  { id: "3315", name: "Rajesh Hardware",    wallet: "5,600", dealerCode: "112233", reffCode: "—",      email: "rajesh.hwd@gmail.com",          phone: "9812345678", gst: "Rajesh | 03BCCPK1234J1Z1",         status: "Active"   },
  { id: "3310", name: "Vikram Electricals", wallet: "250",   dealerCode: "998877", reffCode: "REF442", email: "vikram.elec@srv.com",           phone: "9876543210", gst: "Vikram | 03DDPPK5566K1Z9",         status: "Inactive" },
  { id: "3305", name: "Kiran Enterprises",  wallet: "0",     dealerCode: "554433", reffCode: "—",      email: "kiran.ent@gmail.com",           phone: "9412398745", gst: "Kiran | 03EEFPK7788L1Z5",          status: "Active"   },
  { id: "3298", name: "Mehta Solutions",    wallet: "3,150", dealerCode: "223344", reffCode: "REF009", email: "mehta.sol@srv.com",             phone: "9646127000", gst: "Mehta | 03FFGPK9900M1Z3",          status: "Active"   },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

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
  if (status === "Active") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-200">
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block" />
        Active
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-red-50 text-red-600 border border-red-200">
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
      Inactive
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DealersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDealers = dealersData.filter(
    (d) =>
      d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      d.dealerCode.includes(searchTerm)
  );

  const activeCount   = dealersData.filter((d) => d.status === "Active").length;
  const inactiveCount = dealersData.filter((d) => d.status === "Inactive").length;

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Dealers</h1>
          <p className="text-sm text-slate-500 mt-0.5">Overview of authorized dealers</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:shadow-sm transition-all duration-200 text-sm font-medium">
            <FileDown size={15} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md">
            <Plus size={15} />
            Add Dealer
          </button>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={Building2}
          label="Total Dealers"
          value={dealersData.length}
          iconBg="bg-indigo-100"
          iconColor="text-indigo-600"
          borderAccent="border-t-indigo-500"
        />
        <StatCard
          icon={CheckCircle2}
          label="Active"
          value={activeCount}
          iconBg="bg-green-100"
          iconColor="text-green-600"
          borderAccent="border-t-green-500"
        />
        <StatCard
          icon={XCircle}
          label="Inactive"
          value={inactiveCount}
          iconBg="bg-red-100"
          iconColor="text-red-500"
          borderAccent="border-t-red-400"
        />
      </div>

      {/* ── Table Section ── */}
      <SectionLabel>All Dealers</SectionLabel>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by name or dealer code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
            <option>Delete Selected</option>
            <option>Export Selected</option>
          </select>
        </div>
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
                {["ID", "Dealer Details", "Wallet", "Dealer Code", "QR Code", "Contact & GST", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDealers.map((dealer) => (
                <tr key={dealer.id} className="hover:bg-slate-50 transition-colors duration-150">

                  <td className="px-5 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>

                  {/* ID */}
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">
                    #{dealer.id}
                  </td>

                  {/* Dealer Details */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-xs font-semibold flex-shrink-0">
                        {dealer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800 whitespace-nowrap">{dealer.name}</p>
                        <p className="text-xs text-slate-400 truncate max-w-[160px]">{dealer.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Wallet */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
                      ₹{dealer.wallet}
                    </span>
                  </td>

                  {/* Dealer Code */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-blue-600">{dealer.dealerCode}</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-0.5">REF: {dealer.reffCode}</p>
                  </td>

                  {/* QR Code */}
                  <td className="px-5 py-4">
                    <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-500 hover:bg-blue-600 hover:text-white transition-all duration-200">
                      <QrCode size={15} />
                    </button>
                  </td>

                  {/* Contact & GST */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-slate-800">{dealer.phone}</p>
                    <p className="text-[10px] text-slate-400 max-w-[150px] leading-tight mt-0.5 truncate">{dealer.gst}</p>
                  </td>

                  {/* Status */}
                  <td className="px-5 py-4">
                    <StatusBadge status={dealer.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 transition-all duration-200" title="View">
                        <Eye size={15} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-amber-500 hover:bg-amber-50 transition-all duration-200" title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 transition-all duration-200" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredDealers.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-12 text-center text-sm text-slate-400">
                    No dealers found matching <span className="font-semibold text-slate-600">"{searchTerm}"</span>
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
            <span className="text-slate-600 font-semibold">{filteredDealers.length}</span>{" "}
            of{" "}
            <span className="text-slate-600 font-semibold">{dealersData.length}</span> dealers
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