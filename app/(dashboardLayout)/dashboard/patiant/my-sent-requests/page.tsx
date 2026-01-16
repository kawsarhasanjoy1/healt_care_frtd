"use client";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import { useGetMySentRequestQuery } from "@/app/redux/api/bloodRequestApi";
import { format } from "date-fns";
import { BiUser, BiPhone, BiCircle } from "react-icons/bi";

const MySentRequestsPage = () => {
  const { data, isLoading } = useGetMySentRequestQuery(undefined);
  const sentRequests = data?.data;

  const columns = [
    {
  header: "রক্তদাতার নাম (Donor)",
  render: (row: any) => (
    <div className="flex flex-col">
      <div className="flex items-center gap-1.5 font-bold text-slate-700 text-sm">
        <BiUser className="text-indigo-500" />
        {row.donor?.name}
      </div>
      
      <div className="flex items-center gap-1.5 text-[11px] mt-0.5">
        <BiPhone className={row.status === "ACCEPTED" ? "text-slate-400" : "text-amber-500"} />
        {row.status === "ACCEPTED" ? (
          <span className="text-slate-500 font-medium">
            {row.donor?.contactNumber}
          </span>
        ) : (
          <span className="text-amber-600 font-semibold italic">
            এক্সেপ্ট করার পর নম্বর দেখা যাবে
          </span>
        )}
      </div>
    </div>
  ),
},
    {
      header: "রক্তের গ্রুপ",
      render: (row: any) => (
        <span className="bg-rose-50 text-rose-600 px-2.5 py-1 rounded-lg text-xs font-black border border-rose-100">
          {row.bloodDonate?.bloodGroup}
        </span>
      ),
    },
    {
      header: "ঠিকানা (Address)",
      render: (row: any) => (
        <span className="text-xs text-slate-500 max-w-[150px] truncate block">
          {row.bloodDonate?.address}
        </span>
      ),
    },
    {
      header: "পাঠানোর তারিখ",
      render: (row: any) => (
        <span className="text-[11px] text-slate-500">
          {format(new Date(row.createdAt), "dd MMM, yyyy")}
        </span>
      ),
    },
    {
      header: "স্ট্যাটাস",
      render: (row: any) => {
        const statusColors: any = {
          PENDING: "bg-amber-100 text-amber-700 border-amber-200",
          ACCEPTED: "bg-emerald-100 text-emerald-700 border-emerald-200",
          REJECTED: "bg-rose-100 text-rose-700 border-rose-200",
        };
        
        return (
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusColors[row.status]}`}>
            <BiCircle className="w-2 h-2 fill-current" />
            {row.status}
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          আমার পাঠানো অনুরোধসমূহ
        </h2>
        <p className="text-sm text-slate-500">
          রক্ত পাওয়ার জন্য আপনি যাদেরকে অনুরোধ পাঠিয়েছেন তাদের বর্তমান অবস্থা দেখুন।
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <ReusibleTable
          column={columns}
          data={sentRequests}
          isLoading={isLoading}
          emptyText="আপনি এখনো কাউকে রক্তের অনুরোধ পাঠাননি।"
        />
      </div>
    </div>
  );
};

export default MySentRequestsPage;