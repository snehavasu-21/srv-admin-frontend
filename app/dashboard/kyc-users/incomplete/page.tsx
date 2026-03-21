"use client";

import { useState } from "react";

export default function IncompleteKYCPage() {
  const [search, setSearch] = useState("");

  const users = [
    {
      id: 3334,
      name: "Sandeep Singh",
      phone: "9417320275",
      address: "7MJ3+H7X, SH21, Mari Nauabad, Algon, Punjab",
      status: "Incomplete",
    },
    {
      id: 3327,
      name: "-",
      phone: "8571063074",
      address: "-",
      status: "Incomplete",
    },
    {
      id: 3323,
      name: "Aman Juneja",
      phone: "7889269954",
      address: "2C6M+P66, Khuban, Punjab",
      status: "Incomplete",
    },
    {
      id: 3312,
      name: "Puneet Kumar",
      phone: "9417345313",
      address: "Mahajan Market Rd, Fazilka",
      status: "Incomplete",
    },
    {
      id: 3303,
      name: "Manjeet Singh",
      phone: "7009976900",
      address: "Green Valley Colony, Mansa",
      status: "Incomplete",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.phone.includes(search)
  );

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">
          Manage Incomplete KYC
        </h1>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search here..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">

            {/* TABLE HEADER */}
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3">User ID</th>
                <th className="px-6 py-3">User Name</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Address</th>
                <th className="px-6 py-3">KYC Status</th>
                <th className="px-6 py-3 text-center">Action</th>
              </tr>
            </thead>

            {/* TABLE BODY */}
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4">{user.id}</td>
                  <td className="px-6 py-4 font-medium">{user.name}</td>
                  <td className="px-6 py-4">{user.phone}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {user.address}
                  </td>

                  {/* STATUS BADGE */}
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 text-xs font-semibold bg-yellow-100 text-yellow-700 rounded-full">
                      Incomplete
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="px-6 py-4 text-center">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm transition">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-4">

          <span className="text-sm text-gray-500">
            Showing {filteredUsers.length} users
          </span>

          <div className="flex gap-2">
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              Prev
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">
              1
            </button>
            <button className="px-3 py-1 border rounded hover:bg-gray-100">
              Next
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}