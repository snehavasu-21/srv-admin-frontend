/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, X, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function EditElectricianPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get("id");

  // Success Modal State
  const [showModal, setShowModal] = useState(false);

  // Form State
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
    wallet: "",
    upiId: "",
    electricianCode: "",
  });

  useEffect(() => {
    if (editId) {
      const existingData = JSON.parse(localStorage.getItem("electricians_list") || "[]");
      const userToEdit = existingData.find((item: any) => item.id === editId);

      if (userToEdit) {
        setFormData((prev) => ({
          ...prev,
          name: userToEdit.name || "",
          phone: userToEdit.phone || "",
          email: userToEdit.email || "",
          status: userToEdit.status || "Active",
          wallet: userToEdit.wallet || "0",
          code: userToEdit.dealerCode || "",
          referral: userToEdit.reffCode || "",
          address: userToEdit.address || "",
          state: userToEdit.state || "",
          district: userToEdit.district || "",
          city: userToEdit.city || "",
          pincode: userToEdit.pincode || "",
        }));
      }
    }
  }, [editId]);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
    const value = e.target.value.replace(/[0-9]/g, "");
    setFormData({ ...formData, [field]: value });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.phone.length !== 10) {
      return; // Add a custom error toast here if needed
    }

    const existingData = JSON.parse(localStorage.getItem("electricians_list") || "[]");
    
    const updatedList = existingData.map((item: any) => {
      if (item.id === editId) {
        return {
          ...item,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          status: formData.status,
          wallet: formData.wallet,
          dealerCode: formData.code,
          reffCode: formData.referral,
          address: formData.address,
          state: formData.state,
          district: formData.district,
          city: formData.city,
          pincode: formData.pincode,
        };
      }
      return item;
    });

    localStorage.setItem("electricians_list", JSON.stringify(updatedList));
    
    // Show Centered Success Box
    setShowModal(true);

    // Auto redirect after 2 seconds
    setTimeout(() => {
      setShowModal(false);
      router.push("/dashboard/users/electricians");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans relative">
      
      {/* ── SUCCESS MODAL (CENTERED) ── */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 shadow-2xl max-w-sm w-full transform animate-in zoom-in-95 duration-300 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="text-emerald-500 w-12 h-12" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Updated!</h2>
            <p className="text-slate-500 text-sm">Electrician details have been successfully saved to the list.</p>
            <div className="mt-6 w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 animate-[progress_2s_linear]" />
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-6 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800">Edit Electrician</h1>
          <p className="text-xs text-slate-500">Update profile details for ID: #{editId}</p>
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
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none text-sm cursor-not-allowed"
                  disabled
                >
                  <option>Electrician</option>
                </select>
              </div>

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
                  <option value="Proactive">Proactive</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Name <span className="text-red-500">*</span> :-</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={(e) => handleNameChange(e, 'name')} 
                  placeholder="Enter Name" 
                  className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm" 
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Email :-</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  placeholder="example@mail.com" 
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none text-sm" 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Phone <span className="text-red-500">*</span> :-</label>
                <input 
                  type="text" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={(e) => handlePhoneChange(e, 'phone')} 
                  placeholder="10-digit Phone" 
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none text-sm" 
                  required 
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Alternate Phone :-</label>
                <input 
                  type="text" 
                  name="altPhone" 
                  value={formData.altPhone} 
                  onChange={(e) => handlePhoneChange(e, 'altPhone')} 
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none text-sm" 
                />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-slate-600">Address <span className="text-red-500">*</span> :-</label>
                <textarea 
                  name="address" 
                  value={formData.address} 
                  onChange={handleChange} 
                  rows={3} 
                  placeholder="Full Address" 
                  className="w-full p-2.5 border border-slate-200 rounded-lg outline-none text-sm resize-none" 
                  required 
                ></textarea>
              </div>
            </div>
          </section>

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
                <input type="text" name="state" value={formData.state} onChange={(e) => handleNameChange(e, 'state')} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>District <span className="text-red-500">*</span> :-</label>
                <input type="text" name="district" value={formData.district} onChange={(e) => handleNameChange(e, 'district')} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>City <span className="text-red-500">*</span> :-</label>
                <input type="text" name="city" value={formData.city} onChange={(e) => handleNameChange(e, 'city')} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
              </div>
              <div className="space-y-1.5 font-bold text-slate-500 text-[11px] uppercase">
                <label>Pincode <span className="text-red-500">*</span> :-</label>
                <input type="text" name="pincode" value={formData.pincode} onChange={(e) => handlePhoneChange(e, 'pincode')} className="w-full p-2 border border-slate-200 rounded-lg outline-none text-sm font-normal text-slate-700" required />
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
                <input type="text" name="wallet" value={formData.wallet} onChange={(e) => handlePhoneChange(e, 'wallet')} className="w-full p-2 border border-slate-200 rounded-lg text-sm font-normal" />
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

          <div className="flex items-center gap-3 pt-8 border-t border-slate-100">
            <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 cursor-pointer">
              <Save size={18} />
              Update Details
            </button>
            <Link href="/dashboard/users/electricians" className="flex items-center gap-2 bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 cursor-pointer">
              <X size={18} />
              Cancel
            </Link>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}