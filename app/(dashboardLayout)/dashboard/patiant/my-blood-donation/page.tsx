"use client";

import { useMyBloodDonationQuery } from "@/app/redux/api/bloodDonateApi";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import { format } from "date-fns";
import { BiSolidDonateBlood, BiMap, BiTimeFive } from "react-icons/bi";

const MyDonationPostsPage = () => {
  const { data, isLoading } = useMyBloodDonationQuery(undefined);
  const myDonations = data?.data;

  const columns = [
    {
      header: "ব্লাড গ্রুপ",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <div className="bg-rose-100 p-2 rounded-lg">
            <BiSolidDonateBlood className="text-rose-600 w-4 h-4" />
          </div>
          <span className="text-sm font-bold text-slate-700">
            {row.bloodGroup}
          </span>
        </div>
      ),
    },
    {
      header: "ঠিকানা",
      render: (row: any) => (
        <div className="flex items-center gap-1.5 text-slate-500">
          <BiMap className="w-3.5 h-3.5" />
          <span className="text-xs">{row.address}</span>
        </div>
      ),
    },
    {
      header: "ব্যাগ সংখ্যা",
      render: (row: any) => (
        <div className="flex flex-col">
          <span className="text-xs font-semibold text-slate-600">
            বর্তমানে: {row.nowDonateBags} ব্যাগ
          </span>
          <span className="text-[10px] text-slate-400">
            মোট দান: {row.donatedBags} ব্যাগ
          </span>
        </div>
      ),
    },
    {
      header: "পোস্টের তারিখ",
      render: (row: any) => (
        <div className="flex items-center gap-1.5 text-slate-500">
          <BiTimeFive className="w-3.5 h-3.5" />
          <span className="text-xs">
            {format(new Date(row.createdAt), "dd MMM, yyyy")}
          </span>
        </div>
      ),
    },
    {
      header: "রিকোয়েস্ট সংখ্যা",
      render: (row: any) => (
        <span className="inline-flex items-center justify-center bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-full text-[11px] font-bold border border-indigo-100">
          {row.bloodRequests?.length || 0} টি রিকোয়েস্ট
        </span>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">আমার ডোনেশন পোস্ট সমূহ</h2>
        <p className="text-sm text-slate-500 font-medium">
          আপনার তৈরি করা রক্তদানের পোস্টগুলো এখান থেকে পরিচালনা করুন।
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <ReusibleTable
          column={columns}
          data={myDonations}
          isLoading={isLoading}
          emptyText="আপনি এখনো কোনো রক্তদানের পোস্ট করেননি।"
        />
      </div>
    </div>
  );
};

export default MyDonationPostsPage;