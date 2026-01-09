"use client";

import { useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { FiCalendar, FiClock, FiVideo, FiFileText } from "react-icons/fi";
import ReusibleTable from "@/app/component/Reusible/Table/ReusibleTable";
import Pagination from "@/app/component/Reusible/Pagination/Pagination";
import { useGetMyAppoinmentQuery } from "@/app/redux/api/appointmentApi";
import { MdReviews } from "react-icons/md";
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
  const [appoinmentData, setAppoinmentData] = useState() as any;
  const [params, setParams] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useGetMyAppoinmentQuery({ ...params });
  const [createReview] = useCreateReviewMutation();

  const handleToReview = async (e: FieldValues) => {
    const reviewData = {
      ...e,
      appointmentId: appoinmentData?.id,
    };
    try {
      const res = await createReview(reviewData).unwrap();
      if (res?.success) {
        toast.success(res?.message);
        setOpen(false);
      }
    } catch (err: any) {
      toast.error(err?.data?.message);
      setOpen(false);
    }
  };

  const handleToModal = (e: any) => {
    setAppoinmentData(e);
    setOpen(!open);
  };

  const appointments = data?.data?.data ?? [];
  const meta = data?.data?.meta;

  const column = [
    {
      key: "doctor",
      header: "Doctor",
      render: (row: any) => (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border border-slate-200 bg-slate-100">
            <Image
              src={row?.doctor?.profilePhoto || "/placeholder-avatar.png"}
              alt={row?.doctor?.name}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="font-bold text-slate-900">{row?.doctor?.name}</div>
            <div className="text-xs text-slate-500">
              {row?.doctor?.designation}
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "appointmentDate",
      header: "Schedule",
      render: (row: any) => (
        <div className="text-sm">
          <div className="flex items-center gap-1 font-medium text-slate-700">
            <FiCalendar className="text-indigo-500" />
            {dayjs(row?.schedule?.startDateTime).format("MMM D, YYYY")}
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <FiClock className="text-indigo-400" />
            {dayjs(row?.schedule?.startDateTime).format("hh:mm A")} -{" "}
            {dayjs(row?.schedule?.endDateTime).format("hh:mm A")}
          </div>
        </div>
      ),
    },
    {
      key: "paymentStatus",
      header: "Payment",
      render: (row: any) => (
        <span
          className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase ${
            row.paymentStatus === "PAID"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {row.paymentStatus}
        </span>
      ),
    },
    {
      key: "status",
      header: "Appt. Status",
      render: (row: any) => (
        <span className="text-xs font-semibold text-slate-600">
          {row.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Join / Action",
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
              className="flex items-center gap-1 rounded-lg bg-indigo-600 px-3 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors cursor-pointer"
            >
              <FiVideo /> Join Call
            </button>
          ) : (
            <button
              disabled
              className="cursor-not-allowed rounded-lg bg-slate-100 px-3 py-2 text-xs font-bold text-slate-400"
            >
              Join Call
            </button>
          )}

          {row.status === "COMPLETED" && (
            <Link href={`/dashboard/patiant/prescription`} className="flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50">
              <FiFileText /> Prescription
            </Link>
          )}
        </div>
      ),
    },
    {
      key: "review",
      header: "Review",
      render: (row: any) => {
        const isReviewDisabled =
          row?.status !== "COMPLETED" ||
          row?.paymentStatus !== "PAID" ||
          !!row?.review;
        return (
          <div className="flex items-center gap-2">
            <button
              disabled={isReviewDisabled}
              onClick={() => handleToModal(row)}
              className={`flex items-center gap-1 rounded-lg ${
                isReviewDisabled
                  ? "bg-indigo-600 opacity-30"
                  : "bg-indigo-500 cursor-pointer"
              } px-3 py-2 text-xs font-bold text-white hover:bg-indigo-700 transition-colors `}
            >
              <MdReviews /> Give Review
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-2xl font-extrabold text-slate-900">
            My Paid Appointments
          </h1>
          <p className="text-sm text-slate-500">
            Manage your scheduled sessions and join video consultations.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <ReusibleTable
            column={column}
            data={appointments}
            isLoading={isLoading}
          />
        </div>

        {!isLoading && appointments.length > 0 && (
          <div className="mt-6 flex justify-center">
            <Pagination
              page={meta?.page || params.page}
              limit={meta?.limit || params.limit}
              total={meta?.total || 0}
              onPageChange={(p) => setParams((prev) => ({ ...prev, page: p }))}
            />
          </div>
        )}

        {!isLoading && appointments.length === 0 && (
          <div className="mt-10 text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <FiCalendar size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              No appointments found
            </h3>
            <p className="text-slate-500 text-sm">
              You haven't booked any appointments yet.
            </p>
          </div>
        )}
      </div>
      <ReusableModal
        open={open}
        title="Give An Review"
        onClose={() => setOpen(false)}
      >
        <HCForm
          onsubmit={handleToReview}
          defaultValues={{ rating: 0, comment: "" }}
        >
          <div className="flex flex-col gap-4">
            <div className="mx-auto">
              <p className="text-sm font-medium mb-2 text-center">
                Give Rating
              </p>
              <HCRating />
            </div>
            <HCInput
              name="comment"
              type="text"
              placeholder="please enter your comment"
            />

            <button
              type="submit"
              className="h-10 rounded-lg bg-indigo-600 px-4 text-sm text-white"
            >
              SUBMIT REVIEW
            </button>
          </div>
        </HCForm>
      </ReusableModal>
    </div>
  );
};

export default PatientAppointments;
