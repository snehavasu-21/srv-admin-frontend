/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, Suspense } from "react";
import { ArrowLeft, Save, X, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function EditDealerForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("id");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Form State - Fully synchronized with all possible fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    altPhone: "",
    status: "Active",
    city: "",
    pincode: "",
    address: "",
    gstNo: "",
    firmName: "",
    state: "",
    district: "",
    latitude: "",
    longitude: "",
    deviceId: "",
    token: "",
    confirmCode: "",
    code: "",
    referral: "",
    wallet: "",
    kycStatus: "incomplete",
    gstHolderName: ""
  });

  useEffect(() => {
    if (editId) {
      const savedDealers = localStorage.getItem("dealers_list");
      if (savedDealers) {
        const dealers = JSON.parse(savedDealers);
        const currentDealer = dealers.find((d: any) => d.id === editId);
        
        if (currentDealer) {
          setFormData(prev => ({
            ...prev,
            ...currentDealer,
          }));
        }
      }
    }
  }, [editId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setErrorMsg(""); 
    
    if (name === "phone" || name === "altPhone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
      }
      return;
    }

    if (name === "pincode") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 6) {
        setFormData(prev => ({ ...prev, [name]: numericValue }));
      }
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const existingDealers = JSON.parse(localStorage.getItem("dealers_list") || "[]");
      const updatedList = existingDealers.map((d: any) => 
        d.id === editId ? { ...d, ...formData } : d
      );

      localStorage.setItem("dealers_list", JSON.stringify(updatedList));
      setIsSubmitting(false);
      setShowSuccessBox(true);
      
      setTimeout(() => {
        router.push("/dashboard/users/dealers");
      }, 2000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-700 relative">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Edit Dealer</h1>
          <p className="text-sm text-slate-500">Update existing dealer profile for ID: <span className="text-blue-600 font-mono font-bold">#{editId}</span></p>
        </div>
        <Link href="/dashboard/users/dealers" className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors">
          <ArrowLeft size={16} /> Back to List
        </Link>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-10 relative">
        
        {showSuccessBox && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
            <div className="text-center p-8 border-2 border-emerald-100 bg-emerald-50 rounded-3xl max-w-sm shadow-xl">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-200">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Updated!</h2>
                <p className="text-slate-600 mt-2 font-medium">Dealer information has been successfully synced.</p>
                <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm">
                    <Loader2 size={16} className="animate-spin" /> Redirecting...
                </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">
          
          {/* Section 1: Business Profile */}
          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-blue-50">Business Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">User type :-</label>
                <select disabled className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg cursor-not-allowed">
                  <option>Dealers</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Status :-</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Name * :-</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none" />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Firm Name :-</label>
                <input type="text" name="firmName" value={formData.firmName} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none" />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Email * :-</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none" />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Password * :-</label>
                <input type="password" name="password" required value={formData.password} onChange={handleChange} className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none" />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Phone * :-</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none" />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Alternate Phone :-</label>
                <input type="tel" name="altPhone" value={formData.altPhone} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none" />
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="font-semibold text-slate-600">Address * :-</label>
                <textarea rows={2} required name="address" value={formData.address} onChange={handleChange} className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none resize-none"></textarea>
              </div>
            </div>
          </section>

          {/* Section 2: Location & Tracking - ALL FIELDS ADDED */}
          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-blue-50">Location & Tracking</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px]">
              {["State", "District", "City", "Pincode", "Latitude", "Longitude", "Device ID", "Token", "Confirm Code", "Code", "Referral", "Wallet"].map((label) => {
                const fieldName = label === "Pincode" ? "pincode" : 
                                  label === "Device ID" ? "deviceId" :
                                  label === "Confirm Code" ? "confirmCode" :
                                  label.toLowerCase().replace(" ", "");
                return (
                  <div key={label} className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase">{label} :-</label>
                    <input 
                      type="text" 
                      name={fieldName}
                      value={(formData as any)[fieldName] || ""}
                      onChange={handleChange}
                      className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10" 
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Section 3: KYC & Documents */}
          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-blue-50">KYC & Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">KYC Status :-</label>
                  <select name="kycStatus" value={formData.kycStatus} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg bg-white">
                    <option value="incomplete">incomplete</option>
                    <option value="verified">verified</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">GST No * :-</label>
                  <input type="text" name="gstNo" required value={formData.gstNo} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none" />
                </div>
                {/* GST Holder Name Field added here */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">GST Holder Name :-</label>
                  <input type="text" name="gstHolderName" value={formData.gstHolderName} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none" />
                </div>
              </div>
            </div>
          </section>

          {errorMsg && (
            <div className="mx-auto max-w-md bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center gap-3">
              <AlertCircle className="text-rose-500 shrink-0" size={20} />
              <p className="text-rose-700 text-sm font-semibold">{errorMsg}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-8 border-t border-slate-100">
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-blue-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg hover:bg-blue-700 disabled:opacity-50">
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Update Dealer
            </button>
            <Link href="/dashboard/users/dealers" className="flex items-center gap-2 bg-rose-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-rose-600">
              <X size={18} /> Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function EditDealerPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center"><Loader2 className="animate-spin mx-auto" /> Loading Form...</div>}>
      <EditDealerForm />
    </Suspense>
  );
}