"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Search, Plus, Package, Edit2, Trash2,
  ChevronLeft, ChevronRight, Filter, FileDown,
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

type ToggleStatus = "Enable" | "Disable";

interface Product {
  id: string;
  category: string;
  name: string;
  oriPrice: string;
  offerPrice: string;
  status: ToggleStatus;
  featured: ToggleStatus;
}

interface SectionLabelProps {
  children: React.ReactNode;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const productsData: Product[] = [
  { id: "302", category: "PVC Casing Batten",  name: "PVC Casing Batten",           oriPrice: "76",  offerPrice: "45.6",  status: "Enable",  featured: "Disable" },
  { id: "301", category: "PVC Casing Batten",  name: "PVC Casing Batten",           oriPrice: "70",  offerPrice: "42",    status: "Enable",  featured: "Disable" },
  { id: "300", category: "PVC Casing Batten",  name: "PVC Casing Batten",           oriPrice: "51",  offerPrice: "30.6",  status: "Enable",  featured: "Disable" },
  { id: "299", category: "PVC Conduit Bend",   name: "Conduit Bend Medium 2.5\"",  oriPrice: "91",  offerPrice: "54.6",  status: "Enable",  featured: "Disable" },
  { id: "298", category: "PVC Conduit Pipe",   name: "Conduit Pipe Medium 1.50\"", oriPrice: "356", offerPrice: "213.6", status: "Disable", featured: "Disable" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts]     = useState<Product[]>(productsData);

  const toggleStatus = (id: string, newStatus: ToggleStatus) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const enabledCount  = products.filter((p) => p.status === "Enable").length;
  const disabledCount = products.filter((p) => p.status === "Disable").length;

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shadow-sm">
            <Package className="text-orange-600" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Manage Products</h1>
            <p className="text-sm text-slate-500 mt-0.5">Inventory management for SRV Electricals</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 hover:shadow-sm transition-all duration-200 text-sm font-medium">
            <FileDown size={15} />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md">
            <Plus size={15} />
            Add Product
          </button>
        </div>
      </div>

      {/* ── Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-orange-500 p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-default">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center">
            <Package size={18} className="text-orange-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-800">{products.length}</p>
            <p className="text-xs text-slate-500 mt-1">Total Products</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-green-500 p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-default">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
            <Package size={18} className="text-green-600" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-800">{enabledCount}</p>
            <p className="text-xs text-slate-500 mt-1">Enabled</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-rose-400 p-5 flex flex-col gap-3 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 cursor-default">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
            <Package size={18} className="text-rose-500" />
          </div>
          <div>
            <p className="text-2xl font-semibold text-slate-800">{disabledCount}</p>
            <p className="text-xs text-slate-500 mt-1">Disabled</p>
          </div>
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <SectionLabel>All Products</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-100 transition-all">
            <Filter size={14} />
            Filter
          </button>
          <select className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer">
            <option>All Categories</option>
            <option>PVC Casing Batten</option>
            <option>PVC Conduit Bend</option>
            <option>PVC Conduit Pipe</option>
          </select>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3.5 w-10">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                </th>
                {["ID", "Product", "Category", "Status", "Price", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((prod) => (
                <tr key={prod.id} className="hover:bg-slate-50/80 transition-colors duration-150 group">

                  {/* Checkbox */}
                  <td className="px-5 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                  </td>

                  {/* ID */}
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">
                    #{prod.id}
                  </td>

                  {/* Product */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                        <Package size={16} className="text-orange-500" />
                      </div>
                      <span className="text-sm font-medium text-slate-800 whitespace-nowrap">{prod.name}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg whitespace-nowrap">
                      {prod.category}
                    </span>
                  </td>

                  {/* Status Toggle */}
                  <td className="px-5 py-4">
                    <div className="flex bg-slate-100 p-0.5 rounded-lg w-[120px] border border-slate-200">
                      <button
                        onClick={() => toggleStatus(prod.id, "Enable")}
                        className={`flex-1 py-1.5 rounded-md text-[10px] font-semibold transition-all duration-200 ${
                          prod.status === "Enable"
                            ? "bg-green-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-green-600"
                        }`}
                      >
                        Enable
                      </button>
                      <button
                        onClick={() => toggleStatus(prod.id, "Disable")}
                        className={`flex-1 py-1.5 rounded-md text-[10px] font-semibold transition-all duration-200 ${
                          prod.status === "Disable"
                            ? "bg-rose-500 text-white shadow-sm"
                            : "text-slate-400 hover:text-rose-500"
                        }`}
                      >
                        Disable
                      </button>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">₹{prod.offerPrice}</p>
                    <p className="text-xs text-slate-400 line-through mt-0.5">₹{prod.oriPrice}</p>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-amber-500 hover:bg-amber-50 transition-all duration-200" title="Edit">
                        <Edit2 size={15} />
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center rounded-lg text-rose-500 hover:bg-rose-50 transition-all duration-200" title="Delete">
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-sm text-slate-400">
                    No products found matching{" "}
                    <span className="font-semibold text-slate-600">&quot;{searchTerm}&quot;</span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
          <p className="text-xs text-slate-400 font-medium">
            Showing{" "}
            <span className="text-slate-600 font-semibold">{filtered.length}</span>{" "}
            of{" "}
            <span className="text-slate-600 font-semibold">{products.length}</span> products
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm">
              1
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}