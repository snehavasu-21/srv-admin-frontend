/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";

export default function AddElectricianPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      
      {/* ── Header ── */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Add Electrician</h1>
          <p className="text-xs text-slate-500">Create a new profile with location and business details</p>
        </div>
        <Link
          href="/dashboard/users/electricians"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-md text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </div>

      {/* ── Main Form Card ── */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <form className="p-6 md:p-10 space-y-10">
          
          {/* Section 1: Basic Details */}
          <section>
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-6 pb-2 border-b border-blue-50">
              Step 1: Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">User type :-</label>
                <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm">
                  <option>Electrician</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Name <span className="text-red-500">*</span> :-</label>
                <input type="text" placeholder="Enter Name" className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Email :-</label>
                <input type="email" placeholder="example@mail.com" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Phone <span className="text-red-500">*</span> :-</label>
                <input type="text" placeholder="Enter Phone" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" required />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Alternate Phone :-</label>
                <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Address <span className="text-red-500">*</span> :-</label>
                <textarea rows={3} placeholder="Full Address" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm resize-none" required></textarea>
              </div>
            </div>
          </section>

          {/* Section 2: Location Details */}
          <section>
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-6 pb-2 border-b border-blue-50">
              Step 2: Location & Tracking
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Latitude :-</label>
                <input type="text" className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Longitude :-</label>
                <input type="text" className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>State <span className="text-red-500">*</span> :-</label>
                <input type="text" className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>District <span className="text-red-500">*</span> :-</label>
                <input type="text" className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>City <span className="text-red-500">*</span> :-</label>
                <input type="text" className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Pincode <span className="text-red-500">*</span> :-</label>
                <input type="text" className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              
              {["Device ID", "Token", "Confirm Code", "Code", "Referral", "Wallet"].map((field) => (
                <div key={field} className="space-y-1.5">
                  <label className="text-[11px] font-bold text-slate-500 uppercase">{field} :-</label>
                  <input type="text" className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10 text-sm" />
                </div>
              ))}

              {/* UPI ID Restore kiya yahan */}
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">UPI ID :-</label>
                <input type="text" placeholder="e.g. name@upi" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" />
              </div>
              
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Electrician Code :-</label>
                <input type="text" placeholder="Enter Electrician Code" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" />
              </div>
            </div>
          </section>

          {/* ── Footer Buttons ── */}
          <div className="flex items-center gap-3 pt-8 border-t border-slate-100">
            <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 active:scale-95">
              <Save size={18} />
              Save Details
            </button>
            <Link href="/dashboard/users/electricians" className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-rose-100 active:scale-95">
              <X size={18} />
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}