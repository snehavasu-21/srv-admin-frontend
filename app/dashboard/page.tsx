
"use client";

import React from "react";
import {
  Users, Home, Zap, LayoutGrid, FileText, Wallet,
  HelpCircle, QrCode, Activity, UserCheck, UserX, Clock, Trophy,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";

// ─── Interfaces ───
interface StatCard {
  label: string; value: string; icon: LucideIcon; iconBg: string; iconColor: string;
  badge: string; badgeBg: string; badgeColor: string; borderAccent: string;
  hoverBorder: string; hoverIconBg: string; href: string;
}

interface KYCCard {
  label: string; value: string; icon: LucideIcon; bg: string; border: string;
  labelColor: string; valueColor: string; iconBg: string; iconColor: string;
  hoverBg: string; hoverBorder: string; href: string;
}

interface ActivityCard {
  label: string; value: string; icon: LucideIcon; iconBg: string; iconColor: string;
  accent: string; hoverAccent: string; hoverIconBg: string; href: string | null;
}

interface QRCard {
  label: string; value: string; icon: LucideIcon; iconBg: string; iconColor: string;
  bg: string; ring: string; hoverBg: string; hoverRing: string; hoverIconBg: string; href: string;
}

// ─── Data ───
const statCards: StatCard[] = [
  { label: "Total Users", value: "3,265", icon: Users, iconBg: "bg-blue-100", iconColor: "text-blue-600", badge: "Users", badgeBg: "bg-blue-50", badgeColor: "text-blue-700", borderAccent: "border-t-blue-500", hoverBorder: "hover:border-t-blue-600", hoverIconBg: "hover:bg-blue-200", href: "/dashboard/users" },
  { label: "Total Dealers", value: "350", icon: Home, iconBg: "bg-indigo-100", iconColor: "text-indigo-600", badge: "Dealers", badgeBg: "bg-indigo-50", badgeColor: "text-indigo-700", borderAccent: "border-t-indigo-500", hoverBorder: "hover:border-t-indigo-600", hoverIconBg: "hover:bg-indigo-200", href: "/dashboard/users/dealers" },
  { label: "Total Electricians", value: "2,915", icon: Zap, iconBg: "bg-amber-100", iconColor: "text-amber-600", badge: "Electricians", badgeBg: "bg-amber-50", badgeColor: "text-amber-700", borderAccent: "border-t-amber-500", hoverBorder: "hover:border-t-amber-600", hoverIconBg: "hover:bg-amber-200", href: "/dashboard/users/electricians" },
  { label: "Active Categories", value: "29", icon: LayoutGrid, iconBg: "bg-purple-100", iconColor: "text-purple-600", badge: "Category", badgeBg: "bg-purple-50", badgeColor: "text-purple-700", borderAccent: "border-t-purple-500", hoverBorder: "hover:border-t-purple-600", hoverIconBg: "hover:bg-purple-200", href: "/dashboard/product/category" },
];

const kycCards: KYCCard[] = [
  { label: "Rejected KYC", value: "658", icon: UserX, bg: "bg-red-50", border: "border-red-200", labelColor: "text-red-700", valueColor: "text-red-800", iconBg: "bg-red-100", iconColor: "text-red-600", hoverBg: "hover:bg-red-100", hoverBorder: "hover:border-red-400", href: "/dashboard/kyc-users/rejected" },
  { label: "Pending KYC", value: "0", icon: Clock, bg: "bg-amber-50", border: "border-amber-200", labelColor: "text-amber-700", valueColor: "text-amber-800", iconBg: "bg-amber-100", iconColor: "text-amber-600", hoverBg: "hover:bg-amber-100", hoverBorder: "hover:border-amber-400", href: "/dashboard/kyc-users/pending" },
  { label: "Completed KYC", value: "2,607", icon: UserCheck, bg: "bg-green-50", border: "border-green-200", labelColor: "text-green-700", valueColor: "text-green-800", iconBg: "bg-green-100", iconColor: "text-green-600", hoverBg: "hover:bg-green-100", hoverBorder: "hover:border-green-400", href: "/dashboard/kyc-users/complete" },
];

const activityCards: ActivityCard[] = [
  { label: "Products Listed", value: "274", icon: FileText, iconBg: "bg-slate-100", iconColor: "text-slate-600", accent: "border-l-4 border-l-slate-400", hoverAccent: "hover:border-l-slate-600", hoverIconBg: "hover:bg-slate-200", href: "/dashboard/product/product-list" },
  { label: "Withdrawn Points", value: "₹51,440.70", icon: Wallet, iconBg: "bg-emerald-100", iconColor: "text-emerald-600", accent: "border-l-4 border-l-emerald-400", hoverAccent: "hover:border-l-emerald-600", hoverIconBg: "hover:bg-emerald-200", href: "/dashboard/payment/withdrawal" },
  { label: "Open Enquiries", value: "5", icon: HelpCircle, iconBg: "bg-rose-100", iconColor: "text-rose-600", accent: "border-l-4 border-l-rose-400", hoverAccent: "hover:border-l-rose-600", hoverIconBg: "hover:bg-rose-200", href: "/dashboard/others/enquiry" },
  { label: "Top Redeem Points", value: "24,304", icon: Trophy, iconBg: "bg-yellow-100", iconColor: "text-yellow-600", accent: "border-l-4 border-l-yellow-400", hoverAccent: "hover:border-l-yellow-500", hoverIconBg: "hover:bg-yellow-200", href: "/dashboard/payment/top-redeem" },
];

const qrCards: QRCard[] = [
  { label: "Total QR Codes Generated", value: "6,794,333", icon: QrCode, iconBg: "bg-slate-100", iconColor: "text-slate-600", bg: "bg-slate-50", ring: "ring-1 ring-cyan-200", hoverBg: "hover:bg-slate-100", hoverRing: "hover:ring-slate-400", hoverIconBg: "hover:bg-slate-200", href: "/dashboard/all-qr-codes" },
  { label: "QR Codes Redeemed", value: "24,304", icon: Activity, iconBg: "bg-cyan-100", iconColor: "text-cyan-600", bg: "bg-slate-50", ring: "ring-1 ring-cyan-200", hoverBg: "hover:bg-slate-100", hoverRing: "hover:ring-cyan-400", hoverIconBg: "hover:bg-cyan-200", href: "/dashboard/qr-codes" },
];

// ─── Components ───
const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3 px-1">
    {children}
  </p>
);

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Platform-wide metrics overview</p>
        </div>
        <span className="text-xs font-medium text-slate-500 bg-white border border-slate-200 rounded-lg px-4 py-2 shadow-sm">
          {today}
        </span>
      </div>

      {/* User Summary */}
      <SectionLabel>User Summary</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => (
          <Link key={i} href={card.href} className={`bg-white rounded-xl border border-slate-200 border-t-4 ${card.borderAccent} ${card.hoverBorder} p-5 flex flex-col gap-4 transition-all hover:shadow-md hover:-translate-y-1`}>
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${card.iconBg} ${card.iconColor} transition-colors`}><card.icon size={18} /></div>
              <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${card.badgeBg} ${card.badgeColor}`}>{card.badge}</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{card.value}</p>
              <p className="text-xs text-slate-500 mt-1">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* KYC Status */}
      <SectionLabel>KYC Status</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kycCards.map((card, i) => (
          <Link key={i} href={card.href} className={`rounded-xl border p-5 ${card.bg} ${card.border} ${card.hoverBg} ${card.hoverBorder} transition-all hover:shadow-md hover:-translate-y-1`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconBg} ${card.iconColor}`}><card.icon size={16} /></div>
              <p className={`text-[11px] font-bold uppercase tracking-wider ${card.labelColor}`}>{card.label}</p>
            </div>
            <p className={`text-3xl font-bold ${card.valueColor}`}>{card.value}</p>
          </Link>
        ))}
      </div>

      {/* Activity & QR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        <div>
          <SectionLabel>Platform Activity</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {activityCards.map((card, i) => {
              const content = (
                <div className="flex items-center gap-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.iconBg} ${card.iconColor}`}><card.icon size={20} /></div>
                  <div>
                    <p className="text-lg font-bold text-slate-800">{card.value}</p>
                    <p className="text-xs text-slate-500">{card.label}</p>
                  </div>
                </div>
              );
              return card.href ? (
                <Link key={i} href={card.href} className={`bg-white rounded-xl border border-slate-200 p-5 ${card.accent} hover:shadow-md transition-all`}>{content}</Link>
              ) : (
                <div key={i} className={`bg-white rounded-xl border border-slate-200 p-5 ${card.accent}`}>{content}</div>
              );
            })}
          </div>
        </div>

        <div>
          <SectionLabel>QR Code Activity</SectionLabel>
          <div className="flex flex-col gap-4">
            {qrCards.map((card, i) => (
              <Link key={i} href={card.href} className={`rounded-xl border p-5 flex items-center gap-5 ${card.bg} ${card.ring} hover:shadow-md transition-all`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${card.iconBg} ${card.iconColor}`}><card.icon size={24} /></div>
                <div>
                  <p className="text-xl font-bold text-slate-800">{card.value}</p>
                  <p className="text-xs text-slate-500 font-medium">{card.label}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}