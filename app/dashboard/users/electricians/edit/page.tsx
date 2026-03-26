/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function EditElectricianPage() {
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  // Form State
  const [formData, setFormData] = useState({
    userType: "Electrician",
    status: "Active", // New Status Field
    name: "",
    email: "",
    phone: "",
    altPhone: "",
    address: "",
    latitude: "",
    longitude: "",
    state: "",
    district: "",
    city: "",
    pincode: "",
    deviceId: "",
    token: "",
    confirmCode: "",
    code: "",
    referral: "",
    wallet: "",
    upiId: "",
    electricianCode: "",
  });

  // Data fetching logic
  useEffect(() => {
    if (editId) {
      // API call placeholder
      setFormData((prev) => ({
        ...prev,
        name: "Arshdeep Singh",
        status: "Active", // Example initial status
        email: "user@srv.com",
        phone: "9646127661",
        address: "Ludhiana, Punjab",
        state: "Punjab",
        district: "Ludhiana",
        city: "Ludhiana",
        pincode: "141001",
        electricianCode: `REF882`,
      }));
    }
  }, [editId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updated Data:", formData);
    alert("Details Updated Successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      
      {/* ── Header ── */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Edit Electrician</h1>
          <p className="text-xs text-slate-500">Update profile details for ID: #{editId}</p>
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
        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">
          
          {/* Section 1: Basic Details */}
          <section>
            <h3 className="text-sm font-bold text-blue-600 uppercase tracking-wider mb-6 pb-2 border-b border-blue-50">
              Step 1: Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">User type :-</label>
                <select 
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm cursor-not-allowed"
                  disabled
                >
                  <option>Electrician</option>
                </select>
              </div>

              {/* Status Field Added Here */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Account Status :-</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className={`w-full p-2.5 border rounded-lg outline-none text-sm font-semibold cursor-pointer transition-colors ${
                    formData.status === "Active" 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                    : "bg-rose-50 border-rose-200 text-rose-700"
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="active">Proactive</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Name <span className="text-red-500">*</span> :-</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Name" className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" required />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Email :-</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="example@mail.com" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none text-sm" />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Phone <span className="text-red-500">*</span> :-</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter Phone" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none text-sm" required />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Alternate Phone :-</label>
                <input type="text" name="altPhone" value={formData.altPhone} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none text-sm" />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Address <span className="text-red-500">*</span> :-</label>
                <textarea name="address" value={formData.address} onChange={handleChange} rows={3} placeholder="Full Address" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none text-sm resize-none" required></textarea>
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
                <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Longitude :-</label>
                <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>State <span className="text-red-500">*</span> :-</label>
                <input type="text" name="state" value={formData.state} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>District <span className="text-red-500">*</span> :-</label>
                <input type="text" name="district" value={formData.district} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>City <span className="text-red-500">*</span> :-</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Pincode <span className="text-red-500">*</span> :-</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Device ID :-</label>
                <input type="text" name="deviceId" value={formData.deviceId} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-normal" />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Token :-</label>
                <input type="text" name="token" value={formData.token} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-normal" />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Confirm Code :-</label>
                <input type="text" name="confirmCode" value={formData.confirmCode} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-normal" />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Code :-</label>
                <input type="text" name="code" value={formData.code} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-normal" />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Referral :-</label>
                <input type="text" name="referral" value={formData.referral} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-normal" />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Wallet :-</label>
                <input type="text" name="wallet" value={formData.wallet} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-normal" />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">UPI ID :-</label>
                <input type="text" name="upiId" value={formData.upiId} onChange={handleChange} placeholder="e.g. name@upi" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none text-sm" />
              </div>
              
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Electrician Code :-</label>
                <input type="text" name="electricianCode" value={formData.electricianCode} onChange={handleChange} placeholder="Enter Electrician Code" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none text-sm" />
              </div>
            </div>
          </section>

          {/* ── Footer Buttons ── */}
          <div className="flex items-center gap-3 pt-8 border-t border-slate-100">
            <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95">
              <Save size={18} />
              Update Details
            </button>
            <Link href="/dashboard/users/electricians" className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95">
              <X size={18} />
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}