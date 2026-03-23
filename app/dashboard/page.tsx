
// // "use client"; // Agar aap icons ya animations use kar rahe hain toh ye zaroori hai

// // import DashboardCard from "../components/DashboardCard";
// // import * as lucideReact from "lucide-react";

// // // 1. Ensure karein ki 'export default function' likha ho
// // export default function DashboardPage() {
// //   const cards = [
// //     { title: "Total Users", value: "3,244", color: "text-rose-500", bgColor: "bg-rose-50", icon: <lucideReact.Users size={24} /> },
// //     { title: "Total Dealers", value: "350", color: "text-emerald-600", bgColor: "bg-emerald-50", icon: <lucideReact.Building2 size={24} /> },
// //     { title: "Total Electricians", value: "2,894", color: "text-amber-500", bgColor: "bg-amber-50", icon: <lucideReact.Zap size={24} /> },
// //     { title: "Category", value: "29", color: "text-indigo-500", bgColor: "bg-indigo-50", icon: <lucideReact.Layers2 size={24} /> },
    
// //     { title: "Product", value: "274", color: "text-orange-500", bgColor: "bg-orange-50", icon: <lucideReact.Package size={24} /> },
// //     { title: "Incomplete KYC", value: "659", color: "text-blue-600", bgColor: "bg-blue-50", icon: <lucideReact.UserPlus size={24} /> },
// //     { title: "Pending KYC", value: "2", color: "text-sky-500", bgColor: "bg-sky-50", icon: <lucideReact.Clock size={24} /> },
// //     { title: "Completed KYC", value: "2,583", color: "text-teal-500", bgColor: "bg-teal-50", icon: <lucideReact.UserCheck size={24} /> },
    
// //     { title: "Withdraw Points", value: "₹49,405", color: "text-green-600", bgColor: "bg-green-50", icon: <lucideReact.Wallet size={24} /> },
// //     { title: "Enquiry", value: "5", color: "text-pink-600", bgColor: "bg-pink-50", icon: <lucideReact.HelpCircle size={24} /> },
// //     { title: "QR Code", value: "6,783,267", color: "text-slate-700", bgColor: "bg-slate-100", icon: <lucideReact.Barcode size={24} /> },
// //     { title: "Redeemed QRCode", value: "23,677", color: "text-cyan-600", bgColor: "bg-cyan-50", icon: <lucideReact.Scan size={24} /> },
// //   ];

// //   return (
// //     <div className="p-8 bg-[#F8FAFC] min-h-screen">
// //       {/* <div className="mb-10">
// //         <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Dashboard Overview</h1>
// //         <p className="text-slate-500 mt-2 font-medium">Welcome back, Admin. Here is what's happening today.</p>
// //       </div> */}

// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
// //         {cards.map((card, index) => (
// //           <DashboardCard key={index} {...card} />
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }








// "use client";

// import React from 'react';
// import { 
//   Users, Building2, Zap, Layers2, Package, UserPlus, 
//   Clock, UserCheck, Wallet, HelpCircle, Barcode, Scan 
// } from "lucide-react";

// export default function DashboardPage() {
//   const cards = [
//     { title: "Total Users", value: "3,265", icon: <Users size={24} />, color: "from-blue-500 to-cyan-400" },
//     { title: "Total Dealers", value: "350", icon: <Building2 size={24} />, color: "from-indigo-500 to-purple-500" },
//     { title: "Total Electricians", value: "2,915", icon: <Zap size={24} />, color: "from-amber-400 to-orange-500" },
//     { title: "Category", value: "29", icon: <Layers2 size={24} />, color: "from-purple-500 to-pink-500" },
    
//     { title: "Product", value: "274", icon: <Package size={24} />, color: "from-orange-400 to-red-500" },
//     { title: "Incomplete KYC", value: "658", icon: <UserPlus size={24} />, color: "from-rose-500 to-pink-600" },
//     { title: "Pending KYC", value: "0", icon: <Clock size={24} />, color: "from-slate-400 to-slate-600" },
//     { title: "Completed KYC", value: "2,607", icon: <UserCheck size={24} />, color: "from-emerald-400 to-teal-500" },
    
//     { title: "Withdraw Points", value: "₹51,440.7", icon: <Wallet size={24} />, color: "from-green-500 to-emerald-600" },
//     { title: "Enquiry", value: "5", icon: <HelpCircle size={24} />, color: "from-pink-500 to-rose-500" },
//     { title: "QR Code", value: "6,794,333", icon: <Barcode size={24} />, color: "from-slate-700 to-slate-900" },
//     { title: "Redeemed QRcode", value: "24,304", icon: <Scan size={24} />, color: "from-cyan-500 to-blue-600" },
//   ];

