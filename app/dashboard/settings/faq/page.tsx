// "use client";

// import { useState } from "react";
// import {
//   Search,
//   Plus,
//   MoreVertical,
// } from "lucide-react";

// export default function FAQPage() {
//   const [faqs, setFaqs] = useState<any[]>([
//     {
//       id: "1",
//       question: "How to use app?",
//       answer: "You can use it easily...",
//       status: "Active",
//     },
//   ]);

//   const [selected, setSelected] = useState<string[]>([]);
//   const [openDropdown, setOpenDropdown] = useState<string | null>(null);

//   /* ✅ SELECT ALL */
//   const handleSelectAll = () => {
//     if (selected.length === faqs.length) {
//       setSelected([]);
//     } else {
//       setSelected(faqs.map((f) => f.id));
//     }
//   };

//   /* ✅ SINGLE SELECT */
//   const handleSelect = (id: string) => {
//     if (selected.includes(id)) {
//       setSelected(selected.filter((i) => i !== id));
//     } else {
//       setSelected([...selected, id]);
//     }
//   };

//   /* ✅ BULK ACTION */
//   const handleBulkAction = (action: string) => {
//     const updated = faqs.map((faq) => {
//       if (selected.includes(faq.id)) {
//         if (action === "enable") return { ...faq, status: "Active" };
//         if (action === "disable") return { ...faq, status: "Inactive" };
//       }
//       return faq;
//     });

//     if (action === "delete") {
//       setFaqs(faqs.filter((faq) => !selected.includes(faq.id)));
//     } else {
//       setFaqs(updated);
//     }

//     setSelected([]);
//   };

//   /* ✅ SINGLE ACTION */
//   const handleAction = (id: string, action: string) => {
//     if (action === "delete") {
//       setFaqs(faqs.filter((f) => f.id !== id));
//     } else {
//       setFaqs(
//         faqs.map((f) =>
//           f.id === id
//             ? { ...f, status: action === "enable" ? "Active" : "Inactive" }
//             : f
//         )
//       );
//     }
//     setOpenDropdown(null);
//   };

//   return (
//     <div className="bg-[#F4F7FE] min-h-full font-sans p-6">

//       {/* HEADER */}
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-[#1B254B]">
//           Manage FAQ
//         </h1>

//         <button className="flex items-center gap-2 px-5 py-2.5 bg-[#4318FF] text-white rounded-xl font-bold text-sm shadow">
//           <Plus size={18} /> Add FAQ
//         </button>
//       </div>

//       {/* SEARCH + BULK ACTION */}
//       <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">

//         {/* SEARCH */}
//         <div className="relative w-full md:w-96">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//           <input
//             type="text"
//             placeholder="Search here..."
//             className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] rounded-xl outline-none focus:ring-2 focus:ring-[#4318FF]"
//           />
//         </div>

//         {/* BULK ACTION */}
//         <select
//           onChange={(e) => handleBulkAction(e.target.value)}
//           className="bg-[#F4F7FE] px-4 py-2.5 rounded-xl text-sm font-bold"
//         >
//           <option>Action</option>
//           <option value="enable">Enable Selected</option>
//           <option value="disable">Disable Selected</option>
//           <option value="delete">Delete Selected</option>
//         </select>

//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-[1.5rem] shadow overflow-hidden">

//         <div className="overflow-x-auto">
//           <table className="w-full text-left">

//             {/* HEADER */}
//             <thead>
//               <tr className="border-b border-slate-50">
//                 <th className="p-5">
//                   <input
//                     type="checkbox"
//                     checked={selected.length === faqs.length && faqs.length > 0}
//                     onChange={handleSelectAll}
//                     className="w-4 h-4 accent-[#4318FF]"
//                   />
//                 </th>

//                 {["Id", "Question", "Answer", "Status", "Action"].map((h) => (
//                   <th key={h} className="p-5 text-[11px] font-bold uppercase text-slate-400">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             {/* BODY */}
//             <tbody className="divide-y divide-slate-50">

//               {faqs.length === 0 ? (
//                 <tr>
//                   <td colSpan={6} className="text-center py-10 text-slate-400">
//                     No data available in table
//                   </td>
//                 </tr>
//               ) : (
//                 faqs.map((faq) => (
//                   <tr key={faq.id} className="hover:bg-slate-50">

//                     {/* CHECKBOX */}
//                     <td className="p-5">
//                       <input
//                         type="checkbox"
//                         checked={selected.includes(faq.id)}
//                         onChange={() => handleSelect(faq.id)}
//                         className="w-4 h-4 accent-[#4318FF]"
//                       />
//                     </td>

//                     <td className="p-5 text-sm font-bold text-slate-500">
//                       {faq.id}
//                     </td>

//                     <td className="p-5 text-sm font-bold text-[#1B254B]">
//                       {faq.question}
//                     </td>

//                     <td className="p-5 text-sm text-slate-500 truncate max-w-[250px]">
//                       {faq.answer}
//                     </td>

//                     {/* STATUS */}
//                     <td className="p-5">
//                       <span
//                         className={`px-3 py-1 rounded-lg text-xs font-bold ${
//                           faq.status === "Active"
//                             ? "bg-green-50 text-green-600"
//                             : "bg-gray-100 text-gray-500"
//                         }`}
//                       >
//                         {faq.status}
//                       </span>
//                     </td>

//                     {/* ACTION DROPDOWN */}
//                     <td className="p-5 relative">
//                       <button
//                         onClick={() =>
//                           setOpenDropdown(openDropdown === faq.id ? null : faq.id)
//                         }
//                         className="p-2 hover:bg-slate-100 rounded-lg"
//                       >
//                         <MoreVertical size={18} />
//                       </button>

//                       {openDropdown === faq.id && (
//                         <div className="absolute right-5 mt-2 w-36 bg-white shadow-lg rounded-xl border z-50">
//                           <button
//                             onClick={() => handleAction(faq.id, "enable")}
//                             className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
//                           >
//                             Enable
//                           </button>
//                           <button
//                             onClick={() => handleAction(faq.id, "disable")}
//                             className="block w-full text-left px-4 py-2 text-sm hover:bg-slate-50"
//                           >
//                             Disable
//                           </button>
//                           <button
//                             onClick={() => handleAction(faq.id, "delete")}
//                             className="block w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
//                           >
//                             Delete
//                           </button>
//                         </div>
//                       )}
//                     </td>

//                   </tr>
//                 ))
//               )}

//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import React, { useState } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  ChevronDown,
  Trash2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  ArrowUpDown
} from "lucide-react";

