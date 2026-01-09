"use client";

import { FiCalendar, FiFileText, FiStar, FiClock } from "react-icons/fi";
import { useGetMetaDataQuery } from "@/app/redux/api/metaApi";
import MetaStatsCard from "@/app/component/stats/MetaStatsCard";
import Loading from "@/app/loading/page";
import PioChart from "@/app/component/Chart/PioChart";
import BarChart from "@/app/component/Chart/BarChart";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

const PatientDashboard = () => {
  const { data: statsData, isLoading } = useGetMetaDataQuery(undefined);
  const stats = statsData?.data;
  const statCards = [
    {
      label: "Total Appointments",
      value: stats?.appointmentCount || 0,
      icon: <FiCalendar />,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "Prescriptions",
      value: stats?.prescriptionCount || 0,
      icon: <FiFileText />,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Reviews Given",
      value: stats?.reviewCount || 0,
      icon: <FiStar />,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-2xl font-extrabold text-slate-900">
            Patient Dashboard
          </h1>
          <p className="text-slate-500">
            Welcome back! Here is an overview of your health activities.
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {statCards.map((item, index) => (
            <MetaStatsCard item={item} key={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart: Appointment Status Distribution */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
              <FiClock className="text-indigo-500" /> Appointment Status
            </h3>
            <PioChart stats={stats} COLORS={COLORS} />
          </div>

          {/* Bar Chart: Activity Visual */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="text-lg font-bold text-slate-800 mb-6">
              Activity Summary
            </h3>
            <BarChart stats={stats}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
