"use client";

import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Trash2, Edit2, MessageSquare, User, 
  Clock, CheckCircle, Filter, FileSpreadsheet, X, Send, AlertTriangle
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

interface Enquiry {
  id: string;
  userName: string;
  phone: string;
  subject: string;
  comment: string;
  response: string;
  type: "Pending" | "In review" | string;
  status: "Enable" | "Disable" | string;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EnquiryPage() {
  // 1. Data State
  const [enquiries, setEnquiries] = useState<Enquiry[]>([
    { id: "9", userName: "Satnam Panchal", phone: "+91 98765-43210", subject: "Scan problem", comment: "Scan problem aya raha h", response: "", type: "Pending", status: "Enable" },
    { id: "8", userName: "Guest User", phone: "Not Available", subject: "Attention", comment: "Hi", response: "", type: "Pending", status: "Enable" },
    { id: "7", userName: "Harpreet Singh Sidhu", phone: "+91 99887-76655", subject: "HarpreetSinghSidhu", comment: "Ok", response: "", type: "Pending", status: "Enable" },
    { id: "6", userName: "NIKHIL SAINI", phone: "+91 90123-45678", subject: "Pending my reward points", comment: "Pending my reward points", response: "When did you place your gift order...", type: "In review", status: "Enable" },
    { id: "5", userName: "Balvinder singh", phone: "+91 91234-56789", subject: "New abadi gurdwara street 3 fazilka", comment: "New abadi gurdwara street 3 fazilka", response: "Sorry, I am unable to understand...", type: "In review", status: "Enable" },
  ]);

  // 2. UI State
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("Inquiry Type");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // 3. Modal States
  const [editingEnquiry, setEditingEnquiry] = useState<Enquiry | null>(null);
  const [tempResponse, setTempResponse] = useState("");
  const [deleteId, setDeleteId] = useState<string | "bulk" | null>(null);

  // ─── Logic: Filtering ──────────────────────────────────────────────────────

  const filteredData = useMemo(() => {
    return enquiries.filter(item => {
      const matchesSearch = 
        item.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.id.includes(searchTerm);
      
      const matchesFilter = 
        filterType === "Inquiry Type" || 
        item.type.toLowerCase() === filterType.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  }, [enquiries, searchTerm, filterType]);

  // ─── Handlers ──────────────────────────────────────────────────────────────

  const exportEnquiries = () => {
    const dataToExport = selectedIds.length > 0 
      ? enquiries.filter(e => selectedIds.includes(e.id)) 
      : filteredData;
      
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Enquiries");
    XLSX.writeFile(workbook, "Enquiries_Export.xlsx");
    setIsActionOpen(false);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredData.map(item => item.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  // Execution of Deletion
  const confirmDelete = () => {
    if (deleteId === "bulk") {
      setEnquiries(prev => prev.filter(item => !selectedIds.includes(item.id)));
      setSelectedIds([]);
    } else if (deleteId) {
      setEnquiries(prev => prev.filter(item => item.id !== deleteId));
      setSelectedIds(prev => prev.filter(i => i !== deleteId));
    }
    setDeleteId(null);
    setIsActionOpen(false);
  };

  const openEditModal = (enquiry: Enquiry) => {
    setEditingEnquiry(enquiry);
    setTempResponse(enquiry.response);
  };

  const saveResponse = () => {
    if (editingEnquiry) {
      setEnquiries(prev => prev.map(item => 
        item.id === editingEnquiry.id 
          ? { ...item, response: tempResponse, type: "In review" } 
          : item
      ));
      setEditingEnquiry(null);
      setTempResponse("");
    }
  };

  const toggleStatus = (id: string) => {
    setEnquiries(prev => prev.map(item => 
      item.id === id ? { ...item, status: item.status === "Enable" ? "Disable" : "Enable" } : item
    ));
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900 relative">
      
      {/* ─── MODAL OVERLAY (Used by both modals) ─── */}
      {(editingEnquiry || deleteId) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          
          {/* 1. EDIT MODAL */}
          {editingEnquiry && (
            <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <Edit2 size={16} className="text-blue-600" /> Respond to Inquiry #{editingEnquiry.id}
                </h3>
                <button onClick={() => setEditingEnquiry(null)} className="p-2 hover:bg-slate-200 rounded-full text-slate-400 transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">User Message</label>
                  <div className="mt-1 p-3 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600 italic">
                    "{editingEnquiry.comment}"
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Your Response</label>
                  <textarea 
                    value={tempResponse}
                    onChange={(e) => setTempResponse(e.target.value)}
                    placeholder="Type your reply here..."
                    className="mt-1 w-full h-32 p-4 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  />
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                <button onClick={() => setEditingEnquiry(null)} className="px-4 py-2 text-sm font-semibold text-slate-500 hover:text-slate-700">Cancel</button>
                <button onClick={saveResponse} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-md transition-all active:scale-95">
                  <Send size={14} /> Submit Response
                </button>
              </div>
            </div>
          )}

          {/* 2. DELETE CONFIRMATION MODAL */}
          {deleteId && (
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-8 text-center">
                <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle size={32} />
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">Are you sure?</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  {deleteId === "bulk" 
                    ? `You are about to delete ${selectedIds.length} selected inquiries. This action cannot be undone.` 
                    : "You are about to delete this inquiry. This action cannot be undone."}
                </p>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                <button 
                  onClick={() => setDeleteId(null)} 
                  className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  No, Keep it
                </button>
                <button 
                  onClick={confirmDelete} 
                  className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-rose-600 rounded-xl hover:bg-rose-700 shadow-md shadow-rose-100 transition-all active:scale-95"
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 1. HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Inquiry</h1>
          <p className="text-sm text-slate-500 mt-0.5">SRV Electricals | Customer Support Portal</p>
        </div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, ID or subject..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* 2. FILTERS & BULK ACTIONS */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-48">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
             <select 
               value={filterType}
               onChange={(e) => setFilterType(e.target.value)}
               className="w-full pl-9 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-600 outline-none cursor-pointer appearance-none hover:bg-slate-100 transition-all"
             >
               <option>Inquiry Type</option>
               <option value="Pending">Pending</option>
               <option value="In review">In Review</option>
             </select>
             <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={12} />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-2 mr-2">
            <input type="checkbox" checked={filteredData.length > 0 && selectedIds.length === filteredData.length} onChange={handleSelectAll} className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
            <span className="text-xs font-semibold text-slate-500">Select All</span>
          </div>
          
          <div className="relative">
            <button onClick={() => setIsActionOpen(!isActionOpen)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-all shadow-sm">
              Action <ChevronDown size={14} className={`transition-transform ${isActionOpen ? 'rotate-180' : ''}`} />
            </button>
            {isActionOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2">
                  <button onClick={exportEnquiries} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                    <FileSpreadsheet size={14} /> Export {selectedIds.length > 0 ? `(${selectedIds.length})` : 'All'}
                  </button>
                  <button 
                    onClick={() => setDeleteId("bulk")}
                    disabled={selectedIds.length === 0}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold transition-colors ${selectedIds.length > 0 ? 'text-rose-600 hover:bg-rose-50' : 'text-slate-300 cursor-not-allowed'}`}
                  >
                    <Trash2 size={14} /> Delete Selected ({selectedIds.length})
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* 3. ENQUIRY TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-4 w-12 text-center"></th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Id</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">User Name</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Inquiry Subject / Comment</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center text-nowrap">Inquiry Response</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Inquiry Type</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Status</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-right">Action</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-50">
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className={`group transition-all duration-200 ${selectedIds.includes(item.id) ? 'bg-blue-50/40' : 'hover:bg-slate-50/80'}`}>
                    <td className="px-5 py-4 text-center">
                      <input type="checkbox" checked={selectedIds.includes(item.id)} onChange={() => handleSelectOne(item.id)} className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                    </td>
                    <td className="px-5 py-4 text-xs font-medium text-slate-400">#{item.id}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center bg-blue-50 text-blue-600 rounded-lg"><User size={14}/></div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-800">{item.userName || "N/A"}</span>
                          <span className="text-[10px] text-slate-400 font-medium">{item.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-sm font-bold text-slate-800 mb-0.5">{item.subject}</div>
                      <div className="text-xs text-slate-500 max-w-[220px] line-clamp-2 italic">&quot;{item.comment}&quot;</div>
                    </td>
                    <td className="px-5 py-4">
                      {item.response ? (
                        <div className="text-[11px] leading-relaxed font-medium text-emerald-700 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100 flex gap-2">
                          <MessageSquare size={12} className="shrink-0 mt-0.5 text-emerald-500" />
                          {item.response}
                        </div>
                      ) : (
                        <div className="text-center">
                           <span className="text-[10px] font-bold text-slate-300 uppercase tracking-tight">Pending Response</span>
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <div className="flex justify-center">
                        {item.type === "Pending" ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold uppercase border border-amber-100"><Clock size={10}/> Pending</span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 text-[10px] font-bold uppercase border border-blue-100"><CheckCircle size={10}/> In Review</span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button onClick={() => toggleStatus(item.id)} className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase border rounded-lg transition-colors ${item.status === "Enable" ? "bg-emerald-50 text-emerald-700 border-emerald-100 hover:bg-emerald-100" : "bg-slate-50 text-slate-400 border-slate-200 hover:bg-slate-100"}`}>
                        {item.status}
                      </button>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                         <button onClick={() => openEditModal(item)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all"><Edit2 size={14}/></button>
                         <button onClick={() => setDeleteId(item.id)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all"><Trash2 size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan={8} className="px-5 py-12 text-center text-slate-400 text-sm italic">No enquiries found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* PAGINATION (Footer) */}
        <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center bg-white">
          <p className="text-xs font-medium text-slate-400">Showing {filteredData.length} of {enquiries.length} inquiries</p>
          <div className="flex items-center gap-1.5">
            <button disabled className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 opacity-50"><ChevronLeft size={14}/></button>
            <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white">1</button>
            <button disabled className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 opacity-50"><ChevronRight size={14}/></button>
          </div>
        </div>
      </div>
    </div>
  );
}