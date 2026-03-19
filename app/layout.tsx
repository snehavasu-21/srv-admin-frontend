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
//       <body className="flex h-screen bg-gray-100">
//         <div className="flex flex-col flex-1">

//           <main className="flex-1 overflow-y-auto p-6 bg-gray-100">
//             <div className="bg-white p-6 rounded-xl shadow-md min-h-full">
//               {children}
//             </div>
//           </main>

//         </div>
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
      {/* 'antialiased' text ko saaf dikhane ke liye hai */}
      {/* m-0 aur p-0 se saara ajeeb margin khatam ho jayega */}
      <body className="antialiased m-0 p-0">
        {children}
      </body>
    </html>
  );
}