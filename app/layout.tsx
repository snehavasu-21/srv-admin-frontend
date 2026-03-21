import "./globals.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased m- p-4">

        {/* FULL SCREEN LAYOUT */}
        <div className="flex h-full overflow-hidden bg-gray-100">

          {/* ✅ SIDEBAR (FIXED LEFT) */}
          <Sidebar />

          {/* ✅ RIGHT SECTION */}
          <div className="flex flex-col flex-1 overflow-hidden">

            {/* ✅ NAVBAR (TOP FIXED) */}
            <Navbar />

            {/* ✅ MAIN CONTENT (SCROLLABLE ONLY THIS) */}
            <main className="flex-1 overflow-y-auto p-4">
              {children}
            </main>

          </div>

        </div>

      </body>
    </html>
  );
}