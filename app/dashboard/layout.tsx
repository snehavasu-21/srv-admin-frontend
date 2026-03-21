import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <div className="flex h-full bg-gray-100">
      {/*"this is for demo"*/}
       <div className="flex flex-col flex-1">
         <main className="flex-1 p-3 overflow-y-auto">
          {children}
         </main>
       </div>
     </div>
   );
}