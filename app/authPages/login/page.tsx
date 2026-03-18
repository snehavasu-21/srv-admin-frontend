import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-xl flex flex-col items-center">
        
        {/* Logo Section */}
        <div className="mb-6">
          {/* Replace src with your actual logo path in /public */}
          <div className="text-red-600 font-bold text-5xl mb-2">SRV</div>
          <p className="text-xs text-center font-semibold text-gray-600 uppercase tracking-widest">
            always improving <br /> BOND 2035
          </p>
        </div>

        <h1 className="text-2xl font-semibold text-blue-700 mb-8">SRV Electricals</h1>

        {/* Form Section */}
        <form className="w-full space-y-4">
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              👤
            </span>
            <input 
              type="text" 
              placeholder="Admin"
              className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-transparent focus:border-blue-500 rounded outline-none transition-all"
            />
          </div>

          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
              🔒
            </span>
            <input 
              type="password" 
              placeholder="••••••••••••"
              className="w-full pl-10 pr-4 py-3 bg-blue-50 border border-transparent focus:border-blue-500 rounded outline-none transition-all"
            />
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-4 rounded shadow-md transition-colors mt-6 uppercase"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}