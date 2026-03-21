"use client";

import { useState, useEffect } from "react";

export default function PagesSettings() {
  const [activeTab, setActiveTab] = useState("about");
  const [editorLoaded, setEditorLoaded] = useState(false);

  const [CKEditor, setCKEditor] = useState<any>(null);
  const [Editor, setEditor] = useState<any>(null);

  const [content, setContent] = useState({
    about: "",
    contact: "",
    privacy: "",
    terms: "",
    refund: "",
    refer: "",
  });

  /* ✅ LOAD CKEDITOR ONLY ON CLIENT */
  useEffect(() => {
    Promise.all([
      import("@ckeditor/ckeditor5-react"),
      import("@ckeditor/ckeditor5-build-classic"),
    ]).then(([ckeditor, classic]) => {
      setCKEditor(() => ckeditor.CKEditor);
      setEditor(() => classic.default);
      setEditorLoaded(true);
    });
  }, []);

  const handleChange = (data: string) => {
    setContent((prev) => ({
      ...prev,
      [activeTab]: data,
    }));
  };

  return (
    <div className="bg-[#F4F7FE] min-h-full font-sans p-6">

      {/* HEADER */}
      <h1 className="text-2xl font-bold text-[#1B254B] mb-6">
        App Settings
      </h1>

      {/* TABS */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {[
          { key: "about", label: "About us" },
          { key: "contact", label: "Contact us" },
          { key: "privacy", label: "App Privacy Policy" },
          { key: "terms", label: "App Terms Conditions" },
          { key: "refund", label: "Cancellation / Refund" },
          { key: "refer", label: "App Refer" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-xl text-sm font-bold ${
              activeTab === tab.key
                ? "bg-[#4318FF] text-white"
                : "bg-[#F4F7FE] text-slate-600"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* EDITOR */}
      <div className="bg-white rounded-2xl p-6 shadow">

        <h2 className="text-sm font-bold text-slate-500 mb-3 uppercase">
          {activeTab}
        </h2>

        {/* ✅ CKEDITOR LOAD SAFE */}
        {editorLoaded && CKEditor && Editor ? (
          <CKEditor
            editor={Editor}
            data={content[activeTab as keyof typeof content]}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              handleChange(data);
            }}
            config={{
              toolbar: [
                "heading",
                "|",
                "bold",
                "italic",
                "underline",
                "link",
                "bulletedList",
                "numberedList",
                "|",
                "alignment",
                "blockQuote",
                "insertTable",
                "undo",
                "redo",
                "imageUpload",
              ],
            }}
          />
        ) : (
          <p className="text-gray-400 text-sm">Loading editor...</p>
        )}

        {/* SAVE */}
        <button className="mt-4 px-6 py-2 bg-[#4318FF] text-white rounded-xl font-bold">
          Save
        </button>

      </div>
    </div>
  );
}