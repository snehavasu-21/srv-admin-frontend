// "use client";

// import { useState } from "react";

// export default function SettingsPage() {
//   const [activeTab, setActiveTab] = useState("general");

//   return (
//     <div className="bg-[#F4F7FE] min-h-full font-sans p-6">

//       {/* HEADER */}
//       <h1 className="text-2xl font-bold text-[#1B254B] mb-6">
//         Settings
//       </h1>

//       {/* TAB BUTTONS */}
//       <div className="flex gap-3 mb-6 flex-wrap">
//         <button onClick={() => setActiveTab("general")} className={`btn ${activeTab==="general" && "active"}`}>
//           General Settings
//         </button>
//         <button onClick={() => setActiveTab("app")} className={`btn ${activeTab==="app" && "active"}`}>
//           App Settings
//         </button>
//         <button onClick={() => setActiveTab("bank")} className={`btn ${activeTab==="bank" && "active"}`}>
//           Banking Settings
//         </button>
//         <button onClick={() => setActiveTab("notification")} className={`btn ${activeTab==="notification" && "active"}`}>
//           Notification Settings
//         </button>
//       </div>

//       {/* ================= GENERAL SETTINGS ================= */}
//       {activeTab === "general" && (
//         <div className="bg-white rounded-2xl p-6 shadow space-y-4">

//           <div>
//             <label className="label">Host Email</label>
//             <p className="text-xs text-gray-400 mb-1">
//               Required for forgot password email
//             </p>
//             <input defaultValue="srvelectericals.app@gmail.com" className="input" />
//           </div>

//           <div>
//             <label className="label">App Name</label>
//             <input defaultValue="SRV Electricals" className="input" />
//           </div>

//           <div>
//             <label className="label">App Logo</label>
//             <input type="file" className="input" />
//           </div>

//           <div>
//             <label className="label">App Description</label>
//             <textarea className="input" />
//           </div>

//           <div className="grid md:grid-cols-2 gap-4">
//             <input defaultValue="+918427584682" placeholder="Author" className="input" />
//             <input defaultValue="+918837684004" placeholder="Contact" className="input" />
//             <input defaultValue="srvelectericals.app@gmail.com" placeholder="Email" className="input" />
//             <input defaultValue="srvelectricals.com" placeholder="Website" className="input" />
//             <input placeholder="Developed By" className="input" />
//             <input defaultValue="10" placeholder="Min Transfer Point" className="input" />
//             <input defaultValue="70" placeholder="Refer Point" className="input" />
//             <input defaultValue="100" placeholder="Min Product Redeem" className="input" />
//             <input defaultValue="+917009524322" placeholder="Help Desk 1" className="input" />
//             <input defaultValue="+918437347487" placeholder="Help Desk 2" className="input" />
//             <input defaultValue="100" placeholder="Min Withdrawal Amount" className="input" />
//             <input defaultValue="1" placeholder="Conversion Amount" className="input" />
//           </div>

//           <button className="btn w-full mt-4">Save Settings</button>
//         </div>
//       )}

//       {/* ================= APP SETTINGS ================= */}
//       {activeTab === "app" && (
//         <div className="bg-white rounded-2xl p-6 shadow space-y-4">

//           <input placeholder="Maintenance" className="input" />

//           <input defaultValue="1.0" placeholder="App Version Code" className="input" />

//           <textarea
//             defaultValue="This Version of App has became outdated. Tap Below on the Update Now Button to Update the App."
//             placeholder="Description"
//             className="input"
//           />

//           <input
//             defaultValue="https://play.google.com/store/apps/details?id="
//             placeholder="App Link"
//             className="input"
//           />

//           <input placeholder="Cancel Option" className="input" />

//           <button className="btn w-full mt-2">Save</button>
//         </div>
//       )}

//       {/* ================= BANK SETTINGS ================= */}
//       {activeTab === "bank" && (
//         <div className="bg-white rounded-2xl p-6 shadow space-y-4">

