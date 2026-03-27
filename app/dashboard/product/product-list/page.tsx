/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useRef, useMemo } from "react";
import {
  Search, Plus, Package, Edit2, Trash2,
  ChevronLeft, ChevronRight, X, Save,
  AlertCircle, CheckCircle2, FileDown,
  Image as ImageIcon, MoreVertical
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

type ToggleStatus = "Enable" | "Disable";

interface Product {
  id: string;
  category: string;
  name: string;
  productImage: string; 
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
  { id: "302", category: "PVC Casing Batten", name: "PVC Casing Batten", productImage: "", oriPrice: "76", offerPrice: "45.6", status: "Enable", featured: "Disable" },
  { id: "301", category: "PVC Casing Batten", name: "PVC Casing Batten", productImage: "", oriPrice: "70", offerPrice: "42", status: "Enable", featured: "Disable" },
  { id: "300", category: "PVC Casing Batten", name: "PVC Casing Batten", productImage: "", oriPrice: "51", offerPrice: "30.6", status: "Enable", featured: "Disable" },
  { id: "299", category: "PVC Conduit Bend",  name: "Conduit Bend Medium 2.5\"", productImage: "", oriPrice: "91", offerPrice: "54.6", status: "Enable", featured: "Disable" },
  { id: "298", category: "PVC Conduit Pipe",  name: "Conduit Pipe Medium 1.50\"", productImage: "", oriPrice: "356", offerPrice: "213.6", status: "Disable", featured: "Disable" },
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
  const [products, setProducts] = useState<Product[]>(productsData);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All Categories");
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Selection State
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // UI States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isBulkDelete, setIsBulkDelete] = useState(false);
  const [toast, setToast] = useState({ message: "", visible: false });

  // Refs for Image Uploads
  const modalFileInputRef = useRef<HTMLInputElement>(null);
  const tableFileInputRef = useRef<HTMLInputElement>(null);
  const [activeTableId, setActiveTableId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    category: "PVC Casing Batten",
    productImage: "",
    oriPrice: "",
    offerPrice: "",
    status: "Enable" as ToggleStatus
  });

  // --- LOGIC ---

  const showToast = (msg: string) => {
    setToast({ message: msg, visible: true });
    setTimeout(() => setToast({ message: "", visible: false }), 3000);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.id.includes(searchTerm);
      const matchesCategory = categoryFilter === "All Categories" || p.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, categoryFilter]);

  // --- SELECTION LOGIC ---
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredProducts.map(p => p.id));
    }
  };

  const toggleSelectRow = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkAction = (action: string) => {
    if (selectedIds.length === 0) {
      showToast("Please select items first");
      return;
    }

    if (action === "Delete") {
      setIsBulkDelete(true);
      setIsDeleteModalOpen(true);
      return;
    }

    if (action === "Enable" || action === "Disable") {
      setProducts(prev => prev.map(p => 
        selectedIds.includes(p.id) ? { ...p, status: action as ToggleStatus } : p
      ));
      showToast(`Updated ${selectedIds.length} products to ${action}`);
      setSelectedIds([]);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, isTable: boolean = false) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      if (isTable && activeTableId) {
        setProducts(prev => prev.map(p => p.id === activeTableId ? { ...p, productImage: imageUrl } : p));
        showToast("Image updated");
      } else {
        setFormData(prev => ({ ...prev, productImage: imageUrl }));
      }
      e.target.value = ""; 
    }
  };

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({ name: "", category: "PVC Casing Batten", productImage: "", oriPrice: "", offerPrice: "", status: "Enable" });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category,
      productImage: prod.productImage,
      oriPrice: prod.oriPrice,
      offerPrice: prod.offerPrice,
      status: prod.status
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...formData } : p));
      showToast("Product updated successfully");
    } else {
      const newId = (Math.max(...products.map(p => parseInt(p.id)), 0) + 1).toString();
      setProducts([{ id: newId, featured: "Disable", ...formData }, ...products]);
      showToast("Product added to list");
    }
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    if (isBulkDelete) {
      setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)));
      showToast(`Removed ${selectedIds.length} products`);
      setSelectedIds([]);
      setIsBulkDelete(false);
    } else if (productToDelete) {
      setProducts(prev => prev.filter(p => p.id !== productToDelete));
      showToast("Product removed");
    }
    setIsDeleteModalOpen(false);
    setProductToDelete(null);
  };

  const toggleStatus = (id: string, newStatus: ToggleStatus) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    showToast(`Status: ${newStatus}`);
  };

  const handleExportCSV = () => {
    const headers = ["ID", "Category", "Name", "Original Price", "Offer Price", "Status"];
    const csvRows = filteredProducts.map(p => [
      p.id,
      p.category,
      `"${p.name}"`, 
      p.oriPrice,
      p.offerPrice,
      p.status
    ].join(","));

    const csvContent = [headers.join(","), ...csvRows].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "srv_electricals_inventory.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("CSV Exported successfully");
  };

  const enabledCount = products.filter(p => p.status === "Enable").length;
  const disabledCount = products.filter(p => p.status === "Disable").length;

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans relative">
      
      <input type="file" ref={modalFileInputRef} onChange={(e) => handleImageUpload(e)} accept="image/*" className="hidden" />
      <input type="file" ref={tableFileInputRef} onChange={(e) => handleImageUpload(e, true)} accept="image/*" className="hidden" />

      {toast.visible && (
        <div className="fixed bottom-10 right-10 z-[110] flex items-center gap-3 px-6 py-3 bg-slate-900 text-white rounded-2xl shadow-2xl transition-all animate-bounce">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-3xl p-8 shadow-2xl text-center">
            <AlertCircle size={48} className="text-rose-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-slate-800">Are you sure?</h3>
            <p className="text-sm text-slate-500 mt-2">
              {isBulkDelete ? `Selected ${selectedIds.length} products` : "This product"} will be permanently deleted.
            </p>
            <div className="flex gap-3 mt-8">
              <button onClick={() => { setIsDeleteModalOpen(false); setIsBulkDelete(false); }} className="flex-1 px-4 py-2 bg-slate-100 rounded-xl font-bold">Cancel</button>
              <button onClick={handleDelete} className="flex-1 px-4 py-2 bg-rose-600 text-white rounded-xl font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <form onSubmit={handleSaveProduct} className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b flex justify-between items-center">
              <h3 className="font-bold text-slate-800">{editingProduct ? 'Edit' : 'Add'} Product</h3>
              <X className="cursor-pointer text-slate-400" onClick={() => setIsModalOpen(false)} />
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Product Image</label>
                <div 
                  onClick={() => modalFileInputRef.current?.click()}
                  className="mt-1 w-full h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 transition-all overflow-hidden"
                >
                  {formData.productImage ? (
                    <img src={formData.productImage} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <ImageIcon size={20} className="text-slate-300 mb-1" />
                      <p className="text-[10px] font-bold text-slate-400">Click to upload</p>
                    </>
                  )}
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Name</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full mt-1 px-4 py-2 bg-slate-50 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Price (₹)</label>
                  <input required type="number" value={formData.oriPrice} onChange={e => setFormData({...formData, oriPrice: e.target.value})} className="w-full mt-1 px-4 py-2 bg-slate-50 border rounded-xl" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-400 uppercase">Offer (₹)</label>
                  <input required type="number" value={formData.offerPrice} onChange={e => setFormData({...formData, offerPrice: e.target.value})} className="w-full mt-1 px-4 py-2 bg-slate-50 border rounded-xl" />
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase">Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full mt-1 px-4 py-2 bg-slate-50 border rounded-xl">
                  <option>PVC Casing Batten</option>
                  <option>PVC Conduit Bend</option>
                  <option>PVC Conduit Pipe</option>
                </select>
              </div>
            </div>
            <div className="p-6 bg-slate-50 flex justify-end gap-3">
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-slate-500 text-sm font-bold">Cancel</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold flex items-center gap-2"><Save size={16}/> Save</button>
            </div>
          </form>
        </div>
      )}

      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shadow-sm">
            <Package className="text-orange-600" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Manage Products</h1>
            <p className="text-sm text-slate-500">Inventory management for SRV Electricals</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExportCSV} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
            <FileDown size={15} /> Export
          </button>
          <button onClick={handleOpenAdd} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm">
            <Plus size={15} /> Add Product
          </button>
        </div>
      </div>

      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Total Products", count: products.length, color: "border-t-orange-500", bg: "bg-orange-100", text: "text-orange-600" },
          { label: "Enabled", count: enabledCount, color: "border-t-green-500", bg: "bg-green-100", text: "text-green-600" },
          { label: "Disabled", count: disabledCount, color: "border-t-rose-400", bg: "bg-rose-100", text: "text-rose-500" }
        ].map((stat, i) => (
          <div key={i} className={`bg-white rounded-xl border border-slate-200 border-t-4 ${stat.color} p-5 flex flex-col gap-3 shadow-sm`}>
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center`}>
              <Package size={18} className={stat.text} />
            </div>
            <div>
              <p className="text-2xl font-semibold text-slate-800">{stat.count}</p>
              <p className="text-xs text-slate-500 mt-1">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      <SectionLabel>All Products</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/10 outline-none"
            />
          </div>
          {/* ── BULK ACTION DROPDOWN ── */}
          <div className="flex items-center gap-2">
            <select 
              className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer"
              value=""
              onChange={(e) => handleBulkAction(e.target.value)}
            >
              <option value="" disabled>Bulk Action ({selectedIds.length})</option>
              <option value="Enable">Set Enabled</option>
              <option value="Disable">Set Disabled</option>
              <option value="Delete">Delete Selected</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 text-slate-600 rounded-lg text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option>All Categories</option>
            <option>PVC Casing Batten</option>
            <option>PVC Conduit Bend</option>
            <option>PVC Conduit Pipe</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3.5 w-10">
                  <input 
                    type="checkbox" 
                    className="w-4 h-4 rounded cursor-pointer" 
                    checked={selectedIds.length === filteredProducts.length && filteredProducts.length > 0}
                    onChange={toggleSelectAll}
                  />
                </th>
                {["ID", "Product", "Category", "Status", "Price", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((prod) => (
                <tr key={prod.id} className={`hover:bg-slate-50/80 transition-colors group ${selectedIds.includes(prod.id) ? 'bg-blue-50/40' : ''}`}>
                  <td className="px-5 py-4">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded cursor-pointer" 
                      checked={selectedIds.includes(prod.id)}
                      onChange={() => toggleSelectRow(prod.id)}
                    />
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">#{prod.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <div className="w-10 h-10 rounded-lg bg-orange-50 border border-slate-100 flex items-center justify-center overflow-hidden">
                          {prod.productImage ? (
                            <img src={prod.productImage} className="w-full h-full object-cover" alt="" />
                          ) : (
                            <Package size={16} className="text-orange-500" />
                          )}
                        </div>
                        <button 
                          onClick={() => { setActiveTableId(prod.id); tableFileInputRef.current?.click(); }}
                          className="text-[8px] font-bold text-blue-600 uppercase hover:underline"
                        >
                          Change
                        </button>
                      </div>
                      <span className="text-sm font-medium text-slate-800">{prod.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">{prod.category}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex bg-slate-100 p-0.5 rounded-lg w-[120px] border">
                      <button onClick={() => toggleStatus(prod.id, "Enable")} className={`flex-1 py-1 rounded-md text-[10px] font-bold transition-all ${prod.status === "Enable" ? "bg-green-500 text-white shadow-sm" : "text-slate-400"}`}>Enable</button>
                      <button onClick={() => toggleStatus(prod.id, "Disable")} className={`flex-1 py-1 rounded-md text-[10px] font-bold transition-all ${prod.status === "Disable" ? "bg-rose-500 text-white shadow-sm" : "text-slate-400"}`}>Disable</button>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">₹{prod.offerPrice}</p>
                    <p className="text-xs text-slate-400 line-through">₹{prod.oriPrice}</p>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleOpenEdit(prod)} className="w-8 h-8 flex items-center justify-center text-amber-500 hover:bg-amber-50 rounded-lg"><Edit2 size={15} /></button>
                      <button onClick={() => { setProductToDelete(prod.id); setIsBulkDelete(false); setIsDeleteModalOpen(true); }} className="w-8 h-8 flex items-center justify-center text-rose-500 hover:bg-rose-50 rounded-lg"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-600 font-semibold">{filteredProducts.length}</span> of <span className="text-slate-600 font-semibold">{products.length}</span>
          </p>
          <div className="flex items-center gap-1.5">
            <button disabled={currentPage === 1} className="w-8 h-8 flex items-center justify-center rounded-lg border opacity-30 cursor-not-allowed">
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg text-xs font-bold bg-blue-600 text-white">1</button>
            <button disabled className="w-8 h-8 flex items-center justify-center rounded-lg border opacity-30 cursor-not-allowed">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}