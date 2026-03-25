/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { 
  Search, Plus, FileDown, Edit2, Trash2, 
  Filter, LayoutGrid 
} from "lucide-react";
import Link from "next/link";

const MOCK_CATEGORIES = [
  { id: "37", name: "PVC Casing Batten", colorCode: "#000000", image: null, status: "Enable" },
  { id: "36", name: "PVC Conduit Bend", colorCode: "#000000", image: null, status: "Enable" },
  { id: "35", name: "PVC Conduit Pipe", colorCode: "#000000", image: null, status: "Enable" },
  { id: "34", name: "Kitkat Fuses", colorCode: "#000000", image: null, status: "Enable" },
  { id: "33", name: "Surface Type PVC MCB", colorCode: "#000000", image: null, status: "Enable" },
  { id: "32", name: "Fan Rods", colorCode: "#000000", image: null, status: "Enable" },
];

export default function CategoryPage() {
  const [data, setData] = useState(MOCK_CATEGORIES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 1. Single Delete Function
  const handleDelete = (id: string) => {
    if (confirm("Kya aap is category ko delete karna chahte hain?")) {
      setData(prev => prev.filter(item => item.id !== id));
      setSelectedIds(prev => prev.filter(i => i !== id));
    }
  };

  // 2. Bulk Action Function (Always Enabled)
  const handleBulkAction = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const action = e.target.value;
    if (action === "delete") {
      if (selectedIds.length === 0) {
        alert("Pehle kuch items select toh karo bhai!");
        e.target.value = ""; 
        return;
      }
      if (confirm(`${selectedIds.length} items delete karein?`)) {
        setData(prev => prev.filter(item => !selectedIds.includes(item.id)));
        setSelectedIds([]);
      }
    }
    e.target.value = ""; // Reset dropdown after action
  };

  // 3. Checkbox Logic
  const toggleSelectAll = () => {
    if (selectedIds.length === data.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(data.map(item => item.id));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8 font-sans">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 border border-purple-200 shadow-sm">
            <LayoutGrid size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Manage Categories</h1>
            <p className="text-sm text-slate-500">SRV Electricals Product Lines</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 shadow-sm">
            <FileDown size={16} /> Export
          </button>
          <Link 
            href="/dashboard/product/category/add" 
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-md hover:bg-blue-700"
          >
            <Plus size={16} /> Add Category
          </Link>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input 
              type="text" 
              placeholder="Search category..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          
          <div className="flex items-center gap-2">
             <button className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 bg-white"><Filter size={16} /></button>
             
             {/* ✅ Bulk Action Menu - Always Enabled */}
             <select 
               onChange={handleBulkAction}
               className="px-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-600 outline-none cursor-pointer bg-white font-medium"
             >
                <option value="">Bulk Action</option>
                <option value="delete">Delete Selected</option>
             </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-slate-50 text-slate-400 font-bold uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-6 py-4 w-10 text-center">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                    checked={selectedIds.length === data.length && data.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Category Name</th>
                <th className="px-6 py-4">Color</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.filter(i => i.name.toLowerCase().includes(searchTerm.toLowerCase())).map((cat) => (
                <tr key={cat.id} className={`hover:bg-slate-50/50 transition-colors ${selectedIds.includes(cat.id) ? 'bg-blue-50/50' : ''}`}>
                  <td className="px-6 py-4 text-center">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded accent-blue-600 cursor-pointer"
                      checked={selectedIds.includes(cat.id)}
                      onChange={() => toggleSelectOne(cat.id)}
                    />
                  </td>
                  <td className="px-6 py-4 text-slate-400">#{cat.id}</td>
                  <td className="px-6 py-4 font-semibold text-slate-700">{cat.name}</td>
                  <td className="px-6 py-4">
                    <div className="w-5 h-5 rounded-full border border-slate-200" style={{ backgroundColor: cat.colorCode }}></div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold border bg-green-50 text-green-600 border-green-200 uppercase">
                      {cat.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      {/* EDIT: Goes to Add page with query params */}
                      <Link 
                        href={`/dashboard/product/category/add?id=${cat.id}&name=${encodeURIComponent(cat.name)}&color=${encodeURIComponent(cat.colorCode)}`}
                        className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg"
                      >
                        <Edit2 size={16}/>
                      </Link>
                      {/* DELETE */}
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg"
                      >
                        <Trash2 size={16}/>
                      </button>
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