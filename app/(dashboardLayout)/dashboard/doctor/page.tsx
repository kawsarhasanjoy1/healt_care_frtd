"use client";
import { useGetMetaDataQuery } from "@/app/redux/api/metaApi";
import MetaStatsCard from "@/app/component/stats/MetaStatsCard";
import { FiUsers, FiStar, FiDollarSign, FiCalendar } from "react-icons/fi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import Loading from "@/app/loading/page";
import { useEffect, useState } from "react";


const PIE_COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const DoctorDashboard = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { data, isLoading } = useGetMetaDataQuery(undefined);
  const stats = data?.data;

  const statCards = [
    {
      label: "My Revenue",
      value: `$${stats?.totalRevenue || 0}`,
      icon: <FiDollarSign />,
      color: "bg-green-50 text-green-600",
    },
    {
      label: "My Patients",
      value: stats?.patientCount || 0,
      icon: <FiUsers />,
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "Appointments",
      value: stats?.appointmentCount || 0,
      icon: <FiCalendar />,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Total Reviews",
      value: stats?.reviewCount || 0,
      icon: <FiStar />,
      color: "bg-amber-50 text-amber-600",
    },
  ];

 useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isLoading) return <Loading />;

  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-slate-50/50 p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Doctor Dashboard</h1>
        <p className="text-sm text-slate-500">
          Overview of your practice, patients, and performance.
        </p>
      </div>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statCards?.map((item, index) => (
          <MetaStatsCard item={item} key={index} />
        ))}
      </div>


      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
    
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-bold text-slate-800">
            Monthly Appointments Overview
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats?.monthlyAppointments}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="month"
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
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#6366f1"
                  radius={[6, 6, 0, 0]}
                  barSize={40}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* অ্যাপয়েন্টমেন্ট স্ট্যাটাস (Pie Chart) */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-6 text-lg font-bold text-slate-800">
            Appointment Status Distribution
          </h3>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.formattedAppointmentStatusDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={8}
                  dataKey="count"
                  nameKey="status"
                >
                  {stats?.formattedAppointmentStatusDistribution?.map(
                    (entry: any, index: number) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                      />
                    )
                  )}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)",
                  }}
                />
                <Legend iconType="circle" verticalAlign="bottom" height={36} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DoctorDashboard;