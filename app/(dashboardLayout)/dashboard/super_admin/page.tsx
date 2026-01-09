"use client";
import MetaStatsCard from "@/app/component/stats/MetaStatsCard";
import { useGetMetaDataQuery } from "@/app/redux/api/metaApi";
import { FiUsers, FiActivity, FiDollarSign, FiUserCheck, FiShield, FiPieChart, FiBarChart2 } from "react-icons/fi";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from "recharts";
import dayjs from "dayjs";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444"];

const SuperAdminDashboard = () => {
  const { data, isLoading } = useGetMetaDataQuery(undefined);
  const stats = data?.data;

  const barChartData = stats?.barChart?.map((item: any) => ({
    month: dayjs(item.month).format("MMM"),
    count: Number(item.count)
  })) || [];

  const statCards = [
    { label: "Total Revenue", value: `$${stats?.totalRevenue?._sum?.amount || 0}`, icon: <FiDollarSign />, color: "bg-orange-50 text-orange-600" },
    { label: "Total Doctors", value: stats?.doctorCount || 0, icon: <FiUserCheck />, color: "bg-blue-50 text-blue-600" },
    { label: "Total Patients", value: stats?.patientCount || 0, icon: <FiUsers />, color: "bg-emerald-50 text-emerald-600" },
    { label: "Appointments", value: stats?.appoinmentCount || 0, icon: <FiActivity />, color: "bg-indigo-50 text-indigo-600" },
    { label: "Admins", value: stats?.adminCount || 0, icon: <FiShield />, color: "bg-purple-50 text-purple-600" },
    { label: "Payments", value: stats?.paymentCount || 0, icon: <FiDollarSign />, color: "bg-rose-50 text-rose-600" },
  ];

  if (isLoading) return <div className="p-10 text-center font-semibold">Loading Analytics...</div>;

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-2xl font-extrabold text-slate-900 mb-6">Super Admin Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
        {statCards.map((item, index) => (
          <MetaStatsCard item={item} key={index} />
        ))}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <FiBarChart2 className="text-indigo-600 text-xl" />
            <h3 className="text-lg font-bold text-slate-800">Appointment Trends (Monthly)</h3>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 mb-6">
            <FiPieChart className="text-indigo-600 text-xl" />
            <h3 className="text-lg font-bold text-slate-800">Appointment Status Distribution</h3>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats?.pieChart || []}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="status"
                >
                  {stats?.pieChart?.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SuperAdminDashboard;