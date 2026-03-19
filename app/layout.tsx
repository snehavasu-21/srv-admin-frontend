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
      <body className="flex h-screen bg-gray-100">

        {/* Sidebar */}
        {/* <Sidebar /> */}

        {/* Right Section */}
        <div className="flex flex-col flex-1">

          {/* Navbar */}
          {/* <Navbar /> */}

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
            <div className="bg-white p-6 rounded-xl shadow-md min-h-full">
              {children}
            </div>
          </main>

        </div>
      </body>
    </html>
  );
}



