"use client";
import {
  ResponsiveContainer,
  Tooltip,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from "recharts";

const BarChart = ({ stats }: { stats: any }) => {
  // ডাটা চেক এবং এম্পটি স্টেট হ্যান্ডলিং
  const hasData = stats?.formattedAppointmentStatusDistribution?.length > 0;
  
  const chartData = hasData 
    ? stats.formattedAppointmentStatusDistribution 
    : [
        { status: "No Data 1", count: 0 },
        { status: "No Data 2", count: 0 },
        { status: "No Data 3", count: 0 },
      ];

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart 
          data={chartData} 
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            dataKey="status"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
            dy={10}
            // ডাটা না থাকলে লেবেল হাইড করে রাখা যায়
            tickFormatter={(value) => hasData ? value : ""}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            allowDecimals={false}
          />
          
          {hasData && (
            <Tooltip
              cursor={{ fill: "#f1f5f9", radius: 8 }}
              contentStyle={{
                borderRadius: "16px",
                border: "none",
                boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                padding: "12px",
              }}
              itemStyle={{ color: "#6366f1", fontWeight: "bold" }}
            />
          )}

          <Bar
            dataKey="count"
            radius={[8, 8, 0, 0]}
            barSize={35}
            animationDuration={1500}
          >
            {chartData.map((entry: any, index: number) => (
              <Cell 
                key={`cell-${index}`} 
                fill={hasData ? "#6366f1" : "#e2e8f0"} 
                className="transition-all duration-300 hover:opacity-80"
              />
            ))}
          </Bar>
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;