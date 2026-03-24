"use client";

import React, { useState, ChangeEvent } from "react";
import {
  Search, Plus, Package, Edit2, Trash2,
  ChevronLeft, ChevronRight, Filter, FileDown,
  ArrowLeft, Upload, X, ImagePlus, Video, Hash,
  Tag, IndianRupee, AlignLeft, Zap, PlusCircle, Trash,
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

type ToggleStatus = "Enable" | "Disable";
type PageView = "list" | "add";

interface Product {
  id: string;
  category: string;
  name: string;
  oriPrice: string;
  offerPrice: string;
  status: ToggleStatus;
  featured: ToggleStatus;
}

interface Variation {
  no: string;
  qty: string;
  unit: string;
  point: string;
}

interface SectionLabelProps {
  children: React.ReactNode;
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const productsData: Product[] = [
  { id: "302", category: "PVC Casing Batten",  name: "PVC Casing Batten",           oriPrice: "76",  offerPrice: "45.6",  status: "Enable",  featured: "Disable" },
  { id: "301", category: "PVC Casing Batten",  name: "PVC Casing Batten",           oriPrice: "70",  offerPrice: "42",    status: "Enable",  featured: "Disable" },
  { id: "300", category: "PVC Casing Batten",  name: "PVC Casing Batten",           oriPrice: "51",  offerPrice: "30.6",  status: "Enable",  featured: "Disable" },
  { id: "299", category: "PVC Conduit Bend",   name: "Conduit Bend Medium 2.5\"",   oriPrice: "91",  offerPrice: "54.6",  status: "Enable",  featured: "Disable" },
  { id: "298", category: "PVC Conduit Pipe",   name: "Conduit Pipe Medium 1.50\"",  oriPrice: "356", offerPrice: "213.6", status: "Disable", featured: "Disable" },
];

const CATEGORIES = ["PVC Casing Batten", "PVC Conduit Bend", "PVC Conduit Pipe", "PVC Junction Box", "Switches & Sockets"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function SectionLabel({ children }: SectionLabelProps) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
}

// ─── Field Wrapper ────────────────────────────────────────────────────────────

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-3 items-start py-4 border-b border-slate-100 last:border-0">
      <label className="text-sm font-medium text-slate-600 pt-2.5">
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <div className="w-full">{children}</div>
    </div>
  );
}

// ─── Input Styles ─────────────────────────────────────────────────────────────

const inputCls = "w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
const textareaCls = inputCls + " resize-none h-24";

// ─── Add Product Form ─────────────────────────────────────────────────────────

