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
      <aside className="flex-shrink-0">
        <Sidebar />
      </aside>

      {/* RIGHT SIDE */}
      <div className="flex flex-col flex-1 overflow-hidden">

        {/* NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 overflow-y-auto bg-slate-100">
          {children}
        </main>

      </div>
    </div>
  );
}