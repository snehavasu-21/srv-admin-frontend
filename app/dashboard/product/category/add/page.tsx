/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState } from "react";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddCategoryPage() {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState("");
  const [colorCode, setColorCode] = useState("#000000");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Category saved successfully!");
    // ✅ FIXED: Path changed from products to product
    router.push("/dashboard/product/category");
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans">
      
      {/* Header */}
      <div className="max-w-4xl mx-auto flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-slate-800">Add Category</h1>
        {/* ✅ FIXED: Path changed from products to product */}
        <Link 
          href="/dashboard/product/category" 
          className="flex items-center gap-2 bg-[#2563eb] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-md transition-all"
        >
          <ArrowLeft size={16} /> Back
        </Link>
      </div>

      {/* Form Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 md:p-12 space-y-10">
          
          {/* Category Name */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <label className="w-48 text-sm font-bold text-slate-600 uppercase tracking-wide">Category Name :-</label>
            <input 
              type="text" 
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 transition-all text-sm"
              placeholder="Enter category name"
              required 
            />
          </div>

          {/* Color Picker */}
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <label className="w-48 text-sm font-bold text-slate-600 uppercase tracking-wide">Color Code :-</label>
            <div className="flex items-center gap-4">
              <input 
                type="color" 
                value={colorCode}
                onChange={(e) => setColorCode(e.target.value)}
                className="w-14 h-14 p-1 bg-white border border-slate-200 rounded-xl cursor-pointer shadow-sm"
              />
              <span className="text-sm font-mono font-bold text-slate-500 bg-slate-100 px-4 py-2 rounded-lg uppercase tracking-wider">{colorCode}</span>
            </div>
          </div>

          {/* Image Upload */}
          <div className="flex flex-col md:flex-row gap-6">
            <label className="w-48 text-sm font-bold text-slate-600 uppercase tracking-wide pt-2">
              Select Image :-
              <p className="text-[10px] text-rose-500 font-medium normal-case mt-2 leading-relaxed">
                (Recommended resolution: 300x300, 400x400 or Square Image)
              </p>
            </label>
            
            <div className="flex-1 space-y-4">
              <div className="relative group max-w-sm">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer border border-slate-200 rounded-xl p-1 bg-slate-50 shadow-sm"
                />
              </div>

              {/* Preview Box */}
              <div className="w-40 h-40 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center bg-slate-50 overflow-hidden shadow-inner group">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                ) : (
                  <div className="flex flex-col items-center text-slate-300">
                    <LayoutGrid size={32} />
                    <span className="text-[10px] mt-2 font-bold uppercase tracking-widest">category image</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 pt-10 border-t border-slate-100 md:ml-52">
            <button 
              type="submit" 
              className="bg-[#2563eb] text-white px-10 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all active:scale-95 text-sm"
            >
              Save
            </button>
            <button 
              type="button"
              // ✅ FIXED: Path changed from products to product
              onClick={() => router.push("/dashboard/product/category")}
              className="bg-rose-500 text-white px-10 py-3 rounded-xl font-bold hover:bg-rose-600 shadow-lg shadow-rose-100 transition-all active:scale-95 text-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}