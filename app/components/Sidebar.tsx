
"use client";

import { useState } from "react";
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
  PanelLeftClose, PanelLeftOpen,
} from "lucide-react";

const getRoute = (menu, sub) => {
  if (menu === "Users") {
    if (sub === "Electrician") return "/dashboard/users/electricians";
    if (sub === "Dealers")     return "/dashboard/users/dealers";
  }
  if (menu === "KYC Users") {
    if (sub === "Rejected KYC") return "/dashboard/kyc-users/rejected";
    if (sub === "Pending KYC")    return "/dashboard/kyc-users/pending";
    if (sub === "Completed KYC") return "/dashboard/kyc-users/complete";
  }
  if (menu === "Payment") {
    if (sub === "Wallet History")         return "/dashboard/payment/wallet-history";
    if (sub === "Withdrawal")             return "/dashboard/payment/withdrawal";
    if (sub === "Top Redeem Electrician") return "/dashboard/payment/top-redeem";
  }
  if (menu === "Product") {
    if (sub === "Category")     return "/dashboard/product/category";
    if (sub === "Product List") return "/dashboard/product/product-list";
  }
  if (menu === "Others") {
    if (sub === "Enquiry")     return "/dashboard/others/enquiry";
    if (sub === "Offer")       return "/dashboard/others/offer";
    if (sub === "Testimonial") return "/dashboard/others/testimonial";
    if (sub === "Plan Range")  return "/dashboard/others/plan-range";
    if (sub === "Banner")      return "/dashboard/others/banner";
  }
  if (menu === "Settings") {
    if (sub === "General Settings") return "/dashboard/settings/general";
    if (sub === "Pages Settings")   return "/dashboard/settings/pages";
    if (sub === "FAQ")              return "/dashboard/settings/faq";
  }
  return "/dashboard";
};

const menus = [
  { name: "Dashboard", link: "/dashboard", icon: LayoutDashboard },
  {
    name: "Users", icon: Users,
    submenu: [
      { label: "Electrician", icon: Zap },
      { label: "Dealers",     icon: Building2 },
    ],
  },
  {
    name: "KYC Users", icon: ShieldCheck,
    submenu: [
      { label: "Rejected KYC", icon: UserX },
      { label: "Pending KYC",    icon: Clock },
      { label: "Completed KYC", icon: UserCheck },
    ],
  },
  {
    name: "Payment", icon: Wallet,
    submenu: [
      { label: "Wallet History",         icon: History },
      { label: "Withdrawal",             icon: ArrowDownCircle },
      { label: "Top Redeem Electrician", icon: Trophy },
    ],
  },
  {
    name: "Product", icon: Package,
    submenu: [
      { label: "Category",     icon: Tag },
      { label: "Product List", icon: List },
    ],
  },
  { name: "Gift Store Product", link: "/dashboard/gift-store-product", icon: Gift },
  { name: "Gift Store Order",   link: "/dashboard/gift-store-order",   icon: ShoppingBag },
  { name: "QR Codes",           link: "/dashboard/qr-codes",           icon: QrCode },
  { name: "All QR Codes",       link: "/dashboard/all-qr-codes",       icon: ScanLine },
  { name: "Notification",       link: "/dashboard/notification",       icon: Bell },
  {
    name: "Others", icon: BarChart2,
    submenu: [
      { label: "Enquiry",     icon: HelpCircle },
      { label: "Offer",       icon: Tag },
      { label: "Testimonial", icon: MessageSquare },
      { label: "Plan Range",  icon: Sliders },
      { label: "Banner",      icon: ImageIcon },
    ],
  },
  {
    name: "Settings", icon: Settings,
    submenu: [
      { label: "General Settings", icon: Sliders },
      { label: "Pages Settings",   icon: FileText },
      { label: "FAQ",              icon: HelpCircle },
    ],
  },
];

const sectionBefore = {
  "Users":              "Management",
  "Payment":            "Finance",
  "Product":            "Catalogue",
  "Gift Store Product": "Rewards",
  "QR Codes":           "QR System",
  "Notification":       "System",
  "Others":             "More",
};

