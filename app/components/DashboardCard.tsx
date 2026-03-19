// components/DashboardCard.tsx

interface propType{
  title: string,
  value: string,
  color: string,
  icon: React.ReactNode,
}

export default function DashboardCard({ title, value, color, icon }:
  propType
) {
  // Extract the color name (e.g., "bg-red-500" -> "red")
  const colorName = color.split('-')[1];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-semibold uppercase tracking-wider">{title}</p>
        <h3 className="text-3xl font-bold mt-1 text-gray-800">{value}</h3>
      </div>
      {/* Icon with light background circle */}
      <div className={`p-4 rounded-full ${color} text-white bg-opacity-90 shadow-lg`}>
        {icon}
      </div>
    </div>
  );
}