//           <input placeholder="Address" className="input" />
//           <input placeholder="GSTIN" className="input" />
//           <input placeholder="PAN No" className="input" />
//           <input placeholder="Bank Name" className="input" />
//           <input placeholder="Bank Account No" className="input" />
//           <input placeholder="IFSC Code" className="input" />
//           <input placeholder="Branch Name" className="input" />

//           <div>
//             <label className="label">App UPI Image</label>
//             <input type="file" className="input" />
//           </div>

//           <textarea placeholder="Notes Description" className="input" />

//           <button className="btn w-full mt-2">Save</button>
//         </div>
//       )}

//       {/* ================= NOTIFICATION SETTINGS ================= */}
//       {activeTab === "notification" && (
//         <div className="bg-white rounded-2xl p-6 shadow space-y-4">

//           <input placeholder="OneSignal App ID" className="input" />
//           <input placeholder="OneSignal Rest Key" className="input" />
//           <input placeholder="Map Key" className="input" />
//           <input placeholder="Razorpay Key" className="input" />

//           <button className="btn w-full mt-2">Save</button>
//         </div>
//       )}

//       {/* COMMON STYLES */}
//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 10px 14px;
//           background: #F4F7FE;
//           border-radius: 12px;
//           margin-top: 6px;
//           outline: none;
//           font-size: 14px;
//         }

//         .label {
//           font-size: 14px;
//           font-weight: bold;
//           color: #334155;
//         }

//         .btn {
//           background: #E2E8F0;
//           color: #334155;
//           padding: 10px 16px;
//           border-radius: 12px;
//           font-weight: bold;
//           font-size: 14px;
//         }

//         .active {
//           background: #4318FF;
//           color: white;
//         }
//       `}</style>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import { 
  Settings, Globe, Smartphone, Landmark, 
  Bell, Save, Upload, Mail, Info 
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const TabButton = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
        activeTab === id
          ? "bg-blue-600 text-white shadow-md shadow-blue-200"
          : "bg-white text-slate-500 hover:bg-slate-50 border border-slate-200"
      }`}
    >
      <Icon size={16} />
      {label}
    </button>
  );

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
        <TabButton id="general" label="General Settings" icon={Globe} />
        <TabButton id="app" label="App Settings" icon={Smartphone} />
        <TabButton id="bank" label="Banking Settings" icon={Landmark} />
        <TabButton id="notification" label="System Keys" icon={Bell} />
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
                      <input defaultValue="srvelectericals.app@gmail.com" className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1.5 italic">Used for "Forgot Password" system emails</p>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1.5">App Name</label>
                    <input defaultValue="SRV Electricals" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">App Description</label>
                  <textarea rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="Describe the purpose of SRV Electricals app..." />
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Contact & Logic Parameters</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {[
                      { label: "Author", val: "+91 84275 84682" },
                      { label: "Contact", val: "+91 88376 84004" },
                      { label: "Website", val: "srvelectricals.com" },
                      { label: "Min Transfer Point", val: "10" },
                      { label: "Refer Point", val: "70" },
                      { label: "Min Product Redeem", val: "100" },
                      { label: "Help Desk 1", val: "+91 70095 24322" },
                      { label: "Min Withdrawal", val: "₹100" },
                      { label: "Conversion Rate", val: "1" },
                    ].map((field, i) => (
                      <div key={i}>
                        <label className="block text-xs font-bold text-slate-500 mb-1">{field.label}</label>
                        <input defaultValue={field.val} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
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
              <input type="checkbox" className="w-10 h-5 bg-slate-200 rounded-full appearance-none checked:bg-blue-600 cursor-pointer transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:transition-all checked:after:translate-x-5" />
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
               <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-50 transition-all cursor-pointer">
                 <Upload size={32} className="mb-2" />
                 <span className="text-xs font-medium">Click to upload UPI QR image</span>
               </div>
            </div>
          </div>
        )}

        {/* ================= NOTIFICATION SETTINGS ================= */}
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
                  <input type="password" placeholder={key.placeholder} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MOBILE SAVE BUTTON */}
        <div className="mt-8 md:hidden">
           <button className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200">
             Save All Settings
           </button>
        </div>
      </div>
    </div>
  );
}