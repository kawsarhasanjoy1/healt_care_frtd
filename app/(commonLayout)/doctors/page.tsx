"use client";
import { useState } from "react";
import DoctorsListCard from "@/app/component/doctors/DoctorsListCard";
import FiltersModel from "@/app/component/Shared/FiltersModel";
import { useGetDoctorsQuery } from "@/app/redux/api/doctorsApi";
import { TDoctors } from "@/app/types/global";
import { BsFilterLeft } from "react-icons/bs";
import {  LuSearch } from "react-icons/lu";
import VoiceSearch from "@/app/component/doctors/Search/VoiceSearch";
import Loading from "@/app/loading/page";

const DoctorsPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    email: "",
    contactNumber: "",
    appoinmentFee: 0,
  });
  const [gender, setGender] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data, isLoading } = useGetDoctorsQuery({
    ...filters,
    gender,
    sortBy,
    sortOrder,
  });

  const doctors: TDoctors[] = data?.data?.data || [];

  return (
    <div className="w-full mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-slate-800">
          Available Doctors
        </h2>
        <select
          value={`${sortBy}_${sortOrder}`}
          onChange={(e) => {
            const [by, order] = e.target.value.split("_");
            setSortBy(by);
            setSortOrder(order as "asc" | "desc");
          }}
          className="border border-slate-200 focus:ring-2 focus:ring-indigo-500 rounded-lg px-4 py-2 bg-white shadow-sm"
        >
          <option value="createdAt_desc">Newest Doctors</option>
          <option value="createdAt_asc">Oldest Doctors</option>
          <option value="averageRating_desc">Top Rated</option>
          <option value="experience_desc">Most Experienced</option>
          <option value="appoinmentFee_asc">Fee: Low to High</option>
          <option value="appoinmentFee_desc">Fee: High to Low</option>
        </select>
      </div>

      {/* Filters + Search Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <div className="relative w-full">
          <LuSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            value={filters?.searchTerm}
            onChange={(e) =>
              setFilters((prev) => ({ ...prev, searchTerm: e.target.value }))
            }
            type="search"
            placeholder="Search doctors by name or specialty..."
            className="border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full py-3 pl-10 pr-12 rounded-xl shadow-sm transition-all"
          />

        </div>
      <div>
        <VoiceSearch setFilters={setFilters}/>
      </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`border px-6 py-3 rounded-xl flex items-center gap-2 font-bold transition-all ${
              isFilterOpen
                ? "bg-indigo-600 text-white border-indigo-600"
                : "bg-white text-slate-700 hover:bg-slate-50 border-slate-200"
            }`}
          >
            <BsFilterLeft size={20} />
            <span>Filters</span>
          </button>

          {isFilterOpen && (
            <div className="md:absolute top-48 md:top-auto mt-10 z-50 right-[25%]">
              <FiltersModel
                setValue={setGender}
                setFilters={setFilters}
                setIsFilterOpen={setIsFilterOpen}
              />
            </div>
          )}
        </div>
      </div>

     

      {/* Doctors List */}
      {isLoading ? (
       <Loading/>
      ) : (
        <DoctorsListCard doctors={doctors} />
      )}
    </div>
  );
};

export default DoctorsPage;
