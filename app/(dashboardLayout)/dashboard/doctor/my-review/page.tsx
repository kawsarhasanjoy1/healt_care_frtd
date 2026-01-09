"use client";

import { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import { useGetDoctorReviewQuery, useGetMyReviewQuery } from "@/app/redux/api/reviewApi";

const ReviewsPage = () => {
  const [filters, setFilters] = useState({
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 10,
    page: 1,
  });

  const { data, isLoading } = useGetDoctorReviewQuery({ ...filters });

  const reviews = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const column = [
      {
      key: "doctor",
      header: "Doctor",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <Image className="  h-16 w-16 rounded-lg object-cover" src={row?.doctor?.profilePhoto} height={100} width={100} alt={row?.doctor?.name}/>
          <div className=" flex flex-col space-y-1.5">
             <span className="text-sm font-semibold text-indigo-600">
              {row?.doctor?.name}
           </span>
           <span>
              {row?.doctor?.email}
           </span>
           <span>
              {row?.doctor?.registrationNumber}
           </span>
          </div>
        </div>
      ),
    },
    {
      key: "patient",
      header: "Patient",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="relative h-16 w-16 rounded-lg overflow-hidden  bg-slate-100">
            <Image
              src={row?.patient?.profilePhoto || "/placeholder-avatar.png"}
              alt="patient"
              fill
              className="object-cover"
            />
          </div>
          <span className="font-medium text-slate-900">{row?.patient?.name}</span>
        </div>
      ),
    },
  
    {
      key: "rating",
      header: "Rating",
      render: (row: any) => (
        <div className="flex flex-col gap-1">
          <Rating style={{ maxWidth: 80 }} value={row.rating} readOnly />
          <span className="text-[10px] font-bold text-orange-500">
            {row.rating.toFixed(1)} / 5.0
          </span>
        </div>
      ),
    },
    {
      key: "comment",
      header: "Feedback",
      render: (row: any) => (
        <p className="max-w-[250px] truncate text-sm text-slate-600" title={row.comment}>
          {row.comment}
        </p>
      ),
    },
    {
      key: "createdAt",
      header: "Date",
      render: (row: any) => (
        <span className="text-xs text-slate-500">
          {dayjs(row.createdAt).format("MMM D, YYYY")}
        </span>
      ),
    },
  ];

  const sortingOptions = [
    { label: "Newest", value: "createdAt:desc" },
    { label: "Highest Rating", value: "rating:desc" },
    { label: "Lowest Rating", value: "rating:asc" },
  ];

  return (
    <div className="p-6 min-h-screen bg-slate-50/30">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Reviews</h1>
          <p className="text-sm text-slate-500">Monitor and manage doctor reviews and ratings.</p>
        </div>

       
      </div>

      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <ReusibleTable column={column} data={reviews} isLoading={isLoading} />
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination
          page={meta?.page ?? filters.page}
          limit={meta?.limit ?? filters.limit}
          total={meta?.total ?? 0}
          onPageChange={(p) => setFilters((prev) => ({ ...prev, page: p }))}
        />
      </div>
    </div>
  );
};

export default ReviewsPage;