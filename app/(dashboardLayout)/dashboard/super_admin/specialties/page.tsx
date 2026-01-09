"use client";

import HCForm from "@/app/component/Form/HCForm/HCForm";
import HCInput from "@/app/component/Form/HCInput/HCIput";
import HCImageUploader from "@/app/component/Form/HCInput/HCUpload";
import ReusableSearchInput from "@/app/component/Reusible/input/SearchInput";
import ReusableModal from "@/app/component/Reusible/Model/ReusibleModel";
import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import ReusableSelect from "@/app/component/Reusible/select/ReusibleSelect";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import {
  useGetSpecialtiesQuery,
  useDeleteSpecialtyMutation,
} from "@/app/redux/api/specialtiesApi";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const SpecialtiesPage = () => {
  const [filters, setFilters] = useState({
    searchTerm: "",
    sortBy: "title",
    sortOrder: "asc",
    limit: 10,
    page: 1,
  });

  const { data, isLoading } = useGetSpecialtiesQuery({ ...filters });
  const [deleteSpecialty, { isLoading: isDeleting }] =
    useDeleteSpecialtyMutation();
  const specialties = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const sortingValue = `${filters.sortBy}:${filters.sortOrder}`;


  const handleDelete = async (id: string) => {
    try {
      const res = await deleteSpecialty(id).unwrap();
      toast.success(res?.message || "Deleted successfully");
    } catch (err: any) {
      toast.error(err?.data?.message || "Delete failed");
    }
  };

 console.log(filters)
  const column = [
    {
      key: "icon",
      header: "Icon",
      render: (row: any) => (
        <div className="relative h-9 w-9 overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
          {row.icon ? (
            <Image
              src={row.icon}
              alt={row.title ?? "specialty"}
              fill
              sizes="36px"
              className="object-cover"
            />
          ) : null}
        </div>
      ),
    },
    {
      key: "title",
      header: "Title",
      render: (row: any) => (
        <span className="font-semibold text-slate-900">{row.title}</span>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (row: any) => (
        <span className="font-semibold text-slate-900">{row.description.slice(0,70)}</span>
      ),
    },
    {
      key: "doctorsCount",
      header: "Total Doctors",
      render: (row: any) => (
        <span className="text-slate-700">
          {Array.isArray(row.doctorSpecialties)
            ? row.doctorSpecialties.length
            : row?._count?.doctorSpecialties ?? "0"}
        </span>
      ),
    },

    {
      key: "actions",
      header: "Actions",
      render: (row: any) => (
        <div className="flex items-center gap-2">
     

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

  const specialtiesSortingOptions = [
    { label: "Title (A-Z)", value: "title:asc" },
    { label: "Title (Z-A)", value: "title:desc" },
  ];

  return (
    <div className="p-6">
      <div className="mb-4 flex justify-between">
        <p className="mb-3 text-lg font-semibold hidden md:block">
          Specialties
        </p>

        <div className="flex gap-3">
          <div className="w-full max-w-md">
            <ReusableSearchInput
              value={filters.searchTerm}
              onChange={(v) =>
                setFilters((prev) => ({ ...prev, searchTerm: v, page: 1 }))
              }
            />
          </div>
        
          <div className="w-full max-w-[180px]">
            <ReusableSelect
              options={specialtiesSortingOptions}
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

      <ReusibleTable column={column} data={specialties} isLoading={isLoading} />

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

export default SpecialtiesPage;
