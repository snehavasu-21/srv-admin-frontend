"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Sidebar() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menus = [
  {
    name: "Dashboard",
    link: "/",
  },
  {
    name: "Users",
    submenu: ["Electrician", "Dealers"],
  },
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

  // ✅ NEW NORMAL MENUS (NO DROPDOWN)
  {
    name: "Gift Store Product",
    link: "/gift-store-product",
  },
  {
    name: "Gift Store Order",
    link: "/gift-store-order",
  },
  {
    name: "QR Codes",
    link: "/qr-codes",
  },
  {
    name: "All QR Codes",
    link: "/all-qr-codes",
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
          <Image
            src="/srv.png"
            alt="SRV Logo"
            fill
            className="object-contain"
          />
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

            {/* Main Menu */}
            {menu.submenu ? (
              <>
                <button
                  onClick={() => toggleMenu(menu.name)}
                  className="w-full text-left px-4 py-2 rounded-md hover:bg-blue-700 transition flex justify-between items-center"
                >
                  {menu.name}
                  <span>
                    {openMenu === menu.name ? "▲" : "▼"}
                  </span>
                </button>

                {/* Submenu */}
                {openMenu === menu.name && (
                  <div className="ml-4 mt-1 space-y-1">
                    {menu.submenu.map((sub, i) => (
                      <Link
                        key={i}
                        href="#"
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
                href={menu.link}
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