"use client";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import { format } from "date-fns";
import toast from "react-hot-toast";
import { useCreateBloodRequestMutation } from "@/app/redux/api/bloodRequestApi";
import { useGetAvailableDonorsQuery } from "@/app/redux/api/bloodDonateApi";

const DonorListPage = () => {
  const { data, isLoading } = useGetAvailableDonorsQuery({});
  const donorData = data?.data;
  const [createBloodRequest, { isLoading: requestLoading }] =
    useCreateBloodRequestMutation();
  const handleRequest = async (donor: any) => {
    const requestData = {
      donorId: donor?.donorId,
      bloodDonateId: donor?.id,
    };
    try {
      const res = await createBloodRequest(requestData).unwrap();
      if (res?.success) {
        toast.success(`${donor.bloodGroup} ডোনারের কাছে অনুরোধ পাঠানো হয়েছে!`);
      }
    } catch (error) {
      toast.error("অনুরোধ পাঠানো ব্যর্থ হয়েছে।");
    }
  };

  const columns = [
    {
      header: "ডোনারের গ্রুপ",
      key: "bloodGroup",
      render: (row: any) => (
        <div className="flex flex-col items-center gap-3">
          <p className="text-xs font-medium text-slate-400">রক্তের গ্রুপ</p>
          <span className=" bg-rose-100 text-sm font-bold text-rose-600 shadow-sm border border-rose-200">
            {row.bloodGroup}
          </span>
          <div></div>
        </div>
      ),
    },
    {
      header: "অবস্থান",
      key: "address",
      render: (row: any) => (
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-slate-700">
            {row.address}
          </span>
          <span className="text-[11px] text-slate-400">নিকটস্থ এলাকা</span>
        </div>
      ),
    },
    {
      header: "পরিমাণ",
      render: (row: any) => (
        <span className="inline-flex items-center rounded-lg bg-indigo-50 px-2.5 py-1 text-xs font-bold text-indigo-600 border border-indigo-100">
          {row.nowDonateBags} ব্যাগ
        </span>
      ),
    },
    {
      header: "শেষ রক্তদান",
      render: (row: any) => (
        <span className="text-sm text-slate-500 font-medium">
          {row.createdAt
            ? format(new Date(row.createdAt), "dd MMM, yyyy")
            : "N/A"}
        </span>
      ),
    },
    {
      header: "অ্যাকশন",
      render: (row: any) => (
        <button
          onClick={() => handleRequest(row)}
          className="relative inline-flex items-center justify-center px-5 py-2 overflow-hidden font-bold text-white transition-all duration-300 bg-rose-500 rounded-xl cursor-pointer group ease-out hover:bg-rose-600 active:scale-95 shadow-lg shadow-rose-200"
        >
          <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full group-hover:translate-x-0 ease">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </span>
          <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease font-bold text-xs uppercase tracking-wider">
            অনুরোধ পাঠান
          </span>
          <span className="relative invisible">অনুরোধ পাঠান</span>
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Page Heading */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight ">
            রক্তের সন্ধান
          </h2>
          <p className="mt-2 text-lg text-slate-500 font-medium max-w-2xl">
            আপনার ব্লাড গ্রুপ এবং ঠিকানার সাথে ম্যাচ করা ডোনারদের তালিকা। জীবন
            বাঁচাতে অনুরোধ পাঠান।
          </p>
        </div>

        {/* Table Wrapper */}
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          <ReusibleTable
            title="উপলব্ধ রক্তদাতা"
            column={columns}
            data={donorData}
            isLoading={isLoading}
            emptyText="দুঃখিত, আপনার গ্রুপের কোনো ডোনার এই মুহূর্তে উপলব্ধ নেই।"
          />
        </div>
      </div>
    </div>
  );
};

export default DonorListPage;
