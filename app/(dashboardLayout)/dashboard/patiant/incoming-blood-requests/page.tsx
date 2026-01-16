"use client";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import {
  useGetIncomingBloodRequestQuery,
  useUpBloodRequestStatusMutation,
} from "@/app/redux/api/bloodRequestApi"; 
import { format } from "date-fns";
import toast from "react-hot-toast";

const DonorRequestPage = () => {
  const { data, isLoading } = useGetIncomingBloodRequestQuery(undefined);
  const bloodRequests = data?.data;
  console.log(bloodRequests)
  const [updateStatus, { isLoading: isUpdating }] =
    useUpBloodRequestStatusMutation();

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await updateStatus({
        requestId: id,
        status: newStatus,
      }).unwrap();
      if (res?.success) {
        toast.success(
          `অনুরোধটি ${newStatus === "ACCEPTED" ? "গ্রহণ" : "বাতিল"} করা হয়েছে`
        );
      }
    } catch (error) {
      toast.error("স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে।");
    }
  };

  const columns = [
    {
      header: "পেশেন্টের নাম",
      render: (row: any) => (
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-700">
            {row.patient?.name}
          </span>
          <span className="text-[11px] text-slate-400">
            {row.patient?.contactNumber}
          </span>
        </div>
      ),
    },
    {
      header: "রক্তের গ্রুপ",
      render: (row: any) => (
        <span className="bg-rose-100 text-rose-600 px-2.5 py-1 rounded-lg text-xs font-bold border border-rose-200">
          {row.bloodDonate?.bloodGroup}
        </span>
      ),
    },
    {
      header: "অনুরোধের তারিখ",
      render: (row: any) => (
        <span className="text-xs text-slate-500 font-medium">
          {format(new Date(row.createdAt), "dd MMM, yyyy")}
        </span>
      ),
    },
    {
      header: "বর্তমান স্ট্যাটাস",
      render: (row: any) => (
        <span
          className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
            row.status === "PENDING"
              ? "bg-amber-100 text-amber-600"
              : row.status === "ACCEPTED"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "অ্যাকশন (Select)",
      render: (row: any) => (
        <select
          disabled={isUpdating || row.status !== "PENDING"} // একবার এক্সেপ্ট বা ক্যানসেল হলে লক হয়ে যাবে
          value={row.status}
          onChange={(e) => handleStatusChange(row.id, e.target.value)}
          className="block w-full px-2 py-1.5 text-xs font-semibold bg-white border border-slate-200 rounded-lg focus:ring-rose-500 focus:border-rose-500 cursor-pointer disabled:bg-slate-50 disabled:text-slate-400"
        >
          <option value="PENDING">পেন্ডিং</option>
          <option value="ACCEPTED">এক্সেপ্ট করুন</option>
          <option value="REJECTED">ক্যানসেল করুন</option>
        </select>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
          রক্তের অনুরোধ সমূহ
        </h2>
        <p className="text-sm text-slate-500 font-medium">
          আপনার ডোনেশন পোস্টে আসা রিকোয়েস্টগুলো ম্যানেজ করুন।
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100">
        <ReusibleTable
          column={columns}
          data={bloodRequests}
          isLoading={isLoading}
          emptyText="কোনো অনুরোধ পাওয়া যায়নি।"
        />
      </div>
    </div>
  );
};

export default DonorRequestPage;
