"use client";

import React, { useState, useMemo } from "react";
import {
  Search, Plus, MoreVertical, ChevronDown, Trash2,
  CheckCircle2, XCircle, HelpCircle, ArrowUpDown,
  X, Save, Loader2, Edit3
} from "lucide-react";

// --- TypeScript Interfaces ---
type FAQStatus = "Active" | "Inactive";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  status: FAQStatus;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "101",
      question: "How to use the SRV Electricals app?",
      answer: "You can easily use the app by registering with your mobile number. Once logged in, navigate to the wholesale price section to view current market rates.",
      status: "Active",
    },
    {
      id: "102",
      question: "How is cashback credited?",
      answer: "Cashback is credited directly to your in-app wallet after verification of your purchase invoice by our admin team.",
      status: "Inactive",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({ question: "", answer: "", status: "Active" as FAQStatus });

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSelectAll = () => {
    setSelected(selected.length === filteredFaqs.length ? [] : filteredFaqs.map(f => f.id));
  };

  const handleSelect = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const openAddModal = () => {
    setEditingFaq(null);
    setFormData({ question: "", answer: "", status: "Active" });
    setIsModalOpen(true);
  };

  const openEditModal = (faq: FAQ) => {
    setEditingFaq(faq);
    setFormData({ question: faq.question, answer: faq.answer, status: faq.status });
    setOpenDropdown(null);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    if (!formData.question || !formData.answer) return showToast("Please fill all fields", "error");
    setIsSaving(true);
    setTimeout(() => {
      if (editingFaq) {
        setFaqs(prev => prev.map(f => f.id === editingFaq.id ? { ...f, ...formData } : f));
        showToast("FAQ updated successfully");
      } else {
        const newFaq: FAQ = { id: Math.floor(Math.random() * 900 + 100).toString(), ...formData };
        setFaqs(prev => [newFaq, ...prev]);
        showToast("New FAQ added");
      }
      setIsSaving(false);
      setIsModalOpen(false);
    }, 600);
  };

  const handleAction = (id: string, action: "enable" | "disable" | "delete") => {
    if (action === "delete") {
      setFaqs(prev => prev.filter(f => f.id !== id));
      showToast("FAQ deleted");
    } else {
      setFaqs(prev => prev.map(f => f.id === id ? { ...f, status: action === "enable" ? "Active" : "Inactive" } : f));
      showToast(`FAQ ${action === "enable" ? "enabled" : "disabled"}`);
    }
    setOpenDropdown(null);
  };

  const handleBulkAction = (action: string) => {
    if (action === "delete") {
      setFaqs(prev => prev.filter(f => !selected.includes(f.id)));
      showToast(`${selected.length} items deleted`);
    } else {
      setFaqs(prev => prev.map(f => selected.includes(f.id) ? { ...f, status: action === "enable" ? "Active" : "Inactive" } : f));
      showToast(`${selected.length} items updated`);
    }
    setSelected([]);
  };

  const filteredFaqs = useMemo(() => {
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.id.includes(searchTerm)
    );
  }, [faqs, searchTerm]);

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 font-sans text-slate-900 overflow-visible">
      
      {/* TOAST MESSAGE */}
      {toast && (
        <div className={`fixed top-10 left-1/2 -translate-x-1/2 z-[250] flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl border animate-in slide-in-from-top-full ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
          <span className="text-sm font-bold">{toast.msg}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-3 uppercase tracking-tight">
            <HelpCircle className="text-blue-600" size={28} /> FAQ Knowledge Base
          </h1>
          <p className="text-slate-500 font-medium mt-1">Manage all customer-facing questions and answers</p>
        </div>
        <button onClick={openAddModal} className="flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-bold shadow-xl shadow-slate-200 active:scale-95">
          <Plus size={20} /> Add New FAQ
        </button>
      </div>

      {/* SEARCH & ACTIONS */}
      <div className="max-w-6xl mx-auto bg-white p-5 rounded-[2rem] border border-slate-200 mb-8 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm relative z-[60]">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by keyword or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-semibold outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
          />
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <select
            onChange={(e) => handleBulkAction(e.target.value)}
            value=""
            disabled={selected.length === 0}
            className="flex-1 md:w-56 appearance-none bg-slate-50 border border-slate-100 px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-30 cursor-pointer"
          >
            <option value="" disabled>Bulk Actions ({selected.length})</option>
            <option value="enable">Enable Selected</option>
            <option value="disable">Disable Selected</option>
            <option value="delete">Delete Permanently</option>
          </select>
        </div>
      </div>

      {/* TABLE CONTAINER - Overflow visible allows the dropdown to pop out */}
      <div className="max-w-6xl mx-auto bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-visible">
        <div className="overflow-visible">
          <table className="w-full text-left border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-5 w-12 text-center border-b border-slate-100 first:rounded-tl-[2rem]">
                  <input
                    type="checkbox"
                    checked={selected.length === filteredFaqs.length && filteredFaqs.length > 0}
                    onChange={handleSelectAll}
                    className="w-5 h-5 rounded-lg accent-blue-600 cursor-pointer"
                  />
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100">Question & Details</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-b border-slate-100 text-right last:rounded-tr-[2rem]">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-50">
              {filteredFaqs.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-24 rounded-b-[2rem]">
                    <HelpCircle size={48} className="mx-auto mb-4 text-slate-200" />
                    <p className="text-slate-400 font-bold">No results found</p>
                  </td>
                </tr>
              ) : (
                filteredFaqs.map((faq) => (
                  <tr key={faq.id} className={`group transition-all ${selected.includes(faq.id) ? 'bg-blue-50/30' : 'hover:bg-slate-50/50'}`}>
                    <td className="px-8 py-6 text-center">
                      <input
                        type="checkbox"
                        checked={selected.includes(faq.id)}
                        onChange={() => handleSelect(faq.id)}
                        className="w-5 h-5 rounded-lg accent-blue-600 cursor-pointer"
                      />
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-mono font-bold text-blue-500 uppercase">ID #{faq.id}</span>
                        <h4 className="text-sm font-black text-slate-800 leading-snug">{faq.question}</h4>
                        <p className="text-xs text-slate-500 font-medium line-clamp-1 mt-1">{faq.answer}</p>
                      </div>
                    </td>
                    <td className="px-6 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                        faq.status === "Active" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-slate-100 text-slate-400 border-slate-200"
                      }`}>
                        {faq.status}
                      </span>
                    </td>
                    {/* DROPDOWN CELL - Strictly set to overflow-visible */}
                    <td className="px-8 py-6 text-right relative overflow-visible">
                      <button
                        onClick={() => setOpenDropdown(openDropdown === faq.id ? null : faq.id)}
                        className="p-3 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-2xl transition-all active:scale-90"
                      >
                        <MoreVertical size={20} />
                      </button>

                      {openDropdown === faq.id && (
                        <div className="relative">
                          {/* Full screen overlay to detect click outside */}
                          <div className="fixed inset-0 z-[100]" onClick={() => setOpenDropdown(null)}></div>
                          
                          {/* THE DROPDOWN MENU - Elevated z-index and explicit positioning */}
                          <div className="absolute right-0 top-2 w-48 bg-white shadow-[0_10px_40px_rgba(0,0,0,0.2)] rounded-[1.5rem] border border-slate-100 z-[110] py-2 animate-in fade-in zoom-in-95 slide-in-from-top-2 duration-150">
                            <button onClick={() => openEditModal(faq)} className="w-full flex items-center gap-3 px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50">
                              <Edit3 size={16} className="text-blue-500" /> Edit Content
                            </button>
                            <button onClick={() => handleAction(faq.id, "enable")} className="w-full flex items-center gap-3 px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50">
                              <CheckCircle2 size={16} className="text-emerald-500" /> Set as Active
                            </button>
                            <button onClick={() => handleAction(faq.id, "disable")} className="w-full flex items-center gap-3 px-5 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50">
                              <XCircle size={16} className="text-amber-500" /> Set as Inactive
                            </button>
                            <div className="h-px bg-slate-100 my-1 mx-3"></div>
                            <button onClick={() => handleAction(faq.id, "delete")} className="w-full flex items-center gap-3 px-5 py-3 text-xs font-bold text-rose-600 hover:bg-rose-50">
                              <Trash2 size={16} /> Delete Forever
                            </button>
                          </div>
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

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => !isSaving && setIsModalOpen(false)}></div>
          <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">{editingFaq ? "Update FAQ" : "New Question"}</h3>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-1">App Documentation Center</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-colors">
                <X size={24} />
              </button>
            </div>
            <div className="p-10 space-y-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Question Title</label>
                <input 
                  value={formData.question}
                  onChange={(e) => setFormData({...formData, question: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-slate-800 outline-none focus:ring-4 focus:ring-blue-500/10"
                  placeholder="e.g. How do I reset my password?"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Detailed Answer</label>
                <textarea 
                  rows={4}
                  value={formData.answer}
                  onChange={(e) => setFormData({...formData, answer: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium text-slate-600 outline-none focus:ring-4 focus:ring-blue-500/10 resize-none"
                  placeholder="Provide a clear answer..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Initial Status</label>
                <div className="flex bg-slate-100 p-1.5 rounded-2xl">
                  {(["Active", "Inactive"] as FAQStatus[]).map(s => (
                    <button
                      key={s}
                      onClick={() => setFormData({...formData, status: s})}
                      className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${formData.status === s ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-5 rounded-[2rem] font-black shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
              >
                {isSaving ? <Loader2 size={24} className="animate-spin" /> : <Save size={24} />}
                {editingFaq ? "CONFIRM UPDATE" : "PUBLISH FAQ"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}