export default function FAQPage() {
  const [faqs, setFaqs] = useState([
    {
      id: "1",
      question: "How to use the SRV Electricals app?",
      answer: "You can easily use the app by registering with your mobile number. Once logged in, navigate to the wholesale price section to view current market rates and available cashback offers.",
      status: "Active",
    },
    {
      id: "2",
      question: "How is cashback credited?",
      answer: "Cashback is credited directly to your in-app wallet after the verification of your purchase invoice by our admin team.",
      status: "Inactive",
    },
  ]);

  const [selected, setSelected] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleSelectAll = () => {
    if (selected.length === faqs.length) {
      setSelected([]);
    } else {
      setSelected(faqs.map((f) => f.id));
    }
  };

  const handleSelect = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const handleBulkAction = (action) => {
    if (action === "delete") {
      setFaqs(faqs.filter((faq) => !selected.includes(faq.id)));
    } else {
      const updated = faqs.map((faq) => {
        if (selected.includes(faq.id)) {
          return { ...faq, status: action === "enable" ? "Active" : "Inactive" };
        }
        return faq;
      });
      setFaqs(updated);
    }
    setSelected([]);
  };

  const handleAction = (id, action) => {
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
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900">
      
      {/* 1. HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <HelpCircle className="text-blue-600" size={24} /> Manage FAQ
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Handle customer questions and app documentation</p>
        </div>

        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-md shadow-blue-100">
          <Plus size={16} /> Add FAQ
        </button>
      </div>

      {/* 2. SEARCH + BULK ACTION */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 mb-6 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <span className="text-xs font-semibold text-slate-400 uppercase hidden md:block">Bulk Action:</span>
          <div className="relative flex-1 md:flex-none">
            <select
              onChange={(e) => handleBulkAction(e.target.value)}
              disabled={selected.length === 0}
              className="w-full md:w-48 appearance-none bg-slate-50 border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-600 outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              <option value="">Choose action...</option>
              <option value="enable">Enable Selected</option>
              <option value="disable">Disable Selected</option>
              <option value="delete">Delete Selected</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
          </div>
        </div>
      </div>

      {/* 3. TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 w-12 text-center">
                  <input
                    type="checkbox"
                    checked={selected.length === faqs.length && faqs.length > 0}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors">
                    Id <ArrowUpDown size={12} />
                  </div>
                </th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Question</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500">Answer Preview</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-center">Status</th>
                <th className="px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-slate-500 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {faqs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center text-slate-400">
                      <HelpCircle size={48} className="mb-2 opacity-20" />
                      <p className="text-sm font-medium">No FAQs found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                faqs.map((faq) => (
                  <tr key={faq.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(faq.id)}
                        onChange={() => handleSelect(faq.id)}
                        className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer"
                      />
                    </td>

                    <td className="px-6 py-4 text-xs font-semibold text-slate-400">
                      #{faq.id}
                    </td>

                    <td className="px-6 py-4 text-sm font-bold text-slate-800">
                      {faq.question}
                    </td>

                    <td className="px-6 py-4">
                      <p className="text-xs text-slate-500 line-clamp-1 max-w-[300px]">
                        {faq.answer}
                      </p>
                    </td>

                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-bold uppercase border ${
                          faq.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border-emerald-100"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {faq.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 relative text-right">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === faq.id ? null : faq.id)}
                        className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                      >
                        <MoreVertical size={18} />
                      </button>

                      {openDropdown === faq.id && (
                        <>
                          <div 
                            className="fixed inset-0 z-10" 
                            onClick={() => setOpenDropdown(null)}
                          ></div>
                          <div className="absolute right-6 mt-2 w-40 bg-white shadow-xl rounded-xl border border-slate-100 z-20 py-1 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                            <button
                              onClick={() => handleAction(faq.id, "enable")}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <CheckCircle2 size={14} className="text-emerald-500" /> Enable FAQ
                            </button>
                            <button
                              onClick={() => handleAction(faq.id, "disable")}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                            >
                              <XCircle size={14} className="text-amber-500" /> Disable FAQ
                            </button>
                            <div className="h-px bg-slate-100 my-1"></div>
                            <button
                              onClick={() => handleAction(faq.id, "delete")}
                              className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
                            >
                              <Trash2 size={14} /> Delete FAQ
                            </button>
                          </div>
                        </>
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