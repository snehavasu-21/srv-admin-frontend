import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200">
      
      {/* Card */}
      <div className="w-full max-w-sm bg-gray-100 rounded-lg shadow-lg p-8 text-center">
        
        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <Image
            src="/srv.png"
            alt="SRV Logo"
            width={100}
            height={70}
            priority
          />
          <p className="text-xs text-gray-600 mt-2 leading-tight">
            always improving <br /> BOND 2035
          </p>
        </div>

        {/* Title */}
        <h1 className="text-lg font-semibold text-blue-600 mb-6">
          SRV Electricals
        </h1>

        {/* Form */}
        <form className="space-y-4">
          
          {/* Username */}
          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
            <span className="px-3 bg-gray-200 text-gray-600">👤</span>
            <input
              type="text"
              placeholder="Admin"
              className="w-full px-3 py-2 bg-gray-100 outline-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-gray-300 rounded overflow-hidden">
            <span className="px-3 bg-gray-200 text-gray-600">🔒</span>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-gray-100 outline-none"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow-md transition-all mt-2"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}