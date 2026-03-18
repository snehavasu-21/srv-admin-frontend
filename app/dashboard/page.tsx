// app/page.tsx
import DashboardCard from "../components/DashboardCard";
import { 
  Users, 
  Building2, 
  Zap, 
  Layers2, 
  Package, 
  UserPlus, 
  Clock, // Changed from UserClock
  UserCheck, 
  Wallet, 
  HelpCircle, 
  Barcode, 
  Scan 
} from "lucide-react";

export default function DashboardPage() {
  const cards = [
    { title: "Total Users", value: "3244", color: "bg-red-500", icon: <Users size={28} /> },
    { title: "Total Dealers", value: "350", color: "bg-green-600", icon: <Building2 size={28} /> },
    { title: "Total Electricians", value: "2894", color: "bg-yellow-500", icon: <Zap size={28} /> },
    { title: "Category", value: "29", color: "bg-emerald-500", icon: <Layers2 size={28} /> },
    
    { title: "Product", value: "274", color: "bg-amber-400", icon: <Package size={28} /> },
    { title: "Incomplete KYC", value: "659", color: "bg-blue-500", icon: <UserPlus size={28} /> },
    { title: "Pending KYC", value: "2", color: "bg-sky-400", icon: <Clock size={28} /> }, // Fixed
    { title: "Completed KYC", value: "2583", color: "bg-amber-400", icon: <UserCheck size={28} /> },
    
    { title: "Withdraw Points", value: "₹49405", color: "bg-emerald-600", icon: <Wallet size={28} /> },
    { title: "Enquiry", value: "5", color: "bg-rose-500", icon: <HelpCircle size={28} /> },
    { title: "QR Code", value: "6783267", color: "bg-red-600", icon: <Barcode size={28} /> },
    { title: "Redeemed QRCode", value: "23677", color: "bg-emerald-600", icon: <Scan size={28} /> },
  ];

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>
      </div>
  );
}