"use client";
import UpDoctors from "@/app/component/doctors/updateDoctors/UpdateDoctors";
import ReusableSearchInput from "@/app/component/Reusible/input/SearchInput";
import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import ReusableSelect from "@/app/component/Reusible/select/ReusibleSelect";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import {
  useGetDoctorsQuery,
  useSoftDeleteDoctorMutation,
} from "@/app/redux/api/doctorsApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const AdminPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    averageRating: "",
    sortBy: "createdAt",
    sortOrder: "desc",
    limit: 10,
    page: 1,
  });

  const { data, isLoading } = useGetDoctorsQuery({ ...filters });
  const [open, setOpen] = useState(false);
  const [doctorId, setDoctorId] = useState("");
  const [softDeleteDoctor, { isLoading: isDeleting }] =
    useSoftDeleteDoctorMutation();
  const doctors = data?.data?.data ?? [];
  const meta = data?.data?.meta;
  const sortingValue = `${filters?.sortBy}:${filters?.sortOrder}`;
  const handleDelete = async (id: string) => {
    try {
      const res = await softDeleteDoctor(id).unwrap();
      toast.success(res?.data?.message);
    } catch (err: any) {
      toast.error(err?.data?.message);
    }
  };
  const handleToUpDoc = (id: string) => {
    setDoctorId(id);
    setOpen(!open);
  };
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
    {
      key: "AppoinmentFee",
      header: "Appoinment Fee",
      render: (row: any) => <span>{row.appoinmentFee || "—"}</span>,
    },
    {
      key: "experience",
      header: "experience",
      render: (row: any) => <span>{row?.experience || "—"}</span>,
    },
    {
      key: "Average Rating",
      header: "Average Rating",
      render: (row: any) => (
        <span className="">{row.averageRating || "—"}</span>
      ),
    },
    {
      key: "currentWorkingPlace",
      header: "Current Working Place",
      render: (row: any) => <span>{row.currentWorkingPlace || "—"}</span>,
    },
    {
      key: "designation",
      header: "designation",
      render: (row: any) => <span>{row.designation || "—"}</span>,
    },
    {
      key: "qualification",
      header: "qualification",
      render: (row: any) => <span>{row.qualification || "—"}</span>,
    },
    {
      key: "registrationNumber",
      header: "registration Number",
      render: (row: any) => <span>{row.registrationNumber || "—"}</span>,
    },
    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleToUpDoc(row?.id)}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50"
          >
            <FiEdit2 className="h-4 w-4" />
            Edit
          </button>

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

      <ReusibleTable column={column} data={doctors} isLoading={isLoading} />
      <div className=" mt-10 flex justify-center">
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
      {open ? (
        <UpDoctors
          open={open}
          onClose={() => setOpen(false)}
          id={doctorId}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default AdminPage;
