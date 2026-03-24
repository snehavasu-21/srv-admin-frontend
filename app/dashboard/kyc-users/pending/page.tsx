"use client";

import React, { useState, ChangeEvent } from "react";
import { 
  Search, Eye, ChevronLeft, ChevronRight, 
  Filter, Clock, Users, CheckCircle, XCircle, 
  Image as ImageIcon 
} from "lucide-react";

// ─── Types & Interfaces ──────────────────────────────────────────────────────

type UserType = "Retailer" | "Distributor" | "Wholesaler";

interface PendingUser {
  id: string;
  type: UserType;
  name: string;
  phone: string;
  address: string;
  aadharFront: string | null;
  aadharBack: string | null;
  pancard: string | null;
  gstNo: string;
  kycStatus: "Pending";
}

interface SectionLabelProps {
  children: React.ReactNode;
}

interface TypeBadgeProps {
  type: UserType;
}

interface ImageCellProps {
  label: string;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const pendingUsersData: PendingUser[] = [
  {
    id: "3401",
    type: "Retailer",
    name: "Harpreet Singh",
    phone: "9876543210",
    address: "Ludhiana, Punjab",
    aadharFront: null,
    aadharBack: null,
    pancard: null,
    gstNo: "03AABCU9603R1ZV",
    kycStatus: "Pending",
  },
  {
    id: "3398",
    type: "Distributor",
    name: "Rajesh Kumar",
    phone: "8765432109",
    address: "Amritsar, Punjab",
    aadharFront: null,
    aadharBack: null,
    pancard: null,
    gstNo: "03BBBCK1234M1ZP",
    kycStatus: "Pending",
  },
  {
    id: "3385",
    type: "Retailer",
    name: "Gurpreet Kaur",
    phone: "7654321098",
    address: "Patiala, Punjab",
    aadharFront: null,
    aadharBack: null,
    pancard: null,
    gstNo: "-",
    kycStatus: "Pending",
  },
  {
    id: "3370",
    type: "Wholesaler",
    name: "Vikram Sharma",
    phone: "9543210987",
    address: "Jalandhar, Punjab",
    aadharFront: null,
    aadharBack: null,
    pancard: null,
    gstNo: "03CCCCI5678N1ZQ",
    kycStatus: "Pending",
  },
  {
    id: "3361",
    type: "Retailer",
    name: "Sukhwinder Gill",
    phone: "8432109876",
    address: "Bathinda, Punjab",
    aadharFront: null,
    aadharBack: null,
    pancard: null,
    gstNo: "-",
    kycStatus: "Pending",
  },
];

// ─── Sub-Components ──────────────────────────────────────────────────────────

const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => (
  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
    {children}
  </p>
);

const TypeBadge: React.FC<TypeBadgeProps> = ({ type }) => {
  const styles: Record<UserType, string> = {
    Retailer: "bg-blue-50 text-blue-700 border-blue-200",
    Distributor: "bg-purple-50 text-purple-700 border-purple-200",
    Wholesaler: "bg-teal-50 text-teal-700 border-teal-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${styles[type]}`}>
      {type}
    </span>
  );
};

const ImageCell: React.FC<ImageCellProps> = ({ label }) => (
  <button
    className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-[11px] font-medium text-slate-500 hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all duration-150"
    title={`View ${label}`}
  >
    <ImageIcon size={11} />
    View
  </button>
);

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function PendingKYCPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 10;

  const filtered = pendingUsersData.filter(
    (u) =>
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.phone.includes(searchTerm) ||
      u.id.includes(searchTerm)
  );

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page on search
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">
      
      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <Clock className="text-amber-500" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Pending KYC Users</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage and review users with pending KYC verification</p>
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
            <p className="text-2xl font-semibold text-slate-800">{pendingUsersData.length}</p>
            <p className="text-xs text-slate-500 mt-1">Total Pending</p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-amber-500 p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <Clock size={20} className="text-amber-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-800">{pendingUsersData.length}</p>
            <p className="text-xs text-slate-500 mt-1">Awaiting Review</p>
          </div>
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <SectionLabel>All Pending KYC Users</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by name, phone or ID..."
            value={searchTerm}
            onChange={handleSearch}
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
                {[
                  "User ID", "Type", "User Name", "User Phone", "Address",
                  "Adharcard Front", "Adharcard Back", "Pancard", "GST NO",
                  "Status", "Action"
                ].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-4 py-4 text-sm font-medium text-slate-500">{user.id}</td>
                  <td className="px-4 py-4"><TypeBadge type={user.type} /></td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-800">{user.name}</td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-700">{user.phone}</td>
                  <td className="px-4 py-4 text-sm text-slate-500 max-w-[160px] truncate">{user.address}</td>
                  <td className="px-4 py-4"><ImageCell label="Front" /></td>
                  <td className="px-4 py-4"><ImageCell label="Back" /></td>
                  <td className="px-4 py-4"><ImageCell label="PAN" /></td>
                  <td className="px-4 py-4 text-xs font-mono text-slate-600">{user.gstNo}</td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
                      {user.kycStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 transition-all" title="View Details">
                        <Eye size={15} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-green-500 hover:bg-green-50 transition-all" title="Approve">
                        <CheckCircle size={15} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 transition-all" title="Reject">
                        <XCircle size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between">
          <p className="text-xs text-slate-400 font-medium">
            Page <span className="text-slate-600 font-semibold">{currentPage}</span> of {totalPages}
          </p>
          <div className="flex items-center gap-1.5">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100"
            >
              <ChevronLeft size={14} />
            </button>
            <button 
              className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm"
            >
              {currentPage}
            </button>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}