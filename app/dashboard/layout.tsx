import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#0B1F3A] text-white flex-shrink-0">
        <Sidebar />
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* NAVBAR */}
        <header className="h-16 shadow bg-white flex items-center px-6">
          <Navbar />
        </header>

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#F4F7FE]">
          {children}
        </main>

      </div>
    </div>
  );
}