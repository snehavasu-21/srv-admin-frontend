"use client";

import {
  Search,
  Eye,
  Edit2,
  CheckCircle,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import Image from "next/image";

export default function PendingKYCPage() {
  const users = [
    {
      id: "3168",
      type: "Dealer",
      name: "Vijay Kumar",
      phone: "6239556299",
      address: "Firozpur, Punjab, India",
      aadhaarFront: "/aadhaar-front.png",
      aadhaarBack: "/aadhaar-back.png",
      pan: "/pan.png",
      gst: "FTWPK7422Q",
      status: "Pending",
    },
  ];

  return (
    <div className="bg-[#F4F7FE] min-h-full font-sans">

      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1B254B]">
          Pending KYC Users
        </h1>
        <p className="text-slate-500 text-sm">
          Manage users waiting for KYC approval
        </p>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex justify-between items-center">
        
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search by name or phone..."
            className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] rounded-xl outline-none focus:ring-2 focus:ring-[#4318FF]"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2 bg-[#F4F7FE] rounded-xl text-sm font-bold hover:bg-slate-100">
          <Filter size={16} /> Filters
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[1.5rem] shadow overflow-hidden">

        {/* 🔥 IMPORTANT SCROLL FIX */}
       <div className="flex-1 p-6 overflow-y-auto">
          
          <table className="min-w-[1200px] w-full text-left">

            {/* HEADER */}
            <thead className="border-b border-slate-50">
              <tr>
                {[
                  "User ID",
                  "Type",
                  "Name",
                  "Phone",
                  "Address",
                  "Aadhaar Front",
                  "Aadhaar Back",
                  "PAN Card",
                  "GST No",
                  "Status",
                  "Action",
                ].map((head) => (
                  <th
                    key={head}
                    className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-slate-50 transition-all"
                >

                  <td className="p-5 text-sm font-bold text-slate-500">
                    {user.id}
                  </td>

                  <td className="p-5 text-sm font-bold text-[#1B254B]">
                    {user.type}
                  </td>

                  <td className="p-5 text-sm font-bold text-[#1B254B]">
                    {user.name}
                  </td>

                  <td className="p-5 text-sm font-bold text-[#1B254B]">
                    {user.phone}
                  </td>

                  <td className="p-5 text-sm text-slate-500 max-w-[200px] truncate">
                    {user.address}
                  </td>

                  {/* IMAGE BOXES */}
                  <td className="p-5">
                    <Image
                      src={user.aadhaarFront}
                      alt="front"
                      width={40}
                      height={40}
                      className="rounded-lg border hover:scale-110 transition cursor-pointer"
                    />
                  </td>

                  <td className="p-5">
                    <Image
                      src={user.aadhaarBack}
                      alt="back"
                      width={40}
                      height={40}
                      className="rounded-lg border hover:scale-110 transition cursor-pointer"
                    />
                  </td>

                  <td className="p-5">
                    <Image
                      src={user.pan}
                      alt="pan"
                      width={40}
                      height={40}
                      className="rounded-lg border hover:scale-110 transition cursor-pointer"
                    />
                  </td>

                  <td className="p-5 text-sm font-bold text-[#1B254B]">
                    {user.gst}
                  </td>

                  {/* STATUS */}
                  <td className="p-5">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold">
                      Pending
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="p-5">
                    <div className="flex gap-2">

                      <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg">
                        <Eye size={18} />
                      </button>

                      <button className="p-2 text-amber-500 hover:bg-amber-50 rounded-lg">
                        <Edit2 size={18} />
                      </button>

                      <button className="p-2 text-green-500 hover:bg-green-50 rounded-lg">
                        <CheckCircle size={18} />
                      </button>

                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                        <XCircle size={18} />
                      </button>

                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>

        </div>

        {/* PAGINATION */}
        <div className="p-5 flex justify-between items-center border-t">
          <span className="text-xs text-slate-400 font-bold">
            Page 1 of 5
          </span>

          <div className="flex gap-2">
            <button className="p-2 bg-[#F4F7FE] rounded">
              <ChevronLeft size={16} />
            </button>

            <button className="w-8 h-8 bg-[#4318FF] text-white rounded text-xs font-bold">
              1
            </button>

            <button className="p-2 bg-[#F4F7FE] rounded">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}