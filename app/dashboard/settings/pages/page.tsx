
"use client";

import React, { useState, useEffect } from "react";
import { FileText, Save, Info, ShieldCheck, HelpCircle, Share2, Phone } from "lucide-react";

export default function PagesSettings() {
  const [activeTab, setActiveTab] = useState("about");
  const [editorLoaded, setEditorLoaded] = useState(false);

  const [CKEditor, setCKEditor] = useState(null);
  const [Editor, setEditor] = useState(null);

  const [content, setContent] = useState({
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
      const [ckeditor, classic] = await Promise.all([
        import("@ckeditor/ckeditor5-react"),
        import("@ckeditor/ckeditor5-build-classic"),
      ]);
      setCKEditor(() => ckeditor.CKEditor);
      setEditor(() => classic.default);
      setEditorLoaded(true);
    };
    loadEditor();
  }, []);

  const handleChange = (data) => {
    setContent((prev) => ({
      ...prev,
      [activeTab]: data,
    }));
  };

  const tabs = [
    { key: "about", label: "About Us", icon: Info },
    { key: "contact", label: "Contact Us", icon: Phone },
    { key: "privacy", label: "Privacy Policy", icon: ShieldCheck },
    { key: "terms", label: "Terms & Conditions", icon: FileText },
    { key: "refund", label: "Refund Policy", icon: HelpCircle },
    { key: "refer", label: "Refer Program", icon: Share2 },
  ];

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
        <button className="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all text-sm font-medium shadow-md shadow-blue-100">
          <Save size={16} /> Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR TABS */}
        <div className="w-full lg:w-72 space-y-2 shrink-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                  activeTab === tab.key
                    ? "bg-white text-blue-600 shadow-sm border-l-4 border-blue-600"
                    : "text-slate-500 hover:bg-white/50 hover:text-slate-700"
                }`}
              >
                <Icon size={18} className={activeTab === tab.key ? "text-blue-600" : "text-slate-400"} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* EDITOR AREA */}
        <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Editing: {tabs.find(t => t.key === activeTab)?.label}
            </span>
            <span className="text-[10px] font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-md">
              HTML Editor Active
            </span>
          </div>

          <div className="p-6 flex-1 editor-container">
            {editorLoaded && CKEditor && Editor ? (
              <CKEditor
                editor={Editor}
                data={content[activeTab]}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  handleChange(data);
                }}
                config={{
                  placeholder: `Write the ${activeTab} content here...`,
                  toolbar: [
                    "heading", "|", "bold", "italic", "underline", "link", "|",
                    "bulletedList", "numberedList", "blockQuote", "|",
                    "insertTable", "undo", "redo"
                  ],
                }}
              />
            ) : (
              <div className="h-64 flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-100 rounded-xl">
                <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-slate-400 text-sm font-medium">Initializing Editor...</p>
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
          min-height: 400px !important;
          border: 1px solid #e2e8f0 !important;
          border-top: none !important;
          border-radius: 0 0 12px 12px !important;
          font-size: 14px !important;
          color: #334155 !important;
        }
        .ck-content:focus {
          border-color: #3b82f6 !important;
          box-shadow: none !important;
        }
      `}</style>
    </div>
  );
}