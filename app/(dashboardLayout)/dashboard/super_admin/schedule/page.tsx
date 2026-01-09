"use client";

import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import ReusableSearchInput from "@/app/component/Reusible/input/SearchInput";
import ReusableSelect from "@/app/component/Reusible/select/ReusibleSelect";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import Link from "next/link";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { useDeleteScheduleMutation, useGetScheduleQuery } from "@/app/redux/api/scheduleApi";

const formatDateTime = (value: any) => {
  if (!value) return "—";
  const d = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(d.getTime())) return "—";
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
};

const minutesBetween = (start: any, end: any) => {
  const s = start instanceof Date ? start : new Date(start);
  const e = end instanceof Date ? end : new Date(end);
  if (Number.isNaN(s.getTime()) || Number.isNaN(e.getTime())) return null;
  return Math.max(0, Math.round((e.getTime() - s.getTime()) / 60000));
};

const SchedulePage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    sortBy: "startDateTime",
    sortOrder: "asc",
    limit: 10,
    page: 1,
  });

  const { data, isLoading } = useGetScheduleQuery({ ...filters });
  const [deleteSchedule, { isLoading: isDeleting }] =
    useDeleteScheduleMutation();

  const schedules = data?.data ?? [];
  const meta = data?.meta;

  const sortingValue = `${filters.sortBy}:${filters.sortOrder}`;

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSchedule(id).unwrap();
      toast.success(res?.message || "Deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

  const columns = useMemo(
    () => [
      {
        key: "startDateTime",
        header: "Start",
        render: (row: any) => (
          <span className="font-semibold text-slate-900">
            {formatDateTime(row.startDateTime)}
          </span>
        ),
      },
      {
        key: "endDateTime",
        header: "End",
        render: (row: any) => (
          <span className="text-slate-700">
            {formatDateTime(row.endDateTime)}
          </span>
        ),
      },
      {
        key: "duration",
        header: "Duration",
        render: (row: any) => {
          const mins = minutesBetween(row.startDateTime, row.endDateTime);
          if (mins === null) return <span className="text-slate-500">—</span>;
          const h = Math.floor(mins / 60);
          const m = mins % 60;
          return (
            <span className="text-slate-700">
              {h > 0 ? `${h}h ` : ""}
              {m}m
            </span>
          );
        },
      },
      {
        key: "doctorsCount",
        header: "Total Doctors",
        render: (row: any) => (
          <span className="text-slate-700">
            {Array.isArray(row.doctorSchedules)
              ? row.doctorSchedules.length
              : row?._count?.doctorSchedules ?? "0"}
          </span>
        ),
      },
      {
        key: "appointment",
        header: "Appointment",
        render: (row: any) => (
          <span
            className={[
              "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
              row.isBooked
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : "bg-emerald-50 text-emerald-700 border border-emerald-200",
            ].join(" ")}
          >
            {row.isBooked ? "Booked" : "Available"}
          </span>
        ),
      },
      {
        key: "createdAt",
        header: "Created",
        render: (row: any) => (
          <span className="text-slate-600">{formatDateTime(row.createdAt)}</span>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        render: (row: any) => (
          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/schedules/${row.id}/edit`}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
            >
              <FiEdit2 className="h-4 w-4" />
              Edit
            </Link>

            <button
              type="button"
              disabled={isDeleting}
              onClick={() => handleDelete(row.id)}
              className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-60"
            >
              <FiTrash2 className="h-4 w-4" />
              Delete
            </button>
          </div>
        ),
      },
    ],
    [isDeleting]
  );

  const scheduleSortingOptions = [
    { label: "Start (Earliest)", value: "startDateTime:asc" },
    { label: "Start (Latest)", value: "startDateTime:desc" },
    { label: "Created (Newest)", value: "createdAt:desc" },
    { label: "Created (Oldest)", value: "createdAt:asc" },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <p className="mb-3 hidden text-lg font-semibold md:block">Schedules</p>

        <div className="flex gap-3">
          <div className="w-full max-w-md">
            <ReusableSearchInput
              value={filters.searchTerm}
              onChange={(v) =>
                setFilters((prev) => ({ ...prev, searchTerm: v, page: 1 }))
              }
            />
          </div>

          <div className="w-full max-w-[200px]">
            <ReusableSelect
              options={scheduleSortingOptions}
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

      <ReusibleTable column={columns} data={schedules} isLoading={isLoading} />

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

export default SchedulePage;