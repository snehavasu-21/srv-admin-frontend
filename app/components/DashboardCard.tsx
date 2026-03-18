export default function DashboardCard({ title, value, color, icon }: Props) {
  return (
    <div className={`${color} text-white p-5 rounded-xl shadow flex justify-between items-center h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer group relative overflow-hidden`}>

      {/* Light overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-50 transition duration-300"></div>

      {/* Content */}
      <div className="relative z-10">
        <p className="text-sm">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>

      {/* Icon */}
      <div className="relative z-10 bg-white text-black p-3 rounded-full w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:rotate-12">
        {icon}
      </div>

    </div>
  );
}