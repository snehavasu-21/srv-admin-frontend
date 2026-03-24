/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { 
  Settings, Globe, Smartphone, Landmark, 
  Bell, Save, Upload, Mail, Info, LucideIcon 
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

type TabId = "general" | "app" | "bank" | "notification";

interface TabConfig {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

interface TabButtonProps extends TabConfig {
  activeTab: TabId;
  setActiveTab: (id: TabId) => void;
}

interface ParameterField {
  label: string;
  val: string;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

const TabButton = ({ id, label, icon: Icon, activeTab, setActiveTab }: TabButtonProps) => (
  <button
    onClick={() => setActiveTab(id)}
    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 whitespace-nowrap ${
      activeTab === id
        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
        : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
    }`}
  >
    <Icon size={16} />
    {label}
  </button>
);

// ─── Page Component ──────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");

  const tabs: TabConfig[] = [
    { id: "general", label: "General Settings", icon: Globe },
    { id: "app", label: "App Settings", icon: Smartphone },
    { id: "bank", label: "Banking Settings", icon: Landmark },
    { id: "notification", label: "System Keys", icon: Bell },
  ];

  const coreParameters: ParameterField[] = [
    { label: "Author", val: "+91 84275 84682" },
    { label: "Contact", val: "+91 88376 84004" },
    { label: "Website", val: "srvelectricals.com" },
    { label: "Min Transfer Point", val: "10" },
    { label: "Refer Point", val: "70" },
    { label: "Min Product Redeem", val: "100" },
    { label: "Help Desk 1", val: "+91 70095 24322" },
    { label: "Min Withdrawal", val: "₹100" },
    { label: "Conversion Rate", val: "1" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <Settings className="text-blue-600" size={24} /> Settings
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Configure your application parameters and keys</p>
        </div>
        <button className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-sm">
          <Save size={16} /> Save All Changes
        </button>
      </div>

      {/* TAB NAVIGATION */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <TabButton 
            key={tab.id} 
            {...tab} 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
          />
        ))}
      </div>

      <div className="max-w-5xl">
        {/* ================= GENERAL SETTINGS ================= */}
        {activeTab === "general" && (
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 flex items-center gap-2">
                <Info size={14} /> Core Information
              </h3>
              
              <div className="space-y-5">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">Host Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                      <input 
                        type="email"
                        defaultValue="srvelectericals.app@gmail.com" 
                        className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5 italic">Used for "Forgot Password" system emails</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">App Name</label>
                    <input 
                      defaultValue="SRV Electricals" 
                      className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">App Description</label>
                  <textarea 
                    rows={3} 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
                    placeholder="Describe the purpose of SRV Electricals app..." 
                  />
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Contact & Logic Parameters</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {coreParameters.map((field, i) => (
                      <div key={i}>
                        <label className="block text-xs font-bold text-slate-500 mb-1">{field.label}</label>
                        <input 
                          defaultValue={field.val} 
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= APP SETTINGS ================= */}
        {activeTab === "app" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-100 rounded-lg">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  <Smartphone size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-amber-800">Maintenance Mode</h4>
                  <p className="text-xs text-amber-600">Toggle this to lock the app for users during updates.</p>
                </div>
              </div>
              <input 
                type="checkbox" 
                className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-blue-600 cursor-pointer transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:translate-x-5" 
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Version Code</label>
                <input defaultValue="1.0.4" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1.5">Update Link (Play Store)</label>
                <input defaultValue="https://play.google.com/store/..." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Force Update Message</label>
              <textarea defaultValue="This version is outdated. Please update." className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" rows={2} />
            </div>
          </div>
        )}

        {/* ================= BANK SETTINGS ================= */}
        {activeTab === "bank" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-2">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Business Details</h4>
                <input placeholder="GSTIN Number" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                <input placeholder="PAN Number" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                <textarea placeholder="Business Address" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" rows={2} />
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-blue-600 uppercase tracking-widest">Payout Account</h4>
                <input placeholder="Bank Name" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                <input placeholder="Account Number" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                <input placeholder="IFSC Code" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
              </div>
            </div>
            
            <div className="pt-6 border-t border-slate-100">
               <label className="block text-sm font-semibold text-slate-700 mb-3">Company UPI QR Code</label>
               <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-all cursor-pointer group">
                 <Upload size={32} className="mb-2 group-hover:text-blue-500 transition-colors" />
                 <span className="text-xs font-medium">Click to upload UPI QR image</span>
               </div>
            </div>
          </div>
        )}

        {/* ================= NOTIFICATION/KEYS SETTINGS ================= */}
        {activeTab === "notification" && (
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-2">
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { label: "OneSignal App ID", placeholder: "xxxx-xxxx-xxxx" },
                { label: "OneSignal Rest Key", placeholder: "ODQ..." },
                { label: "Google Maps API Key", placeholder: "AIza..." },
                { label: "Razorpay Secret Key", placeholder: "rzp_live..." },
              ].map((key, i) => (
                <div key={i}>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">{key.label}</label>
                  <input 
                    type="password" 
                    placeholder={key.placeholder} 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MOBILE SAVE BUTTON */}
        <div className="mt-8 md:hidden">
           <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 active:scale-[0.98] transition-transform">
             Save All Settings
           </button>
        </div>
      </div>
    </div>
  );
}