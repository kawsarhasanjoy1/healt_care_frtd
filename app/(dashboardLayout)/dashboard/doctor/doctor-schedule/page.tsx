"use client";

import ReusableSearchInput from "@/app/component/Reusible/input/SearchInput";
import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import ReusableSelect from "@/app/component/Reusible/select/ReusibleSelect";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";

import Image from "next/image";
import {  useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { FiTrash2 } from "react-icons/fi";
import { useGetMyScheduleQuery } from "@/app/redux/api/doctorScheduleApi";

dayjs.extend(utc);

const DoctorSchedulePage = () => {
  const [filters, setFilters] = useState({
    isBooked: "",
    startDate: "",
    endDate: "",
    sortBy: "startDateTime",
    sortOrder: "asc",
    limit: 10,
    page: 1,
  });

  const { data, isLoading } = useGetMyScheduleQuery({ ...filters });

  //   const [removeDoctorSchedule, { isLoading: isDeleting }] =
  //     useRemoveDoctorScheduleMutation();

  // backend response: { data: { data: [], meta: {} } }
  const doctorSchedules = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const sortingValue = `${filters.sortBy}:${filters.sortOrder}`;

  const scheduleSortingOptions = [
    { label: "Start Time (ASC)", value: "startDateTime:asc" },
    { label: "Start Time (DESC)", value: "startDateTime:desc" },
  ];

  const bookedOptions = [
    { label: "All", value: "" },
    { label: "Available", value: "false" },
    { label: "Booked", value: "true" },
  ];

  const formatDate = (iso?: string) =>
    iso ? dayjs(iso).format("YYYY-MM-DD") : "—";
  const formatTime = (startISO?: string, endISO?: string) => {
    if (!startISO || !endISO) return "—";
    const s = dayjs.utc(startISO).format("HH:mm");
    const e = dayjs.utc(endISO).format("HH:mm");
    return `${s} - ${e}`;
  };

  //   const handleRemove = async (row: any) => {
  //     try {
  //       // booked schedule remove করতে চাইলে disable করে রাখছি
  //       if (row?.isBooked) return toast.error("This schedule is booked. You cannot remove it.");

  //       const ok = confirm("Remove this schedule from doctor?");
  //       if (!ok) return;

  //       const payload = { doctorId: row.doctorId, scheduleId: row.scheduleId };
  //       const res = await removeDoctorSchedule(payload).unwrap();

  //       toast.success(res?.data?.message || "Removed");
  //     } catch (err: any) {
  //       toast.error(err?.data?.message || err?.message || "Remove failed");
  //     }
  //   };

  const column = [
    {
      key: "doctor",
      header: "Doctor",
      render: (row: any) => {
        const photo = row?.doctor?.profilePhoto;
        const name = row?.doctor?.name ?? "—";
        const email = row?.doctor?.email ?? "—";

        return (
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
              {photo ? (
                <Image
                  src={photo}
                  alt={name}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : null}
            </div>

            <div className="leading-tight">
              <div className="font-semibold text-slate-900">{name}</div>
              <div className="text-xs text-slate-500">{email}</div>
            </div>
          </div>
        );
      },
    },
    {
      key: "date",
      header: "Date",
      render: (row: any) => (
        <span>{formatDate(row?.schedule?.startDateTime)}</span>
      ),
    },
    {
      key: "time",
      header: "Time",
      render: (row: any) => (
        <span>
          {formatTime(row?.schedule?.startDateTime, row?.schedule?.endDateTime)}
        </span>
      ),
    },
    {
      key: "isBooked",
      header: "Status",
      render: (row: any) => {
        const booked = !!row?.isBooked;
        return (
          <span
            className={[
              "rounded-full px-2 py-1 text-xs font-semibold",
              booked
                ? "bg-rose-100 text-rose-700"
                : "bg-emerald-100 text-emerald-700",
            ].join(" ")}
          >
            {booked ? "Booked" : "Available"}
          </span>
        );
      },
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            //   disabled={isDeleting || row?.isBooked}
            //   onClick={() => handleRemove(row)}
            className="inline-flex items-center gap-1 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700 hover:bg-rose-100 disabled:opacity-60"
            title={
              row?.isBooked ? "Booked schedule cannot be removed" : "Remove"
            }
          >
            <FiTrash2 className="h-4 w-4" />
            Remove
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-lg font-semibold hidden md:block">
          Doctor Schedules
        </p>

        <div className="flex gap-3">
    

          <div className="w-full max-w-[140px]">
            <ReusableSelect
              options={bookedOptions}
              value={filters.isBooked}
              onChange={(v) =>
                setFilters((prev) => ({ ...prev, isBooked: v, page: 1 }))
              }
            />
          </div>

          <div className="w-full max-w-[150px]">
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

      <ReusibleTable
        column={column}
        data={doctorSchedules}
        isLoading={isLoading}
      />

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

export default DoctorSchedulePage;
