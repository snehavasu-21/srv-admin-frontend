"use client";

import React, { useState, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { 
  Search, ChevronDown, ChevronLeft, ChevronRight,
  Trash2, Edit2, Plus, Target, X, Save,
  Shield, TrendingUp, AlertCircle, FileSpreadsheet, CheckCircle2
} from "lucide-react";

interface PlanRange {
  id: string;
  name: string;
  minPoint: string;
  maxPoint: string;
  status: "Enable" | "Disable";
}

export default function PlanRangePage() {
  const [plans, setPlans] = useState<PlanRange[]>([
    { id: "4", name: "Platinum", minPoint: "701", maxPoint: "1000", status: "Enable" },
    { id: "3", name: "Gold", minPoint: "501", maxPoint: "700", status: "Enable" },
    { id: "2", name: "Silver", minPoint: "201", maxPoint: "500", status: "Enable" },
    { id: "1", name: "Bronze", minPoint: "0", maxPoint: "200", status: "Enable" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [isActionOpen, setIsActionOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState({ msg: "", visible: false });

  const [formData, setFormData] = useState({
    name: "", minPoint: "", maxPoint: "", status: "Enable" as "Enable" | "Disable"
  });

  const showToast = (msg: string) => {
    setToast({ msg, visible: true });
    setTimeout(() => setToast({ msg: "", visible: false }), 3000);
  };

  const filteredPlans = useMemo(() => {
    return plans.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [plans, searchTerm]);

  // Handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedIds(e.target.checked ? filteredPlans.map(p => p.id) : []);
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleBulkAction = (action: "Enable" | "Disable" | "Delete") => {
    if (selectedIds.length === 0) return;
    if (action === "Delete") {
      setPlans(prev => prev.filter(p => !selectedIds.includes(p.id)));
      showToast(`${selectedIds.length} tiers removed`);
    } else {
      setPlans(prev => prev.map(p => selectedIds.includes(p.id) ? { ...p, status: action } : p));
      showToast("Status updated");
    }
    setSelectedIds([]);
    setIsActionOpen(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setPlans(prev => prev.map(p => p.id === editingId ? { ...p, ...formData } : p));
      showToast("Tier updated");
    } else {
      const newPlan = { id: Date.now().toString(), ...formData };
      setPlans([newPlan, ...plans]);
      showToast("New tier added");
    }
    setIsPanelOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900 relative">
      
      {toast.visible && (
        <div className="fixed bottom-10 right-10 z-[120] flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-5">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">{toast.msg}</span>
        </div>
      )}

      {/* --- CENTERED MODAL --- */}
      {isPanelOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-6 border-b flex justify-between items-center bg-slate-50">
              <div>
                <h3 className="text-lg font-bold text-slate-800">{editingId ? 'Edit' : 'Create'} Plan Tier</h3>
                <p className="text-xs text-slate-500">Define point ranges for loyalty levels</p>
              </div>
              <button onClick={() => setIsPanelOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer"><X size={20}/></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-5">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Plan Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="e.g. Diamond" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Min Points</label>
                  <input type="number" required value={formData.minPoint} onChange={e => setFormData({...formData, minPoint: e.target.value})} className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="0" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Max Points</label>
                  <input type="number" required value={formData.maxPoint} onChange={e => setFormData({...formData, maxPoint: e.target.value})} className="w-full mt-1.5 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none" placeholder="1000" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status</label>
                <div className="flex gap-3 mt-1.5">
                  {(["Enable", "Disable"] as const).map((s) => (
                    <button key={s} type="button" onClick={() => setFormData({...formData, status: s})} className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${formData.status === s ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-slate-200 text-slate-500'}`}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsPanelOpen(false)} className="flex-1 py-3 text-slate-600 font-bold text-sm cursor-pointer">Cancel</button>
                <button type="submit" className="flex-[2] py-3 bg-blue-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg cursor-pointer"><Save size={18}/> Save Tier</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* HEADER SECTION */}
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Manage Plan Range</h1>
          <p className="text-sm text-slate-500 mt-0.5">SRV Electricals | Loyalty Tier Configuration</p>
        </div>
        <button onClick={() => { setEditingId(null); setFormData({name:"", minPoint:"", maxPoint:"", status:"Enable"}); setIsPanelOpen(true); }} className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-md cursor-pointer">
          <Plus size={16} /> Add Plan Range
        </button>
      </div>

      {/* SEARCH & ACTION BAR */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col md:flex-row justify-between items-center gap-4 shadow-sm">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by plan name..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none" />
        </div>

        <div className="relative">
          <button onClick={() => setIsActionOpen(!isActionOpen)} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all cursor-pointer">
            Action ({selectedIds.length}) <ChevronDown size={14} className={isActionOpen ? 'rotate-180' : ''} />
          </button>
          {isActionOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 z-50 py-2">
              <button onClick={() => handleBulkAction("Enable")} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-emerald-600 hover:bg-slate-50 cursor-pointer transition-colors"><CheckCircle2 size={14} /> Enable Selected</button>
              <button onClick={() => handleBulkAction("Disable")} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-slate-400 hover:bg-slate-50 cursor-pointer transition-colors"><X size={14} /> Disable Selected</button>
              <button onClick={() => handleBulkAction("Delete")} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-slate-50 cursor-pointer transition-colors"><Trash2 size={14} /> Delete Selected</button>
            </div>
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-5 py-4 w-12 text-center">
                  <input type="checkbox" onChange={handleSelectAll} checked={selectedIds.length === filteredPlans.length && filteredPlans.length > 0} className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                </th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Id</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Plan Name</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Min Point</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Max Point</th>
                <th className="px-5 py-4 text-[11px] font-semibold uppercase tracking-wider text-slate-500 text-center">Status</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredPlans.map((plan) => (
                <tr key={plan.id} className="group hover:bg-slate-50/80 transition-all duration-200">
                  <td className="px-5 py-4 text-center">
                    <input type="checkbox" checked={selectedIds.includes(plan.id)} onChange={() => handleSelectOne(plan.id)} className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">#{plan.id}</td>
                  <td className="px-5 py-4 flex items-center gap-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600"><Shield size={14} /></div>
                    <span className="font-semibold text-sm text-slate-800">{plan.name}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-600"><Target size={12} className="text-blue-500" /> {plan.minPoint}</div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50/50 border border-blue-100 rounded-lg text-xs font-bold text-blue-700"><TrendingUp size={12} className="text-emerald-500" /> {plan.maxPoint}</div>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <button onClick={() => { setPlans(prev => prev.map(p => p.id === plan.id ? {...p, status: p.status === 'Enable' ? 'Disable' : 'Enable'} : p)); showToast("Status changed"); }} className={`inline-flex px-3 py-1 text-[10px] font-bold uppercase border rounded-lg cursor-pointer ${plan.status === 'Enable' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>{plan.status}</button>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {confirmDeleteId === plan.id ? (
                        <div className="flex items-center bg-rose-50 border border-rose-100 rounded-lg overflow-hidden">
                           <button onClick={() => { setPlans(prev => prev.filter(p => p.id !== plan.id)); setConfirmDeleteId(null); showToast("Deleted"); }} className="px-2 py-1 text-[10px] font-bold text-rose-600 hover:bg-rose-100 cursor-pointer">Yes</button>
                           <button onClick={() => setConfirmDeleteId(null)} className="px-2 py-1 text-[10px] font-bold text-slate-400 cursor-pointer">No</button>
                        </div>
                      ) : (
                        <>
                          <button onClick={() => { setEditingId(plan.id); setFormData({name:plan.name, minPoint:plan.minPoint, maxPoint:plan.maxPoint, status:plan.status}); setIsPanelOpen(true); }} className="p-2 text-slate-400 hover:text-blue-600 cursor-pointer"><Edit2 size={14} /></button>
                          <button onClick={() => setConfirmDeleteId(plan.id)} className="p-2 text-slate-400 hover:text-rose-600 cursor-pointer"><Trash2 size={14} /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center bg-white text-xs font-medium text-slate-400">
           <div className="flex items-center gap-2"><AlertCircle size={14} /> {filteredPlans.length} Tiers</div>
           <div className="flex items-center gap-1.5">
             <button className="p-1 cursor-pointer hover:bg-slate-50 rounded"><ChevronLeft size={14}/></button>
             <button className="w-6 h-6 rounded bg-blue-600 text-white">1</button>
             <button className="p-1 cursor-pointer hover:bg-slate-50 rounded"><ChevronRight size={14}/></button>
           </div>
        </div>
      </div>
      {isActionOpen && <div className="fixed inset-0 z-40" onClick={() => setIsActionOpen(false)}></div>}
    </div>
  );
}