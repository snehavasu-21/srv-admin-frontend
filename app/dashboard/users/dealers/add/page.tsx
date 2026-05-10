/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { ArrowLeft, Save, X, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddDealerPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessBox, setShowSuccessBox] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // ALL FIELDS RESTORED
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
    latitude: "",
    longitude: "",
    state: "",
    district: "",
    deviceid: "",
    token: "",
    confirmcode: "",
    code: "",
    referral: "",
    wallet: "",
    gstholdername: "",
    kycstatus: "incomplete"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setErrorMsg("");
    
    if (name === "phone" || name === "altPhone") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }
    if (name === "pincode") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 6) setFormData(prev => ({ ...prev, [name]: numericValue }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Validations
    if (formData.password.length < 6) { setErrorMsg("Password must be 6+ characters."); return; }
    if (formData.phone.length !== 10) { setErrorMsg("Phone must be 10 digits."); return; }
    if (formData.pincode.length !== 6) { setErrorMsg("Pincode must be 6 digits."); return; }

    setIsSubmitting(true);

    setTimeout(() => {
      const existingDealers = JSON.parse(localStorage.getItem("dealers_list") || "[]");
      
      // Create new dealer object with ALL fields
      const newDealer = {
        ...formData,
        id: (Math.floor(Math.random() * 900) + 600).toString(),
        firmName: formData.firmName || `${formData.name} Ent.`,
      };

      localStorage.setItem("dealers_list", JSON.stringify([newDealer, ...existingDealers]));

      setIsSubmitting(false);
      setShowSuccessBox(true);
      
      // FIXED REDIRECT
      setTimeout(() => {
        router.push("/dashboard/users/dealers");
      }, 2000);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-700 relative">
      
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Add Dealer</h1>
          <p className="text-sm text-slate-500">Register new dealer with full business details</p>
        </div>
        <Link href="/dashboard/users/dealers" className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors cursor-pointer">
          <ArrowLeft size={16} /> Back to List
        </Link>
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-10 relative">
        
        {showSuccessBox && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
            <div className="text-center p-8 border-2 border-emerald-100 bg-emerald-50 rounded-3xl max-w-sm shadow-xl">
                <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Success!</h2>
                <p className="text-slate-600 mt-2 font-medium">Dealer data saved. Redirecting to list...</p>
                <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600 font-bold text-sm">
                    <Loader2 size={16} className="animate-spin" /> Moving now...
                </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">
          
          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-blue-50">Business Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">User type :-</label>
                <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none cursor-pointer">
                  <option>Dealers</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Status :-</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none cursor-pointer">
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Name <span className="text-rose-500">*</span> :-</label>
                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Firm Name :-</label>
                <input type="text" name="firmName" value={formData.firmName} onChange={handleChange} placeholder="Enter Business Name" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Email <span className="text-rose-500">*</span> :-</label>
                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="email@example.com" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Password <span className="text-rose-500">*</span> :-</label>
                <input type="password" name="password" required value={formData.password} onChange={handleChange} placeholder="Min 6 characters" className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Phone <span className="text-rose-500">*</span> :-</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="10 Digit Number" className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Alternate Phone :-</label>
                <input type="tel" name="altPhone" value={formData.altPhone} onChange={handleChange} placeholder="10 Digit Number" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="font-semibold text-slate-600">Select Image :- <span className="text-red-500 text-[10px] italic">(Recommended: 400x400)</span></label>
                <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/30">
                  <input type="file" className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white cursor-pointer" />
                </div>
              </div>

              <div className="md:col-span-2 space-y-1.5">
                <label className="font-semibold text-slate-600">Address <span className="text-rose-500">*</span> :-</label>
                <textarea rows={2} required name="address" value={formData.address} onChange={handleChange} placeholder="Full address" className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"></textarea>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-blue-50">Location & Tracking</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px]">
              {["Latitude", "Longitude", "State", "District", "City", "Pincode", "Device ID", "Token", "Confirm Code", "Code", "Referral", "Wallet"].map((label) => {
                const isRequired = ["State", "District", "City", "Pincode"].includes(label);
                const fieldName = label === "Pincode" ? "pincode" : label.toLowerCase().replace(/\s+/g, '');
                return (
                  <div key={label} className="space-y-1">
                    <label className="font-bold text-slate-500 uppercase">{label} {isRequired && <span className="text-rose-500">*</span>} :-</label>
                    <input 
                      type="text" 
                      name={fieldName}
                      required={isRequired}
                      value={(formData as any)[fieldName] || ""}
                      onChange={handleChange}
                      className={`w-full p-2 border rounded-lg outline-none ${isRequired ? "bg-blue-50/30 border-blue-100 focus:ring-2 focus:ring-blue-500" : "border-slate-200"}`} 
                    />
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-blue-50">KYC & Documents</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-4 bg-slate-50 p-5 rounded-xl border border-slate-200">
                {["Aadhar Front", "Aadhar Back", "GST/PAN Card", "Document"].map((doc) => (
                  <div key={doc} className="flex flex-col gap-1">
                    <label className="text-xs font-semibold text-slate-600">{doc} :-</label>
                    <input type="file" className="text-[10px] text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-white file:text-blue-600 cursor-pointer" />
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">KYC Status :-</label>
                  <select name="kycstatus" value={formData.kycstatus} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg bg-white cursor-pointer">
                    <option value="incomplete">incomplete</option>
                    <option value="verified">verified</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">GST No <span className="text-rose-500">*</span> :-</label>
                  <input type="text" name="gstNo" required value={formData.gstNo} onChange={handleChange} placeholder="Enter GST" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none" />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">GST Holder Name :-</label>
                  <input type="text" name="gstholdername" value={formData.gstholdername} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none" />
                </div>
              </div>
            </div>
          </section>

          {errorMsg && (
            <div className="mx-auto max-w-md bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-center gap-3">
              <AlertCircle className="text-rose-500" size={20} />
              <p className="text-rose-700 text-sm font-semibold">{errorMsg}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-8 border-t border-slate-100">
            <button type="submit" disabled={isSubmitting} className="flex items-center gap-2 bg-blue-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg cursor-pointer hover:bg-blue-700 disabled:opacity-50">
              {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Save Dealer
            </button>
            <Link href="/dashboard/users/dealers" className="flex items-center gap-2 bg-rose-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg cursor-pointer hover:bg-rose-600">
              <X size={18} /> Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}