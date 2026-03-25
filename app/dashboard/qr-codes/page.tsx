/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import {
  Search, Plus, FileDown, Eye, Edit2, Trash2,
  QrCode, Hash, Calendar, Download, X, CheckCircle2, 
  AlertCircle, Info, Layers, ChevronLeft, ChevronRight // Added missing icons here
} from "lucide-react";

// ─── Interfaces ─────────────────────────────────────────────────────────────

interface QRCodeBatch {
  id: string;
  productName: string;
  batchNo: string;
  date: string;
  point: string;
  qty: string;
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

// ─── Sub-components ─────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-6 mb-3 flex items-center gap-2">
      <span className="w-6 h-[1px] bg-slate-200"></span>
      {children}
    </p>
  );
}

function StatCard({ icon: Icon, label, value, iconBg, iconColor, borderAccent }: any) {
  return (
    <div className={`bg-white rounded-xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3 transition-all hover:shadow-md`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg} ${iconColor}`}>
        <Icon size={18} />
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-800">{value}</p>
        <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function ManageQRCodePage() {
  // Data State
  const [qrCodes, setQrCodes] = useState<QRCodeBatch[]>([
    { id: "1195", productName: "CC RG 4\" 18/60 PC", batchNo: "1535", date: "2026-03-20", point: "2", qty: "4000" },
    { id: "1193", productName: "CC PL 4.5\" 24/60 PC", batchNo: "1534", date: "2026-03-20", point: "2", qty: "1000" },
    { id: "1191", productName: "ACO 63A FP", batchNo: "1532", date: "2026-03-20", point: "50", qty: "40" },
  ]);

  // UI State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<QRCodeBatch | null>(null);
  const [viewingItem, setViewingItem] = useState<QRCodeBatch | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Toast Helper
  const showMsg = (message: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  // Logic: Filtering (Used for Search)
  const filteredCodes = useMemo(() => {
    return qrCodes.filter(qr => 
      qr.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qr.batchNo.includes(searchTerm)
    );
  }, [qrCodes, searchTerm]);

  // Logic: Export
  const exportToExcel = () => {
    const data = selectedIds.length > 0 ? qrCodes.filter(q => selectedIds.includes(q.id)) : filteredCodes;
    if (data.length === 0) return showMsg("Nothing to export", "info");
    
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "QR_Codes");
    XLSX.writeFile(wb, "SRV_QR_Export.xlsx");
    showMsg("Excel download started");
  };

  // Logic: Delete
  const confirmDelete = (id: string) => {
    setQrCodes(prev => prev.filter(item => item.id !== id));
    setSelectedIds(prev => prev.filter(i => i !== id));
    setDeleteConfirmId(null);
    showMsg("Batch deleted successfully", "error");
  };

  // Logic: Save (Add/Edit)
  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newData: QRCodeBatch = {
      id: editingItem?.id || Math.floor(Math.random() * 2000).toString(),
      productName: formData.get("productName") as string,
      batchNo: formData.get("batchNo") as string,
      date: new Date().toISOString().split('T')[0],
      point: formData.get("point") as string,
      qty: formData.get("qty") as string,
    };

    if (editingItem) {
      setQrCodes(prev => prev.map(item => item.id === editingItem.id ? newData : item));
      showMsg("Batch updated");
    } else {
      setQrCodes(prev => [newData, ...prev]);
      showMsg("New QR Batch added");
    }
    closeDrawer();
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    setEditingItem(null);
    setViewingItem(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900 relative overflow-x-hidden">
      
      {/* ── MESSAGE CENTER (Toasts) ── */}
      <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3">
        {toasts.map(t => (
          <div key={t.id} className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border text-sm font-bold animate-in slide-in-from-right-10 
            ${t.type === 'success' ? 'bg-white text-emerald-600 border-emerald-100' : ''}
            ${t.type === 'error' ? 'bg-white text-rose-600 border-rose-100' : ''}
            ${t.type === 'info' ? 'bg-white text-blue-600 border-blue-100' : ''}`}>
            {t.type === 'success' && <CheckCircle2 size={18}/>}
            {t.type === 'error' && <AlertCircle size={18}/>}
            {t.type === 'info' && <Info size={18}/>}
            {t.message}
          </div>
        ))}
      </div>

      {/* ── DRAWER / MODAL PANEL ── */}
      {(isDrawerOpen || viewingItem) && (
        <div className="fixed inset-0 z-[150] flex justify-end">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={closeDrawer} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-8 animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-xl font-bold text-slate-800">
                {viewingItem ? "Batch Details" : editingItem ? "Edit QR Batch" : "Add New QR Batch"}
              </h2>
              <button onClick={closeDrawer} className="p-2 hover:bg-slate-100 rounded-full"><X size={20}/></button>
            </div>

            {viewingItem ? (
              <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex justify-center">
                  <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-slate-800">
                    <QrCode size={120} />
                  </div>
                </div>
                {Object.entries(viewingItem).map(([key, val]) => (
                  <div key={key} className="border-b border-slate-100 pb-2">
                    <p className="text-[10px] uppercase font-bold text-slate-400">{key}</p>
                    <p className="text-sm font-semibold text-slate-700">{val}</p>
                  </div>
                ))}
              </div>
            ) : (
              <form onSubmit={handleSave} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Product Name</label>
                  <input name="productName" defaultValue={editingItem?.productName} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" placeholder="e.g. ACO 63A FP" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Batch No</label>
                    <input name="batchNo" defaultValue={editingItem?.batchNo} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Points</label>
                    <input name="point" type="number" defaultValue={editingItem?.point} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Quantity</label>
                  <input name="qty" type="number" defaultValue={editingItem?.qty} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <button type="submit" className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all mt-4">
                  {editingItem ? "Update Batch" : "Generate Batch"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* ── Main UI ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Manage QR Codes</h1>
          <p className="text-sm text-slate-500 mt-0.5">Product authentication and batch control</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={exportToExcel} className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 font-bold text-sm transition-all">
            <FileDown size={18} /> Export
          </button>
          <button onClick={() => setIsDrawerOpen(true)} className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-bold text-sm shadow-lg shadow-blue-100 transition-all">
            <Plus size={18} /> Add QR Code
          </button>
        </div>
      </div>

      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <StatCard icon={QrCode} label="Total Batches" value={qrCodes.length.toString()} iconBg="bg-blue-50" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
        <StatCard icon={Layers} label="Generated Qty" value={qrCodes.reduce((acc, curr) => acc + parseInt(curr.qty), 0).toLocaleString()} iconBg="bg-emerald-50" iconColor="text-emerald-600" borderAccent="border-t-emerald-500" />
      </div>

      <SectionLabel>Batch Management</SectionLabel>
      <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search product or batch..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select onChange={(e) => {
            if (e.target.value === "delete" && selectedIds.length) {
              setQrCodes(prev => prev.filter(i => !selectedIds.includes(i.id)));
              setSelectedIds([]);
              showMsg("Bulk delete successful", "error");
            }
          }} className="px-4 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold outline-none cursor-pointer">
            <option value="">Bulk Actions</option>
            <option value="delete">Delete Selected ({selectedIds.length})</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 w-10">
                  <input type="checkbox" onChange={(e) => setSelectedIds(e.target.checked ? filteredCodes.map(q => q.id) : [])} checked={selectedIds.length === filteredCodes.length && filteredCodes.length > 0} className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                </th>
                {["ID", "Product Details", "Batch Info", "Points", "Quantity", "Actions"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCodes.map((qr) => (
                <tr key={qr.id} className={`hover:bg-slate-50/50 transition-colors group ${selectedIds.includes(qr.id) ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-6 py-5">
                    <input type="checkbox" checked={selectedIds.includes(qr.id)} onChange={() => setSelectedIds(prev => prev.includes(qr.id) ? prev.filter(i => i !== qr.id) : [...prev, qr.id])} className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-400">#{qr.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center"><QrCode size={16} /></div>
                      <p className="text-sm font-bold text-slate-800">{qr.productName}</p>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-xs font-bold text-slate-700 flex items-center gap-1"><Hash size={12} className="text-slate-400"/> {qr.batchNo}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase"><Calendar size={10} className="inline mr-1"/> {qr.date}</p>
                  </td>
                  <td className="px-6 py-5">
                    <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg text-[10px] font-bold">{qr.point} Pts</span>
                  </td>
                  <td className="px-6 py-5 text-sm font-bold text-slate-700">{qr.qty}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-1">
                      {deleteConfirmId === qr.id ? (
                        <div className="flex bg-rose-50 rounded-lg overflow-hidden border border-rose-100 animate-in fade-in scale-in-95">
                          <button onClick={() => confirmDelete(qr.id)} className="px-3 py-1 text-[10px] font-bold text-rose-600 hover:bg-rose-100">Delete</button>
                          <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1 text-[10px] font-bold text-slate-400 border-l border-rose-100 hover:bg-white">No</button>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => setViewingItem(qr)} className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"><Eye size={15} /></button>
                          <button onClick={() => showMsg(`Downloading QR ZIP for #${qr.id}`, "info")} className="w-8 h-8 flex items-center justify-center rounded-lg text-emerald-500 hover:bg-emerald-50 transition-colors"><Download size={15} /></button>
                          <button onClick={() => {setEditingItem(qr); setIsDrawerOpen(true);}} className="w-8 h-8 flex items-center justify-center rounded-lg text-amber-500 hover:bg-amber-50 transition-colors"><Edit2 size={15} /></button>
                          <button onClick={() => setDeleteConfirmId(qr.id)} className="w-8 h-8 flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"><Trash2 size={15} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* ── Pagination ── */}
      <div className="mt-6 flex items-center justify-between">
         <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing {filteredCodes.length} Batches</p>
         <div className="flex gap-2">
            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
              <ChevronLeft size={18}/>
            </button>
            <button className="p-2 bg-white border border-slate-200 rounded-lg text-slate-400 hover:bg-slate-50 transition-all">
              <ChevronRight size={18}/>
            </button>
         </div>
      </div>
    </div>
  );
}