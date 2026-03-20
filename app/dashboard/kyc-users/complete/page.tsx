"use client";

import { Search, Eye, ChevronLeft, ChevronRight, Filter } from "lucide-react";

export default function CompletedKYCPage() {
  const users = [
    {
      id: "3351",
      name: "Gurlal Singh",
      phone: "9781406883",
      aadhaarFront: "-",
      aadhaarBack: "-",
      pan: "-",
      status: "Completed",
    },
    {
      id: "3350",
      name: "Jagseer Singh",
      phone: "9417437685",
      aadhaarFront: "-",
      aadhaarBack: "-",
      pan: "-",
      status: "Completed",
    },
    {
      id: "3349",
      name: "Jagdeep Kumar",
      phone: "9781879905",
      aadhaarFront: "-",
      aadhaarBack: "-",
      pan: "-",
      status: "Completed",
    },
    {
      id: "3348",
      name: "-",
      phone: "9001464212",
      aadhaarFront: "-",
      aadhaarBack: "-",
      pan: "-",
      status: "Completed",
    },
    {
      id: "3347",
      name: "-",
      phone: "8955205040",
      aadhaarFront: "-",
      aadhaarBack: "-",
      pan: "-",
      status: "Completed",
    },
    {
      id: "3346",
      name: "-",
      phone: "7087040764",
      aadhaarFront: "-",
      aadhaarBack: "-",
      pan: "-",
      status: "Completed",
    },
    {
      id: "3345",
      name: "Arshdeep Singh",
      phone: "9988533182",
      aadhaarFront: "-",
      aadhaarBack: "-",
      pan: "-",
      status: "Completed",
    },
    {
      id: "3344",
      name: "Arshpreet Singh",
      phone: "9646127661",
      aadhaarFront: "-",
      aadhaarBack: "-",
      pan: "-",
      status: "Completed",
    },
    {
      id: "3343",
      name: "Sarabjit Singh",
      phone: "7009172474",
      aadhaarFront: "-",
      aadhaarBack: "-",
      pan: "-",
      status: "Completed",
    },
    {
      id: "3342",
      name: "Ram Lubhaya",
      phone: "9779745208",
      aadhaarFront: "-",
      aadhaarBack: "-",
      pan: "-",
      status: "Completed",
    },
  ];

  return (
    <div className="p-6 lg:p-8 bg-[#F4F7FE] min-h-screen font-sans">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1B254B] tracking-tight">
            Completed KYC Users
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Manage users with completed KYC
          </p>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-white mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        <div className="relative w-full md:w-80 lg:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search by name or phone..." 
            className="w-full pl-11 pr-4 py-2.5 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-[#4318FF] outline-none text-sm font-medium transition-all"
          />
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 bg-[#F4F7FE] text-slate-600 rounded-xl text-sm font-bold hover:bg-slate-100 transition-all">
          <Filter size={16} /> Filters
        </button>

      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white overflow-hidden">

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">

            {/* HEADER */}
            <thead>
              <tr className="border-b border-slate-50">
                {[
                  "User ID",
                  "Name",
                  "Phone",
                  "Aadhaar Front",
                  "Aadhaar Back",
                  "PAN Card",
                  "Status",
                  "Action",
                ].map((head) => (
                  <th key={head} className="p-5 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    {head}
                  </th>
                ))}
              </tr>
            </thead>

            {/* BODY */}
            <tbody className="divide-y divide-slate-50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-all duration-200">

                  <td className="p-5 text-sm font-bold text-slate-500">
                    {user.id}
                  </td>

                  <td className="p-5">
                    <div className="font-bold text-[#1B254B] text-sm">
                      {user.name}
                    </div>
                  </td>

                  <td className="p-5 text-sm font-bold text-[#1B254B]">
                    {user.phone}
                  </td>

                  <td className="p-5 text-sm text-slate-500">
                    {user.aadhaarFront}
                  </td>

                  <td className="p-5 text-sm text-slate-500">
                    {user.aadhaarBack}
                  </td>

                  <td className="p-5 text-sm text-slate-500">
                    {user.pan}
                  </td>

                  {/* STATUS */}
                  <td className="p-5">
                    <span className="px-3 py-1 bg-green-50 text-green-600 rounded-lg font-bold text-xs border border-green-100">
                      Completed
                    </span>
                  </td>

                  {/* ACTION */}
                  <td className="p-5">
                    <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="View Details">
                      <Eye size={18} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="p-5 border-t border-slate-50 flex justify-between items-center">
          
          <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">
            Page 1 of 25
          </span>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg bg-[#F4F7FE] hover:bg-slate-100 text-slate-600">
              <ChevronLeft size={16}/>
            </button>

            <button className="w-8 h-8 rounded-lg bg-[#4318FF] text-white font-bold text-xs">
              1
            </button>

            <button className="w-8 h-8 rounded-lg text-slate-400 font-bold text-xs hover:bg-[#F4F7FE]">
              2
            </button>

            <button className="p-2 rounded-lg bg-[#F4F7FE] hover:bg-slate-100 text-slate-600">
              <ChevronRight size={16}/>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}