function AddProductForm({ onBack }: { onBack: () => void }) {
  const [form, setForm] = useState({
    category: "",
    name: "",
    oriPrice: "",
    offerPrice: "",
    description: "",
    howToUse: "",
    video1: "",
    video2: "",
  });
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [variations, setVariations] = useState<Variation[]>([{ no: "", qty: "", unit: "", point: "" }]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleMainImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setMainImage(URL.createObjectURL(file));
  };

  const handleGallery = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const urls = files.map((f) => URL.createObjectURL(f));
    setGalleryImages((prev) => [...prev, ...urls]);
  };

  const removeGallery = (i: number) => setGalleryImages((prev) => prev.filter((_, idx) => idx !== i));

  const addVariation = () => setVariations((prev) => [...prev, { no: "", qty: "", unit: "", point: "" }]);
  const removeVariation = (i: number) => setVariations((prev) => prev.filter((_, idx) => idx !== i));
  const updateVariation = (i: number, key: keyof Variation, value: string) => {
    setVariations((prev) => prev.map((v, idx) => idx === i ? { ...v, [key]: value } : v));
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans">

      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-20 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-medium transition-all"
            >
              <ArrowLeft size={15} />
              Back
            </button>
            <div className="w-px h-5 bg-slate-200" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <Package size={16} className="text-blue-600" />
              </div>
              <div>
                <h1 className="text-base font-semibold text-slate-800 leading-none">Add Product</h1>
                <p className="text-xs text-slate-400 mt-0.5">SRV Electricals</p>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={onBack}
              className="px-4 py-2 bg-rose-50 border border-rose-200 text-rose-600 rounded-xl text-sm font-medium hover:bg-rose-100 transition-all"
            >
              Cancel
            </button>
            <button className="px-5 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
              Save Product
            </button>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">

        {/* Basic Info */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Tag size={16} className="text-blue-500" />
            <h2 className="text-sm font-semibold text-slate-700">Basic Information</h2>
          </div>
          <div className="px-6">
            <FormField label="Category Name" required>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className={inputCls + " cursor-pointer"}
              >
                <option value="">-- Select Category --</option>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </FormField>

            <FormField label="Product Name" required>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className={inputCls}
              />
            </FormField>
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <ImagePlus size={16} className="text-orange-500" />
            <h2 className="text-sm font-semibold text-slate-700">Product Images</h2>
          </div>
          <div className="px-6">
            <FormField label="Main Image" required>
              <div className="flex items-start gap-4">
                <label className="flex flex-col items-center justify-center w-32 h-32 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all group">
                  {mainImage ? (
                    <img src={mainImage} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <>
                      <Upload size={20} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                      <span className="text-[11px] text-slate-400 mt-1 group-hover:text-blue-500 transition-colors">Choose File</span>
                    </>
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={handleMainImage} />
                </label>
                <p className="text-xs text-rose-500 mt-2">Recommended: 300×300, 400×400 or Square Image</p>
              </div>
            </FormField>

            <FormField label="Gallery Images">
              <div className="flex flex-wrap gap-3">
                {galleryImages.map((src, i) => (
                  <div key={i} className="relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200 group">
                    <img src={src} className="w-full h-full object-cover" />
                    <button
                      onClick={() => removeGallery(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-rose-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={11} />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center w-24 h-24 rounded-xl border-2 border-dashed border-slate-300 hover:border-blue-400 bg-slate-50 hover:bg-blue-50 cursor-pointer transition-all group">
                  <Plus size={18} className="text-slate-400 group-hover:text-blue-500 transition-colors" />
                  <span className="text-[11px] text-slate-400 mt-1 group-hover:text-blue-500 transition-colors">Add More</span>
                  <input type="file" accept="image/*" multiple className="hidden" onChange={handleGallery} />
                </label>
              </div>
              <p className="text-xs text-rose-500 mt-2">Recommended: 300×300, 400×400 or Square Image</p>
            </FormField>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <IndianRupee size={16} className="text-green-500" />
            <h2 className="text-sm font-semibold text-slate-700">Pricing</h2>
          </div>
          <div className="px-6">
            <FormField label="Original Price" required>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                <input
                  type="number"
                  name="oriPrice"
                  value={form.oriPrice}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={inputCls + " pl-8"}
                />
              </div>
            </FormField>
            <FormField label="Offer Price">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">₹</span>
                <input
                  type="number"
                  name="offerPrice"
                  value={form.offerPrice}
                  onChange={handleChange}
                  placeholder="0.00"
                  className={inputCls + " pl-8"}
                />
              </div>
              {form.oriPrice && form.offerPrice && Number(form.offerPrice) < Number(form.oriPrice) && (
                <p className="text-xs text-green-600 mt-1.5 font-medium">
                  Discount: {Math.round((1 - Number(form.offerPrice) / Number(form.oriPrice)) * 100)}% off
                </p>
              )}
            </FormField>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <AlignLeft size={16} className="text-purple-500" />
            <h2 className="text-sm font-semibold text-slate-700">Description</h2>
          </div>
          <div className="px-6">
            <FormField label="Description">
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter product description..."
                className={textareaCls}
              />
            </FormField>
            <FormField label="How to Use">
              <textarea
                name="howToUse"
                value={form.howToUse}
                onChange={handleChange}
                placeholder="Instructions for using this product..."
                className={textareaCls}
              />
            </FormField>
          </div>
        </div>

        {/* Videos */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-2">
            <Video size={16} className="text-sky-500" />
            <h2 className="text-sm font-semibold text-slate-700">Videos</h2>
          </div>
          <div className="px-6">
            <FormField label="Video 1">
              <input
                type="url"
                name="video1"
                value={form.video1}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className={inputCls}
              />
            </FormField>
            <FormField label="Video 2">
              <input
                type="url"
                name="video2"
                value={form.video2}
                onChange={handleChange}
                placeholder="https://youtube.com/..."
                className={inputCls}
              />
            </FormField>
          </div>
        </div>

        {/* Variations */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap size={16} className="text-amber-500" />
              <h2 className="text-sm font-semibold text-slate-700">Variations</h2>
            </div>
            <button
              onClick={addVariation}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-semibold transition-all"
            >
              <PlusCircle size={13} />
              Add Row
            </button>
          </div>
          <div className="p-6">
            <div className="rounded-xl border border-slate-200 overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    {["No", "Qty", "Unit", "Point", ""].map((h) => (
                      <th key={h} className="px-4 py-3 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        {h}{h && h !== "" && <span className="text-rose-500 ml-0.5">*</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {variations.map((v, i) => (
                    <tr key={i} className="group">
                      {(["no", "qty", "unit", "point"] as (keyof Variation)[]).map((key) => (
                        <td key={key} className="px-3 py-2">
                          <input
                            type="text"
                            value={v[key]}
                            onChange={(e) => updateVariation(i, key, e.target.value)}
                            placeholder={key === "no" ? `${i + 1}` : key.charAt(0).toUpperCase() + key.slice(1)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </td>
                      ))}
                      <td className="px-3 py-2">
                        <button
                          onClick={() => removeVariation(i)}
                          disabled={variations.length === 1}
                          className="w-8 h-8 flex items-center justify-center rounded-lg text-rose-400 hover:bg-rose-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          <Trash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-3 pb-8">
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-50 transition-all"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProductListPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [products, setProducts]     = useState<Product[]>(productsData);
  const [page, setPage]             = useState<PageView>("list");

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

  if (page === "add") {
    return <AddProductForm onBack={() => setPage("list")} />;
  }

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
          <button
            onClick={() => setPage("add")}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 text-sm font-medium shadow-sm hover:shadow-md"
          >
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
                  <td className="px-5 py-4">
                    <input type="checkbox" className="w-4 h-4 rounded border-slate-300 accent-blue-600 cursor-pointer" />
                  </td>
                  <td className="px-5 py-4 text-xs font-medium text-slate-400">#{prod.id}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0 group-hover:bg-orange-100 transition-colors">
                        <Package size={16} className="text-orange-500" />
                      </div>
                      <span className="text-sm font-medium text-slate-800 whitespace-nowrap">{prod.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg whitespace-nowrap">
                      {prod.category}
                    </span>
                  </td>
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
                  <td className="px-5 py-4">
                    <p className="text-sm font-semibold text-slate-800">₹{prod.offerPrice}</p>
                    <p className="text-xs text-slate-400 line-through mt-0.5">₹{prod.oriPrice}</p>
                  </td>
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
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
          <p className="text-xs text-slate-400 font-medium">
            Showing <span className="text-slate-600 font-semibold">{filtered.length}</span> of{" "}
            <span className="text-slate-600 font-semibold">{products.length}</span> products
          </p>
          <div className="flex items-center gap-1.5">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronLeft size={14} />
            </button>
            <button className="w-8 h-8 rounded-lg text-xs font-semibold bg-blue-600 text-white shadow-sm">1</button>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}