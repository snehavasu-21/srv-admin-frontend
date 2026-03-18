import DashboardCard from "./components/DashboardCard";

import {
  Users,
  UserCheck,
  Zap,
  Layers,
  Package,
  Clock,
  CheckCircle,
  AlertCircle,
  Wallet,
  HelpCircle,
  Barcode,
  ScanLine,
} from "lucide-react";

export default function Page() {
  const cards = [
    { title: "Total Users", value: 3226, color: "bg-red-500", icon: <Users /> },
    { title: "Total Dealers", value: 346, color: "bg-green-500", icon: <UserCheck /> },
    { title: "Total Electricians", value: 2880, color: "bg-yellow-500", icon: <Zap /> },
    { title: "Category", value: 29, color: "bg-green-600", icon: <Layers /> },

    { title: "Product", value: 274, color: "bg-yellow-500", icon: <Package /> },
    { title: "Incomplete KYC", value: 656, color: "bg-blue-500", icon: <AlertCircle /> },
    { title: "Pending KYC", value: 1, color: "bg-blue-400", icon: <Clock /> },
    { title: "Completed KYC", value: 2569, color: "bg-yellow-500", icon: <CheckCircle /> },

    { title: "Withdraw Points", value: "₹49405", color: "bg-green-600", icon: <Wallet /> },
    { title: "Enquiry", value: 5, color: "bg-red-500", icon: <HelpCircle /> },
    { title: "QR Code", value: 6783266, color: "bg-red-600", icon: <Barcode /> },
    { title: "Redeemed QR Code", value: 23239, color: "bg-green-600", icon: <ScanLine /> },
  ];

  return (
    <div className="grid gap-5 [grid-template-columns:repeat(auto-fit,minmax(250px,1fr))]">
      {cards.map((card, i) => (
        <DashboardCard key={i} {...card} />
      ))}
    </div>
  );
}