//   return (
//     <div className="p-6 md:p-10 bg-[#F4F7FE] min-h-screen font-sans">
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {cards.map((card, index) => (
//           <div 
//             key={index} 
//             className="group relative bg-white rounded-[2rem] p-6 shadow-xl shadow-slate-200/50 border border-white hover:scale-[1.03] transition-all duration-300 overflow-hidden flex flex-col justify-between min-h-[170px]"
//           >
//             <div className="flex justify-between items-start">
//               <div className={`p-3 rounded-2xl bg-gradient-to-br ${card.color} text-white shadow-lg`}>
//                 {card.icon}
//               </div>
//               {/* FIXED: whitespace-nowrap for single line & font-black for extra bold */}
//               <p className="text-[11px] font-black text-slate-950 uppercase tracking-widest text-right whitespace-nowrap ml-2">
//                 {card.title}
//               </p>
//             </div>

//             <div className="mt-4">
//               {/* FIXED: font-black for extra bold values */}
//               <h3 className="text-3xl font-black text-slate-950 tracking-tighter group-hover:text-blue-600 transition-colors">
//                 {card.value}
//               </h3>
              
//               <div className="w-full bg-slate-100 h-1 mt-3 rounded-full overflow-hidden">
//                 <div className={`h-full bg-gradient-to-r ${card.color} w-2/3 opacity-30`}></div>
//               </div>
//             </div>

//             <div className={`absolute -bottom-6 -right-6 w-24 h-24 bg-gradient-to-br ${card.color} opacity-[0.03] rounded-full group-hover:opacity-[0.08] transition-opacity`}></div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }






"use client";

import {
  Users, Home, Zap, LayoutGrid, FileText, Wallet,
  HelpCircle, QrCode, Activity, UserCheck, UserX, Clock,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const statCards = [
  {
    label: "Total Users",
    value: "3,265",
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    badge: "Users",
    badgeBg: "bg-blue-50",
    badgeColor: "text-blue-700",
    borderAccent: "border-t-blue-500",
    hoverBorder: "hover:border-t-blue-600",
    hoverIconBg: "hover:bg-blue-200",
  },
  {
    label: "Total Dealers",
    value: "350",
    icon: Home,
    iconBg: "bg-indigo-100",
    iconColor: "text-indigo-600",
    badge: "Dealers",
    badgeBg: "bg-indigo-50",
    badgeColor: "text-indigo-700",
    borderAccent: "border-t-indigo-500",
    hoverBorder: "hover:border-t-indigo-600",
    hoverIconBg: "hover:bg-indigo-200",
  },
  {
    label: "Total Electricians",
    value: "2,915",
    icon: Zap,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    badge: "Electricians",
    badgeBg: "bg-amber-50",
    badgeColor: "text-amber-700",
    borderAccent: "border-t-amber-500",
    hoverBorder: "hover:border-t-amber-600",
    hoverIconBg: "hover:bg-amber-200",
  },
  {
    label: "Active Categories",
    value: "29",
    icon: LayoutGrid,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    badge: "Category",
    badgeBg: "bg-purple-50",
    badgeColor: "text-purple-700",
    borderAccent: "border-t-purple-500",
    hoverBorder: "hover:border-t-purple-600",
    hoverIconBg: "hover:bg-purple-200",
  },
];

const kycCards = [
  {
    label: "Incomplete KYC",
    value: "658",
    icon: UserX,
    bg: "bg-red-50",
    border: "border-red-200",
    labelColor: "text-red-700",
    valueColor: "text-red-800",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    hoverBg: "hover:bg-red-100",
    hoverBorder: "hover:border-red-400",
  },
  {
    label: "Pending KYC",
    value: "0",
    icon: Clock,
    bg: "bg-amber-50",
    border: "border-amber-200",
    labelColor: "text-amber-700",
    valueColor: "text-amber-800",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
    hoverBg: "hover:bg-amber-100",
    hoverBorder: "hover:border-amber-400",
  },
  {
    label: "Completed KYC",
    value: "2,607",
    icon: UserCheck,
    bg: "bg-green-50",
    border: "border-green-200",
    labelColor: "text-green-700",
    valueColor: "text-green-800",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    hoverBg: "hover:bg-green-100",
    hoverBorder: "hover:border-green-400",
  },
];

const activityCards = [
  {
    label: "Products Listed",
    value: "274",
    icon: FileText,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    accent: "border-l-4 border-l-slate-400",
    hoverAccent: "hover:border-l-slate-600",
    hoverIconBg: "hover:bg-slate-200",
  },
  {
    label: "Withdrawn Points",
    value: "₹51,440.70",
    icon: Wallet,
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    accent: "border-l-4 border-l-emerald-400",
    hoverAccent: "hover:border-l-emerald-600",
    hoverIconBg: "hover:bg-emerald-200",
  },
  {
    label: "Open Enquiries",
    value: "5",
    icon: HelpCircle,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-600",
    accent: "border-l-4 border-l-rose-400",
    hoverAccent: "hover:border-l-rose-600",
    hoverIconBg: "hover:bg-rose-200",
  },
];

const qrCards = [
  {
    label: "Total QR Codes Generated",
    value: "6,794,333",
    icon: QrCode,
    iconBg: "bg-slate-100",
    iconColor: "text-slate-600",
    bg: "bg-slate-50",
    ring: "ring-1 ring-cyan-200",
    hoverBg: "hover:bg-slate-100",
    hoverRing: "hover:ring-slate-400",
    hoverIconBg: "hover:bg-slate-200",
  },
  {
    label: "QR Codes Redeemed",
    value: "24,304",
    icon: Activity,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    bg: "bg-slate-50",
    ring: "ring-1 ring-cyan-200",
    hoverBg: "hover:bg-slate-100",
    hoverRing: "hover:ring-cyan-400",
    hoverIconBg: "hover:bg-cyan-200",
  },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function SectionLabel({ children }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-6 mb-3">
      {children}
    </p>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8 font-sans">

      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-3 mb-2">
        <div>
          <h1 className="text-xl font-semibold text-slate-800">Admin Dashboard</h1>
          <p className="text-sm text-slate-500 mt-0.5">Platform-wide metrics overview</p>
        </div>
        <span className="text-xs text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
          {today}
        </span>
      </div>

      {/* User Summary */}
      <SectionLabel>User Summary</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`
                bg-white rounded-xl border border-slate-200 border-t-4
                ${card.borderAccent} ${card.hoverBorder}
                p-5 flex flex-col gap-4
                transition-all duration-200 ease-in-out
                hover:shadow-md hover:-translate-y-0.5 cursor-pointer
              `}
            >
              <div className="flex items-center justify-between">
                <div
                  className={`
                    w-10 h-10 rounded-xl flex items-center justify-center
                    ${card.iconBg} ${card.iconColor} ${card.hoverIconBg}
                    transition-colors duration-200
                  `}
                >
                  <Icon size={18} />
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${card.badgeBg} ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>
              <div>
                <p className="text-2xl font-semibold text-slate-800">{card.value}</p>
                <p className="text-xs text-slate-500 mt-1">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* KYC Status */}
      <SectionLabel>KYC Status</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kycCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`
                rounded-xl border p-5
                ${card.bg} ${card.border}
                ${card.hoverBg} ${card.hoverBorder}
                transition-all duration-200 ease-in-out
                hover:shadow-md hover:-translate-y-0.5 cursor-pointer
              `}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconBg} ${card.iconColor}`}>
                  <Icon size={16} />
                </div>
                <p className={`text-xs font-semibold uppercase tracking-wide ${card.labelColor}`}>
                  {card.label}
                </p>
              </div>
              <p className={`text-3xl font-semibold ${card.valueColor}`}>{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Platform Activity */}
      <SectionLabel>Platform Activity</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {activityCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`
                bg-white rounded-xl border border-slate-200 p-5
                ${card.accent} ${card.hoverAccent}
                transition-all duration-200 ease-in-out
                hover:shadow-md hover:-translate-y-0.5 hover:bg-slate-50 cursor-pointer
              `}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-10 h-10 rounded-xl flex items-center justify-center
                    ${card.iconBg} ${card.iconColor} ${card.hoverIconBg}
                    transition-colors duration-200
                  `}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-slate-800">{card.value}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{card.label}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* QR Code Activity */}
      <SectionLabel>QR Code Activity</SectionLabel>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {qrCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`
                rounded-xl border p-5 flex items-center gap-4
                ${card.bg} ${card.ring}
                ${card.hoverBg} ${card.hoverRing}
                transition-all duration-200 ease-in-out
                hover:shadow-md hover:-translate-y-0.5 cursor-pointer
              `}
            >
              <div
                className={`
                  w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                  ${card.iconBg} ${card.iconColor} ${card.hoverIconBg}
                  transition-colors duration-200
                `}
              >
                <Icon size={20} />
              </div>
              <div>
                <p className="text-xl font-semibold text-slate-800">{card.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{card.label}</p>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}