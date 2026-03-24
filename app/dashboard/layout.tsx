"use client";

import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

// ─── Interface for Layout Props ─────────────────────────────────────────────
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  // Sidebar ki state ko boolean type automatically mil jayega initial value se
  const [collapsed, setCollapsed] = useState<boolean>(false);

  // Toggle function for better readability
  const toggleSidebar = () => setCollapsed((prev) => !prev);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      
      {/* SIDEBAR 
          Note: Ensure your Sidebar component accepts 'collapsed' (boolean) 
          and 'onToggle' (function) props in its definition.
      */}
      <Sidebar 
        collapsed={collapsed} 
        onToggle={toggleSidebar} 
      />

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* NAVBAR 
            Tip: You can also pass toggleSidebar here if you want a 
            hamburger menu icon in the navbar.
        */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-slate-100/50 transition-all duration-300">
          <div className="max-w-[1600px] mx-auto">
             {children}
          </div>
        </main>

      </div>
    </div>
  );
}