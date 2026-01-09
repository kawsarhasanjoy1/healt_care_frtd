"use client";
import {
  ResponsiveContainer,
  Tooltip,
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const BarChart = ({ stats }: { stats: any }) => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <ReBarChart data={stats?.formattedAppointmentStatusDistribution || []}>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f1f5f9"
          />
          <XAxis
            dataKey="status"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "#f8fafc" }}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />
          <Bar
            dataKey="count"
            fill="#6366f1"
            radius={[6, 6, 0, 0]}
            barSize={40}
          />
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
