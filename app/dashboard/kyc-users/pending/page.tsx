/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  Search, Eye, ChevronLeft, ChevronRight, 
  Filter, Clock, Users, XCircle, 
  Image as ImageIcon, X, RotateCcw, Upload, AlertTriangle, Edit3
} from "lucide-react";

// ─── Types & Interfaces ──────────────────────────────────────────────────────

type UserType = "Retailer" | "Distributor" | "Wholesaler";

interface PendingUser {
  id: string;
  type: UserType;
  name: string;
  phone: string;
  address: string;
  aadharFront: string | null;
  aadharBack: string | null;
  pancard: string | null;
  gstNo: string;
  kycStatus: "Pending";
}

// ─── Sub-Components ──────────────────────────────────────────────────────────

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
    {children}
  </p>
);

const TypeBadge = ({ type }: { type: UserType }) => {
  const styles: Record<UserType, string> = {
    Retailer: "bg-blue-50 text-blue-700 border-blue-200",
    Distributor: "bg-purple-50 text-purple-700 border-purple-200",
    Wholesaler: "bg-teal-50 text-teal-700 border-teal-200",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${styles[type]}`}>
      {type}
    </span>
  );
};

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function PendingKYCPage() {
  // --- States ---
  const [users, setUsers] = useState<PendingUser[]>([
    {
      id: "3401",
      type: "Retailer",
      name: "Harpreet Singh",
      phone: "9876543210",
      address: "Ludhiana, Punjab",
      aadharFront: null,
      aadharBack: null,
      pancard: null,
      gstNo: "03AABCU9603R1ZV",
      kycStatus: "Pending",
    },
    {
      id: "3398",
      type: "Distributor",
      name: "Rajesh Kumar",
      phone: "8765432109",
      address: "Amritsar, Punjab",
      aadharFront: null,
      aadharBack: null,
      pancard: null,
      gstNo: "03BBBCK1234M1ZP",
      kycStatus: "Pending",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [typeFilter, setTypeFilter] = useState<string>("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);

  // States for Modals
  const [selectedImage, setSelectedImage] = useState<{url: string, title: string} | null>(null);
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [userToReject, setUserToReject] = useState<PendingUser | null>(null);
  const [editingUser, setEditingUser] = useState<PendingUser | null>(null);

  // --- Handlers ---

  const handleFileUpload = (field: keyof PendingUser, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingUser) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingUser({ ...editingUser, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const saveEdit = () => {
    if (editingUser) {
      // Basic validation check before saving
      if (editingUser.phone.length !== 10) {
        alert("Phone number must be exactly 10 digits");
        return;
      }
      setUsers(prev => prev.map(u => u.id === editingUser.id ? editingUser : u));
      setEditingUser(null);
    }
  };

  const confirmReject = () => {
    if (userToReject) {
      setUsers(prev => prev.filter(u => u.id !== userToReject.id));
      setUserToReject(null);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = users.filter((u) => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           u.phone.includes(searchTerm) || 
                           u.id.includes(searchTerm);
    const matchesType = typeFilter === "All" || u.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans relative">
      
      {/* ── Custom Rejection Confirmation Modal ── */}
      {userToReject && (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-6 text-center">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">Reject User?</h3>
              <p className="text-sm text-slate-500 mt-2">
                Are you sure you want to reject <b>{userToReject.name}</b>? This action will remove them from the pending list.
              </p>
            </div>
            <div className="flex border-t">
              <button onClick={() => setUserToReject(null)} className="flex-1 px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors border-r">Cancel</button>
              <button onClick={confirmReject} className="flex-1 px-4 py-3 text-sm font-semibold text-red-600 hover:bg-red-50 transition-colors">Yes, Reject</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit User Modal ── */}
      {editingUser && (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Edit User Details & Documents</h3>
              <button onClick={() => setEditingUser(null)} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Full Name</label>
                  <input 
                    type="text" 
                    value={editingUser.name} 
                    onChange={e => {
                      // Logic: Allow only alphabets and spaces
                      const val = e.target.value.replace(/[^a-zA-Z\s]/g, "");
                      setEditingUser({...editingUser, name: val})
                    }} 
                    className="w-full p-2 bg-slate-50 border rounded-lg text-sm" 
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Phone</label>
                  <input 
                    type="text" 
                    value={editingUser.phone} 
                    onChange={e => {
                      // Logic: Allow only numbers and max 10 digits
                      const val = e.target.value.replace(/[^\d]/g, "").slice(0, 10);
                      setEditingUser({...editingUser, phone: val})
                    }} 
                    className="w-full p-2 bg-slate-50 border rounded-lg text-sm" 
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-[11px] font-bold text-slate-400 uppercase">Address</label>
                  <input type="text" value={editingUser.address} onChange={e => setEditingUser({...editingUser, address: e.target.value})} className="w-full p-2 bg-slate-50 border rounded-lg text-sm" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                { [
                  { label: "Aadhar Front", field: "aadharFront" as const },
                  { label: "Aadhar Back", field: "aadharBack" as const },
                  { label: "PAN Card", field: "pancard" as const }
                ].map((doc) => (
                  <div key={doc.field} className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase">{doc.label}</label>
                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 flex flex-col items-center justify-center gap-2 bg-slate-50 hover:bg-slate-100 transition-colors relative group min-h-[120px]">
                      {editingUser[doc.field] ? (
                        <img src={editingUser[doc.field]!} alt="Preview" className="w-full h-20 object-cover rounded-md" />
                      ) : (
                        <ImageIcon className="text-slate-300" size={24} />
                      )}
                      <label className="cursor-pointer text-blue-600 text-[10px] font-bold hover:underline">
                        {editingUser[doc.field] ? "Replace Image" : "Upload Image"}
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(doc.field, e)} />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 border-t bg-slate-50 flex justify-end gap-3">
              <button onClick={() => setEditingUser(null)} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-200 rounded-lg transition-all">Cancel</button>
              <button onClick={saveEdit} className="px-6 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md transition-all">Save Changes</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Image Preview Modal ── */}
      {selectedImage && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl relative overflow-hidden animate-in zoom-in duration-200">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">{selectedImage.title}</h3>
              <button onClick={() => setSelectedImage(null)} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-2 flex justify-center">
              <img src={selectedImage.url} alt="Document" className="max-h-[70vh] w-auto rounded-lg object-contain" />
            </div>
          </div>
        </div>
      )}

      {/* ── User Details Modal ── */}
      {selectedUser && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden animate-in zoom-in duration-200">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-slate-800">Review KYC Profile</h3>
              <button onClick={() => setSelectedUser(null)} className="p-1 hover:bg-slate-200 rounded-full transition-colors"><X size={18} /></button>
            </div>
            <div className="p-6 space-y-4 text-sm font-sans">
              <div className="flex justify-between border-b pb-2"> <span className="text-slate-500">Full Name:</span> <span className="text-slate-800 font-semibold">{selectedUser.name}</span> </div>
              <div className="flex justify-between border-b pb-2"> <span className="text-slate-500">User ID:</span> <span className="font-bold text-blue-600">#{selectedUser.id}</span> </div>
              <div className="flex justify-between border-b pb-2"> <span className="text-slate-500">Type:</span> <TypeBadge type={selectedUser.type} /> </div>
              <div className="flex justify-between border-b pb-2"> <span className="text-slate-500">GST No:</span> <span className="font-mono text-slate-700">{selectedUser.gstNo}</span> </div>
              <div className="flex justify-between"> <span className="text-slate-500">Status:</span> <span className="text-amber-600 font-bold">{selectedUser.kycStatus}</span> </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center"> <Clock className="text-amber-500" size={20} /> </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Pending KYC Users</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage and review users with pending KYC verification</p>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10">
        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-blue-500 p-5 flex flex-col gap-3 shadow-sm transition-all hover:shadow-md cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center"> <Users size={20} className="text-blue-600" /> </div>
          <div> <p className="text-2xl font-semibold text-slate-800">{users.length}</p> <p className="text-xs text-slate-500 mt-1">Total Pending</p> </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 border-t-4 border-t-amber-500 p-5 flex flex-col gap-3 shadow-sm transition-all hover:shadow-md cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center"> <Clock size={20} className="text-amber-600" /> </div>
          <div> <p className="text-2xl font-semibold text-slate-800">{users.length}</p> <p className="text-xs text-slate-500 mt-1">Awaiting Review</p> </div>
        </div>
      </div>

      {/* ── Search + Filter ── */}
      <SectionLabel>All Pending KYC Users</SectionLabel>
      <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4 flex flex-col sm:flex-row items-center justify-between gap-3 relative">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
          <input
            type="text"
            placeholder="Search by name, phone or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
          />
        </div>
        
        <div className="relative" ref={filterRef}>
          <button onClick={() => setIsFilterOpen(!isFilterOpen)} className={`flex items-center gap-2 px-3 py-2 border rounded-lg text-sm font-medium transition-all ${isFilterOpen ? 'bg-blue-600 text-white border-blue-600' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
            <Filter size={14} /> Filters {typeFilter !== "All" && <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />}
          </button>
          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-slate-200 shadow-xl rounded-xl z-50 p-4 animate-in slide-in-from-top-2">
              <div className="flex items-center justify-between mb-3 pb-2 border-b">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Filter by Type</span>
                <button onClick={() => setTypeFilter("All")} className="text-[10px] text-blue-600 font-bold flex items-center gap-1 hover:underline"><RotateCcw size={10}/> Reset</button>
              </div>
              <select value={typeFilter} onChange={(e) => {setTypeFilter(e.target.value); setIsFilterOpen(false);}} className="w-full p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none">
                <option value="All">All Types</option>
                <option value="Retailer">Retailer</option>
                <option value="Distributor">Distributor</option>
                <option value="Wholesaler">Wholesaler</option>
              </select>
            </div>
          )}
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {[ "User ID", "Type", "User Name", "User Phone", "Address", "Adharcard Front", "Adharcard Back", "Pancard", "GST NO", "Status", "Action" ].map((h) => (
                  <th key={h} className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filtered.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-4 py-4 text-sm font-medium text-slate-500">{user.id}</td>
                  <td className="px-4 py-4"><TypeBadge type={user.type} /></td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-800">{user.name}</td>
                  <td className="px-4 py-4 text-sm font-medium text-slate-700">{user.phone}</td>
                  <td className="px-4 py-4 text-sm text-slate-500 max-w-[160px] truncate">{user.address}</td>
                  
                  {[
                    { label: "Aadhar Front", field: "aadharFront" as const },
                    { label: "Aadhar Back", field: "aadharBack" as const },
                    { label: "PAN Card", field: "pancard" as const }
                  ].map((doc) => (
                    <td key={doc.field} className="px-4 py-4">
                      {user[doc.field] ? (
                        <div className="flex flex-col items-start gap-1">
                          <div className="w-12 h-8 rounded bg-slate-100 border overflow-hidden">
                            <img src={user[doc.field]!} alt="Doc" className="w-full h-full object-cover" />
                          </div>
                          <button onClick={() => setSelectedImage({ url: user[doc.field]!, title: doc.label })} className="text-[9px] text-blue-500 font-bold hover:underline flex items-center gap-0.5">
                            <Eye size={9}/> View
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-start gap-1">
                          <div className="w-12 h-8 rounded bg-slate-50 border border-dashed flex items-center justify-center text-slate-300">
                            <ImageIcon size={12} />
                          </div>
                          <span className="text-[9px] text-slate-400">No Image</span>
                        </div>
                      )}
                    </td>
                  ))}

                  <td className="px-4 py-4 text-xs font-mono text-slate-600">{user.gstNo}</td>
                  <td className="px-4 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" /> {user.kycStatus}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1">
                      <button onClick={() => setSelectedUser(user)} className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 transition-all" title="View Details">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => setEditingUser(user)} className="w-8 h-8 flex items-center justify-center rounded-lg text-emerald-500 hover:bg-emerald-50 transition-all" title="Edit User">
                        <Edit3 size={15} />
                      </button>
                      <button onClick={() => setUserToReject(user)} className="w-8 h-8 flex items-center justify-center rounded-lg text-red-400 hover:bg-red-50 transition-all" title="Reject">
                        <XCircle size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={11} className="py-12 text-center text-slate-400 text-sm">No pending KYC users found matching your search.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-5 py-4 border-t border-slate-100 flex items-center justify-between text-xs font-medium">
          <p className="text-slate-400">Page <span className="text-slate-600 font-bold">{currentPage}</span> of 10</p>
          <div className="flex items-center gap-1.5">
            <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all"><ChevronLeft size={14} /></button>
            <button className="w-8 h-8 rounded-lg bg-blue-600 text-white shadow-sm">{currentPage}</button>
            <button onClick={() => setCurrentPage(p => Math.min(10, p + 1))} className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-50 border border-slate-200 text-slate-500 hover:bg-slate-100 transition-all"><ChevronRight size={14} /></button>
          </div>
        </div>
      </div>
    </div>
  );
}