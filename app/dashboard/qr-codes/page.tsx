"use client";

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Search, Plus, FileDown, Eye, Edit2, Trash2,
  QrCode, ChevronLeft, ChevronRight, Filter,
  Layers, Hash, Calendar, Download, LucideIcon
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

interface QRCodeBatch {
  id: string;
  productName: string;
  batchNo: string;
  date: string;
  point: string;
  qty: string;
}

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconBg: string;
  iconColor: string;
  borderAccent: string;
}

interface SectionLabelProps {
  children: React.ReactNode;
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

// ─── Page Component ──────────────────────────────────────────────────────────

export default function ManageQRCodePage() {
  // Data State
  const [qrCodes] = useState<QRCodeBatch[]>([
    { id: "1195", productName: "CC RG 4\" 18/60 PC", batchNo: "1535", date: "2026-03-20", point: "2", qty: "4000" },
    { id: "1193", productName: "CC PL 4.5\" 24/60 PC", batchNo: "1534", date: "2026-03-20", point: "2", qty: "1000" },
    { id: "1192", productName: "CC NP 3.5\" 14/56 PC", batchNo: "1533", date: "2026-03-20", point: "1", qty: "3500" },
    { id: "1191", productName: "ACO 63A FP", batchNo: "1532", date: "2026-03-20", point: "50", qty: "40" },
    { id: "1190", productName: "ACO 63A DP", batchNo: "1531", date: "2026-03-20", point: "25", qty: "300" },
    { id: "1189", productName: "ACO 30A DP", batchNo: "1530", date: "2026-03-20", point: "15", qty: "500" },
    { id: "1188", productName: "MAIN SWCH 100A TP", batchNo: "1529", date: "2026-03-20", point: "50", qty: "5" },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(qrCodes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "QR_Codes");
    XLSX.writeFile(workbook, "SRV_QR_Codes_List.xlsx");
  };

  const filteredCodes = qrCodes.filter(qr => 
    qr.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    qr.batchNo.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage QR Codes</h1>
          <p className="text-sm text-slate-500 mt-0.5">Batch generation and product tracking</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:shadow-sm transition-all duration-200 text-sm font-medium"
          >
            <FileDown size={15} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md">
            <Plus size={15} />
            Add QR Code
          </button>
        </div>
      </div>

      {/* ── Summary Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard icon={QrCode} label="Total Batches" value="1,195" iconBg="bg-blue-100" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
        <StatCard icon={Layers} label="Total Qty Generated" value="12,345" iconBg="bg-purple-100" iconColor="text-purple-600" borderAccent="border-t-purple-500" />
        <StatCard icon={Calendar} label="Updated Today" value="7 Batches" iconBg="bg-emerald-100" iconColor="text-emerald-600" borderAccent="border-t-emerald-500" />
      </div>

      {/* ── Table Section ── */}
      <SectionLabel>Batch List</SectionLabel>

      {/* Search + Filter bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search product or batch..."
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all">
            <Filter size={14} />
            Filter
          </button>
          <select className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer">
            <option>Bulk Actions</option>
            <option>Delete Selected</option>
            <option>Download Selected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3.5 w-10">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                </th>
                {["ID", "Product Details", "Batch Info", "Points", "Quantity", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCodes.map((qr) => (
                <tr key={qr.id} className="hover:bg-slate-50/80 transition-colors duration-150 group">
                  <td className="px-5 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                  </td>

                  {/* ID */}
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">
                    #{qr.id}
                  </td>

                  {/* Product Name */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                        <QrCode size={16} />
                      </div>
                      <p className="text-sm font-medium text-slate-800 whitespace-nowrap">{qr.productName}</p>
                    </div>
                  </td>

                  {/* Batch Info */}
                  <td className="px-5 py-4">
                    <div className="flex flex-col">
                      <div className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                        <Hash size={12} className="text-slate-400" /> {qr.batchNo}
                      </div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1 uppercase font-medium mt-0.5">
                        <Calendar size={10} /> {qr.date}
                      </div>
                    </div>
                  </td>

                  {/* Points */}
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
                      {qr.point} Pts
                    </span>
                  </td>

                  {/* Quantity */}
                  <td className="px-5 py-4 text-sm text-slate-700 font-semibold">
                    {qr.qty}
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 transition-all" title="View">
                        <Eye size={15} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-emerald-500 hover:bg-emerald-50 transition-all" title="Download QR">
                        <Download size={15} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-amber-500 hover:bg-amber-50 transition-all" title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 transition-all" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-600 font-semibold">1–{filteredCodes.length}</span> of <span className="text-slate-600 font-semibold">1,195</span> batches
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