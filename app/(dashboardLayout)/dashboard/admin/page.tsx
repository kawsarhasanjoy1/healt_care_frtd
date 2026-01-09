"use client";
import MetaStatsCard from "@/app/component/stats/MetaStatsCard";
import { useGetMetaDataQuery } from "@/app/redux/api/metaApi";
import { FiUsers, FiActivity, FiDollarSign, FiUserCheck } from "react-icons/fi";


const AdminDashboard = () => {
  const { data, isLoading } = useGetMetaDataQuery(undefined);
  const stats = data?.data;

  const statCards = [
    { label: "Total Revenue", value: `$${stats?.totalRevenue?._sum?.amount || 0}`, icon: <FiDollarSign />, color: "bg-orange-50 text-orange-600" },
    { label: "Doctors", value: stats?.doctorCount || 0, icon: <FiUserCheck />, color: "bg-blue-50 text-blue-600" },
    { label: "Patients", value: stats?.patientCount || 0, icon: <FiUsers />, color: "bg-emerald-50 text-emerald-600" },
    { label: "Appointments", value: stats?.appoinmentCount || 0, icon: <FiActivity />, color: "bg-indigo-50 text-indigo-600" },
  ];

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {statCards.map((item, index) => (
          <MetaStatsCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
};


export default AdminDashboard