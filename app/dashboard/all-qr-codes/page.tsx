
"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronLeft, ChevronRight, 
  Download, QrCode, Calendar, 
  FileArchive, ShieldCheck, Clock, Filter, FileDown
} from "lucide-react";

// ─── Sub-components (Matching Electricians UI) ────────────────────────────────

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

export default function AllQRCodesPage() {
  const [qrList] = useState([
    { id: "7332367", codeNumber: "53989E0ECE445F602DA2", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332370", codeNumber: "4C2CAA73057FBF8446C5", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332374", codeNumber: "4D71FB18B8A7765F9A71", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332369", codeNumber: "031D61E28AAAD67E7303", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332372", codeNumber: "EFD79117BEB99819F7C5", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332371", codeNumber: "7EEED61AE16CAC02F941", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
  ]);

  const exportAllData = () => {
    const worksheet = XLSX.utils.json_to_sheet(qrList);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "All_QR_Codes");
    XLSX.writeFile(workbook, "SRV_All_QR_Data.xlsx");
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">View QR Codes</h1>
          <p className="text-sm text-slate-500 mt-0.5">Complete QR Inventory and Status Tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={exportAllData}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
          >
            <FileArchive size={15} />
            Download All (Excel + ZIP)
          </button>
        </div>
      </div>

      {/* ── Overview Stats ── */}
      <SectionLabel>Inventory Overview</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        <StatCard icon={QrCode} label="Total Codes" value="7,332,374" iconBg="bg-blue-100" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
        <StatCard icon={ShieldCheck} label="Redeemed" value="4,120" iconBg="bg-emerald-100" iconColor="text-emerald-600" borderAccent="border-t-emerald-500" />
        <StatCard icon={Clock} label="Pending" value="2,915" iconBg="bg-amber-100" iconColor="text-amber-600" borderAccent="border-t-amber-500" />
      </div>

      {/* ── Table Section ── */}
      <SectionLabel>QR Code List</SectionLabel>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search QR Number..."
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
            <option>Redeem Selected</option>
            <option>Download Images</option>
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
                {["QR Code Number", "QR Image", "Point", "Batch", "Dates", "Status", "Action"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {qrList.map((qr) => (
                <tr key={qr.id} className="hover:bg-slate-50 transition-colors duration-150 group">
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">
                    #{qr.id}
                  </td>

                  <td className="px-5 py-4">
                    <div className="text-[13px] font-medium text-slate-800 font-mono tracking-tight bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 w-fit">
                      {qr.codeNumber}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <div className="inline-block p-1 bg-white border border-slate-200 rounded-lg">
                      <QrCode size={32} className="text-slate-800" strokeWidth={1.5} />
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
                      {qr.points} Pts
                    </span>
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-slate-600">
                    {qr.batch}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-0.5">
                      <div className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 uppercase">
                        <Clock size={10} className="text-blue-400" /> Gen: {qr.genDate}
                      </div>
                      <div className="text-[10px] font-semibold text-slate-400 flex items-center gap-1 uppercase">
                        <ShieldCheck size={10} className="text-emerald-400" /> Red: {qr.redeemDate}
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                      {qr.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg text-[11px] font-bold transition-all shadow-sm">
                      <Download size={12} /> Download
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
            Showing <span className="text-slate-600 font-semibold">1–6</span> of <span className="text-slate-600 font-semibold">7.3M</span> QR codes
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm">1</button>
            <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">2</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}