"use client";

import { useRouter } from "next/navigation";

export default function AddRedeemProduct() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-100 p-6">

      <div className="bg-white rounded-xl border p-6 max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-lg font-semibold">Add Redeem Product</h1>
          <button
            onClick={() => router.push("/dashboard/gift-store-product")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            ← Back
          </button>
        </div>

        {/* Form */}
        <div className="space-y-4">

          <input placeholder="Name" className="w-full border p-2 rounded" />

          <input placeholder="MRP" className="w-full border p-2 rounded" />

          <select className="w-full border p-2 rounded">
            <option>--Select Type--</option>
            <option>Electrician</option>
          </select>

          <input type="file" className="w-full border p-2 rounded" />

          <input placeholder="Points" className="w-full border p-2 rounded" />

          <textarea placeholder="Description" className="w-full border p-2 rounded" />

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
            <button
              onClick={() => router.push("/dashboard/gift-store-product")}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Cancel
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}