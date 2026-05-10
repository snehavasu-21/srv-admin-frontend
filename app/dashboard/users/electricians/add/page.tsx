/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddElectricianPage() {
  const router = useRouter();

  // --- Form State ---
  const [formData, setFormData] = useState({
    userType: "Electrician",
    status: "Active",
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
    wallet: "0",
    upiId: "",
    electricianCode: ""
  });

  // --- Validation Helpers ---
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    if (value.length <= 10) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value.replace(/[0-9]/g, ""); // Remove digits
    setFormData({ ...formData, [field]: value });
  };

  // --- Save Logic ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic Validation Check
    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    // Prepare New Entry (Mapping to List Interface)
    const newEntry = {
      id: Math.floor(Math.random() * 10000).toString(), // Random ID for Demo
      name: formData.name,
      wallet: parseInt(formData.wallet).toLocaleString(),
      type: "Standard", // Default
      dealerCode: formData.code || "N/A",
      reffCode: formData.referral || "N/A",
      email: formData.email || "user@srv.com",
      qrCode: "QR-" + Math.floor(Math.random() * 1000),
      phone: formData.phone,
      status: formData.status as "Active" | "Inactive"
    };

    // Save to LocalStorage
    const existingData = JSON.parse(localStorage.getItem("electricians_list") || "[]");
    const updatedData = [newEntry, ...existingData];
    localStorage.setItem("electricians_list", JSON.stringify(updatedData));

    // Redirect to List
    router.push("/dashboard/users/electricians");
  };

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
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-md text-sm font-medium cursor-pointer"
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
                  value={formData.userType}
                  onChange={(e) => setFormData({...formData, userType: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm cursor-pointer"
                >
                  <option>Electrician</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Status :-</label>
                <select 
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Proactive">Proactive</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Name <span className="text-red-500">*</span> :-</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => handleNameChange(e, 'name')}
                  placeholder="Enter Name (Only Letters)" 
                  className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Email :-</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="example@mail.com" 
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Phone <span className="text-red-500">*</span> :-</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => handlePhoneChange(e, 'phone')}
                  placeholder="10-digit Mobile Number" 
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" 
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Alternate Phone :-</label>
                <input 
                  type="text" 
                  value={formData.altPhone}
                  onChange={(e) => handlePhoneChange(e, 'altPhone')}
                  placeholder="Alternate Mobile Number"
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" 
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Address <span className="text-red-500">*</span> :-</label>
                <textarea 
                  rows={3} 
                  value={formData.address}
                  onChange={(e) => setFormData({...formData, address: e.target.value})}
                  placeholder="Full Address" 
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm resize-none" 
                  required 
                ></textarea>
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
                <input type="text" value={formData.latitude} onChange={(e) => setFormData({...formData, latitude: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Longitude :-</label>
                <input type="text" value={formData.longitude} onChange={(e) => setFormData({...formData, longitude: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>State <span className="text-red-500">*</span> :-</label>
                <input type="text" value={formData.state} onChange={(e) => handleNameChange(e, 'state')} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>District <span className="text-red-500">*</span> :-</label>
                <input type="text" value={formData.district} onChange={(e) => handleNameChange(e, 'district')} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>City <span className="text-red-500">*</span> :-</label>
                <input type="text" value={formData.city} onChange={(e) => handleNameChange(e, 'city')} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Pincode <span className="text-red-500">*</span> :-</label>
                <input type="text" value={formData.pincode} onChange={(e) => handlePhoneChange(e, 'pincode')} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Device ID :-</label>
                <input type="text" value={formData.deviceId} onChange={(e) => setFormData({...formData, deviceId: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Token :-</label>
                <input type="text" value={formData.token} onChange={(e) => setFormData({...formData, token: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Confirm Code :-</label>
                <input type="text" value={formData.confirmCode} onChange={(e) => setFormData({...formData, confirmCode: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Code :-</label>
                <input type="text" value={formData.code} onChange={(e) => setFormData({...formData, code: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Referral :-</label>
                <input type="text" value={formData.referral} onChange={(e) => setFormData({...formData, referral: e.target.value})} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10 text-sm" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-500 uppercase">Wallet :-</label>
                <input type="text" value={formData.wallet} onChange={(e) => handlePhoneChange(e, 'wallet')} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10 text-sm" />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">UPI ID :-</label>
                <input type="text" value={formData.upiId} onChange={(e) => setFormData({...formData, upiId: e.target.value})} placeholder="e.g. name@upi" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" />
              </div>
              
              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Electrician Code :-</label>
                <input type="text" value={formData.electricianCode} onChange={(e) => setFormData({...formData, electricianCode: e.target.value})} placeholder="Enter Electrician Code" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 text-sm" />
              </div>
            </div>
          </section>

          {/* ── Footer Buttons ── */}
          <div className="flex items-center gap-3 pt-8 border-t border-slate-100">
            <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 active:scale-95 cursor-pointer">
              <Save size={18} />
              Save Details
            </button>
            <Link href="/dashboard/users/electricians" className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-rose-100 active:scale-95 cursor-pointer">
              <X size={18} />
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}