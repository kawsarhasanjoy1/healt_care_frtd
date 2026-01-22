"use client";

import { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { FiTrash2, FiEdit, FiEye, FiPlus } from "react-icons/fi";
import Link from "next/link";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import ReusableSelect from "@/app/component/Reusible/select/ReusibleSelect";

import {
  useDeleteBlogMutation,
  useGetAllBlogsQuery,
} from "@/app/redux/api/blogApi";
import toast from "react-hot-toast";


const BlogManagementPage = () => {
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
  console.log(meta);
  const handleDelete = async (id: string) => {
    try {
      await deleteBlog(id).unwrap();
      toast.success("ব্লগটি সফলভাবে মুছে ফেলা হয়েছে");
    } catch (err: any) {
      toast.error(err?.data?.message || "মুছে ফেলা সম্ভব হয়নি");
    }
  };

  const column = [
    {
      key: "thumbnail",
      header: "ব্লগ",
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
          <div className="max-w-[200px]">
            <p className="font-semibold text-slate-900 line-clamp-1">
              {row.title}
            </p>
            <p className="text-xs text-cyan-600">{row.specialties?.title}</p>
          </div>
        </div>
      ),
    },
    {
      key: "author",
      header: "লেখক",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          <div className="relative h-7 w-7 overflow-hidden rounded-full border">
            <Image
              src={row.author?.profilePhoto || "/avatar.png"}
              alt="author"
              fill
              className="object-cover"
            />
          </div>
          <span className="text-sm font-medium text-slate-700">
            {row.author?.name}
          </span>
        </div>
      ),
    },
    {
      key: "status",
      header: "স্ট্যাটাস",
      render: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
            row.isPublished
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {row.isPublished ? "Published" : "Draft"}
        </span>
      ),
    },
    {
      key: "createdAt",
      header: "তারিখ",
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
          <Link href={`/blogs/${row.id}`} title="দেখুন">
            <button className="p-2 text-slate-400 hover:text-cyan-600 transition-colors">
              <FiEye size={18} />
            </button>
          </Link>
          <Link href={`/dashboard/blogs/edit/${row.id}`} title="এডিট">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
              <FiEdit size={18} />
            </button>
          </Link>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
            title="মুছুন"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6 bg-white min-h-screen rounded-2xl shadow-sm border border-slate-100">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            ব্লগ ম্যানেজমেন্ট
          </h1>
          <p className="text-sm text-slate-500">
            আপনার তৈরি করা নিবন্ধগুলো এখান থেকে নিয়ন্ত্রণ করুন।
          </p>
        </div>
        <ReusableSelect
          options={[
            { label: "নতুন আগে", value: "createdAt:desc" },
            { label: "পুরানো আগে", value: "createdAt:asc" },
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

      <div className="overflow-hidden">
        <ReusibleTable column={column} data={blogs} isLoading={isLoading} />
      </div>

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
  );
};

export default BlogManagementPage;
