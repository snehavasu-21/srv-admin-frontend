/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation"; 
import * as XLSX from "xlsx";
import {
  Search, CheckCircle2, XCircle, Trash2, 
  FileSpreadsheet, ShoppingBag,
  Calendar, Package, X, AlertCircle, Info,
  FilterX, Edit3, Save, ChevronDown
} from "lucide-react";

// ─── Interfaces ─────────────────────────────────────────────────────────────

interface Order {
  id: string;
  userId: string; 
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
    <div className={`bg-white rounded-2xl border border-slate-200 border-t-4 ${borderAccent} p-5 flex flex-col gap-3 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group cursor-default`}>
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
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterUserId = searchParams.get("userId");

  const [orders, setOrders] = useState<Order[]>([
    { id: "101", userId: "1640", userName: "Pradeep Kumar", productName: "Heavy Duty Drill", receiverName: "Pradeep", receiverPhone: "9829555400", address: "Ward No. 12, Mansa", points: "2500", date: "2026-03-24", status: "Pending" },
    { id: "102", userId: "1641", userName: "Amit Sihag", productName: "Digital Multimeter", receiverName: "Sumit", receiverPhone: "8107844354", address: "Gadakhera", points: "450", date: "2026-03-20", status: "Pending" },
    { id: "103", userId: "3292", userName: "Manjeet Singh", productName: "Tool Kit Set", receiverName: "Manjeet", receiverPhone: "7009524322", address: "Green Valley, Mansa", points: "1200", date: "2026-03-18", status: "Delivered" },
    { id: "104", userId: "3292", userName: "Manjeet Singh", productName: "Electrician Bag", receiverName: "Nsjwja", receiverPhone: "7009524322", address: "Green Valley Colony, Mansa", points: "75", date: "2026-03-14", status: "Rejected" },
    { id: "105", userId: "1641", userName: "Amit Sihag", productName: "BLDS Ceiling Fan", receiverName: "Sumit", receiverPhone: "8107844354", address: "Priya Electrical", points: "1500", date: "2026-02-26", status: "Delivered" },
    { id: "106", userId: "2225", userName: "Anil", productName: "Drill Machine", receiverName: "Anil Kumar", receiverPhone: "6375055052", address: "Shiv Colony, Chirawa", points: "750", date: "2026-02-13", status: "Delivered" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const showMessage = (message: string, type: Toast["type"] = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesUrlUser = !filterUserId || o.userId === filterUserId;
      const matchesSearch = 
        o.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        o.receiverPhone.includes(searchTerm);
      const matchesStatus = statusFilter === "All Status" || o.status === statusFilter;
      const orderDate = new Date(o.date);
      const start = fromDate ? new Date(fromDate) : null;
      const end = toDate ? new Date(toDate) : null;
      const matchesDate = (!start || orderDate >= start) && (!end || orderDate <= end);
      return matchesUrlUser && matchesSearch && matchesStatus && matchesDate;
    });
  }, [orders, searchTerm, statusFilter, fromDate, toDate, filterUserId]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredOrders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, `Orders_Export.xlsx`);
    showMessage("Exported to Excel");
  };

  const handleBulkUpdate = (newStatus: Order["status"]) => {
    setOrders(prev => prev.map(o => selectedIds.includes(o.id) ? { ...o, status: newStatus } : o));
    showMessage(`Updated ${selectedIds.length} orders to ${newStatus}`);
    setSelectedIds([]);
    setShowBulkActions(false);
  };

  const handleBulkDelete = () => {
    setOrders(prev => prev.filter(o => !selectedIds.includes(o.id)));
    showMessage(`Deleted ${selectedIds.length} orders`, "error");
    setSelectedIds([]);
    setShowBulkActions(false);
  };

  const handleUpdateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingOrder) {
      setOrders(prev => prev.map(o => o.id === editingOrder.id ? editingOrder : o));
      showMessage("Order updated");
      setEditingOrder(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
      
      {/* ─── EDIT MODAL (Screenshot Fields Added) ─── */}
      {editingOrder && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <form onSubmit={handleUpdateOrder} className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800 text-lg">Edit User Redeem</h3>
              <button type="button" onClick={() => setEditingOrder(null)} className="text-slate-400 cursor-pointer hover:text-slate-600"><X size={20}/></button>
            </div>
            
            <div className="p-8 space-y-5 max-h-[75vh] overflow-y-auto">
              {/* User Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-slate-600">User Name :-</label>
                <input type="text" readOnly className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded text-sm text-slate-500 outline-none" value={editingOrder.userName} />
              </div>

              {/* Product Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-slate-600">Product Name :-</label>
                <input type="text" readOnly className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded text-sm text-slate-500 outline-none" value={editingOrder.productName} />
              </div>

              {/* Product Image */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-slate-600">Product Image :-</label>
                <div className="w-32 h-32 border border-slate-200 rounded bg-white flex items-center justify-center overflow-hidden p-2">
                   <img src="/api/placeholder/120/120" alt="prod" className="max-h-full max-w-full object-contain" />
                </div>
              </div>

              {/* Receiver Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-slate-600">Receiver Name :-</label>
                <input type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm outline-none cursor-pointer focus:ring-1 focus:ring-blue-500" value={editingOrder.receiverName} onChange={(e) => setEditingOrder({...editingOrder, receiverName: e.target.value})} />
              </div>

              {/* Receiver Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-slate-600">Receiver Phone :-</label>
                <input type="text" maxLength={10} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm outline-none cursor-pointer" value={editingOrder.receiverPhone} onChange={(e) => setEditingOrder({...editingOrder, receiverPhone: e.target.value.replace(/\D/g, "")})} />
              </div>

              {/* Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-slate-600">Address :-</label>
                <textarea className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm outline-none resize-none cursor-pointer" rows={3} value={editingOrder.address} onChange={(e) => setEditingOrder({...editingOrder, address: e.target.value})} />
              </div>

              {/* Date */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-slate-600">Date :-</label>
                <input type="text" readOnly className="w-full px-4 py-2.5 bg-slate-100 border border-slate-200 rounded text-sm text-slate-500 outline-none" value={editingOrder.date} />
              </div>

              {/* Redeem Status */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-bold text-slate-600">Redeem Status :-</label>
                <select 
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded text-sm font-bold outline-none cursor-pointer"
                  value={editingOrder.status}
                  onChange={(e) => setEditingOrder({...editingOrder, status: e.target.value as any})}
                >
                  <option value="Pending">Pending</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="p-8 border-t flex gap-4 bg-white">
              <button type="submit" className="flex-1 py-3 bg-[#1e66b3] text-white rounded font-bold text-sm cursor-pointer shadow-md hover:opacity-90 transition-opacity">Save</button>
              <button type="button" onClick={() => setEditingOrder(null)} className="flex-1 py-3 bg-[#e64a3b] text-white rounded font-bold text-sm cursor-pointer shadow-md hover:opacity-90 transition-opacity">Cancel</button>
            </div>
          </form>
        </div>
      )}

      {/* ─── TOASTS ─── */}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        {toasts.map(toast => (
          <div key={toast.id} className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-xl border text-sm font-bold animate-in slide-in-from-right-10
            ${toast.type === "success" ? "bg-white text-emerald-600 border-emerald-100" : ""}
            ${toast.type === "error" ? "bg-white text-rose-600 border-rose-100" : ""}
            ${toast.type === "info" ? "bg-white text-blue-600 border-blue-100" : ""}
          `}>
            {toast.message}
            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))} className="ml-4 cursor-pointer opacity-30 hover:opacity-100"><X size={14}/></button>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4 mb-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-100">
            <ShoppingBag className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Redeem Orders</h1>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mt-0.5">Inventory Management</p>
          </div>
        </div>
        <button onClick={exportToExcel} className="flex items-center gap-2 px-5 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition-all text-sm font-bold cursor-pointer shadow-lg shadow-emerald-50">
          <FileSpreadsheet size={18} /> Export Excel
        </button>
      </div>

      <SectionLabel>Filter Results</SectionLabel>
      <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" placeholder="Search orders..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm cursor-pointer focus:border-blue-500 outline-none" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold cursor-pointer outline-none">
          <option>All Status</option>
          <option>Delivered</option>
          <option>Pending</option>
          <option>Rejected</option>
        </select>
        <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm cursor-pointer outline-none" />
        <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm cursor-pointer outline-none" />
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto min-h-[400px]">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 w-12">
                  <div className="relative">
                    <button 
                      onClick={() => setShowBulkActions(!showBulkActions)}
                      className="flex items-center gap-1 px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-[10px] font-bold uppercase text-slate-500 hover:border-blue-400 cursor-pointer"
                    >
                      {selectedIds.length > 0 ? `${selectedIds.length}` : 'Select'} <ChevronDown size={12}/>
                    </button>
                    
                    {showBulkActions && (
                      <div className="absolute top-full left-0 mt-2 w-40 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2">
                        <button onClick={() => {setSelectedIds(filteredOrders.map(o => o.id)); setShowBulkActions(false);}} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">Select All</button>
                        <button onClick={() => {setSelectedIds([]); setShowBulkActions(false);}} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer">Deselect All</button>
                        <hr className="my-1 border-slate-100" />
                        <button onClick={() => handleBulkUpdate("Delivered")} className="w-full text-left px-4 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 cursor-pointer">Set Delivered</button>
                        <button onClick={() => handleBulkUpdate("Rejected")} className="w-full text-left px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 cursor-pointer">Set Rejected</button>
                        <button onClick={handleBulkDelete} className="w-full text-left px-4 py-2 text-xs font-bold text-slate-400 hover:bg-slate-50 cursor-pointer">Delete Selected</button>
                      </div>
                    )}
                  </div>
                </th>
                {["Order ID", "User & Product", "Contact", "Address", "Points", "Status", "Action"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className={`hover:bg-slate-50/80 transition-colors group cursor-pointer ${selectedIds.includes(order.id) ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-6 py-5" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" checked={selectedIds.includes(order.id)} onChange={() => setSelectedIds(prev => prev.includes(order.id) ? prev.filter(i => i !== order.id) : [...prev, order.id])} className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-400 cursor-pointer">#{order.id}</td>
                  <td className="px-6 py-5 cursor-pointer">
                    <p className="text-sm font-bold text-slate-800">{order.userName}</p>
                    <p className="text-[10px] font-bold text-blue-600 mt-1 uppercase tracking-tight">{order.productName}</p>
                  </td>
                  <td className="px-6 py-5 cursor-pointer">
                    <p className="text-sm font-bold text-slate-800">{order.receiverName}</p>
                    <p className="text-xs font-medium text-slate-400 mt-1">{order.receiverPhone}</p>
                  </td>
                  <td className="px-6 py-5 cursor-pointer"><p className="text-[11px] text-slate-500 max-w-[150px] line-clamp-1 italic">{order.address}</p></td>
                  <td className="px-6 py-5 cursor-pointer">
                    <p className="text-sm font-bold text-slate-800">{order.points}</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{order.date}</p>
                  </td>
                  <td className="px-6 py-5 cursor-pointer"><StatusBadge status={order.status} /></td>
                  <td className="px-6 py-5 text-right" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-1">
                      {deleteConfirmId === order.id ? (
                        <div className="flex items-center bg-rose-50 rounded-lg border border-rose-100 overflow-hidden animate-in fade-in slide-in-from-right-2">
                           <button onClick={() => {setOrders(prev => prev.filter(o => o.id !== order.id)); setDeleteConfirmId(null); showMessage("Deleted", "error");}} className="px-3 py-1.5 text-[10px] font-bold text-rose-600 hover:bg-rose-100 cursor-pointer">Delete</button>
                           <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1.5 text-[10px] font-bold text-slate-400 hover:bg-white cursor-pointer">Cancel</button>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => setEditingOrder(order)} className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 cursor-pointer transition-colors"><Edit3 size={16}/></button>
                          <button onClick={() => setDeleteConfirmId(order.id)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 cursor-pointer transition-colors"><Trash2 size={16}/></button>
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