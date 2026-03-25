/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  Search, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle, Trash2, 
  Printer, FileSpreadsheet, ShoppingBag,
  Calendar, Package, X, AlertCircle, Check, Info
} from "lucide-react";

// ─── Interfaces ─────────────────────────────────────────────────────────────

interface Order {
  id: string;
  userName: string;
  productName: string;
  receiverName: string;
  receiverPhone: string;
  address: string;
  points: string;
  date: string;
  status: "Delivered" | "Rejected" | "Pending";
}

interface Toast {
  id: number;
  message: string;
  type: "success" | "error" | "info";
}

// ─── Components ──────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-8 mb-3 flex items-center gap-2">
      <span className="w-8 h-[1px] bg-slate-200"></span>
      {children}
    </p>
  );
}

function StatCard({ icon: Icon, label, value, iconBg, iconColor, borderAccent }: any) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${iconBg} ${iconColor}`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-800 tracking-tight">{value}</p>
        <p className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Rejected: "bg-rose-50 text-rose-700 border-rose-200",
    Pending: "bg-amber-50 text-amber-700 border-amber-200",
  };
  const dots: Record<string, string> = {
    Delivered: "bg-emerald-500",
    Rejected: "bg-rose-500",
    Pending: "bg-amber-500",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full inline-block ${dots[status]}`} />
      {status}
    </span>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────

