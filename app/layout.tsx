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
      {/* 'antialiased' text ko saaf dikhane ke liye hai */}
      {/* m-0 aur p-0 se saara ajeeb margin khatam ho jayega */}
      <body className="antialiased m-0 p-0">
        {children}
      </body>
    </html>
  );
}