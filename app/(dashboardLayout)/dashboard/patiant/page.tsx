"use client";

import { FiCalendar, FiFileText, FiStar, FiClock, FiActivity } from "react-icons/fi";
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
      label: "মোট অ্যাপয়েন্টমেন্ট",
      value: stats?.appointmentCount || 0,
      icon: <FiCalendar />,
      color: "bg-indigo-50 text-indigo-600",
    },
    {
      label: "প্রেসক্রিপশন",
      value: stats?.prescriptionCount || 0,
      icon: <FiFileText />,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "দেওয়া রিভিউ",
      value: stats?.reviewCount || 0,
      icon: <FiStar />,
      color: "bg-amber-50 text-amber-600",
    },
  ];

  if (isLoading) return <Loading />;

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            পেশেন্ট ড্যাশবোর্ড
          </h1>
          <p className="text-slate-500 font-medium mt-1">
            স্বাগতম! আপনার স্বাস্থ্য সংক্রান্ত সকল তথ্য এখানে দেখুন।
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {statCards.map((item, index) => (
            <MetaStatsCard item={item} key={index} />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pie Chart Card */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <FiClock className="text-indigo-600" />
                </div>
                অ্যাপয়েন্টমেন্ট স্ট্যাটাস
              </h3>
            </div>
            <PioChart stats={stats} COLORS={COLORS} />
          </div>

          {/* Bar Chart Card */}
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-lg">
                  <FiActivity className="text-emerald-600" />
                </div>
                অ্যাক্টিভিটি সামারি
              </h3>
            </div>
            <BarChart stats={stats} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;