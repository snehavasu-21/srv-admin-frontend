"use client";

import { useState } from "react";
import { X } from "lucide-react";

export default function SettingsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <div className="bg-[#F4F7FE] min-h-full font-sans p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold text-[#1B254B] mb-6">
        Settings
      </h1>

      {/* BUTTONS */}
      <div className="flex gap-3 mb-6 flex-wrap">
        <button onClick={() => setActiveModal("app")} className="btn">App Settings</button>
        <button onClick={() => setActiveModal("bank")} className="btn bg-sky-500">Banking Settings</button>
        <button onClick={() => setActiveModal("notification")} className="btn bg-green-500">Notification Settings</button>
      </div>

      {/* ================= GENERAL SETTINGS ================= */}
      <div className="bg-white rounded-2xl p-6 shadow space-y-4">

        <div>
          <label className="label">Host Email</label>
          <p className="text-xs text-gray-400 mb-1">
            Required for forgot password email
          </p>
          <input defaultValue="srvelectericals.app@gmail.com" className="input" />
        </div>

        <div>
          <label className="label">App Name</label>
          <input defaultValue="SRV Electricals" className="input" />
        </div>

        <div>
          <label className="label">App Logo</label>
          <input type="file" className="input" />
        </div>

        <div>
          <label className="label">App Description</label>
          <textarea className="input" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <input defaultValue="+918427584682" placeholder="Author" className="input" />
          <input defaultValue="+918837684004" placeholder="Contact" className="input" />
          <input defaultValue="srvelectericals.app@gmail.com" placeholder="Email" className="input" />
          <input defaultValue="srvelectricals.com" placeholder="Website" className="input" />
          <input placeholder="Developed By" className="input" />
          <input defaultValue="10" placeholder="Min Transfer Point" className="input" />
          <input defaultValue="70" placeholder="Refer Point" className="input" />
          <input defaultValue="100" placeholder="Min Product Redeem" className="input" />
          <input defaultValue="+917009524322" placeholder="Help Desk 1" className="input" />
          <input defaultValue="+918437347487" placeholder="Help Desk 2" className="input" />
          <input defaultValue="100" placeholder="Min Withdrawal Amount" className="input" />
          <input defaultValue="1" placeholder="Conversion Amount" className="input" />
        </div>

        <button className="btn w-full mt-4">Save Settings</button>
      </div>

      {/* ================= MODALS ================= */}

      {/* APP SETTINGS */}
      {activeModal === "app" && (
        <Modal title="App Settings" onClose={() => setActiveModal(null)}>
          <input placeholder="Maintenance" className="input" />
          <input defaultValue="1.0" placeholder="App Version Code" className="input" />
          <textarea
            defaultValue="This Version of App has became outdated. Tap Below on the Update Now Button to Update the App."
            placeholder="Description"
            className="input"
          />
          <input
            defaultValue="https://play.google.com/store/apps/details?id="
            placeholder="App Link"
            className="input"
          />
          <input placeholder="Cancel Option" className="input" />
        </Modal>
      )}

      {/* BANK SETTINGS */}
      {activeModal === "bank" && (
        <Modal title="Banking Settings" onClose={() => setActiveModal(null)}>
          <input placeholder="Address" className="input" />
          <input placeholder="GSTIN" className="input" />
          <input placeholder="PAN No" className="input" />
          <input placeholder="Bank Name" className="input" />
          <input placeholder="Bank Account No" className="input" />
          <input placeholder="IFSC Code" className="input" />
          <input placeholder="Branch Name" className="input" />
          <input type="file" className="input" />
          <textarea placeholder="Notes Description" className="input" />
        </Modal>
      )}

      {/* NOTIFICATION SETTINGS */}
      {activeModal === "notification" && (
        <Modal title="Notification Settings" onClose={() => setActiveModal(null)}>
          <input placeholder="OneSignal App ID" className="input" />
          <input placeholder="OneSignal Rest Key" className="input" />
          <input placeholder="Map Key" className="input" />
          <input placeholder="Razorpay Key" className="input" />
        </Modal>
      )}

      {/* COMMON STYLES */}
      <style jsx>{`
        .input {
          width: 100%;
          padding: 10px 14px;
          background: #F4F7FE;
          border-radius: 12px;
          margin-top: 6px;
          outline: none;
          font-size: 14px;
        }

        .label {
          font-size: 14px;
          font-weight: bold;
          color: #334155;
        }

        .btn {
          background: #4318FF;
          color: white;
          padding: 10px 16px;
          border-radius: 12px;
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

/* ================= MODAL COMPONENT ================= */
function Modal({ title, children, onClose }: any) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg p-6 rounded-2xl relative space-y-4">

        <button onClick={onClose} className="absolute top-4 right-4">
          <X />
        </button>

        <h2 className="text-lg font-bold text-[#1B254B]">{title}</h2>

        {children}

        <button className="btn w-full mt-2">Save</button>
      </div>
    </div>
  );
}