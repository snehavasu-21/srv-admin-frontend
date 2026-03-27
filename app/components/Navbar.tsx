"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link for navigation
import { useRouter } from "next/navigation"; 

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const router = useRouter(); 

  // 👉 Close dropdown when clicking outside
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleClickOutside = (event: any) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout Function
  const handleLogout = () => {
    // localStorage.clear(); 
    router.push("/login"); 
  };

  return (
    <div className="w-full bg-[#0B1F3A] text-white px-6 py-3 flex justify-between items-center shadow">

      {/* LEFT TITLE - Wrapped in Link for redirection and pointer cursor */}
      <Link href="/dashboard" className="cursor-pointer">
        <h1 className="text-lg font-semibold hover:text-blue-300 transition-colors">
          SRV Electricals
        </h1>
      </Link>

      {/* RIGHT PROFILE */}
      <div className="relative" ref={dropdownRef}>
        
        {/* PROFILE IMAGE */}
        <div
          onClick={() => setOpen(!open)}
          className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-white"
        >
          <Image
            src="/icon.svg"
            alt="Admin"
            width={40}
            height={40}
          />
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-3 w-44 bg-white text-black rounded-lg shadow-lg overflow-hidden animate-fadeIn z-50">
            
            <div className="px-4 py-2 border-b font-semibold bg-gray-50">
              Admin Profile
            </div>

            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition">
              Profile
            </button>

            <button 
              onClick={handleLogout}               
              className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-500 font-medium"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}