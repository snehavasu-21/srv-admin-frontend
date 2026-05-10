
interface DashboardCardProps {
  title: string;
  value: string;
  color: string;
  bgColor: string;
  icon: React.ReactNode;
}

export default function DashboardCard({ title, value, color, bgColor, icon }: DashboardCardProps) {
  return (
    <div className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        {/* ICON CONTAINER */}
        <div className={`p-3 rounded-xl ${bgColor} ${color} group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        
        {/* PERCENTAGE INDICATOR (Optional visual fluff) */}
        <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-50 text-slate-400">
          +12.5%
        </span>
      </div>

      <div>
        <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">
          {title}
        </p>
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          {value}
        </h3>
      </div>
      
      {/* BOTTOM PROGRESS BAR (Visual Enhancement) */}
      <div className="mt-4 w-full bg-slate-50 h-1.5 rounded-full overflow-hidden">
        <div className={`h-full opacity-60 rounded-full transition-all duration-500 w-[65%] ${bgColor.replace('bg-', 'bg-')}`} 
             style={{ backgroundColor: 'currentColor' }}>
        </div>
      </div>
    </div>
  );
}
