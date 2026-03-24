
"use client";

import React, { useState } from "react";
import { FileDown, ShoppingBag, ArrowRight, Trophy } from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const reportData = [
  { rank: 1, userId: "1640", name: "Pradeep Kumar",  phone: "9829555400", electricianCode: "424591", dealerCode: "N/A",    wallet: "200.9", totalOrders: "1", totalPoints: "3,000.00", lastRedeem: "2026-01-21" },
  { rank: 2, userId: "1641", name: "Amit Sihag",     phone: "8107844354", electricianCode: "816504", dealerCode: "N/A",    wallet: "0",     totalOrders: "3", totalPoints: "2,325.00", lastRedeem: "2026-02-28" },
  { rank: 3, userId: "2225", name: "Anil",            phone: "6375055052", electricianCode: "744548", dealerCode: "N/A",    wallet: "342.1", totalOrders: "1", totalPoints: "750.00",   lastRedeem: "2026-02-13" },
  { rank: 4, userId: "794",  name: "Gurpreet Singh", phone: "9781332040", electricianCode: "252246", dealerCode: "N/A",    wallet: "13.8",  totalOrders: "1", totalPoints: "750.00",   lastRedeem: "2025-12-11" },
  { rank: 5, userId: "825",  name: "Harpreet Singh", phone: "9465319762", electricianCode: "419926", dealerCode: "428199", wallet: "217.5", totalOrders: "1", totalPoints: "175.00",   lastRedeem: "2026-01-25" },
  { rank: 6, userId: "3292", name: "Manjeet Singh",  phone: "7009976900", electricianCode: "N/A",    dealerCode: "N/A",    wallet: "25",    totalOrders: "1", totalPoints: "75.00",    lastRedeem: "2026-03-14" },
  { rank: 7, userId: "1203", name: "Sanjeev Kumar",  phone: "7087734521", electricianCode: "505914", dealerCode: "N/A",    wallet: "0.5",   totalOrders: "1", totalPoints: "75.00",    lastRedeem: "2026-02-12" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
}

function getRankStyle(rank) {
  if (rank === 1) return "bg-amber-100 text-amber-700 border border-amber-300";
  if (rank === 2) return "bg-slate-200 text-slate-700 border border-slate-300";
  if (rank === 3) return "bg-orange-100 text-orange-700 border border-orange-200";
  return "bg-slate-50 text-slate-500 border border-slate-200";
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function TopRedeemPage() {
  const [filterType, setFilterType] = useState("All Time");
  const [fromDate,   setFromDate]   = useState("");
  const [toDate,     setToDate]     = useState("");

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
            <Trophy className="text-amber-600" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Electricians Redeem Points Report</h1>
            <p className="text-sm text-slate-500 mt-0.5">Highest redeemed points are shown first</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:shadow-sm transition-all duration-200 text-sm font-medium">
            This Month
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:shadow-sm transition-all duration-200 text-sm font-medium">
            <FileDown size={15} />
            CSV Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md">
            <ShoppingBag size={15} />
            View Gift Store Orders
          </button>
        </div>
      </div>

      {/* ── Date Filter Bar ── */}
      <SectionLabel>Filter</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">Filter</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            <option>All Time</option>
            <option>This Month</option>
            <option>Last Month</option>
            <option>This Year</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">From</span>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-600">To</span>
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
        </div>

        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all duration-200 shadow-sm">
          Apply
        </button>
        <button
          onClick={() => { setFromDate(""); setToDate(""); setFilterType("All Time"); }}
          className="px-5 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-all duration-200"
        >
          Reset
        </button>
      </div>

      {/* ── Table ── */}
      <SectionLabel>Leaderboard</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {[
                  "Rank", "User ID", "Electrician Name", "Phone",
                  "Electrician Code", "Associated Dealer Code",
                  "Current Wallet", "Total Redeem Orders",
                  "Total Redeemed Points", "Last Redeem Date", "Action"
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reportData.map((item) => (
                <tr
                  key={item.userId}
                  className="hover:bg-slate-50 transition-colors duration-150"
                >
                  {/* Rank */}
                  <td className="px-4 py-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${getRankStyle(item.rank)}`}>
                      {item.rank}
                    </div>
                  </td>

                  {/* User ID */}
                  <td className="px-4 py-4 text-sm font-medium text-slate-500">
                    {item.userId}
                  </td>

                  {/* Electrician Name */}
                  <td className="px-4 py-4 text-sm font-medium text-slate-800 whitespace-nowrap">
                    {item.name}
                  </td>

                  {/* Phone */}
                  <td className="px-4 py-4 text-sm text-slate-700">
                    {item.phone}
                  </td>

                  {/* Electrician Code */}
                  <td className="px-4 py-4 text-sm font-medium text-blue-600">
                    {item.electricianCode}
                  </td>

                  {/* Associated Dealer Code */}
                  <td className="px-4 py-4 text-sm text-slate-600">
                    {item.dealerCode}
                  </td>

                  {/* Current Wallet */}
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-xs font-semibold">
                      ₹{item.wallet}
                    </span>
                  </td>

                  {/* Total Redeem Orders */}
                  <td className="px-4 py-4 text-sm text-slate-700 text-center">
                    {item.totalOrders}
                  </td>

                  {/* Total Redeemed Points */}
                  <td className="px-4 py-4 text-sm font-semibold text-green-600">
                    {item.totalPoints}
                  </td>

                  {/* Last Redeem Date */}
                  <td className="px-4 py-4 text-sm text-slate-500 whitespace-nowrap">
                    {item.lastRedeem}
                  </td>

                  {/* Action */}
                  <td className="px-4 py-4">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded-lg text-xs font-medium hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all duration-200 whitespace-nowrap">
                      View Orders
                      <ArrowRight size={12} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}