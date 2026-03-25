/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, Save, Info, ShieldCheck, 
  HelpCircle, Share2, Phone, LucideIcon,
  CheckCircle2, Loader2, AlertCircle
} from "lucide-react";

// ─── TypeScript Interfaces ──────────────────────────────────────────────────

type PageKey = "about" | "contact" | "privacy" | "terms" | "refund" | "refer";

interface PageContent {
  about: string;
  contact: string;
  privacy: string;
  terms: string;
  refund: string;
  refer: string;
}

interface TabConfig {
  key: PageKey;
  label: string;
  icon: LucideIcon;
}

// ─── Page Component ──────────────────────────────────────────────────────────

export default function PagesSettings() {
  const [activeTab, setActiveTab] = useState<PageKey>("about");
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  // Editor states
  const [CKEditorComp, setCKEditorComp] = useState<any>(null);
  const [ClassicEditor, setClassicEditor] = useState<any>(null);

  const [content, setContent] = useState<PageContent>({
    about: "<h2>About SRV Electricals</h2><p>Providing quality electrical solutions since 2010...</p>",
    contact: "<p>Contact us at <strong>support@srvelectricals.com</strong></p>",
    privacy: "<h2>Privacy Policy</h2><p>Your data is safe with us. We do not share information with third parties.</p>",
    terms: "<h2>Terms & Conditions</h2><p>By using this app, you agree to follow our guidelines...</p>",
    refund: "<h2>Refund Policy</h2><p>Returns are accepted within 7 days of purchase.</p>",
    refer: "<h2>Refer & Earn</h2><p>Share your unique code with friends to get points.</p>",
  });

  /* ✅ NOTIFICATION SYSTEM */
  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  /* ✅ LOAD CKEDITOR ONLY ON CLIENT */
  useEffect(() => {
    const loadEditor = async () => {
      try {
        const [ckeditor, classic] = await Promise.all([
          import("@ckeditor/ckeditor5-react"),
          import("@ckeditor/ckeditor5-build-classic"),
        ]);
        setCKEditorComp(() => ckeditor.CKEditor);
        setClassicEditor(() => classic.default);
        setEditorLoaded(true);
      } catch (error) {
        console.error("Failed to load CKEditor:", error);
        showToast("Failed to load text editor", "error");
      }
    };
    loadEditor();
  }, []);

  /* ✅ SAVE HANDLER */
  const handleSave = () => {
    setIsSaving(true);
    
    // Simulating API Call
    setTimeout(() => {
      console.log("Saving Content to Database:", content);
      setIsSaving(false);
      showToast("All pages updated successfully!");
    }, 1500);
  };

  const handleEditorChange = (data: string) => {
    setContent((prev) => ({
      ...prev,
      [activeTab]: data,
    }));
  };

  const tabs: TabConfig[] = [
    { key: "about", label: "About Us", icon: Info },
    { key: "contact", label: "Contact Us", icon: Phone },
    { key: "privacy", label: "Privacy Policy", icon: ShieldCheck },
    { key: "terms", label: "Terms & Conditions", icon: FileText },
    { key: "refund", label: "Refund Policy", icon: HelpCircle },
    { key: "refer", label: "Refer Program", icon: Share2 },
  ];

  const currentTabLabel = tabs.find(t => t.key === activeTab)?.label;

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900 relative">
      
      {/* TOAST MESSAGE */}
      {toast && (
        <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-6 py-3 rounded-2xl shadow-2xl border animate-in slide-in-from-top-full ${
          toast.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-bold">{toast.msg}</span>
        </div>
      )}

      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2 tracking-tight uppercase">
            <FileText className="text-blue-600" size={28} /> CMS Management
          </h1>
          <p className="text-sm text-slate-500 font-medium mt-0.5">Customize legal, contact, and about pages content</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center justify-center gap-2 px-8 py-3.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 active:scale-95 transition-all text-sm font-bold shadow-xl shadow-slate-200 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSaving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {isSaving ? "SAVING..." : "SAVE ALL CHANGES"}
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR TABS */}
        <div className="w-full lg:w-72 space-y-2 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center justify-between px-5 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all border ${
                  isActive
                    ? "bg-white text-blue-600 shadow-md border-white"
                    : "text-slate-500 hover:bg-white/50 border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon size={18} className={isActive ? "text-blue-600" : "text-slate-400"} />
                  {tab.label}
                </div>
                {isActive && <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" />}
              </button>
            );
          })}
        </div>

        {/* EDITOR AREA */}
        <div className="flex-1 bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[650px]">
          <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Content Editor
              </span>
              <span className="text-sm font-black text-slate-700 uppercase">
                {currentTabLabel}
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-black px-3 py-1.5 bg-white text-emerald-600 rounded-full border border-slate-100 shadow-sm uppercase tracking-tighter">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              Live Preview Active
            </div>
          </div>

          <div className="p-8 flex-1 editor-container">
            {editorLoaded && CKEditorComp && ClassicEditor ? (
              <CKEditorComp
                key={activeTab} // Crucial for re-initializing when tab changes
                editor={ClassicEditor}
                data={content[activeTab]}
                onChange={(_event: any, editor: any) => {
                  const data = editor.getData();
                  handleEditorChange(data);
                }}
                config={{
                  placeholder: `Start typing the ${currentTabLabel} content...`,
                  toolbar: [
                    "heading", "|", "bold", "italic", "underline", "link", "|",
                    "bulletedList", "numberedList", "blockQuote", "|",
                    "insertTable", "undo", "redo"
                  ],
                }}
              />
            ) : (
              <div className="h-[450px] flex flex-col items-center justify-center gap-4 border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30">
                <Loader2 size={32} className="text-blue-600 animate-spin" />
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest text-center">
                  Loading CMS Engine...<br/>
                  <span className="font-medium text-[10px] normal-case tracking-normal">Please wait while the editor initializes</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CUSTOM CKEDITOR STYLING */}
      <style jsx global>{`
        .ck-editor__animated_wrapper {
          border-radius: 0 0 20px 20px !important;
        }
        .ck-editor__top {
          border-bottom: 1px solid #f1f5f9 !important;
        }
        .ck-toolbar {
          background-color: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 20px 20px 0 0 !important;
          padding: 0.5rem !important;
        }
        .ck-content {
          min-height: 480px !important;
          border: 1px solid #e2e8f0 !important;
          border-top: none !important;
          border-radius: 0 0 20px 20px !important;
          padding: 2rem !important;
          font-family: inherit !important;
          font-size: 16px !important;
          color: #1e293b !important;
        }
        .ck-content:focus {
          border-color: #3b82f6 !important;
          box-shadow: none !important;
        }
        .ck.ck-editor__main>.ck-editor__editable:not(.ck-focused) {
          border-color: #e2e8f0 !important;
        }
      `}</style>
    </div>
  );
}