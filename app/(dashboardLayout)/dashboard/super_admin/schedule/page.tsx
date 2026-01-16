"use client";

import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import ReusableSearchInput from "@/app/component/Reusible/input/SearchInput";
import ReusableSelect from "@/app/component/Reusible/select/ReusibleSelect";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import Link from "next/link";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi"; // Added FiPlus
import {
  useDeleteScheduleMutation,
  useGetScheduleQuery,
} from "@/app/redux/api/scheduleApi";

/**
 * Formats date for display in the Admin Table.
 * Uses 'en-GB' for a clean "15 Jan 2026, 08:30" format.
 */
const formatDateTime = (value: any) => {
  if (!value) return "—";
  const d = new Date(value);
  if (isNaN(d.getTime())) return "—";

  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  }).format(d);
};

const minutesBetween = (start: any, end: any) => {
  const s = new Date(start);
  const e = new Date(end);
  if (isNaN(s.getTime()) || isNaN(e.getTime())) return null;
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
    if (!window.confirm("Are you sure you want to delete this schedule?"))
      return;
    try {
      const res = await deleteSchedule(id).unwrap();
      toast.success(res?.message || "Schedule deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to delete schedule");
    }
  };

  const columns = useMemo(
    () => [
      {
        key: "startDateTime",
        header: "Start Time",
        render: (row: any) => (
          <span className="font-medium text-slate-900">
            {formatDateTime(row.startDateTime)}
          </span>
        ),
      },
      {
        key: "endDateTime",
        header: "End Time",
        render: (row: any) => (
          <span className="text-slate-600">
            {formatDateTime(row.endDateTime)}
          </span>
        ),
      },
      {
        key: "duration",
        header: "Duration",
        render: (row: any) => {
          const mins = minutesBetween(row.startDateTime, row.endDateTime);
          if (mins === null) return <span className="text-slate-400">—</span>;
          const h = Math.floor(mins / 60);
          const m = mins % 60;
          return (
            <span className="text-slate-600 font-mono text-xs">
              {h > 0 ? `${h}h ` : ""}
              {m}m
            </span>
          );
        },
      },
      {
        key: "doctorsCount",
        header: "Assigned Doctors",
        render: (row: any) => (
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
            {row?._count?.doctorSchedules ?? row.doctorSchedules?.length ?? "0"}
          </div>
        ),
      },
      {
        key: "appointment",
        header: "Status",
        render: (row: any) => (
          <span
            className={[
              "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border",
              row.isBooked
                ? "bg-amber-50 text-amber-700 border-amber-200"
                : "bg-emerald-50 text-emerald-700 border-emerald-200",
            ].join(" ")}
          >
            <span
              className={[
                "mr-1.5 h-1.5 w-1.5 rounded-full",
                row.isBooked ? "bg-amber-400" : "bg-emerald-400",
              ].join(" ")}
            ></span>
            {row.isBooked ? "Booked" : "Available"}
          </span>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        render: (row: any) => (
          <div className="flex items-center gap-3">
            <Link
              href={`/dashboard/schedules/${row.id}/edit`}
              className="text-indigo-600 hover:text-indigo-900 transition-colors"
              title="Edit Schedule"
            >
              <FiEdit2 className="h-4 w-4" />
            </Link>

            <button
              type="button"
              disabled={isDeleting}
              onClick={() => handleDelete(row.id)}
              className="text-rose-600 hover:text-rose-900 disabled:opacity-50 transition-colors"
              title="Delete Schedule"
            >
              <FiTrash2 className="h-4 w-4" />
            </button>
          </div>
        ),
      },
    ],
    [isDeleting]
  );

  const scheduleSortingOptions = [
    { label: "Date (Earliest First)", value: "startDateTime:asc" },
    { label: "Date (Latest First)", value: "startDateTime:desc" },
    { label: "Recently Created", value: "createdAt:desc" },
    { label: "Oldest Records", value: "createdAt:asc" },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex flex-wrap justify-between items-center gap-4 ">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Schedule Management
            </h1>
            <p className="text-sm text-slate-500">
              Create and manage doctor appointment slots.
            </p>
          </div>

          <div className="w-full md:w-64">
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

        {/* Table Section */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <ReusibleTable
            column={columns}
            data={schedules}
            isLoading={isLoading}
          />
        </div>

        {/* Pagination Section */}
        <div className="mt-8 flex items-center justify-center">
          <Pagination
            page={meta?.page ?? filters.page}
            limit={meta?.limit ?? filters.limit}
            total={meta?.total ?? 0}
            onPageChange={(p) => setFilters((prev) => ({ ...prev, page: p }))}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
