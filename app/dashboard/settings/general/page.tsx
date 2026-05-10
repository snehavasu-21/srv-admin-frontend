/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Settings, Globe, Smartphone, Landmark, 
  Bell, Save, Upload, Mail, Info, LucideIcon,
  CheckCircle2, XCircle, Loader2, Trash2
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

type TabId = "general" | "app" | "bank" | "notification";

interface TabConfig {
  id: TabId;
  label: string;
  icon: LucideIcon;
}

// ─── Sub-components ─────────────────────────────────────────────────────────

const Toast = ({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl border animate-in slide-in-from-top-full duration-300 ${
      type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
    }`}>
      {type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
      <span className="text-sm font-bold">{message}</span>
    </div>
  );
};

// ─── Page Component ──────────────────────────────────────────────────────────

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("general");
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
  
  // Refs & Upload State
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [qrPreview, setQrPreview] = useState<string | null>(null);

  // Form State
  const [generalData, setGeneralData] = useState({
    hostEmail: "srvelectericals.app@gmail.com",
    appName: "SRV Electricals",
    appDescription: "SRV Electricals management platform.",
    author: "+91 84275 84682",
    contact: "+91 88376 84004",
    website: "srvelectricals.com",
    minTransfer: "10",
    referPoint: "70",
    minRedeem: "100",
    helpDesk: "+91 70095 24322",
    minWithdrawal: "100",
    conversion: "1"
  });

  const [appData, setAppData] = useState({
    maintenance: false,
    version: "1.0.4",
    playStore: "https://play.google.com/store/...",
    forceMsg: "This version is outdated. Please update."
  });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
  };

  // ─── Upload Handlers ───────────────────────────────────────────────────────
  
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast("Image size must be less than 2MB", "error");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setQrPreview(reader.result as string);
        showToast("QR Preview updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setQrPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    showToast("Image removed", "error");
  };

  // ─── Save Logic ────────────────────────────────────────────────────────────

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      showToast("Settings updated successfully!");
    }, 800);
  };

  const tabs: TabConfig[] = [
    { id: "general", label: "General", icon: Globe },
    { id: "app", label: "App UI", icon: Smartphone },
    { id: "bank", label: "Banking", icon: Landmark },
    { id: "notification", label: "System Keys", icon: Bell },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10 font-sans text-slate-900">
      
      {toast && <Toast message={toast.msg} type={toast.type} onClose={() => setToast(null)} />}

      {/* HEADER */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-10">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-200">
                <Settings size={20} />
            </div> 
            Settings
          </h1>
          <p className="text-sm text-slate-500 font-medium">Global Configuration Dashboard</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="hidden md:flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 hover:scale-105 hover:shadow-2xl transition-all duration-300 text-sm font-bold shadow-xl shadow-blue-100 disabled:opacity-70 disabled:hover:scale-100 cursor-pointer"
        >
          {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* NAVIGATION */}
      <div className="max-w-5xl mx-auto flex gap-2 mb-8 bg-white p-1.5 rounded-2xl border border-slate-200 overflow-x-auto shadow-sm">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer ${
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-lg scale-[1.02]"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <tab.icon size={16} />
            {tab.label}
          </button>
        ))}
      </div>

      <div className="max-w-5xl mx-auto">
        {/* ================= GENERAL ================= */}
        {activeTab === "general" && (
          <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-400">
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-1.5 h-6 bg-blue-600 rounded-full"></div>
                <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">Core Information</h3>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-2 group">
                    <label className="text-[11px] font-black text-slate-400 group-focus-within:text-blue-600 uppercase tracking-wider ml-1 transition-colors">Host Email</label>
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                        <input 
                            type="email"
                            value={generalData.hostEmail}
                            onChange={(e) => setGeneralData({...generalData, hostEmail: e.target.value})}
                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-300 transition-all cursor-text" 
                        />
                    </div>
                </div>
                <div className="space-y-2 group">
                    <label className="text-[11px] font-black text-slate-400 group-focus-within:text-blue-600 uppercase tracking-wider ml-1 transition-colors">App Title</label>
                    <input 
                        value={generalData.appName}
                        onChange={(e) => setGeneralData({...generalData, appName: e.target.value})}
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-300 transition-all cursor-text" 
                    />
                </div>
              </div>

              <div className="space-y-2 mb-10 group">
                <label className="text-[11px] font-black text-slate-400 group-focus-within:text-blue-600 uppercase tracking-wider ml-1 transition-colors">Short Description</label>
                <textarea 
                  rows={3} 
                  value={generalData.appDescription}
                  onChange={(e) => setGeneralData({...generalData, appDescription: e.target.value})}
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white focus:border-blue-300 transition-all resize-none cursor-text" 
                />
              </div>

              <div className="pt-8 border-t border-slate-100">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">Contact & System Logic</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Object.entries(generalData).slice(3).map(([key, val], i) => (
                    <div key={i} className="space-y-1.5 group">
                      <label className="text-[10px] font-bold text-slate-400 group-focus-within:text-blue-600 uppercase ml-1 transition-colors">{key.replace(/([A-Z])/g, ' $1')}</label>
                      <input 
                        value={val} 
                        onChange={(e) => setGeneralData({...generalData, [key]: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all cursor-text" 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= APP ================= */}
        {activeTab === "app" && (
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-8 animate-in fade-in slide-in-from-bottom-4">
            <div 
              onClick={() => setAppData({...appData, maintenance: !appData.maintenance})}
              className={`flex items-center justify-between p-6 rounded-[1.5rem] transition-all cursor-pointer border hover:shadow-md ${appData.maintenance ? 'bg-amber-50 border-amber-200' : 'bg-slate-50 border-slate-100 hover:border-slate-200'}`}
            >
              <div className="flex gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${appData.maintenance ? 'bg-amber-100 text-amber-600' : 'bg-slate-200 text-slate-500'}`}>
                  <Smartphone size={24} />
                </div>
                <div>
                  <h4 className={`text-sm font-black ${appData.maintenance ? 'text-amber-900' : 'text-slate-800'}`}>Maintenance Mode</h4>
                  <p className="text-xs font-medium text-slate-500 mt-1">Users will see a "Maintenance" screen when opening the app.</p>
                </div>
              </div>
              <div className={`w-14 h-7 rounded-full relative transition-all duration-300 ${appData.maintenance ? 'bg-blue-600 shadow-lg shadow-blue-100' : 'bg-slate-300'}`}>
                <div className={`absolute top-1 bg-white w-5 h-5 rounded-full transition-all duration-300 shadow-sm ${appData.maintenance ? 'left-8' : 'left-1'}`} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Version Code</label>
                <input value={appData.version} onChange={(e) => setAppData({...appData, version: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all cursor-text" />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Play Store Link</label>
                <input value={appData.playStore} onChange={(e) => setAppData({...appData, playStore: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all cursor-text" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Force Update Message</label>
              <textarea value={appData.forceMsg} onChange={(e) => setAppData({...appData, forceMsg: e.target.value})} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all resize-none cursor-text" rows={2} />
            </div>
          </div>
        )}

        {/* ================= BANKING ================= */}
        {activeTab === "bank" && (
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4">
            <div className="grid md:grid-cols-2 gap-10 mb-10">
              <div className="space-y-5">
                <h4 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Business Profile</h4>
                <input placeholder="GSTIN Number" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all cursor-text" />
                <input placeholder="PAN Number" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all cursor-text" />
                <textarea placeholder="Registered Address" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all resize-none cursor-text" rows={3} />
              </div>
              <div className="space-y-5">
                <h4 className="text-xs font-black text-blue-600 uppercase tracking-[0.2em] mb-4">Settlement Account</h4>
                <input placeholder="Beneficiary Bank" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all cursor-text" />
                <input placeholder="Account Number" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all cursor-text" />
                <input placeholder="IFSC Code" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-2 focus:ring-blue-500/10 focus:bg-white transition-all cursor-text" />
              </div>
            </div>
            
            <div className="pt-8 border-t border-slate-100">
               <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-1">Company UPI QR Code</label>
               <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
               />

               <div 
                  onClick={handleImageClick}
                  className={`group relative border-2 border-dashed rounded-[2rem] p-12 flex flex-col items-center justify-center transition-all cursor-pointer overflow-hidden min-h-[300px] hover:scale-[1.01] active:scale-[0.99] ${
                    qrPreview ? 'border-blue-400 bg-blue-50/20 shadow-inner' : 'border-slate-200 text-slate-400 hover:bg-blue-50/50 hover:border-blue-200'
                  }`}
               >
                 {qrPreview ? (
                    <div className="flex flex-col items-center animate-in zoom-in-95 duration-300">
                        <img 
                          src={qrPreview} 
                          alt="QR Code" 
                          className="max-h-56 rounded-xl shadow-2xl mb-4 border-4 border-white" 
                        />
                        <button 
                          onClick={removeImage}
                          className="flex items-center gap-2 px-6 py-2.5 bg-rose-100 text-rose-600 rounded-xl text-xs font-bold hover:bg-rose-600 hover:text-white transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
                        >
                          <Trash2 size={14} /> Remove & Re-upload
                        </button>
                    </div>
                 ) : (
                    <>
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-12 transition-all duration-300 shadow-sm">
                            <Upload size={28} />
                        </div>
                        <span className="text-sm font-black text-slate-500 group-hover:text-blue-600 transition-colors">Click to Select QR Image</span>
                        <p className="text-xs font-medium text-slate-400 mt-1">Supports PNG, JPG (Max 2MB)</p>
                    </>
                 )}
               </div>
            </div>
          </div>
        )}

        {/* ================= KEYS ================= */}
        {activeTab === "notification" && (
          <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex items-center gap-3 mb-4 p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-700 shadow-sm">
                <Info size={18} />
                <p className="text-xs font-bold uppercase tracking-wider">Warning: These keys give access to sensitive systems. Do not share.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                { label: "OneSignal App ID", placeholder: "xxxx-xxxx-xxxx" },
                { label: "OneSignal Rest Key", placeholder: "ODQ..." },
                { label: "Google Maps API Key", placeholder: "AIza..." },
                { label: "Razorpay Secret Key", placeholder: "rzp_live..." },
              ].map((key, i) => (
                <div key={i} className="space-y-2 group">
                  <label className="text-[11px] font-black text-slate-400 group-focus-within:text-rose-600 uppercase tracking-widest ml-1 transition-colors">{key.label}</label>
                  <input 
                    type="password" 
                    placeholder={key.placeholder} 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm outline-none focus:ring-4 focus:ring-rose-500/5 focus:bg-white focus:border-rose-200 transition-all cursor-text" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MOBILE SAVE BUTTON */}
        <div className="mt-8 md:hidden">
           <button 
             onClick={handleSave}
             disabled={isSaving}
             className="w-full py-5 bg-blue-600 text-white rounded-[2rem] font-black shadow-2xl shadow-blue-200 active:scale-[0.98] hover:bg-blue-700 transition-all flex items-center justify-center gap-3 cursor-pointer"
           >
             {isSaving ? <Loader2 className="animate-spin" /> : <Save />}
             {isSaving ? "SAVING..." : "SAVE SETTINGS"}
           </button>
        </div>
      </div>
    </div>
  );
}