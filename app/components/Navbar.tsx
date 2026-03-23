// "use client";

// import { useState, useRef, useEffect } from "react";
// import Image from "next/image";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   // 👉 Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event: any) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="w-full bg-[#0B1F3A] text-white px-6 py-3 flex justify-between items-center shadow">

//       {/* LEFT TITLE */}
//       <h1 className="text-lg font-semibold">SRV Electricals</h1>

//       {/* RIGHT PROFILE */}
//       <div className="relative" ref={dropdownRef}>
        
//         {/* PROFILE IMAGE */}
//         <div
//           onClick={() => setOpen(!open)}
//           className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-white"
//         >
//           <Image
//             src="/srv.png"
//             alt="Admin"
//             width={40}
//             height={40}
//           />
//         </div>

//         {/* DROPDOWN */}
//         {open && (
//           <div className="absolute right-0 mt-3 w-44 bg-white text-black rounded-lg shadow-lg overflow-hidden animate-fadeIn">
            
//             <div className="px-4 py-2 border-b font-semibold">
//               Admin
//             </div>

//             <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition">
//               Profile
//             </button>

//             <button className="w-full text-left px-4 py-2 hover:bg-gray-100 transition text-red-500">
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <div className="w-full bg-[#0B1F3A] border-b border-[#0B1F3A] px-6 flex justify-between items-center" style={{ height: "60px" }}>

      {/* LEFT TITLE */}
      <h1 className="text-sm font-semibold text-white">SRV Electricals</h1>

      {/* RIGHT PROFILE */}
      <div className="relative" ref={dropdownRef}>

        {/* PROFILE AVATAR */}
        <div
          onClick={() => setOpen(!open)}
          className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-2 border-slate-200 hover:border-blue-400 transition-all"
        >
          <Image src="/srv.png" alt="Admin" width={32} height={32} className="object-contain" />
        </div>

        {/* DROPDOWN */}
        {open && (
          <div className="absolute right-0 mt-2 w-44 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
            <div className="px-4 py-2.5 border-b border-slate-100">
              <p className="text-xs font-semibold text-slate-800">Admin</p>
              <p className="text-[10px] text-slate-400">admin@srv.com</p>
            </div>
            <button className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
              <User size={13} className="text-slate-400" />
              Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-rose-500 hover:bg-rose-50 transition-colors border-t border-slate-100"
            >
              <LogOut size={13} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}