export default function Sidebar({ collapsed, onToggle }) {
  const [openMenu, setOpenMenu] = useState(null);
  const pathname = usePathname();

  const toggleMenu = (name) => {
    if (collapsed) return;
    setOpenMenu((prev) => (prev === name ? null : name));
  };

  const isActive       = (link) => pathname === link;
  const isParentActive = (menu) =>
    menu.submenu?.some((sub) => pathname === getRoute(menu.name, sub.label));

  return (
    <div
      className="flex-shrink-0 flex flex-col h-screen transition-all duration-300 ease-in-out"
      style={{
        background: "#0a1930",
        width: collapsed ? "64px" : "232px",
        overflow: "hidden",
      }}
    >
      {/* ── Logo + Toggle ── */}
      <div
        className="flex items-center flex-shrink-0 px-3"
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          height: "57px",
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        {/* Logo — hide when collapsed */}
        {!collapsed && (
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-9 h-9 relative rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center"
              style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.2)" }}
            >
              <Image src="../srv.svg" alt="SRV Logo" fill className="object-contain p-1" />
            </div>
            <div className="min-w-0">
              <p className="text-[13px] font-semibold text-white leading-tight tracking-tight truncate">
                SRV Electricals
              </p>
              <p className="text-[10px]" style={{ color: "#60A5FA" }}>Admin Panel</p>
            </div>
          </div>
        )}

        {/* Toggle button */}
        <button
          onClick={onToggle}
          className="flex items-center justify-center w-8 h-8 rounded-lg transition-all duration-150 flex-shrink-0"
          style={{ color: "#7BA7C4" }}
          onMouseEnter={e => e.currentTarget.style.color = "#E2E8F0"}
          onMouseLeave={e => e.currentTarget.style.color = "#7BA7C4"}
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      {/* ── Navigation ── */}
      <nav
        className="flex-1 py-3 space-y-0.5"
        style={{
          overflowY: "auto",
          overflowX: "hidden",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          paddingLeft: collapsed ? "8px" : "12px",
          paddingRight: collapsed ? "8px" : "12px",
        }}
      >
        <style>{`nav::-webkit-scrollbar{display:none}`}</style>

        {menus.map((menu, index) => {
          const Icon         = menu.icon;
          const label        = sectionBefore[menu.name];
          const parentActive = isParentActive(menu);
          const isOpen       = openMenu === menu.name;

          return (
            <div key={index}>

              {/* Section label — hide when collapsed */}
              {label && !collapsed && (
                <p
                  className="text-[9px] font-semibold uppercase tracking-[0.12em] px-3 pt-4 pb-1.5 select-none whitespace-nowrap"
                  style={{ color: "#3B6EA5" }}
                >
                  {label}
                </p>
              )}
              {/* Divider line when collapsed */}
              {label && collapsed && (
                <div className="my-2 mx-1" style={{ height: "1px", background: "rgba(255,255,255,0.06)" }} />
              )}

              {/* Dropdown */}
              {menu.submenu ? (
                <div>
                  <button
                    onClick={() => toggleMenu(menu.name)}
                    title={collapsed ? menu.name : undefined}
                    className="w-full flex items-center rounded-lg text-[13px] font-medium transition-all duration-150"
                    style={{
                      background: parentActive || isOpen ? "rgba(59,130,246,0.15)" : "transparent",
                      color: parentActive || isOpen ? "#93C5FD" : "#CBD5E1",
                      justifyContent: collapsed ? "center" : "space-between",
                      padding: collapsed ? "10px 0" : "10px 12px",
                    }}
                    onMouseEnter={e => {
                      if (!parentActive && !isOpen) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                        e.currentTarget.style.color = "#F1F5F9";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!parentActive && !isOpen) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.color = "#CBD5E1";
                      }
                    }}
                  >
                    <span className="flex items-center" style={{ gap: collapsed ? 0 : "10px" }}>
                      <Icon size={collapsed ? 18 : 15} className="flex-shrink-0"
                        style={{ color: parentActive || isOpen ? "#93C5FD" : "#7BA7C4" }} />
                      {!collapsed && menu.name}
                    </span>
                    {!collapsed && (
                      <ChevronDown size={13} className="flex-shrink-0 transition-transform duration-200"
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          color: isOpen ? "#93C5FD" : "#3B6EA5",
                        }}
                      />
                    )}
                  </button>

                  {/* Submenu — only when expanded */}
                  {isOpen && !collapsed && (
                    <div
                      className="mt-0.5 ml-[18px] pl-3 space-y-0.5 pb-1"
                      style={{ borderLeft: "2px solid rgba(59,130,246,0.2)" }}
                    >
                      {menu.submenu.map((sub, i) => {
                        const SubIcon = sub.icon;
                        const route   = getRoute(menu.name, sub.label);
                        const active  = pathname === route;
                        return (
                          <Link
                            key={i}
                            href={route}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg text-[12px] font-medium transition-all duration-150"
                            style={{
                              background: active ? "#2563EB" : "transparent",
                              color: active ? "#fff" : "#94A3B8",
                            }}
                            onMouseEnter={e => {
                              if (!active) {
                                e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                                e.currentTarget.style.color = "#E2E8F0";
                              }
                            }}
                            onMouseLeave={e => {
                              if (!active) {
                                e.currentTarget.style.background = "transparent";
                                e.currentTarget.style.color = "#94A3B8";
                              }
                            }}
                          >
                            <SubIcon size={12} className="flex-shrink-0" />
                            {sub.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>

              ) : (
                /* Direct link */
                <Link
                  href={menu.link}
                  title={collapsed ? menu.name : undefined}
                  className="flex items-center rounded-lg text-[13px] font-medium transition-all duration-150"
                  style={{
                    background: isActive(menu.link) ? "#2563EB" : "transparent",
                    color: isActive(menu.link) ? "#fff" : "#CBD5E1",
                    justifyContent: collapsed ? "center" : "flex-start",
                    gap: collapsed ? 0 : "10px",
                    padding: collapsed ? "10px 0" : "10px 12px",
                  }}
                  onMouseEnter={e => {
                    if (!isActive(menu.link)) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.color = "#F1F5F9";
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive(menu.link)) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = "#CBD5E1";
                    }
                  }}
                >
                  <Icon size={collapsed ? 18 : 15} className="flex-shrink-0"
                    style={{ color: isActive(menu.link) ? "#fff" : "#7BA7C4" }} />
                  {!collapsed && menu.name}
                </Link>
              )}

            </div>
          );
        })}
      </nav>

      {/* ── Admin footer ── */}
      <div
        className="flex-shrink-0 px-3 py-3.5"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          justifyContent: collapsed ? "center" : "flex-start",
          display: "flex",
          alignItems: "center",
        }}
      >
        {collapsed ? (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(37,99,235,0.25)", border: "1px solid rgba(37,99,235,0.4)" }}
            title="Admin"
          >
            <span className="text-xs font-semibold" style={{ color: "#93C5FD" }}>A</span>
          </div>
        ) : (
          <div className="flex items-center gap-2.5 w-full">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(37,99,235,0.25)", border: "1px solid rgba(37,99,235,0.4)" }}
            >
              <span className="text-xs font-semibold" style={{ color: "#93C5FD" }}>A</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-white truncate">Admin</p>
              <p className="text-[10px] truncate" style={{ color: "#60A5FA" }}>admin@srv.com</p>
            </div>
            <Settings
              size={13}
              className="flex-shrink-0 cursor-pointer transition-colors"
              style={{ color: "#3B6EA5" }}
              onMouseEnter={e => e.currentTarget.style.color = "#93C5FD"}
              onMouseLeave={e => e.currentTarget.style.color = "#3B6EA5"}
            />
          </div>
        )}
      </div>
    </div>
  );
}