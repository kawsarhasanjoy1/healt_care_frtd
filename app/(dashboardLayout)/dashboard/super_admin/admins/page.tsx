"use client";

import ReusableSearchInput from "@/app/component/Reusible/input/SearchInput";
import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import ReusableSelect from "@/app/component/Reusible/select/ReusibleSelect";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import { useGetAdminsQuery } from "@/app/redux/api/adminApi";
import Image from "next/image";
import { useState } from "react";

export default function AdminListPage() {
  const [filters, setFilters] = useState({
    searchTerm: "",
    gender: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 10,
    page: 1,
  });
  const { data, isLoading } = useGetAdminsQuery({ ...filters });
  const admins = data?.data ?? [];
  const meta = data?.meta;
  const sortingValue = `${filters?.sortBy}:${filters?.sortOrder}`;
  const column = [
    {
      key: "profilePhoto",
      header: "Image",
      render: (row: any) => (
        <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {row.profilePhoto ? (
            <Image
              src={row.profilePhoto}
              alt={row.name ?? "admin"}
              fill
              sizes="36px"
              className="object-cover"
            />
          ) : null}
        </div>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (row: any) => (
        <span className="font-semibold text-slate-900">{row.name}</span>
      ),
    },
    {
      key: "email",
      header: "Email",
      render: (row: any) => <span>{row.email}</span>,
    },
    {
      key: "contactNumber",
      header: "Contact Number",
      render: (row: any) => <span>{row.contactNumber || "—"}</span>,
    },
  ];

  const genderOptions = [
    { label: "All", value: "ALL" },
    { label: "MALE", value: "MALE" },
    { label: "FEMALE", value: "FEMALE" },
  ];

  const adminSortingOptions = [
    { label: "Newest", value: "createdAt:desc" },
    { label: "Oldest", value: "createdAt:asc" },
    { label: "Name (A-Z)", value: "name:asc" },
    { label: "Name (Z-A)", value: "name:desc" },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <p className="mb-3 text-lg font-semibold hidden md:block">Admins</p>

        <div className="flex  gap-3">
          <div className="w-full max-w-md">
            <ReusableSearchInput
              value={filters?.searchTerm}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, searchTerm: e }))
              }
            />
          </div>

          <div className="w-full max-w-[100px]">
            <ReusableSelect
              options={genderOptions}
              value={filters?.gender}
              onChange={(e) => setFilters((prev) => ({ ...prev, gender: e }))}
            />
          </div>

          <div className="w-full max-w-[100px]">
            <ReusableSelect
              options={adminSortingOptions}
              value={sortingValue}
              onChange={(e) => {
                const [by, order] = e.split(":");
                setFilters((prev) => ({
                  ...prev,
                  sortBy: by,
                  sortOrder: order,
                }));
              }}
            />
          </div>
        </div>
      </div>

      <ReusibleTable column={column} data={admins} isLoading={isLoading} />
      <div className=" flex justify-center mt-10">
        <Pagination
          page={meta?.page ?? filters.page}
          limit={meta?.limit ?? filters.limit}
          total={meta?.total ?? 0}
          onPageChange={(p) =>
            setFilters((prev) => ({
              ...prev,
              page: p,
            }))
          }
          disabled={isLoading}
        />
      </div>
    </div>
  );
}
