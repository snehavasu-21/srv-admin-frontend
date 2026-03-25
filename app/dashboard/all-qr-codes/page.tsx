/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronLeft, ChevronRight, 
  Download, QrCode, Calendar, 
  FileArchive, ShieldCheck, Clock, Filter
} from "lucide-react";

// ─── Interfaces ──────────────────────────────────────────────────

interface QRCode {
  id: string;
  codeNumber: string;
  points: string;
  batch: string;
  genDate: string;
  userName: string;
  redeemDate: string;
  status: 'Pending' | 'Redeemed';
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
  iconBg: string;
  iconColor: string;
  borderAccent: string;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
}

function StatCard({ icon: Icon, label, value, iconBg, iconColor, borderAccent }: StatCardProps) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5`}>
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

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AllQRCodesPage() {
  const [qrList] = useState<QRCode[]>([
    { id: "7332367", codeNumber: "53989E0ECE445F602DA2", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332370", codeNumber: "4C2CAA73057FBF8446C5", points: "5", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Redeemed" },
    { id: "7332374", codeNumber: "4D71FB18B8A7765F9A71", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332369", codeNumber: "031D61E28AAAD67E7303", points: "10", batch: "1534", genDate: "2026-03-19", userName: "", redeemDate: "2026-03-20", status: "Pending" },
    { id: "7332372", codeNumber: "EFD79117BEB99819F7C5", points: "2", batch: "1534", genDate: "2026-03-19", userName: "", redeemDate: "2026-03-20", status: "Redeemed" },
    { id: "7332371", codeNumber: "7EEED61AE16CAC02F941", points: "2", batch: "1535", genDate: "2026-03-20", userName: "", redeemDate: "2026-03-20", status: "Pending" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // ─── Logic ─────────────────────────────────────────────────────────────────

  const filteredData = useMemo(() => {
    return qrList.filter(item => {
      const matchesSearch = item.codeNumber.toLowerCase().includes(searchTerm.toLowerCase()) || item.id.includes(searchTerm);
      const matchesFilter = statusFilter === "All" || item.status === statusFilter;
      return matchesSearch && matchesFilter;
    });
  }, [qrList, searchTerm, statusFilter]);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // LOGIC: Export Excel
  const exportAllData = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "QR_Codes");
    XLSX.writeFile(workbook, `QR_Inventory_${new Date().toLocaleDateString()}.xlsx`);
  };

  // FIXED LOGIC: Download Single QR Image using a Public API (No 'qrcode' library needed)
  const handleDownloadSingle = async (qr: QRCode) => {
    // We use GoQR.me API to generate the image on the fly
    const apiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${qr.codeNumber}`;
    
    try {
      const response = await fetch(apiUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `QR_Code_${qr.id}.png`;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed", err);
      alert("Failed to download QR code. Please check your internet connection.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900">
      
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">View QR Codes</h1>
          <p className="text-sm text-slate-500 mt-0.5">Complete QR Inventory and Status Tracking</p>
        </div>
        <button 
          onClick={exportAllData}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-sm"
        >
          <FileArchive size={15} /> Download Excel
        </button>
      </div>

      {/* Overview Stats */}
      <SectionLabel>Inventory Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard icon={QrCode} label="Total Codes" value={qrList.length.toString()} iconBg="bg-blue-100" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
        <StatCard icon={ShieldCheck} label="Redeemed" value={qrList.filter(q => q.status === 'Redeemed').length.toString()} iconBg="bg-emerald-100" iconColor="text-emerald-600" borderAccent="border-t-emerald-500" />
        <StatCard icon={Clock} label="Pending" value={qrList.filter(q => q.status === 'Pending').length.toString()} iconBg="bg-amber-100" iconColor="text-amber-600" borderAccent="border-t-amber-500" />
      </div>

      {/* Table Section */}
      <SectionLabel>QR Code List</SectionLabel>

      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search QR Number or ID..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-lg">
            <Filter size={14} className="text-slate-400" />
            <select 
              className="bg-transparent text-sm font-medium text-slate-600 outline-none cursor-pointer"
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Redeemed">Redeemed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase text-slate-500">ID</th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase text-slate-500">QR Code Number</th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase text-slate-500 text-center">Image</th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase text-slate-500">Points</th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase text-slate-500">Batch</th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase text-slate-500">Dates</th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase text-slate-500">Status</th>
                <th className="px-5 py-3.5 text-[11px] font-semibold uppercase text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedData.map((qr) => (
                <tr key={qr.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">#{qr.id}</td>
                  <td className="px-5 py-4">
                    <span className="text-[13px] font-mono font-medium text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                      {qr.codeNumber}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="inline-block p-1 bg-white border border-slate-200 rounded-lg">
                      <QrCode size={28} className="text-slate-800" strokeWidth={1.5} />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center px-2 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded text-xs font-bold">
                      {qr.points} Pts
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm font-medium text-slate-600">{qr.batch}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                        <Calendar size={10} className="text-blue-400" /> Gen: {qr.genDate}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                        <ShieldCheck size={10} className="text-emerald-400" /> Red: {qr.redeemDate}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      qr.status === 'Redeemed' 
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                      : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${qr.status === 'Redeemed' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      {qr.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button 
                      onClick={() => handleDownloadSingle(qr)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-lg text-[11px] font-bold transition-all active:scale-95"
                    >
                      <Download size={12} /> Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-600 font-bold">{filteredData.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}–{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="text-slate-600 font-bold">{filteredData.length}</span> results
          </p>
          <div className="flex items-center gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 disabled:opacity-50 hover:bg-slate-100"
            >
              <ChevronLeft size={14} />
            </button>
            <div className="text-xs font-bold text-slate-600 px-2">Page {currentPage} of {totalPages || 1}</div>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 disabled:opacity-50 hover:bg-slate-100"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}