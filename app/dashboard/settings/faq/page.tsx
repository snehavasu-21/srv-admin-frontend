"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
} from "lucide-react";

export default function FAQPage() {
  const [faqs, setFaqs] = useState<any[]>([
    {
      id: "1",
      question: "How to use app?",
      answer: "You can use it easily...",
      status: "Active",
    },
  ]);

  const [selected, setSelected] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  /* ✅ SELECT ALL */
  const handleSelectAll = () => {
    if (selected.length === faqs.length) {
      setSelected([]);
    } else {
      setSelected(faqs.map((f) => f.id));
    }
  };

  /* ✅ SINGLE SELECT */
  const handleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  /* ✅ BULK ACTION */
  const handleBulkAction = (action: string) => {
    const updated = faqs.map((faq) => {
      if (selected.includes(faq.id)) {
        if (action === "enable") return { ...faq, status: "Active" };
        if (action === "disable") return { ...faq, status: "Inactive" };
      }
      return faq;
    });

    if (action === "delete") {
      setFaqs(faqs.filter((faq) => !selected.includes(faq.id)));
    } else {
      setFaqs(updated);
    }

    setSelected([]);
  };

  /* ✅ SINGLE ACTION */
  const handleAction = (id: string, action: string) => {
    if (action === "delete") {
      setFaqs(faqs.filter((f) => f.id !== id));
    } else {
      setFaqs(
        faqs.map((f) =>
          f.id === id
            ? { ...f, status: action === "enable" ? "Active" : "Inactive" }
            : f
        )
      );
    }
    setOpenDropdown(null);
  };

  return (
    <div className="bg-[#F4F7FE] min-h-full font-sans p-6">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-[#1B254B]">
          Manage FAQ
        </h1>

        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4318FF] text-white rounded-xl font-bold text-sm shadow">
          <Plus size={18} /> Add FAQ
        </button>
      </div>

      {/* SEARCH + BULK ACTION */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">

        {/* SEARCH */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search here..."
            className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] rounded-xl outline-none focus:ring-2 focus:ring-[#4318FF]"
          />
        </div>

        {/* BULK ACTION */}
        <select
          onChange={(e) => handleBulkAction(e.target.value)}
          className="bg-[#F4F7FE] px-4 py-2.5 rounded-xl text-sm font-bold"
        >
          <option>Action</option>
          <option value="enable">Enable Selected</option>
          <option value="disable">Disable Selected</option>
          <option value="delete">Delete Selected</option>
        </select>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[1.5rem] shadow overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            {/* HEADER */}
            <thead>
              <tr className="border-b border-slate-50">
                <th className="p-5">
                  <input
                    type="checkbox"
                    checked={selected.length === faqs.length && faqs.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 accent-[#4318FF]"
                  />
                </th>

                {["Id", "Question", "Answer", "Status", "Action"].map((h) => (
                  <th key={h} className="p-5 text-[11px] font-bold uppercase text-slate-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-slate-50">

              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-slate-400">
                    No data available in table
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-slate-50">

                    {/* CHECKBOX */}
                    <td className="p-5">
                      <input
                        type="checkbox"
                        checked={selected.includes(faq.id)}
                        onChange={() => handleSelect(faq.id)}
                        className="w-4 h-4 accent-[#4318FF]"
                      />
                    </td>

                    <td className="p-5 text-sm font-bold text-slate-500">
                      {faq.id}
                    </td>

                    <td className="p-5 text-sm font-bold text-[#1B254B]">
                      {faq.question}
                    </td>

                    <td className="p-5 text-sm text-slate-500 truncate max-w-[250px]">
                      {faq.answer}
                    </td>

                    {/* STATUS */}
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-lg text-xs font-bold ${
                          faq.status === "Active"
                            ? "bg-green-50 text-green-600"
                            : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {faq.status}
                      </span>
                    </td>

                    {/* ACTION DROPDOWN */}
                    <td className="p-5 relative">
                      <button
                        onClick={() =>
                          setOpenDropdown(openDropdown === faq.id ? null : faq.id)
                        }
                        className="p-2 hover:bg-slate-100 rounded-lg"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openDropdown === faq.id && (
                        <div className="absolute right-5 mt-2 w-36 bg-white shadow-lg rounded-xl border z-50">
                          <button
                            onClick={() => handleAction(faq.id, "enable")}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                          >
                            Enable
                          </button>
                          <button
                            onClick={() => handleAction(faq.id, "disable")}
                            className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
                          >
                            Disable
                          </button>
                          <button
                            onClick={() => handleAction(faq.id, "delete")}
                            className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>

                  </tr>
                ))
              )}

            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}