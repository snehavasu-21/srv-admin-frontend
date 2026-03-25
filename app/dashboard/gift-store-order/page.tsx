"use client";

import React, { useState, useMemo } from "react";
import {
  Search, ChevronDown, ChevronLeft, ChevronRight,
  CheckCircle2, XCircle, Trash2, Edit2, Eye,
  Printer, FileSpreadsheet, ShoppingBag,
  Calendar, Package, Clock, X, Save
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

interface SectionLabelProps { children: React.ReactNode; }

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  iconBg: string;
  iconColor: string;
  borderAccent: string;
}

// ─── Components ──────────────────────────────────────────────────────────────

function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-8 mb-3 flex items-center gap-2">
      <span className="w-8 h-[1px] bg-slate-200"></span>
      {children}
    </p>
  );
}

function StatCard({ icon: Icon, label, value, iconBg, iconColor, borderAccent }: StatCardProps) {
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
  // 1. STATE
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
  const [actionOpen, setActionOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 2. FILTERING LOGIC
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

  // 3. HANDLERS
  const updateStatus = (id: string, newStatus: Order["status"]) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    setActionOpen(false);
  };

  const deleteOrder = (id: string) => {
    if(confirm("Are you sure you want to remove this redemption record?")) {
      setOrders(prev => prev.filter(o => o.id !== id));
    }
  };

  const handleBulkStatus = (newStatus: Order["status"]) => {
    setOrders(prev => prev.map(o => selectedIds.includes(o.id) ? { ...o, status: newStatus } : o));
    setSelectedIds([]);
    setActionOpen(false);
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredOrders.length) setSelectedIds([]);
    else setSelectedIds(filteredOrders.map(o => o.id));
  };

  // Stats
  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === "Delivered").length,
    rejected: orders.filter(o => o.status === "Rejected").length,
    pending: orders.filter(o => o.status === "Pending").length,
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans print:bg-white print:p-0">
      
      {/* ── HEADER ── */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-2 print:hidden">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-100 flex items-center justify-center shadow-inner">
            <ShoppingBag className="text-blue-600" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Manage User Redeem</h1>
            <p className="text-sm text-slate-500 mt-0.5">Order fulfillment for SRV Electricals</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-all text-sm font-bold">
            <Printer size={18} /> Print
          </button>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="print:hidden">
        <SectionLabel>Quick Insights</SectionLabel>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard icon={Package} label="Total Redeem" value={stats.total} iconBg="bg-blue-50" iconColor="text-blue-600" borderAccent="border-t-blue-500" />
          <StatCard icon={CheckCircle2} label="Delivered" value={stats.delivered} iconBg="bg-emerald-50" iconColor="text-emerald-600" borderAccent="border-t-emerald-500" />
          <StatCard icon={XCircle} label="Rejected" value={stats.rejected} iconBg="bg-rose-50" iconColor="text-rose-500" borderAccent="border-t-rose-400" />
          <StatCard icon={Clock} label="Pending" value={stats.pending} iconBg="bg-amber-50" iconColor="text-amber-600" borderAccent="border-t-amber-500" />
        </div>
      </div>

      {/* ── SEARCH & FILTERS ── */}
      <div className="print:hidden">
        <SectionLabel>Filters & Search</SectionLabel>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <div className="lg:col-span-2">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Search Orders</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="User, Product, or Phone..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Status</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-600 outline-none"
              >
                <option>All Status</option>
                <option>Delivered</option>
                <option>Pending</option>
                <option>Rejected</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">From Date</label>
              <input 
                type="date" 
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none"
              />
            </div>

            <div className="flex gap-2">
              <div className="flex-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">To Date</label>
                <input 
                  type="date" 
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-600 outline-none"
                />
              </div>
              <button 
                onClick={() => {setSearchTerm(""); setStatusFilter("All Status"); setFromDate(""); setToDate("");}}
                className="px-4 py-2.5 bg-slate-100 text-slate-500 rounded-xl hover:bg-slate-200 transition-colors"
                title="Reset Filters"
              >
                <X size={18}/>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── DATA TABLE ── */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Table Toolbar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 print:hidden">
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              checked={selectedIds.length === filteredOrders.length && filteredOrders.length > 0}
              onChange={toggleSelectAll}
              className="w-4 h-4 rounded border-slate-300 accent-blue-600" 
            />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {selectedIds.length > 0 ? `${selectedIds.length} Selected` : "Select All"}
            </span>
          </div>

          <div className="relative">
            <button 
              disabled={selectedIds.length === 0}
              onClick={() => setActionOpen(!actionOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-white transition-all disabled:opacity-50"
            >
              Bulk Status <ChevronDown size={14} className={actionOpen ? "rotate-180" : ""} />
            </button>
            
            {actionOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl border border-slate-100 shadow-2xl z-50 py-2 animate-in fade-in zoom-in-95">
                <button onClick={() => handleBulkStatus("Delivered")} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-emerald-50 hover:text-emerald-700">
                  <CheckCircle2 size={14} /> Mark Delivered
                </button>
                <button onClick={() => handleBulkStatus("Rejected")} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-rose-50 hover:text-rose-700">
                  <XCircle size={14} /> Mark Rejected
                </button>
                <div className="h-px bg-slate-100 mx-2 my-2" />
                <button className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-blue-600 hover:bg-blue-50">
                  <FileSpreadsheet size={14} /> Export Selected
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 w-12 print:hidden"></th>
                {["ID", "Redeemer", "Receiver", "Shipping Address", "Value & Date", "Status", "Actions"].map((h) => (
                  <th key={h} className={`px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 ${h === "Actions" ? "print:hidden text-right" : ""}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className={`hover:bg-slate-50/80 transition-colors group ${selectedIds.includes(order.id) ? 'bg-blue-50/30' : ''}`}>
                  <td className="px-6 py-5 print:hidden">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(order.id)}
                      onChange={() => setSelectedIds(prev => prev.includes(order.id) ? prev.filter(i => i !== order.id) : [...prev, order.id])}
                      className="w-4 h-4 rounded border-slate-300 accent-blue-600" 
                    />
                  </td>
                  <td className="px-6 py-5 text-xs font-bold text-slate-400">#{order.id}</td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-800">{order.userName}</p>
                    <p className="text-[11px] font-semibold text-blue-600 mt-0.5 flex items-center gap-1">
                      <Package size={12}/> {order.productName}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-slate-800">{order.receiverName}</p>
                    <p className="text-xs font-medium text-slate-400 mt-1">{order.receiverPhone}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-[11px] leading-relaxed text-slate-500 max-w-[180px] line-clamp-2">{order.address}</p>
                  </td>
                  <td className="px-6 py-5">
                    <p className="text-sm font-bold text-emerald-600">{order.points} pts</p>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 flex items-center gap-1 uppercase">
                      <Calendar size={12}/> {order.date}
                    </p>
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-6 py-5 print:hidden text-right">
                    <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => updateStatus(order.id, "Delivered")} className="w-8 h-8 flex items-center justify-center rounded-lg text-emerald-500 hover:bg-emerald-50" title="Mark Delivered"><CheckCircle2 size={16}/></button>
                      <button onClick={() => updateStatus(order.id, "Rejected")} className="w-8 h-8 flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50" title="Reject"><XCircle size={16}/></button>
                      <button onClick={() => deleteOrder(order.id)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100" title="Delete"><Trash2 size={16}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="py-20 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 mb-4">
              <Search className="text-slate-300" size={32} />
            </div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">No matching redemptions found</p>
          </div>
        )}

        {/* Footer */}
        <div className="px-6 py-5 border-t border-slate-100 flex items-center justify-between bg-slate-50/30 print:hidden">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
            Showing <span className="text-slate-700">{filteredOrders.length}</span> results
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400"><ChevronLeft size={16} /></button>
            <button className="w-9 h-9 rounded-xl text-xs font-bold bg-blue-600 text-white shadow-lg shadow-blue-200">1</button>
            <button className="w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-400"><ChevronRight size={16} /></button>
          </div>
        </div>
      </div>
      
      {/* Backdrop for Bulk Menu */}
      {actionOpen && <div className="fixed inset-0 z-40" onClick={() => setActionOpen(false)} />}
    </div>
  );
}