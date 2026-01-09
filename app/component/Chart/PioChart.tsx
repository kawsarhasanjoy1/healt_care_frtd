
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const PioChart = ({ stats, COLORS }: { stats: any; COLORS: any }) => {
  console.log(stats,COLORS)
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={stats?.formattedAppointmentStatusDistribution || []}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="count"
            nameKey="status"
          >
            {stats?.formattedAppointmentStatusDistribution?.map(
              (entry: any, index: number) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS?.length]}
                />
              )
            )}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PioChart;
