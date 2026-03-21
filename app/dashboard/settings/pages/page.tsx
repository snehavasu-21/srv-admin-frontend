"use client";

import { useState } from "react";
import { Save } from "lucide-react";

export default function PagesSettingsPage() {
  const [form, setForm] = useState({
    about: "",
    contact: "",
    privacy: "",
    terms: "",
    refund: "",
    refer: "",
  });

  return (
    <div className="p-6 lg:p-8 bg-[#F4F7FE] min-h-full font-sans">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B254B]">
          Pages Settings
        </h1>
        <p className="text-slate-500 text-sm">
          Manage all application pages content
        </p>
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl shadow p-6 space-y-6">

        {/* ABOUT US */}
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">
            About Us
          </label>
          <textarea
            rows={4}
            placeholder="Write about your company..."
            className="w-full border rounded-xl p-3 bg-[#F4F7FE] outline-none focus:ring-2 focus:ring-[#4318FF]"
            value={form.about}
            onChange={(e) => setForm({ ...form, about: e.target.value })}
          />
        </div>

        {/* CONTACT US */}
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">
            Contact Us
          </label>
          <textarea
            rows={4}
            placeholder="Write contact details..."
            className="w-full border rounded-xl p-3 bg-[#F4F7FE] outline-none focus:ring-2 focus:ring-[#4318FF]"
            value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
          />
        </div>

        {/* PRIVACY POLICY */}
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">
            App Privacy Policy
          </label>
          <textarea
            rows={4}
            placeholder="Enter privacy policy..."
            className="w-full border rounded-xl p-3 bg-[#F4F7FE] outline-none focus:ring-2 focus:ring-[#4318FF]"
            value={form.privacy}
            onChange={(e) => setForm({ ...form, privacy: e.target.value })}
          />
        </div>

        {/* TERMS & CONDITIONS */}
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">
            App Terms & Conditions
          </label>
          <textarea
            rows={4}
            placeholder="Enter terms & conditions..."
            className="w-full border rounded-xl p-3 bg-[#F4F7FE] outline-none focus:ring-2 focus:ring-[#4318FF]"
            value={form.terms}
            onChange={(e) => setForm({ ...form, terms: e.target.value })}
          />
        </div>

        {/* REFUND POLICY */}
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">
            Cancellation / Refund Policy
          </label>
          <textarea
            rows={4}
            placeholder="Enter refund policy..."
            className="w-full border rounded-xl p-3 bg-[#F4F7FE] outline-none focus:ring-2 focus:ring-[#4318FF]"
            value={form.refund}
            onChange={(e) => setForm({ ...form, refund: e.target.value })}
          />
        </div>

        {/* REFER CONTENT */}
        <div>
          <label className="block text-sm font-bold text-slate-600 mb-2">
            App Refer Content
          </label>
          <textarea
            rows={4}
            placeholder="Enter refer description..."
            className="w-full border rounded-xl p-3 bg-[#F4F7FE] outline-none focus:ring-2 focus:ring-[#4318FF]"
            value={form.refer}
            onChange={(e) => setForm({ ...form, refer: e.target.value })}
          />
        </div>

        {/* SAVE BUTTON */}
        <div className="pt-4">
          <button className="flex items-center gap-2 px-6 py-3 bg-[#4318FF] text-white rounded-xl font-bold hover:bg-[#3311CC] transition-all shadow">
            <Save size={18} /> Save Changes
          </button>
        </div>

      </div>
    </div>
  );
} 