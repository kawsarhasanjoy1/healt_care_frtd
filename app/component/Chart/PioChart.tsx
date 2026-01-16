import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PioChart = ({ stats, COLORS }: { stats: any; COLORS: string[] }) => {
  const chartData = stats?.formattedAppointmentStatusDistribution?.length > 0 
    ? stats.formattedAppointmentStatusDistribution 
    : [{ status: "No Data", count: 1 }]; 

  const isNoData = !stats?.formattedAppointmentStatusDistribution?.length;

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={85}
            paddingAngle={5}
            dataKey="count"
            nameKey="status"
            animationDuration={1500}
          >
            {chartData.map((entry: any, index: number) => (
              <Cell
                key={`cell-${index}`}
                fill={isNoData ? "#e2e8f0" : COLORS[index % COLORS.length]}
                stroke="none"
              />
            ))}
          </Pie>
          {!isNoData && (
            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                padding: "10px",
              }}
            />
          )}
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            formatter={(value) => <span className="text-slate-600 font-medium text-sm">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PioChart;