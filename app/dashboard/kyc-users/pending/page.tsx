"use client";

import Image from "next/image";
import { useState } from "react";

export default function PendingKYCPage() {
  const [search, setSearch] = useState("");

  // ✅ Dummy Data (replace later with API)
  const users = [
    {
      id: 3168,
      type: "Dealer",
      name: "Vijay Kumar",
      phone: "6239556299",
      address: "Firozpur, Punjab, India",
      aadhaarFront: "/aadhaar-front.png",
      aadhaarBack: "/aadhaar-back.png",
      pancard: "/pan.png",
      gst: "FTWPK7422Q",
      status: "Pending",
    },
  ];

  // ✅ Search Filter
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Pending KYC Users
        </h1>

        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* MAIN CARD */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">

            {/* TABLE HEAD */}
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-3">User ID</th>
                <th className="p-3">Type</th>
                <th className="p-3">Name</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Address</th>
                <th className="p-3">Aadhaar</th>
                <th className="p-3">PAN</th>
                <th className="p-3">GST</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.type}</td>
                  <td className="p-3 font-medium">{user.name}</td>
                  <td className="p-3">{user.phone}</td>
                  <td className="p-3">{user.address}</td>

                  {/* Aadhaar Images */}
                  <td className="p-3 flex gap-2">
                    <Image
                      src={user.aadhaarFront}
                      alt="front"
                      width={40}
                      height={40}
                      className="rounded border hover:scale-110 transition cursor-pointer"
                    />
                    <Image
                      src={user.aadhaarBack}
                      alt="back"
                      width={40}
                      height={40}
                      className="rounded border hover:scale-110 transition cursor-pointer"
                    />
                  </td>

                  {/* PAN */}
                  <td className="p-3">
                    <Image
                      src={user.pancard}
                      alt="pan"
                      width={40}
                      height={40}
                      className="rounded border hover:scale-110 transition cursor-pointer"
                    />
                  </td>

                  <td className="p-3">{user.gst}</td>

                  {/* STATUS BADGE */}
                  <td className="p-3">
                    <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                      {user.status}
                    </span>
                  </td>

                  {/* ACTION BUTTONS */}
                  <td className="p-3 space-x-2">

                    <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                      View
                    </button>

                    <button className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition">
                      Approve
                    </button>

                    <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                      Reject
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* EMPTY STATE */}
      {filteredUsers.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No pending KYC users found
        </div>
      )}
    </div>
  );
}