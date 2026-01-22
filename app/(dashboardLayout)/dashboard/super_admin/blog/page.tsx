"use client";

import { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { FiTrash2, FiEdit, FiEye, FiSearch, FiUser } from "react-icons/fi";
import Link from "next/link";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import ReusableSelect from "@/app/component/Reusible/select/ReusibleSelect";

import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "@/app/redux/api/blogApi";
import toast from "react-hot-toast";

const SuperAdminBlogManagement = () => {
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
    searchTerm: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  const { data, isLoading } = useGetAllBlogsQuery({ ...params });
  const [deleteBlog] = useDeleteBlogMutation();

  const blogs = data?.data?.data;
  const meta = data?.data?.meta;

  const handleDelete = async (id: string) => {
    if (
      window.confirm(
        "আপনি কি নিশ্চিত যে এই ব্লগটি মুছে ফেলতে চান? এটি সিস্টেম থেকে চিরতরে হারিয়ে যাবে।"
      )
    ) {
      try {
        await deleteBlog(id).unwrap();
        toast.success("ব্লগটি সিস্টেম থেকে মুছে ফেলা হয়েছে");
      } catch (err: any) {
        toast.error(err?.data?.message || "মুছে ফেলা সম্ভব হয়নি");
      }
    }
  };

  const column = [
    {
      key: "thumbnail",
      header: "নিবন্ধের শিরোনাম",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-20 overflow-hidden rounded-lg border bg-slate-100">
            <Image
              src={row.thumbnail || "/placeholder.jpg"}
              alt={row.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="max-w-[250px]">
            <p className="font-bold text-slate-900 line-clamp-1">{row.title}</p>
            <p className="text-xs font-medium text-indigo-600">
              {row.specialties?.title}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "author",
      header: "লেখক ও ভূমিকা",
      render: (row: any) => (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <div className="relative h-6 w-6 overflow-hidden rounded-full border">
              <Image
                src={row.author?.profilePhoto || "/avatar.png"}
                alt="author"
                fill
                className="object-cover"
              />
            </div>
            <span className="text-sm font-semibold text-slate-700">
              {row.author?.name}
            </span>
          </div>
          <span
            className={`text-[10px] w-fit px-1.5 py-0.5 rounded font-bold uppercase border ${
              row.author?.role === "SUPER_ADMIN"
                ? "border-purple-200 bg-purple-50 text-purple-700"
                : row.author?.role === "ADMIN"
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-slate-50 text-slate-600"
            }`}
          >
            {row.author?.role}
          </span>
        </div>
      ),
    },
    {
      key: "createdAt",
      header: "পাবলিশের তারিখ",
      render: (row: any) => (
        <span className="text-sm text-slate-500">
          {dayjs(row.createdAt).format("DD MMM, YYYY")}
        </span>
      ),
    },
    {
      key: "actions",
      header: "অ্যাকশন",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <Link href={`/blogs/${row.id}`} target="_blank">
            <button className="p-2 text-slate-400 hover:text-cyan-600 transition-colors bg-slate-50 rounded-lg hover:bg-cyan-50">
              <FiEye size={18} />
            </button>
          </Link>
          <Link href={`/dashboard/blogs/edit/${row.id}`}>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors bg-slate-50 rounded-lg hover:bg-blue-50">
              <FiEdit size={18} />
            </button>
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 text-slate-400 hover:text-rose-600 transition-colors bg-slate-50 rounded-lg hover:bg-rose-50"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-[#F8FAFC] min-h-screen">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              সিস্টেম ব্লগ ম্যানেজমেন্ট{" "}
              <span className="bg-indigo-600 text-[10px] text-white px-2 py-1 rounded-md uppercase tracking-widest">
                Super Admin
              </span>
            </h1>
            <p className="text-sm text-slate-500">
              পুরো প্ল্যাটফর্মের সকল নিবন্ধ মনিটর ও কন্ট্রোল করুন।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="ব্লগ খুঁজুন..."
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none w-[200px] lg:w-[300px]"
                onChange={(e) =>
                  setParams((prev) => ({
                    ...prev,
                    searchTerm: e.target.value,
                    page: 1,
                  }))
                }
              />
            </div>
            <ReusableSelect
              options={[
                { label: "সর্বশেষ নিবন্ধ", value: "createdAt:desc" },
                { label: "পুরানো নিবন্ধ", value: "createdAt:asc" },
                { label: "শিরোনাম (A-Z)", value: "title:asc" },
              ]}
              value={`${params.sortBy}:${params.sortOrder}`}
              onChange={(v) => {
                const [by, order] = v.split(":");
                setParams((prev) => ({
                  ...prev,
                  sortBy: by,
                  sortOrder: order,
                }));
              }}
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-hidden rounded-xl border border-slate-100">
          <ReusibleTable column={column} data={blogs} isLoading={isLoading} />
        </div>

        {/* Pagination Section */}
        {meta && meta.total > params.limit && (
          <div className="mt-8 flex justify-center">
            <Pagination
              page={meta.page}
              limit={meta.limit}
              total={meta.total}
              onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminBlogManagement;
