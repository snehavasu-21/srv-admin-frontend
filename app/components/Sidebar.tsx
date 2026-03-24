"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, ShieldCheck, Wallet,
  Package, Gift, ShoppingBag, QrCode, ScanLine,
  Bell, Settings, HelpCircle, ChevronDown,
  Zap, Building2, UserX, Clock, UserCheck,
  History, ArrowDownCircle, Trophy,
  Tag, List, BarChart2, FileText,
  ImageIcon, MessageSquare, Sliders,
  LucideIcon, PanelLeftClose, PanelLeftOpen,
} from "lucide-react";

// --- Types & Interfaces ---
interface SubMenuItem {
  label: string;
  icon: LucideIcon;
}

interface MenuItem {
  name: string;
  link?: string;
  icon: LucideIcon;
  submenu?: SubMenuItem[];
}

const sectionBefore: Record<string, string> = {
  "Users": "Management",
  "Payment": "Finance",
  "Product": "Catalogue",
  "Gift Store Product": "Rewards",
  "QR Codes": "QR System",
  "Notification": "System",
  "Others": "More",
};

const getRoute = (menu: string, sub: string): string => {
  const routes: Record<string, Record<string, string>> = {
    "Users": { "Electrician": "/dashboard/users/electricians", "Dealers": "/dashboard/users/dealers" },
    "KYC Users": { "Rejected KYC": "/dashboard/kyc-users/rejected", "Pending KYC": "/dashboard/kyc-users/pending", "Completed KYC": "/dashboard/kyc-users/complete" },
    "Payment": { "Wallet History": "/dashboard/payment/wallet-history", "Withdrawal": "/dashboard/payment/withdrawal", "Top Redeem Electrician": "/dashboard/payment/top-redeem" },
    "Product": { "Category": "/dashboard/product/category", "Product List": "/dashboard/product/product-list" },
    "Others": { "Enquiry": "/dashboard/others/enquiry", "Offer": "/dashboard/others/offer", "Testimonial": "/dashboard/others/testimonial", "Plan Range": "/dashboard/others/plan-range", "Banner": "/dashboard/others/banner" },
    "Settings": { "General Settings": "/dashboard/settings/general", "Pages Settings": "/dashboard/settings/pages", "FAQ": "/dashboard/settings/faq" },
  };
  return routes[menu]?.[sub] || "/dashboard";
};

