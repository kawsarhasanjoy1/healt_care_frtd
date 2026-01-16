"use client";

import { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import {
  FiCalendar,
  FiClock,
  FiVideo,
  FiFileText,
  FiMessageSquare,
} from "react-icons/fi";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import { useGetMyAppoinmentQuery } from "@/app/redux/api/appointmentApi";
import { MdReviews, MdOutlineRateReview } from "react-icons/md";
import ReusableModal from "@/app/component/Reusible/Model/ReusibleModel";
import HCForm from "@/app/component/Form/HCForm/HCForm";
import HCInput from "@/app/component/Form/HCInput/HCIput";
import HCRating from "@/app/component/Form/HCInput/HCRating";
import { FieldValues } from "react-hook-form";
import { useCreateReviewMutation } from "@/app/redux/api/reviewApi";
import toast from "react-hot-toast";
import Link from "next/link";

const PatientAppointments = () => {
  const [open, setOpen] = useState(false);
  const [appoinmentData, setAppoinmentData] = useState<any>(null);
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useGetMyAppoinmentQuery({ ...params });
  const [createReview, { isLoading: isReviewSubmitting }] =
    useCreateReviewMutation();

  const handleToReview = async (e: FieldValues) => {
    const reviewData = {
      ...e,
      rating: Number(e.rating), // নিশ্চিত করুন রেটিং নাম্বার হিসেবে যাচ্ছে
      appointmentId: appoinmentData?.id,
    };
    try {
      const res = await createReview(reviewData).unwrap();
      if (res?.success || res?.id) {
        toast.success("রিভিউ সফলভাবে জমা দেওয়া হয়েছে!");
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "রিভিউ জমা দিতে ব্যর্থ হয়েছে");
    }
  };

  const handleToModal = (e: any) => {
    setAppoinmentData(e);
    setOpen(true);
  };

  const appointments = data?.data?.data || []; // API স্ট্রাকচার অনুযায়ী চেঞ্জ হতে পারে
  const meta = data?.meta;

  const column = [
    {
      key: "doctor",
      header: "Doctor Info",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-2xl border-2 border-white shadow-sm ring-1 ring-slate-100">
            <Image
              src={
                row?.doctor?.profilePhoto ||
                "https://i.ibb.co.com/896677G/placeholder-avatar.png"
              }
              alt={row?.doctor?.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-slate-800 leading-tight">
              {row?.doctor?.name}
            </div>
            <div className="text-[11px] font-medium text-blue-600 uppercase tracking-wider">
              {row?.doctor?.designation}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "appointmentDate",
      header: "Schedule Details",
      render: (row: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700">
            <FiCalendar className="text-indigo-500" size={14} />
            {dayjs(row?.schedule?.startDateTime).format("MMM DD, YYYY")}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <FiClock className="text-slate-400" size={13} />
            {dayjs(row?.schedule?.startDateTime).format("hh:mm A")} -{" "}
            {dayjs(row?.schedule?.endDateTime).format("hh:mm A")}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Booking Status",
      render: (row: any) => {
        const statusColors: any = {
          SCHEDULED: "bg-blue-50 text-blue-600 border-blue-100",
          COMPLETED: "bg-emerald-50 text-emerald-600 border-emerald-100",
          CANCELED: "bg-red-50 text-red-600 border-red-100",
        };
        return (
          <span
            className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
              statusColors[row.status] || "bg-slate-50 text-slate-600"
            }`}
          >
            {row.status}
          </span>
        );
      },
    },
    {
      key: "payment",
      header: "Payment",
      render: (row: any) => (
        <div className="flex flex-col gap-1">
          <span
            className={`w-fit rounded-md px-2 py-0.5 text-[10px] font-black ${
              row.paymentStatus === "PAID"
                ? "bg-green-500 text-white"
                : "bg-amber-400 text-white"
            }`}
          >
            {row.paymentStatus}
          </span>
          <span className="text-[10px] text-slate-400 font-medium">
            Txn: {row?.payment?.transactionId || "N/A"}
          </span>
        </div>
      ),
    },
    {
      key: "actions",
      header: "Consultation",
      render: (row: any) => (
        <div className="flex items-center gap-2">
          {row.paymentStatus === "PAID" && row.status === "SCHEDULED" ? (
            <button
              onClick={() =>
                window.open(
                  `/video?videoCallId=${row.videoCallingId}`,
                  "_blank"
                )
              }
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition-all"
            >
              <FiVideo size={16} /> Join Now
            </button>
          ) : row.status === "COMPLETED" ? (
            <Link
              href={`/dashboard/patient/prescription/${row.id}`}
              className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-xs font-bold text-white hover:bg-slate-900 transition-all"
            >
              <FiFileText size={16} /> Report
            </Link>
          ) : (
            <span className="text-[11px] font-bold text-slate-300">
              Wait for Schedule
            </span>
          )}
        </div>
      ),
    },
    {
      key: "review",
      header: "Feedback",
      render: (row: any) => {
        const hasReviewed = !!row?.review;
        const isEligible =
          row?.status === "COMPLETED" && row?.paymentStatus === "PAID";

        return (
          <button
            disabled={!isEligible || hasReviewed}
            onClick={() => handleToModal(row)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              hasReviewed
                ? "bg-slate-50 text-slate-400 cursor-not-allowed"
                : isEligible
                ? "bg-amber-50 text-amber-600 border border-amber-200 hover:bg-amber-500 hover:text-white"
                : "bg-slate-50 text-slate-200 cursor-not-allowed"
            }`}
          >
            {hasReviewed ? (
              <MdReviews size={16} />
            ) : (
              <MdOutlineRateReview size={16} />
            )}
            {hasReviewed ? "Reviewed" : "Review"}
          </button>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              আমার অ্যাপয়েন্টমেন্ট
            </h1>
            <p className="text-slate-500 font-medium mt-1">
              আপনার সকল অ্যাপয়েন্টমেন্ট এবং ভিডিও কনসাল্টেশন এখানে ম্যানেজ
              করুন।
            </p>
          </div>
          <div className="flex gap-2">
            <div className="bg-white px-4 py-2 rounded-2xl border border-slate-200 text-sm font-bold text-slate-600 shadow-sm">
              Total: {meta?.total || 0}
            </div>
          </div>
        </header>

        {/* Table Container */}
        <div className="rounded-[2rem] border border-slate-100 bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
          <ReusibleTable
            column={column}
            data={appointments}
            isLoading={isLoading}
          />

        
        </div>

        {/* Pagination */}
        {!isLoading && appointments.length > 0 && (
          <div className="mt-8 flex justify-center">
            <Pagination
              page={meta?.page || params.page}
              limit={meta?.limit || params.limit}
              total={meta?.total || 0}
              onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
            />
          </div>
        )}
      </div>

      {/* Review Modal */}
      <ReusableModal
        open={open}
        title="ডাক্তারকে আপনার মতামত জানান"
        onClose={() => setOpen(false)}
      >
        <HCForm
          onsubmit={handleToReview}
          defaultValues={{ rating: 5, comment: "" }}
        >
          <div className="space-y-6 py-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 p-4 bg-indigo-50 rounded-full text-indigo-600">
                <FiMessageSquare size={32} />
              </div>
              <p className="text-sm font-bold text-slate-600">
                আপনার অভিজ্ঞতার ভিত্তিতে রেটিং দিন
              </p>
              <div className="mt-2 scale-125">
                <HCRating />
              </div>
            </div>

            <HCInput
              name="comment"
              type="text"
              label="মন্তব্য লিখুন (ঐচ্ছিক)"
              placeholder="আপনার অভিজ্ঞতা কেমন ছিল বলুন..."
            />

            <button
              type="submit"
              disabled={isReviewSubmitting}
              className="w-full h-14 rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-100 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isReviewSubmitting ? "জমা হচ্ছে..." : "রিভিউ জমা দিন"}
            </button>
          </div>
        </HCForm>
      </ReusableModal>
    </div>
  );
};

export default PatientAppointments;
