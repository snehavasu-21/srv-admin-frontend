/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { 
  FileText, Save, Info, ShieldCheck, 
  HelpCircle, Share2, Phone, LucideIcon 
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

  // Editor states with any-typing for dynamic library imports
  const [CKEditorComp, setCKEditorComp] = useState<any>(null);
  const [ClassicEditor, setClassicEditor] = useState<any>(null);

  const [content, setContent] = useState<PageContent>({
    about: "<h2>About SRV Electricals</h2><p>Providing quality electrical solutions since...</p>",
    contact: "<p>Contact us at support@srvelectricals.com</p>",
    privacy: "<h2>Privacy Policy</h2><p>Your data is safe with us.</p>",
    terms: "<h2>Terms & Conditions</h2><p>By using this app...</p>",
    refund: "<h2>Refund Policy</h2><p>Returns are accepted within...</p>",
    refer: "<h2>Refer & Earn</h2><p>Share with friends to get points.</p>",
  });

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
      }
    };
    loadEditor();
  }, []);

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
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans text-slate-900">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
            <FileText className="text-blue-600" size={24} /> App Pages Content
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">Edit legal and informational pages for the mobile app</p>
        </div>
        <button 
          onClick={() => alert("Settings Saved Successfully!")}
          className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 active:scale-95 transition-all text-sm font-medium shadow-md shadow-blue-100"
        >
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR TABS */}
        <div className="w-full lg:w-72 space-y-2 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-white text-blue-600 shadow-sm border-l-4 border-blue-600"
                    : "text-slate-500 hover:bg-white/50 hover:text-slate-700"
                }`}
              >
                <Icon size={18} className={isActive ? "text-blue-600" : "text-slate-400"} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* EDITOR AREA */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col min-h-[600px]">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Editing Section
              </span>
              <span className="text-sm font-bold text-slate-700">
                {currentTabLabel}
              </span>
            </div>
            <span className="text-[10px] font-medium px-2 py-1 bg-emerald-50 text-emerald-600 rounded-md border border-emerald-100">
              Auto-saving to draft
            </span>
          </div>

          <div className="p-6 flex-1 editor-container">
            {editorLoaded && CKEditorComp && ClassicEditor ? (
              <CKEditorComp
                editor={ClassicEditor}
                data={content[activeTab]}
                onChange={(_event: any, editor: any) => {
                  const data = editor.getData();
                  handleEditorChange(data);
                }}
                config={{
                  placeholder: `Write the ${currentTabLabel} content here...`,
                  toolbar: [
                    "heading", "|", "bold", "italic", "underline", "link", "|",
                    "bulletedList", "numberedList", "blockQuote", "|",
                    "insertTable", "undo", "redo"
                  ],
                }}
              />
            ) : (
              <div className="h-96 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-100 rounded-xl bg-slate-50/30">
                <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-slate-400 text-sm font-medium">Initializing WYSIWYG Editor...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* CUSTOM CKEDITOR STYLING */}
      <style jsx global>{`
        .ck-editor__animated_wrapper {
          border-radius: 0 0 12px 12px !important;
        }
        .ck-editor__top {
          border-bottom: 1px solid #e2e8f0 !important;
        }
        .ck-toolbar {
          background-color: #f8fafc !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 12px 12px 0 0 !important;
        }
        .ck-content {
          min-height: 450px !important;
          border: 1px solid #e2e8f0 !important;
          border-top: none !important;
          border-radius: 0 0 12px 12px !important;
          padding: 1.5rem !important;
          font-size: 15px !important;
          line-height: 1.6 !important;
          color: #334155 !important;
        }
        .ck-content:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
        }
      `}</style>
    </div>
  );
}