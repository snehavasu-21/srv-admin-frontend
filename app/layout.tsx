// import "./globals.css";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       {/* 'antialiased' text ko saaf dikhane ke liye hai */}
//       {/* m-0 aur p-0 se saara ajeeb margin khatam ho jayega */}
//       <body className="antialiased m-0 p-0">
//         {children}
//       </body>
//     </html>
//   );
// }



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
      <body className="antialiased m-0 p-0">

        {/* FULL SCREEN LAYOUT */}
        <div className="flex h-screen overflow-hidden bg-gray-100">

          {/* ✅ SIDEBAR (FIXED LEFT) */}
          <Sidebar />

          {/* ✅ RIGHT SECTION */}
          <div className="flex flex-col flex-1 overflow-hidden">

            {/* ✅ NAVBAR (TOP FIXED) */}
            <Navbar />

            {/* ✅ MAIN CONTENT (SCROLLABLE ONLY THIS) */}
            <main className="flex-1 overflow-y-auto p-6">
              {children}
            </main>

          </div>

        </div>

      </body>
    </html>
  );
}