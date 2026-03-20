// // app/page.tsx
// import DashboardCard from "../components/DashboardCard";
// import { 
//   Users, 
//   Building2, 
//   Zap, 
//   Layers2, 
//   Package, 
//   UserPlus, 
//   Clock, // Changed from UserClock
//   UserCheck, 
//   Wallet, 
//   HelpCircle, 
//   Barcode, 
//   Scan 
// } from "lucide-react";

// export default function DashboardPage() {
//   const cards = [
//     { title: "Total Users", value: "3244", color: "bg-red-500", icon: <Users size={28} /> },
//     { title: "Total Dealers", value: "350", color: "bg-green-600", icon: <Building2 size={28} /> },
//     { title: "Total Electricians", value: "2894", color: "bg-yellow-500", icon: <Zap size={28} /> },
//     { title: "Category", value: "29", color: "bg-emerald-500", icon: <Layers2 size={28} /> },
    
//     { title: "Product", value: "274", color: "bg-amber-400", icon: <Package size={28} /> },
//     { title: "Incomplete KYC", value: "659", color: "bg-blue-500", icon: <UserPlus size={28} /> },
//     { title: "Pending KYC", value: "2", color: "bg-sky-400", icon: <Clock size={28} /> }, // Fixed
//     { title: "Completed KYC", value: "2583", color: "bg-amber-400", icon: <UserCheck size={28} /> },
    
//     { title: "Withdraw Points", value: "₹49405", color: "bg-emerald-600", icon: <Wallet size={28} /> },
//     { title: "Enquiry", value: "5", color: "bg-rose-500", icon: <HelpCircle size={28} /> },
//     { title: "QR Code", value: "6783267", color: "bg-red-600", icon: <Barcode size={28} /> },
//     { title: "Redeemed QRCode", value: "23677", color: "bg-emerald-600", icon: <Scan size={28} /> },
//   ];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {cards.map((card, index) => (
//           <DashboardCard key={index} {...card} />
//         ))}
//       </div>
//       </div>
//   );
// }



"use client"; // Agar aap icons ya animations use kar rahe hain toh ye zaroori hai

import DashboardCard from "../components/DashboardCard";
import * as lucideReact from "lucide-react";

// 1. Ensure karein ki 'export default function' likha ho
export default function DashboardPage() {
  const cards = [
    { title: "Total Users", value: "3,244", color: "text-rose-500", bgColor: "bg-rose-50", icon: <lucideReact.Users size={24} /> },
    { title: "Total Dealers", value: "350", color: "text-emerald-600", bgColor: "bg-emerald-50", icon: <lucideReact.Building2 size={24} /> },
    { title: "Total Electricians", value: "2,894", color: "text-amber-500", bgColor: "bg-amber-50", icon: <lucideReact.Zap size={24} /> },
    { title: "Category", value: "29", color: "text-indigo-500", bgColor: "bg-indigo-50", icon: <lucideReact.Layers2 size={24} /> },
    
    { title: "Product", value: "274", color: "text-orange-500", bgColor: "bg-orange-50", icon: <lucideReact.Package size={24} /> },
    { title: "Incomplete KYC", value: "659", color: "text-blue-600", bgColor: "bg-blue-50", icon: <lucideReact.UserPlus size={24} /> },
    { title: "Pending KYC", value: "2", color: "text-sky-500", bgColor: "bg-sky-50", icon: <lucideReact.Clock size={24} /> },
    { title: "Completed KYC", value: "2,583", color: "text-teal-500", bgColor: "bg-teal-50", icon: <lucideReact.UserCheck size={24} /> },
    
    { title: "Withdraw Points", value: "₹49,405", color: "text-green-600", bgColor: "bg-green-50", icon: <lucideReact.Wallet size={24} /> },
    { title: "Enquiry", value: "5", color: "text-pink-600", bgColor: "bg-pink-50", icon: <lucideReact.HelpCircle size={24} /> },
    { title: "QR Code", value: "6,783,267", color: "text-slate-700", bgColor: "bg-slate-100", icon: <lucideReact.Barcode size={24} /> },
    { title: "Redeemed QRCode", value: "23,677", color: "text-cyan-600", bgColor: "bg-cyan-50", icon: <lucideReact.Scan size={24} /> },
  ];

  return (
    <div className="p-8 bg-[#F8FAFC] min-h-screen">
      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 mt-2 font-medium">Welcome back, Admin. Here is what&apos;s happening today.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}