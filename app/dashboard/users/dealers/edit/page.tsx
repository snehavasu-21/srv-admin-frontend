/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";

export default function EditDealerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const editId = searchParams.get("id");

  // --- Form State ---
  const [formData, setFormData] = useState({
    userType: "Dealers",
    status: "Active", // Added Status field
    name: "",
    email: "",
    password: "",
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
    kycStatus: "incomplete",
    gstNo: "",
    gstHolderName: "",
    gstPanCardNumber: "",
    bankStatus: "incomplete",
    dealerCode: "",
    sellsCode: ""
  });

  // --- Fetch Data Logic ---
  useEffect(() => {
    if (editId) {
      // API call placeholder
      setFormData((prev) => ({
        ...prev,
        status: "Active", // Example: value fetched from DB
        name: "Rajesh Kumar",
        email: "rajesh@firm.com",
        phone: "9876543210",
        address: "Shop 42, Main Road",
        city: "Ludhiana",
        state: "Punjab",
        gstNo: "03AAACV1000R1Z5",
        dealerCode: `DLR-${editId}`,
        kycStatus: "verified"
      }));
    }
  }, [editId]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating Dealer Data:", formData);
    alert("Dealer Updated Successfully!");
    router.push("/dashboard/users/dealers");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-700">
      
      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Edit Dealer</h1>
          <p className="text-sm text-slate-500">Update dealer profile and business documents for ID: #{editId}</p>
        </div>
        <Link href="/dashboard/users/dealers" className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50 transition-colors">
          <ArrowLeft size={16} /> Back to List
        </Link>
      </div>

      {/* Main Form Card */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-10">
        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-10">
          
          {/* Section 1: Business Profile */}
          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-blue-50">Business Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">User type :-</label>
                <select name="userType" value={formData.userType} onChange={handleChange} className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none">
                  <option>Dealers</option>
                </select>
              </div>

              {/* Added Status Field specifically for Edit functionality */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Status :-</label>
                <select 
                  name="status" 
                  value={formData.status} 
                  onChange={handleChange} 
                  className={`w-full p-2.5 border rounded-lg outline-none font-semibold cursor-pointer transition-colors ${
                    formData.status === "Active" 
                    ? "bg-emerald-50 border-emerald-200 text-emerald-700" 
                    : "bg-rose-50 border-rose-200 text-rose-700"
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Name * :-</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" required />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Email :-</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="email@example.com" className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Password :-</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Leave blank to keep current" className="w-full p-2.5 bg-blue-50/30 border border-blue-100 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Phone :-</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Alternate Phone :-</label>
                <input type="text" name="altPhone" value={formData.altPhone} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="font-semibold text-slate-600">Select Image :- <span className="text-red-500 text-[10px] font-normal italic">(Recommended: 300x300 or 400x400)</span></label>
                <div className="flex items-center gap-4 p-4 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/30">
                  <input type="file" className="text-xs file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white" />
                </div>
              </div>
              <div className="md:col-span-2 space-y-1.5">
                <label className="font-semibold text-slate-600">Address :-</label>
                <textarea name="address" value={formData.address} onChange={handleChange} rows={2} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"></textarea>
              </div>
            </div>
          </section>

          {/* Section 2: Location & Tracking */}
          <section>
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-[0.2em] mb-6 pb-2 border-b border-blue-50">Location & Tracking</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[10px]">
              {[
                { label: "Latitude", key: "latitude" },
                { label: "Longitude", key: "longitude" },
                { label: "State", key: "state" },
                { label: "District", key: "district" },
                { label: "City", key: "city" },
                { label: "Pincode", key: "pincode" },
                { label: "Device ID", key: "deviceId" },
                { label: "Token", key: "token" },
                { label: "Confirm Code", key: "confirmCode" },
                { label: "Code", key: "code" },
                { label: "Referral", key: "referral" },
                { label: "Wallet", key: "wallet" },
              ].map((item) => (
                <div key={item.key} className="space-y-1">
                  <label className="font-bold text-slate-500 uppercase">{item.label} :-</label>
                  <input type="text" name={item.key} value={(formData as any)[item.key]} onChange={handleChange} className="w-full p-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/10" />
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
                    <input type="file" className="text-[10px] text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:bg-white file:text-blue-600 file:shadow-sm" />
                    {doc === "GST/PAN Card" && <p className="text-[10px] text-red-500 mt-1 italic">Upload PAN card here if GST number is not available.</p>}
                  </div>
                ))}
              </div>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">KYC Status :-</label>
                  <select name="kycStatus" value={formData.kycStatus} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg bg-white">
                    <option value="incomplete">incomplete</option>
                    <option value="verified">verified</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">GST No :-</label>
                  <input type="text" name="gstNo" value={formData.gstNo} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-600">GST Holder Name :-</label>
                  <input type="text" name="gstHolderName" value={formData.gstHolderName} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 text-sm">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">GST/PAN Card Number :-</label>
                <input type="text" name="gstPanCardNumber" value={formData.gstPanCardNumber} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
                <p className="text-[10px] text-red-500 mt-1 italic">Enter GST number here, or use the GST/PAN Card upload field above.</p>
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Bank Status :-</label>
                <select name="bankStatus" value={formData.bankStatus} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg bg-white">
                  <option value="incomplete">incomplete</option>
                  <option value="verified">verified</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Dealer Code :-</label>
                <input type="text" value={formData.dealerCode} readOnly className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-lg text-slate-400 cursor-not-allowed" />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-600">Sells Code :-</label>
                <input type="text" name="sellsCode" value={formData.sellsCode} onChange={handleChange} className="w-full p-2.5 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>
          </section>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-8 border-t border-slate-100">
            <button type="submit" className="flex items-center gap-2 bg-blue-600 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-blue-100 active:scale-95 transition-all cursor-pointer">
              <Save size={18} /> Update Dealer
            </button>
            <Link href="/dashboard/users/dealers" className="flex items-center gap-2 bg-rose-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-rose-100 active:scale-95 transition-all">
              <X size={18} /> Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}