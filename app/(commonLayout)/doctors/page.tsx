"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import DoctorsListCard from "@/app/component/doctors/DoctorsListCard";
import FiltersModel from "@/app/component/Shared/FiltersModel";
import { useGetDoctorsQuery } from "@/app/redux/api/doctorsApi";
import { TDoctors } from "@/app/types/global";
import { BsFilterLeft } from "react-icons/bs";
import { LuSearch, LuUserRound } from "react-icons/lu";
import VoiceSearch from "@/app/component/doctors/Search/VoiceSearch";
import Loading from "@/app/loading/page";
import NotFoundPage from "@/app/component/NotFoundPage/NotFound";

const DoctorsPage = () => {
  const searchParams = useSearchParams();
  const specialtyTitle = searchParams.get("title");
  const [filters, setFilters] = useState({
    searchTerm: "",
    title: specialtyTitle ?? "",
    appoinmentFee: 0,
  });
  const [gender, setGender] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (specialtyTitle) {
      setFilters((prev) => ({ ...prev, title: specialtyTitle }));
    }
  }, [specialtyTitle]);

  const { data, isLoading, isFetching } = useGetDoctorsQuery({
    ...filters,
    gender,
    sortBy,
    sortOrder,
  });

  const doctors: TDoctors[] = data?.data?.data || [];
  console.log(doctors)
  if (isLoading) return <Loading />;

  return (
    <div className="container mx-auto px-4 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h2 className="text-3xl font-[900] text-slate-900 tracking-tight">
            {specialtyTitle
              ? `${specialtyTitle} বিশেষজ্ঞগণ`
              : "উপলব্ধ ডাক্তারবৃন্দ"}
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            আপনার প্রয়োজনে সেরা বিশেষজ্ঞ খুঁজে নিন
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <select
            value={`${sortBy}_${sortOrder}`}
            onChange={(e) => {
              const [by, order] = e.target.value.split("_");
              setSortBy(by);
              setSortOrder(order as "asc" | "desc");
            }}
            className="w-full md:w-auto border border-slate-200 focus:ring-2 focus:ring-blue-500 rounded-xl px-4 py-3 bg-white shadow-sm font-bold text-slate-700 outline-none"
          >
            <option value="createdAt_desc">নতুন ডাক্তার</option>
            <option value="averageRating_desc">টপ রেটেড</option>
            <option value="experience_desc">অভিজ্ঞতা অনুযায়ী</option>
            <option value="appoinmentFee_asc">ফি: কম থেকে বেশি</option>
            <option value="appoinmentFee_desc">ফি: বেশি থেকে কম</option>
          </select>
        </div>
      </div>

      <div className="relative flex flex-col md:flex-row items-center gap-4 mb-12">
        <div className="relative flex-1 w-full">
          <LuSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={22}
          />
          <input
            value={filters.searchTerm}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
            }
            type="text"
            placeholder="নাম বা বিশেষজ্ঞ দিয়ে সার্চ করুন..."
            className="w-full py-4 pl-12 pr-12 rounded-2xl border border-slate-200 focus:ring-4 focus:ring-blue-50 transition-all outline-none shadow-sm text-lg"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <VoiceSearch setFilters={setFilters} />
          </div>
        </div>

        <div className="relative w-full md:w-auto">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-full md:w-auto px-8 py-4 rounded-2xl flex items-center justify-center gap-3 font-bold transition-all border-2 ${
              isFilterOpen || gender || filters.appoinmentFee > 0
                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-100"
                : "bg-white text-slate-700 border-slate-100 hover:border-blue-200"
            }`}
          >
            <BsFilterLeft size={24} />
            ফিল্টার {(gender || filters.appoinmentFee > 0) && "●"}
          </button>

  
          {isFilterOpen && (
            <div className="absolute top-full right-0 mt-4 z-[100] w-full md:w-[350px]">
              <div
                className="fixed inset-0 bg-slate-900/10 backdrop-blur-[2px] md:hidden"
                onClick={() => setIsFilterOpen(false)}
              />
              <div className="relative">
                <FiltersModel
                  setValue={setGender}
                  setFilters={setFilters}
                  setIsFilterOpen={setIsFilterOpen}
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div
        className={`${
          isFetching ? "opacity-50" : "opacity-100"
        } transition-opacity`}
      >
        {doctors.length > 0 ? (
          <DoctorsListCard doctors={doctors} />
        ) : (
          <div className="py-10">
            <NotFoundPage
              title="দুঃখিত, কোনো ডাক্তার পাওয়া যায়নি!"
              description="আপনার সার্চ বা ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
