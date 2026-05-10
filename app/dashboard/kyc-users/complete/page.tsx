/* eslint-disable react/no-unescaped-entities */
"use client";

import React, { useState, ChangeEvent, useMemo } from "react";
import { 
  Search, Eye, UserCheck, Users, X, Plus, Save, Trash2, ImageIcon, AlertCircle, Edit3
} from "lucide-react";

// ─── Types & Interfaces ──────────────────────────────────────────────────────

interface UserKYC {
  id: string;
  name: string;
  phone: string;
  aadhaarFront: string;
  aadhaarBack: string;
  pan: string;
  status: "Completed" | "Pending" | "Rejected";
}

interface SectionLabelProps {
  children: React.ReactNode;
}

const SectionLabel: React.FC<SectionLabelProps> = ({ children }) => {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
};

// ─── Page Component ───────────────────────────────────────────────────────────

export default function CompletedKYCPage() {
  const [users, setUsers] = useState<UserKYC[]>([
    { id: "3351", name: "Gurlal Singh", phone: "9781406883", aadhaarFront: "-", aadhaarBack: "-", pan: "-", status: "Completed" },
    { id: "3350", name: "Jagseer Singh", phone: "9417437685", aadhaarFront: "-", aadhaarBack: "-", pan: "-", status: "Completed" },
  ]);

  const [searchTerm, setSearchTerm] = useState<string>("");
  
  // Modals State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<UserKYC> | null>(null);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);

  // --- Handlers ---

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>, field: keyof UserKYC) => {
    const file = e.target.files?.[0];
    if (file && currentUser) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentUser({ ...currentUser, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const openEditModal = (user?: UserKYC) => {
    setCurrentUser(user || { 
      id: Date.now().toString().slice(-4), 
      name: "", phone: "", status: "Completed", 
      aadhaarFront: "-", aadhaarBack: "-", pan: "-" 
    });
    setIsEditModalOpen(true);
  };

  const openViewModal = (user: UserKYC) => {
    setCurrentUser(user);
    setIsViewModalOpen(true);
  };

  const handleSave = () => {
    if (!currentUser) return;

    // --- Validation Logic ---
    const nameRegex = /^[a-zA-Z\s]*$/;
    const phoneRegex = /^[0-9]*$/;

    if (!currentUser.name || !nameRegex.test(currentUser.name)) {
      alert("Please enter a valid name (letters only).");
      return;
    }
    if (!currentUser.phone || !phoneRegex.test(currentUser.phone) || currentUser.phone.length !== 10) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const exists = users.find(u => u.id === currentUser.id);
    if (exists) {
      setUsers(users.map(u => u.id === currentUser.id ? (currentUser as UserKYC) : u));
    } else {
      setUsers([currentUser as UserKYC, ...users]);
    }
    setIsEditModalOpen(false);
  };

  const initiateDelete = (id: string) => {
    setUserToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (userToDelete) {
      setUsers(users.filter(u => u.id !== userToDelete));
      setIsDeleteConfirmOpen(false);
      setIsEditModalOpen(false);
      setUserToDelete(null);
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      return u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.phone.includes(searchTerm);
    });
  }, [users, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">
      
      {/* ── Delete Confirmation ── */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="text-red-500" size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-800">Delete User?</h3>
            <p className="text-sm text-slate-500 mt-2">This action cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsDeleteConfirmOpen(false)} className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
              <button onClick={confirmDelete} className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-all">Yes, Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* ── View Modal (Read Only) ── */}
      {isViewModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-slate-800">View User Details</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Full Name</p>
                    <p className="text-sm text-slate-800 font-semibold py-2 border-b">{currentUser?.name}</p>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Phone</p>
                    <p className="text-sm text-slate-800 font-semibold py-2 border-b">{currentUser?.phone}</p>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                    <p className="text-sm text-green-600 font-bold py-2 border-b">{currentUser?.status}</p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Documents</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Aadhaar Front", key: "aadhaarFront" },
                    { label: "Aadhaar Back", key: "aadhaarBack" },
                    { label: "PAN Card", key: "pan" }
                  ].map((doc) => (
                    <div key={doc.key}>
                      <div className="aspect-[4/3] bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center overflow-hidden">
                        {currentUser?.[doc.key as keyof UserKYC] !== "-" ? (
                          <img src={currentUser?.[doc.key as keyof UserKYC]} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-slate-200" size={24} />
                        )}
                      </div>
                      <p className="text-[9px] text-center mt-1.5 font-bold text-slate-500 uppercase">{doc.label}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={() => setIsViewModalOpen(false)} className="w-full bg-slate-800 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-900 transition-all">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* ── Edit Modal (Editable) ── */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="p-5 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-slate-800">Edit User & Documents</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
            </div>
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Full Name</label>
                    <input 
                      className="w-full border rounded-lg p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="Enter name (letters only)"
                      value={currentUser?.name} 
                      onChange={e => {
                        const val = e.target.value;
                        if (/^[a-zA-Z\s]*$/.test(val)) {
                          setCurrentUser({...currentUser!, name: val})
                        }
                      }} 
                    />
                </div>
                <div className="col-span-2">
                    <label className="text-[10px] font-bold text-slate-400 uppercase">Phone</label>
                    <input 
                      className="w-full border rounded-lg p-2 text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" 
                      placeholder="10-digit number"
                      maxLength={10}
                      value={currentUser?.phone} 
                      onChange={e => {
                        const val = e.target.value;
                        if (/^[0-9]*$/.test(val)) {
                          setCurrentUser({...currentUser!, phone: val})
                        }
                      }} 
                    />
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-slate-400 uppercase">Upload Documents</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: "Aadhaar Front", key: "aadhaarFront" },
                    { label: "Aadhaar Back", key: "aadhaarBack" },
                    { label: "PAN Card", key: "pan" }
                  ].map((doc) => (
                    <div key={doc.key} className="relative group">
                      <div className="aspect-[4/3] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center overflow-hidden transition-all group-hover:border-blue-400">
                        {currentUser?.[doc.key as keyof UserKYC] !== "-" ? (
                          <img src={currentUser?.[doc.key as keyof UserKYC]} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <ImageIcon className="text-slate-300" size={24} />
                        )}
                        <input type="file" accept="image/*" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => handleFileChange(e, doc.key as keyof UserKYC)} />
                      </div>
                      <p className="text-[9px] text-center mt-1.5 font-bold text-slate-500 uppercase">{doc.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <button onClick={handleSave} className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 hover:bg-blue-700 transition-all">
                    <Save size={16}/> Save Changes
                </button>
                <button onClick={() => initiateDelete(currentUser!.id!)} className="p-2.5 text-red-500 bg-red-50 border border-red-100 rounded-xl hover:bg-red-100 transition-all">
                    <Trash2 size={18}/>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center shadow-sm">
            <UserCheck className="text-green-600" size={20} />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-slate-800">Completed KYC</h1>
            <p className="text-sm text-slate-500 mt-0.5">Manage verified users</p>
          </div>
        </div>
        <button onClick={() => openEditModal()} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-100 transition-all">
          <Plus size={16} /> Add KYC
        </button>
      </div>

      {/* ── Stats ── */}
      <SectionLabel>Overview</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
              <Users size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{users.length}</p>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Verified</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
              <UserCheck size={24} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">100%</p>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Verified Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Search ── */}
      <SectionLabel>Search User</SectionLabel>
      <div className="bg-white rounded-2xl border border-slate-200 p-3 mb-4 shadow-sm">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search by name or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {["ID", "Name", "Phone", "Aadhaar", "PAN", "Status", "Action"].map((h) => (
                  <th key={h} className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-400">{user.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800">{user.name}</td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-600">{user.phone}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1.5">
                      {[user.aadhaarFront, user.aadhaarBack].map((doc, i) => (
                        <div key={i} className="w-7 h-7 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                          {doc !== "-" ? <img src={doc} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-300">-</div>}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="w-7 h-7 rounded bg-slate-100 border border-slate-200 overflow-hidden">
                      {user.pan !== "-" ? <img src={user.pan} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-[8px] text-slate-300">-</div>}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-tighter bg-green-50 text-green-600 border-green-100">
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => openViewModal(user)} className="w-8 h-8 flex items-center justify-center rounded-lg text-blue-500 hover:bg-blue-50 transition-all border border-transparent hover:border-blue-100" title="View">
                        <Eye size={15} />
                      </button>
                      <button onClick={() => openEditModal(user)} className="w-8 h-8 flex items-center justify-center rounded-lg text-emerald-500 hover:bg-emerald-50 transition-all border border-transparent hover:border-emerald-100" title="Edit">
                        <Edit3 size={15} />
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