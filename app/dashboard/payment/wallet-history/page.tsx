/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useMemo } from "react";
import {
  Search, Plus, ChevronLeft,
  Wallet, TrendingUp, Users, Receipt,
  Save, Edit2, RotateCcw, Trash2, X, AlertCircle, CheckCircle2
} from "lucide-react";

// --- Interfaces ---
interface Transaction {
  id: string;
  userName: string;
  description: string;
  date: string;
  point: string;
  type: "Credit" | "Debit";
}

export default function WalletHistoryPage() {
  // 1. Primary Data State
  const [data, setData] = useState<Transaction[]>(initialHistoryData);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  
  // 2. UI View State
  const [isAdding, setIsAdding] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // 3. Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [userFilter, setUserFilter] = useState("All Users");

  // 4. Form State (For Add/Edit)
  const [formData, setFormData] = useState({
    userName: "",
    point: "",
    description: "",
    type: "Credit" as "Credit" | "Debit"
  });

  // 5. Custom Modal State
  const [modal, setModal] = useState<{
    show: boolean;
    title: string;
    message: string;
    type: "confirm" | "alert";
    onConfirm?: () => void;
  }>({ show: false, title: "", message: "", type: "alert" });

  // --- FILTER LOGIC ---
  const filteredHistory = useMemo(() => {
    return data.filter((item) => {
      const s = searchTerm.toLowerCase();
      const matchesSearch = 
        item.userName.toLowerCase().includes(s) ||
        item.description.toLowerCase().includes(s) ||
        item.id.toLowerCase().includes(s) ||
        item.point.includes(s);
      const matchesDropdown = userFilter === "All Users" || item.userName === userFilter;
      return matchesSearch && matchesDropdown;
    });
  }, [data, searchTerm, userFilter]);

  const uniqueNames = useMemo(() => {
    return ["All Users", ...Array.from(new Set(data.map(item => item.userName)))];
  }, [data]);

  // --- ACTION HANDLERS ---
  
  const handleToggleRow = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredHistory.map(i => i.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleStartEdit = (e: React.MouseEvent, item: Transaction) => {
    e.stopPropagation();
    setEditId(item.id);
    setFormData({
      userName: item.userName,
      point: item.point,
      description: item.description,
      type: item.type
    });
    setIsAdding(true);
  };

  const handleSave = () => {
    if (!formData.userName || !formData.point) {
      setModal({
        show: true,
        title: "Missing Information",
        message: "Please fill in both the Account Name and Points Value before saving.",
        type: "alert"
      });
      return;
    }

    if (editId) {
      setData(prev => prev.map(item => item.id === editId ? { ...item, ...formData } : item));
    } else {
      const newEntry: Transaction = {
        id: Math.floor(10000 + Math.random() * 90000).toString(),
        ...formData,
        date: new Date().toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })
      };
      setData(prev => [newEntry, ...prev]);
    }

    setIsAdding(false);
    setEditId(null);
    setFormData({ userName: "", point: "", description: "", type: "Credit" });
  };

  const handleDelete = () => {
    setModal({
      show: true,
      title: "Delete Transactions",
      message: `Are you sure you want to delete ${selectedIds.length} selected record(s)? This action cannot be undone.`,
      type: "confirm",
      onConfirm: () => {
        setData(prev => prev.filter(item => !selectedIds.includes(item.id)));
        setSelectedIds([]);
        setModal(prev => ({ ...prev, show: false }));
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 md:p-10 text-slate-900 font-sans relative">
      
      {/* CUSTOM CENTERED MESSAGE BOX (MODAL) */}
      {modal.show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in duration-300">
            <div className="p-8 text-center">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${modal.type === 'confirm' ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'}`}>
                {modal.type === 'confirm' ? <Trash2 size={32} /> : <AlertCircle size={32} />}
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight">{modal.title}</h3>
              <p className="text-slate-500 text-sm font-medium mt-3 leading-relaxed">
                {modal.message}
              </p>
            </div>
            <div className="flex border-t border-slate-100 p-4 gap-3 bg-slate-50/50">
              {modal.type === "confirm" ? (
                <>
                  <button 
                    onClick={() => setModal(prev => ({ ...prev, show: false }))}
                    className="flex-1 px-4 py-3 text-sm font-bold text-slate-500 hover:bg-white rounded-xl transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={modal.onConfirm}
                    className="flex-1 px-4 py-3 text-sm font-bold bg-red-600 text-white rounded-xl shadow-lg shadow-red-100 hover:bg-red-700 transition-all"
                  >
                    Yes, Delete
                  </button>
                </>
              ) : (
                <button 
                  onClick={() => setModal(prev => ({ ...prev, show: false }))}
                  className="w-full px-4 py-3 text-sm font-bold bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all"
                >
                  Understood
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">WALLET HISTORY</h1>
          <p className="text-slate-500 font-medium">Real-time credit and debit tracking</p>
        </div>
        <div className="flex gap-3">
          {selectedIds.length > 0 && (
            <button onClick={handleDelete} className="bg-red-50 text-red-600 p-3 rounded-2xl hover:bg-red-100 transition-all border border-red-200">
              <Trash2 size={22} />
            </button>
          )}
          <button 
            onClick={() => { setEditId(null); setIsAdding(true); }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-2 shadow-xl shadow-indigo-100 transition-transform active:scale-95"
          >
            <Plus size={22} /> Create New
          </button>
        </div>
      </div>

      {!isAdding ? (
        <div className="max-w-6xl mx-auto space-y-6">
          {/* STATS AREA */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <Receipt className="text-indigo-500 mb-3" size={24} />
              <div className="text-2xl font-black">{filteredHistory.length}</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Visible Logs</div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <TrendingUp className="text-emerald-500 mb-3" size={24} />
              <div className="text-2xl font-black text-emerald-600">
                {filteredHistory.reduce((acc, curr) => acc + (curr.type === 'Credit' ? Number(curr.point) : -Number(curr.point)), 0).toFixed(1)}
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Net Points</div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <Users className="text-purple-500 mb-3" size={24} />
              <div className="text-2xl font-black">{selectedIds.length}</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Selected</div>
            </div>
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
              <Wallet className="text-orange-500 mb-3" size={24} />
              <div className="text-2xl font-black">{data.length}</div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Database Total</div>
            </div>
          </div>

          {/* FILTER TOOLBAR */}
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-4 items-center">
            <select 
              value={userFilter} 
              onChange={(e) => setUserFilter(e.target.value)}
              className="w-full md:w-56 bg-slate-50 border border-slate-200 p-3.5 rounded-2xl text-sm font-bold outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            >
              {uniqueNames.map(name => <option key={name} value={name}>{name}</option>)}
            </select>

            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-4 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Deep search by ID, name, or points..."
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button 
              onClick={() => { setSearchTerm(""); setUserFilter("All Users"); }}
              className="text-slate-400 hover:text-indigo-600 font-bold text-sm flex items-center gap-2 px-4"
            >
              <RotateCcw size={18} /> Reset
            </button>
          </div>

          {/* DATA TABLE */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50/50 border-b border-slate-100">
                  <tr>
                    <th className="p-6 w-12 text-center">
                      <input 
                        type="checkbox" 
                        className="w-5 h-5 accent-indigo-600 cursor-pointer" 
                        checked={filteredHistory.length > 0 && selectedIds.length === filteredHistory.length}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">User Details</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">Log Info</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Points</th>
                    <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {filteredHistory.map((item) => (
                    <tr 
                      key={item.id} 
                      onClick={() => handleToggleRow(item.id)}
                      className={`group cursor-pointer transition-all ${selectedIds.includes(item.id) ? 'bg-indigo-50/50' : 'hover:bg-slate-50/80'}`}
                    >
                      <td className="p-6 text-center">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 accent-indigo-600" 
                          checked={selectedIds.includes(item.id)}
                          readOnly 
                        />
                      </td>
                      <td className="p-6">
                        <div className="font-black text-slate-800 text-base">{item.userName}</div>
                        <div className="text-[10px] font-mono text-slate-400">ID: #{item.id}</div>
                      </td>
                      <td className="p-6">
                        <div className="text-sm text-slate-600 font-medium line-clamp-1">{item.description}</div>
                        <div className="text-[10px] text-slate-400 font-bold mt-1">{item.date}</div>
                      </td>
                      <td className="p-6 text-right">
                        <div className={`text-lg font-black ${item.type === 'Credit' ? 'text-emerald-600' : 'text-rose-600'}`}>
                          {item.type === 'Credit' ? '+' : '-'}{item.point}
                        </div>
                      </td>
                      <td className="p-6 text-center">
                        <button 
                          onClick={(e) => handleStartEdit(e, item)}
                          className="bg-white p-3 text-slate-400 hover:text-indigo-600 rounded-xl shadow-sm border border-slate-100 hover:border-indigo-200 transition-all active:scale-90"
                        >
                          <Edit2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredHistory.length === 0 && (
                <div className="p-20 text-center flex flex-col items-center">
                  <Search size={48} className="text-slate-200 mb-4" />
                  <p className="text-slate-400 font-bold">No transactions found matching "{searchTerm}"</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* FORM VIEW (ADD/EDIT) */
        <div className="max-w-xl mx-auto bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-slate-900 p-8 text-white flex justify-between items-center">
            <div>
              <h2 className="text-xl font-black tracking-tight">{editId ? "Update Record" : "New Transaction"}</h2>
              <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">Wallet Ledger System</p>
            </div>
            <button onClick={() => setIsAdding(false)} className="bg-white/10 p-3 rounded-2xl hover:bg-white/20 transition-colors">
              <ChevronLeft size={24} />
            </button>
          </div>
          
          <div className="p-10 space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Account Name</label>
              <select 
                value={formData.userName}
                onChange={(e) => setFormData({...formData, userName: e.target.value})}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 transition-all"
              >
                <option value="">Select account holder...</option>
                <option>Amarjeet Singh</option>
                <option>Varinder</option>
                <option>Jagjeevan Sharma</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Points Value</label>
                <input 
                  type="number" 
                  value={formData.point}
                  onChange={(e) => setFormData({...formData, point: e.target.value})}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10"
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Log Type</label>
                <div className="flex bg-slate-100 p-1.5 rounded-[1.2rem]">
                  {["Credit", "Debit"].map(t => (
                    <button
                      key={t}
                      onClick={() => setFormData({...formData, type: t as any})}
                      className={`flex-1 py-3 rounded-[0.8rem] text-xs font-bold transition-all ${formData.type === t ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-slate-400 ml-1 tracking-widest">Transaction Notes</label>
              <textarea 
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={3}
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-medium text-slate-700 outline-none focus:ring-4 focus:ring-indigo-500/10 resize-none"
                placeholder="Describe the transaction source..."
              />
            </div>

            <button 
              onClick={handleSave}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-3xl font-black shadow-2xl shadow-indigo-200 transition-all active:scale-95 flex items-center justify-center gap-3 text-lg"
            >
              <Save size={24} /> {editId ? "CONFIRM UPDATE" : "SAVE TRANSACTION"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const initialHistoryData: Transaction[] = [
  { id: "24457", userName: "Amarjeet Singh", description: "Earned 0.5 from Junction Box 1", date: "2026-03-20 10:07", point: "0.5", type: "Credit" },
  { id: "24456", userName: "Varinder", description: "Earned 1.0 from FDB 4", date: "2026-03-20 10:07", point: "1.0", type: "Credit" },
  { id: "24452", userName: "Jagjeevan Sharma", description: "Earned 5.0 from 9x3 Draw", date: "2026-03-20 10:03", point: "5.0", type: "Credit" },
];