/* eslint-disable react/no-unescaped-entities */
"use client";

import React from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";

export default function AddDealerPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-700">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Add Dealer</h1>
          <p className="text-sm text-slate-500">Register new dealer with full business details</p>
        </div>
        <Link href="/dashboard/users/dealers" className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
          <ArrowLeft size={16} /> Back to List
        </Link>
      </div>

      {/* Main Form Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-10">
        <form className="p-6 md:p-10 space-y-10">
          
          {/* Section 1: Business Profile */}
          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-blue-50">Business Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">User type :-</label>
                <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer">
                  <option>Dealers</option>
                </select>
              </div>

              {/* Status Field Added Here */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Status :-</label>
                <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 cursor-pointer">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Name * :-</label>
                <input type="text" placeholder="Full Name" className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Email :-</label>
                <input type="email" placeholder="email@example.com" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Password :-</label>
                <input type="password" placeholder="••••••••" className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Phone :-</label>
                <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Alternate Phone :-</label>
                <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="font-semibold text-slate-600">Select Image :- <span className="text-red-500 text-[10px] font-normal italic">(Recommended: 300x300 or 400x400)</span></label>
                <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/30">
                  <input type="file" className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white file:cursor-pointer cursor-pointer" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="font-semibold text-slate-600">Address :-</label>
                <textarea rows={2} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"></textarea>
              </div>
            </div>
          </section>

          {/* Section 2: Location & Tracking */}
          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-blue-50">Location & Tracking</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px]">
              {["Latitude", "Longitude", "State", "District", "City", "Pincode", "Device ID", "Token", "Confirm Code", "Code", "Referral", "Wallet"].map((label) => (
                <div key={label} className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase">{label} :-</label>
                  <input type="text" className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10" />
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: KYC & GST Details */}
          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-blue-50">KYC & Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
                {["Aadhar Front", "Aadhar Back", "GST/PAN Card", "Document"].map((doc) => (
                  <div key={doc} className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600">{doc} :-</label>
                    <input type="file" className="text-[10px] text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-white file:text-blue-600 file:shadow-sm file:cursor-pointer cursor-pointer" />
                    {doc === "GST/PAN Card" && <p className="text-[10px] text-red-500 mt-1 italic">Upload PAN card here if GST number is not available.</p>}
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">KYC Status :-</label>
                  <select className="w-full p-2.5 border border-slate-200 rounded-lg bg-white cursor-pointer"><option>incomplete</option><option>verified</option></select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">GST No :-</label>
                  <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">GST Holder Name :-</label>
                  <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-sm">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">GST/PAN Card Number :-</label>
                <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
                <p className="text-[10px] text-red-500 mt-1 italic">Enter GST number here, or use the GST/PAN Card upload field above.</p>
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Bank Status :-</label>
                <select className="w-full p-2.5 border border-slate-200 rounded-lg bg-white cursor-pointer"><option>incomplete</option><option>verified</option></select>
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Dealer Code :-</label>
                <input type="text" disabled placeholder="Auto-generated" className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed" />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Sells Code :-</label>
                <input type="text" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none" />
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-8 border-t border-slate-100">
            <button type="submit" className="flex items-center gap-2 bg-blue-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all cursor-pointer hover:bg-blue-700">
              <Save size={18} /> Save Dealer
            </button>
            <Link href="/dashboard/users/dealers" className="flex items-center gap-2 bg-rose-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-rose-100 active:scale-95 transition-all cursor-pointer hover:bg-rose-600">
              <X size={18} /> Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}