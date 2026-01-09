"use client";

import ReusableSearchInput from "@/app/component/Reusible/input/SearchInput";
import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import ReusableSelect from "@/app/component/Reusible/select/ReusibleSelect";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import { useGetPatientQuery } from "@/app/redux/api/patiantApi";

import Image from "next/image";
import { useState } from "react";

const PatientsPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 10,
    page: 1,
  });

  const { data, isLoading } = useGetPatientQuery({ ...filters });

  // keep the same response shape you used in AdminPage
  const patients = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const sortingValue = `${filters.sortBy}:${filters.sortOrder}`;

  const column = [
    {
      key: "profilePhoto",
      header: "Image",
      render: (row: any) => (
        <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {row.profilePhoto ? (
            <Image
              src={row.profilePhoto}
              alt={row.name ?? "patient"}
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
    {
      key: "address",
      header: "Address",
      render: (row: any) => <span>{row.address || "—"}</span>,
    },
    {
      key: "appointments",
      header: "Total Appointments",
      render: (row: any) => (
        <span className="text-slate-700">
          {Array.isArray(row.appointments)
            ? row.appointments.length
            : row?._count?.appointments ?? "0"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (row: any) => (
        <span className="text-slate-700">
          {row.createdAt ? new Date(row.createdAt).toLocaleString() : "—"}
        </span>
      ),
    },
  ];

  const patientSortingOptions = [
    { label: "Newest", value: "createdAt:desc" },
    { label: "Oldest", value: "createdAt:asc" },
    { label: "Name (A-Z)", value: "name:asc" },
    { label: "Name (Z-A)", value: "name:desc" },
    { label: "Email (A-Z)", value: "email:asc" },
    { label: "Email (Z-A)", value: "email:desc" },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <p className="mb-3 hidden text-lg font-semibold md:block">Patients</p>

        <div className="flex gap-3">
          <div className="w-full max-w-md">
            <ReusableSearchInput
              value={filters.searchTerm}
              onChange={(v) =>
                setFilters((prev) => ({ ...prev, searchTerm: v, page: 1 }))
              }
            />
          </div>

          <div className="w-full max-w-[160px]">
            <ReusableSelect
              options={patientSortingOptions}
              value={sortingValue}
              onChange={(v) => {
                const [by, order] = v.split(":");
                setFilters((prev) => ({
                  ...prev,
                  sortBy: by,
                  sortOrder: order,
                  page: 1,
                }));
              }}
            />
          </div>
        </div>
      </div>

      <ReusibleTable column={column} data={patients} isLoading={isLoading} />

      <div className="mt-10 flex justify-center">
        <Pagination
          page={meta?.page ?? filters.page}
          limit={meta?.limit ?? filters.limit}
          total={meta?.total ?? 0}
          onPageChange={(p) => setFilters((prev) => ({ ...prev, page: p }))}
          disabled={isLoading}
        />
      </div>
    </div>
  );
};

export default PatientsPage;