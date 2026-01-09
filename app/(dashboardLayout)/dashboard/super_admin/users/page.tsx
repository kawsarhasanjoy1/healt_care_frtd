"use client";

import ReusableSearchInput from "@/app/component/Reusible/input/SearchInput";
import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import ReusableSelect from "@/app/component/Reusible/select/ReusibleSelect";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import { useGetUserQuery } from "@/app/redux/api/userApi";
import Image from "next/image";
import { useState } from "react";

const formatYYYYMMDD = (value: any) => {
  if (!value) return "—";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toISOString().slice(0, 10);
};

const UsersPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    role: "", 
    status: "", 
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 10,
    page: 1,
  });

  const { data, isLoading } = useGetUserQuery({ ...filters });

  // keep same response shape style you used earlier
  const users = data?.data ?? [];
  const meta = data?.data?.meta;

  const sortingValue = `${filters.sortBy}:${filters.sortOrder}`;

  const columns = [
    {
      key: "profilePhoto",
      header: "Image",
      render: (row: any) => (
        <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {row.profilePhoto ? (
            <Image
              src={row.profilePhoto}
              alt={row.name ?? "user"}
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
      render: (row: any) => <span className="text-slate-700">{row.email}</span>,
    },
    {
      key: "contactNumber",
      header: "Contact Number",
      render: (row: any) => (
        <span className="text-slate-700">{row.contactNumber || "—"}</span>
      ),
    },
    {
      key: "role",
      header: "Role",
      render: (row: any) => (
        <span className="rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-xs font-semibold text-slate-700">
          {row.role || "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (row: any) => (
        <span
          className={[
            "rounded-full border px-2 py-1 text-xs font-semibold",
            row.status === "ACTIVE"
              ? "border-emerald-200 bg-emerald-50 text-emerald-700"
              : "border-rose-200 bg-rose-50 text-rose-700",
          ].join(" ")}
        >
          {row.status || "—"}
        </span>
      ),
    },
    {
      key: "needPasswordCng",
      header: "Need Password Change",
      render: (row: any) => (
        <span className="text-slate-700">
          {typeof row.needPasswordCng === "boolean"
            ? row.needPasswordCng
              ? "Yes"
              : "No"
            : "—"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "Created At",
      render: (row: any) => (
        <span className="text-slate-700">{formatYYYYMMDD(row.createdAt)}</span>
      ),
    },
  ];

  const sortingOptions = [
    { label: "Newest", value: "createdAt:desc" },
    { label: "Oldest", value: "createdAt:asc" },
    { label: "Name (A-Z)", value: "name:asc" },
    { label: "Name (Z-A)", value: "name:desc" },
    { label: "Email (A-Z)", value: "email:asc" },
    { label: "Email (Z-A)", value: "email:desc" },
  ];

  const roleOptions = [
    { label: "All Roles", value: "" },
    { label: "ADMIN", value: "ADMIN" },
    { label: "DOCTOR", value: "DOCTOR" },
    { label: "PATIANT", value: "PATIANT" }, 
  ];

  const statusOptions = [
    { label: "All Status", value: "" },
    { label: "ACTIVE", value: "ACTIVE" },
    { label: "DELETED", value: "DELETED" },
    { label: "BLOCKED", value: "BLOCKED" },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <p className="mb-3 hidden text-lg font-semibold md:block">Users</p>

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
              options={roleOptions}
              value={filters.role}
              onChange={(v) =>
                setFilters((prev) => ({ ...prev, role: v, page: 1 }))
              }
            />
          </div>

          <div className="w-full max-w-[160px]">
            <ReusableSelect
              options={statusOptions}
              value={filters.status}
              onChange={(v) =>
                setFilters((prev) => ({ ...prev, status: v, page: 1 }))
              }
            />
          </div>

          <div className="w-full max-w-[180px]">
            <ReusableSelect
              options={sortingOptions}
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

      <ReusibleTable column={columns} data={users} isLoading={isLoading} />

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

export default UsersPage;