export default function GiftStoreOrderPage() {
  const [orders, setOrders] = useState<Order[]>([
    { id: "62", userName: "Manjeet Singh", productName: "Electrician Bag", receiverName: "Nsjwja", receiverPhone: "7009524322", address: "X9HR+78 Green Valley Colony, Mansa, Punjab, India", points: "75", date: "2026-03-14", status: "Rejected" },
    { id: "61", userName: "Amit Sihag", productName: "Electrician Bag", receiverName: "Sumit Choudhary", receiverPhone: "8107844354", address: "Priya Electrical Gadakhera", points: "75", date: "2026-02-28", status: "Rejected" },
    { id: "60", userName: "Amit Sihag", productName: "BLDS Ceiling Fan (4 Blade)", receiverName: "Sumit Choudhary", receiverPhone: "8107844354", address: "Priya Electrical Gadakhera", points: "1500", date: "2026-02-26", status: "Rejected" },
    { id: "59", userName: "Anil", productName: "Drill Machine", receiverName: "Anil Kumar", receiverPhone: "6375055052", address: "6MR2+7RM, Shiv Colony, Chirawa, Rajasthan 333026, India", points: "750", date: "2026-02-13", status: "Delivered" },
    { id: "58", userName: "Sanjeev Kumar", productName: "Electrician Bag", receiverName: "Suraj", receiverPhone: "7087734521", address: "Guru Har Sahai, Punjab 152022, India", points: "75", date: "2026-02-12", status: "Delivered" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [bulkDeleteActive, setBulkDeleteActive] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Toast Helper
  const showMessage = (message: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  // Filtering Logic
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch = 
        o.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.receiverPhone.includes(searchTerm);
      const matchesStatus = statusFilter === "All Status" || o.status === statusFilter;
      const orderDate = new Date(o.date);
      const start = fromDate ? new Date(fromDate) : null;
      const end = toDate ? new Date(toDate) : null;
      const matchesDate = (!start || orderDate >= start) && (!end || orderDate <= end);
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, searchTerm, statusFilter, fromDate, toDate]);

  // Bulk Actions
  const handleBulkStatus = (newStatus: Order["status"]) => {
    setOrders(prev => prev.map(o => selectedIds.includes(o.id) ? { ...o, status: newStatus } : o));
    showMessage(`${selectedIds.length} orders updated to ${newStatus}`);
    setSelectedIds([]);
  };

  const executeBulkDelete = () => {
    setOrders(prev => prev.filter(o => !selectedIds.includes(o.id)));
    showMessage(`${selectedIds.length} orders deleted successfully`, "error");
    setSelectedIds([]);
    setBulkDeleteActive(false);
  };

  const handleExport = () => {
    const dataToExport = selectedIds.length > 0 
      ? orders.filter(o => selectedIds.includes(o.id))
      : filteredOrders;

    if (dataToExport.length === 0) return showMessage("No data to export", "info");

    const headers = ["ID", "User", "Product", "Receiver", "Phone", "Points", "Date", "Status"];
    const csvContent = [
      headers.join(","),
      ...dataToExport.map(o => [o.id, o.userName, o.productName, o.receiverName, o.receiverPhone, o.points, o.date, o.status].join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "redemptions.csv";
    link.click();
    showMessage("Export started...");
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOrders.length) setSelectedIds([]);
    else setSelectedIds(filteredOrders.map(o => o.id));
  };

  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === "Delivered").length,
    rejected: orders.filter(o => o.status === "Rejected").length,
    pending: orders.filter(o => o.status === "Pending").length,
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans print:bg-white print:p-0">
      
      {/* ── MESSAGE CENTER (TOASTS) ── */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        {toasts.map(toast => (
          <div key={toast.id} className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl border text-sm font-bold animate-in slide-in-from-right-10 duration-300
            ${toast.type === "success" ? "bg-white text-emerald-600 border-emerald-100" : ""}
            ${toast.type === "error" ? "bg-white text-rose-600 border-rose-100" : ""}
            ${toast.type === "info" ? "bg-white text-blue-600 border-blue-100" : ""}
          `}>
            {toast.type === "success" && <CheckCircle2 size={18} />}
            {toast.type === "error" && <AlertCircle size={18} />}
            {toast.type === "info" && <Info size={18} />}
            {toast.message}
            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="ml-4 opacity-30 hover:opacity-100"><X size={14}/></button>
          </div>
        ))}
      </div>

      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-2 print:hidden">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-200">
            <ShoppingBag className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Redeem Management</h1>
            <p className="text-sm text-slate-500 mt-0.5">SRV Electricals Portal</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all text-sm font-bold shadow-lg shadow-emerald-100">
            <FileSpreadsheet size={18} /> Export List
          </button>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="print:hidden">
        <SectionLabel>Inventory Summary</SectionLabel>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Package} label="Total Orders" value={stats.total} iconBg="bg-blue-50" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
          <StatCard icon={CheckCircle2} label="Delivered" value={stats.delivered} iconBg="bg-emerald-50" iconColor="text-emerald-600" borderAccent="border-t-emerald-500" />
          <StatCard icon={XCircle} label="Rejected" value={stats.rejected} iconBg="bg-rose-50" iconColor="text-rose-500" borderAccent="border-t-rose-400" />
          <StatCard icon={AlertCircle} label="Pending" value={stats.pending} iconBg="bg-amber-50" iconColor="text-amber-600" borderAccent="border-t-amber-500" />
        </div>
      </div>

      {/* ── SEARCH & FILTERS ── */}
      <div className="print:hidden">
        <SectionLabel>Filter Results</SectionLabel>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
          <div className="lg:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input type="text" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold">
            <option>All Status</option>
            <option>Delivered</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
          <div className="flex gap-2">
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="flex-1 px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm" />
            <button onClick={() => {setSearchTerm(""); setStatusFilter("All Status"); setFromDate(""); setToDate("");}} className="p-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200"><X size={18}/></button>
          </div>
        </div>
      </div>

      {/* ── STATIC BULK ACTION BAR ── */}
      {selectedIds.length > 0 && (
        <div className="mb-4 p-3 bg-slate-900 rounded-2xl flex items-center justify-between shadow-2xl animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-4 ml-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs font-bold">{selectedIds.length}</div>
            <span className="text-white text-sm font-bold">Orders Selected</span>
          </div>
          
          <div className="flex items-center gap-2">
            {bulkDeleteActive ? (
               <div className="flex items-center gap-2 bg-rose-500/10 rounded-xl p-1 border border-rose-500/20">
                  <span className="text-[10px] text-rose-100 font-bold px-3 uppercase">Confirm Delete?</span>
                  <button onClick={executeBulkDelete} className="bg-rose-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-rose-400">Yes, Remove</button>
                  <button onClick={() => setBulkDeleteActive(false)} className="bg-white/10 text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-white/20">Cancel</button>
               </div>
            ) : (
              <>
                <button onClick={() => handleBulkStatus("Delivered")} className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-xl text-xs font-bold hover:bg-emerald-400">
                  <CheckCircle2 size={14} /> Deliver
                </button>
                <button onClick={() => handleBulkStatus("Rejected")} className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl text-xs font-bold hover:bg-amber-400">
                  <XCircle size={14} /> Reject
                </button>
                <button onClick={() => setBulkDeleteActive(true)} className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold hover:bg-rose-500">
                  <Trash2 size={14} /> Delete
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── DATA TABLE ── */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 w-12 print:hidden">
                  <input type="checkbox" checked={selectedIds.length === filteredOrders.length && filteredOrders.length > 0} onChange={toggleSelectAll} className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                </th>
                {["Order ID", "User & Product", "Shipping Contact", "Address", "Value/Date", "Status", "Action"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className={`hover:bg-slate-50/80 transition-colors group ${selectedIds.includes(order.id) ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-6 py-5 print:hidden">
                    <input type="checkbox" checked={selectedIds.includes(order.id)} onChange={() => setSelectedIds(prev => prev.includes(order.id) ? prev.filter(i => i !== order.id) : [...prev, order.id])} className="w-4 h-4 rounded border-slate-300 accent-blue-600" />
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-400">#{order.id}</td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-800">{order.userName}</p>
                    <p className="text-[11px] font-semibold text-blue-600 mt-1 flex items-center gap-1 uppercase tracking-tight"><Package size={12}/> {order.productName}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-800">{order.receiverName}</p>
                    <p className="text-xs font-medium text-slate-400 mt-1">{order.receiverPhone}</p>
                  </td>
                  <td className="px-6 py-5"><p className="text-[11px] text-slate-500 max-w-[180px] line-clamp-2 italic">{order.address}</p></td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-emerald-600">{order.points} pts</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1 uppercase"><Calendar size={12}/> {order.date}</p>
                  </td>
                  <td className="px-6 py-5"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-5 print:hidden text-right">
                    <div className="flex items-center justify-end gap-1">
                      {deleteConfirmId === order.id ? (
                        <div className="flex items-center bg-rose-50 rounded-lg border border-rose-100 overflow-hidden animate-in fade-in slide-in-from-right-2">
                           <button onClick={() => {setOrders(prev => prev.filter(o => o.id !== order.id)); setDeleteConfirmId(null); showMessage("Record Deleted", "error");}} className="px-3 py-1.5 text-[10px] font-bold text-rose-600 hover:bg-rose-100 border-r border-rose-100">Delete</button>
                           <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1.5 text-[10px] font-bold text-slate-400 hover:bg-white">No</button>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => {setOrders(prev => prev.map(o => o.id === order.id ? {...o, status: "Delivered"} : o)); showMessage("Order Delivered");}} className="w-8 h-8 flex items-center justify-center rounded-lg text-emerald-500 hover:bg-emerald-50"><CheckCircle2 size={16}/></button>
                          <button onClick={() => {setOrders(prev => prev.map(o => o.id === order.id ? {...o, status: "Rejected"} : o)); showMessage("Order Rejected", "error");}} className="w-8 h-8 flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50"><XCircle size={16}/></button>
                          <button onClick={() => setDeleteConfirmId(order.id)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-slate-600 hover:bg-slate-100"><Trash2 size={16}/></button>
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
    </div>
  );
}