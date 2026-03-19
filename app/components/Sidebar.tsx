"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  // ✅ UPDATED ROUTE MAPPING WITH /dashboard
  const getRoute = (menu: string, sub?: string) => {
    if (menu === "Users") {
      if (sub === "Electrician") return "/dashboard/users/electricians";
      if (sub === "Dealers") return "/dashboard/users/dealers";
    }

    if (menu === "KYC Users") {
      if (sub === "Incomplete KYC") return "/dashboard/kyc-users/incomplete";
      if (sub === "Pending KYC") return "/dashboard/kyc-users/pending";
      if (sub === "Completed KYC") return "/dashboard/kyc-users/complete";
    }

    if (menu === "Payment") {
      if (sub === "Wallet History") return "/dashboard/payment/wallet-history";
      if (sub === "Withdrawal") return "/dashboard/payment/withdrawal";
      if (sub === "Top Redeem Electrician") return "/dashboard/payment/top-redeem";
    }

    if (menu === "Product") {
      if (sub === "Category") return "/dashboard/product/category";
      if (sub === "Product") return "/dashboard/product/product-list";
    }

    if (menu === "Others") {
      if (sub === "Enquiry") return "/dashboard/others/enquiry";
      if (sub === "Offer") return "/dashboard/others/offer";
      if (sub === "Testimonial") return "/dashboard/others/testimonial";
      if (sub === "Plan Range") return "/dashboard/others/plan-range";
      if (sub === "Banner") return "/dashboard/others/banner";
    }

    if (menu === "Settings") {
      if (sub === "General Settings") return "/dashboard/settings/general";
      if (sub === "Pages Settings") return "/dashboard/settings/pages";
      if (sub === "FAQ") return "/dashboard/settings/faq";
    }

    return "/dashboard";
  };

  const menus = [
    { name: "Dashboard", link: "/dashboard" },

    { name: "Users", submenu: ["Electrician", "Dealers"] },

    {
      name: "KYC Users",
      submenu: ["Incomplete KYC", "Pending KYC", "Completed KYC"],
    },

    {
      name: "Payment",
      submenu: ["Wallet History", "Withdrawal", "Top Redeem Electrician"],
    },

    {
      name: "Product",
      submenu: ["Category", "Product"],
    },

    // ✅ NORMAL LINKS (UPDATED)
    {
      name: "Gift Store Product",
      link: "/dashboard/gift-store-product",
    },
    {
      name: "Gift Store Order",
      link: "/dashboard/gift-store-order",
    },
    {
      name: "QR Codes",
      link: "/dashboard/qr-codes",
    },
    {
      name: "All QR Codes",
      link: "/dashboard/all-qr-codes",
    },

    {
      name: "Others",
      submenu: ["Enquiry", "Offer", "Testimonial", "Plan Range", "Banner"],
    },

    {
      name: "Settings",
      submenu: ["General Settings", "Pages Settings", "FAQ"],
    },
  ];

  return (
    <div className="w-64 bg-[#0B1F3A] text-white flex flex-col h-screen">

      {/* Logo */}
      <div className="p-4 flex items-center gap-2 border-b border-gray-700">
        <div className="w-10 h-10 relative">
          <Image src="/srv.png" alt="SRV Logo" fill className="object-contain" />
        </div>
        <div>
          <h1 className="text-sm font-bold">SRV</h1>
          <p className="text-xs text-gray-300">always improving</p>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">

        {menus.map((menu, index) => (
          <div key={index}>

            {/* DROPDOWN */}
            {menu.submenu ? (
              <>
                <button
                  onClick={() => toggleMenu(menu.name)}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-blue-700 transition flex justify-between items-center"
                >
                  {menu.name}
                  <span>{openMenu === menu.name ? "▲" : "▼"}</span>
                </button>

                {openMenu === menu.name && (
                  <div className="ml-4 mt-1 space-y-1">
                    {menu.submenu.map((sub, i) => (
                      <Link
                        key={i}
                        href={getRoute(menu.name, sub)}
                        className="block px-4 py-2 text-sm rounded-md hover:bg-blue-600 transition"
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link
                href={menu.link!}
                className="block px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                {menu.name}
              </Link>
            )}

          </div>
        ))}

      </nav>
    </div>
  );
}