const menus: MenuItem[] = [
  { name: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
  { name: "Users", icon: Users, submenu: [{ label: "Electrician", icon: Zap }, { label: "Dealers", icon: Building2 }] },
  { name: "KYC Users", icon: ShieldCheck, submenu: [{ label: "Rejected KYC", icon: UserX }, { label: "Pending KYC", icon: Clock }, { label: "Completed KYC", icon: UserCheck }] },
  { name: "Payment", icon: Wallet, submenu: [{ label: "Wallet History", icon: History }, { label: "Withdrawal", icon: ArrowDownCircle }, { label: "Top Redeem Electrician", icon: Trophy }] },
  { name: "Product", icon: Package, submenu: [{ label: "Category", icon: Tag }, { label: "Product List", icon: List }] },
  { name: "Gift Store Product", link: "/dashboard/gift-store-product", icon: Gift },
  { name: "Gift Store Order", link: "/dashboard/gift-store-order", icon: ShoppingBag },
  { name: "QR Codes", link: "/dashboard/qr-codes", icon: QrCode },
  { name: "All QR Codes", link: "/dashboard/all-qr-codes", icon: ScanLine },
  { name: "Notification", link: "/dashboard/notification", icon: Bell },
  { name: "Others", icon: BarChart2, submenu: [{ label: "Enquiry", icon: HelpCircle }, { label: "Offer", icon: Tag }, { label: "Testimonial", icon: MessageSquare }, { label: "Plan Range", icon: Sliders }, { label: "Banner", icon: ImageIcon }] },
  { name: "Settings", icon: Settings, submenu: [{ label: "General Settings", icon: Sliders }, { label: "Pages Settings", icon: FileText }, { label: "FAQ", icon: HelpCircle }] },
];

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const pathname = usePathname();

  // Minimize toggle function
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    setOpenMenu(null); // Minimize hone par submenu close kar dete hain
  };

  const toggleMenu = (name: string) => {
    if (collapsed) return;
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  const isActive = (link?: string) => pathname === link;
  const isParentActive = (menu: MenuItem) =>
    menu.submenu?.some((sub) => pathname === getRoute(menu.name, sub.label));

  return (
    <div
      className="flex-shrink-0 flex flex-col h-screen transition-all duration-300 ease-in-out relative"
      style={{
        background: "#0a1930",
        width: collapsed ? "70px" : "240px",
        borderRight: "1px solid rgba(255,255,255,0.08)"
      }}
    >
      {/* ── Header & Toggle Button ── */}
      <div className="px-4 py-5 flex items-center justify-between flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-9 h-9 relative rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)" }}>
            <Image src="/srv.svg" alt="SRV Logo" fill className="object-contain p-1" />
          </div>
          {!collapsed && (
            <div className="min-w-0">
              <p className="text-[13px] font-bold text-white truncate">SRV Electricals</p>
              <p className="text-[10px]" style={{ color: "#60A5FA" }}>Admin Panel</p>
            </div>
          )}
        </div>

        {/* Minimize Toggle Button */}
        <button 
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg hover:bg-white/5 transition-colors"
          style={{ color: "#3B6EA5" }}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden space-y-1 px-3 custom-scrollbar">
        <style>{`.custom-scrollbar::-webkit-scrollbar { width: 0px; }`}</style>

        {menus.map((menu, index) => {
          const Icon = menu.icon;
          const label = sectionBefore[menu.name];
          const parentActive = isParentActive(menu);
          const isOpen = openMenu === menu.name;

          return (
            <div key={index}>
              {label && !collapsed && (
                <p className="text-[10px] font-bold uppercase tracking-wider px-3 mt-4 mb-2 opacity-40 text-blue-300">
                  {label}
                </p>
              )}
              {label && collapsed && <div className="h-px bg-white/5 my-4 mx-2" />}

              {menu.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(menu.name)}
                    className="w-full flex items-center rounded-xl text-[13px] font-medium transition-all group"
                    style={{
                      background: parentActive || isOpen ? "rgba(59,130,246,0.12)" : "transparent",
                      color: parentActive || isOpen ? "#93C5FD" : "#94A3B8",
                      padding: collapsed ? "12px 0" : "10px 12px",
                      justifyContent: collapsed ? "center" : "flex-start"
                    }}
                  >
                    <Icon size={18} className={`${collapsed ? "" : "mr-3"} flex-shrink-0`} />
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left">{menu.name}</span>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
                      </>
                    )}
                  </button>

                  {!collapsed && isOpen && (
                    <div className="mt-1 ml-4 pl-4 border-l border-white/10 space-y-1">
                      {menu.submenu.map((sub, i) => {
                        const route = getRoute(menu.name, sub.label);
                        const active = pathname === route;
                        return (
                          <Link key={i} href={route}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-[12px] transition-all"
                            style={{
                              background: active ? "#2563EB" : "transparent",
                              color: active ? "#fff" : "#64748B",
                            }}
                          >
                            <sub.icon size={14} />
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={menu.link || "#"}
                  className="flex items-center rounded-xl text-[13px] font-medium transition-all"
                  style={{
                    background: isActive(menu.link) ? "#2563EB" : "transparent",
                    color: isActive(menu.link) ? "#fff" : "#94A3B8",
                    padding: collapsed ? "12px 0" : "10px 12px",
                    justifyContent: collapsed ? "center" : "flex-start"
                  }}
                >
                  <Icon size={18} className={`${collapsed ? "" : "mr-3"} flex-shrink-0`} />
                  {!collapsed && menu.name}
                </Link>
              )}
            </div>
          );
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="p-4 border-t border-white/5 bg-[#081426]">
        <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}>
          <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-blue-400">AD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-semibold text-white truncate">Admin Account</p>
              <p className="text-[10px] text-blue-400/60 truncate">admin@srv.com</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
