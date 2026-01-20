"use client";

import React, { useMemo, useState, use } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useGetDoctorQuery } from "@/app/redux/api/doctorsApi";
import { useGetMeQuery } from "@/app/redux/api/userApi";
import { useCreateAppoinmentMutation } from "@/app/redux/api/appointmentApi";
import { useInitPaymentMutation } from "@/app/redux/api/paymentApi";

import { useGetAllDoctorScheduleQuery } from "@/app/redux/api/doctorScheduleApi";
import AppointmentBookPatiantCard from "@/app/component/schedule/AppoinmentBookPatiantCard";
import AppoinmentBookDoctorCard from "@/app/component/schedule/AppoinmentBookDoctorCard";
import DoctorScheduleSlotCard from "@/app/component/schedule/DoctorScheduleSlotCard";

export default function BookAppointmentPage({
  params,
}: {
  params: Promise<{ doctorId: string }>;
}) {
  const router = useRouter();
  const { doctorId } = use(params);
  const { data: doctorData, isLoading: doctorLoading } =
    useGetDoctorQuery(doctorId);
  const { data: patientData, isLoading: patientLoading } =
    useGetMeQuery(undefined);
  const doctor = doctorData?.data;
  const patient = patientData?.data;

  const [selectedScheduleId, setSelectedScheduleId] = useState("");
  const [booking, setBooking] = useState(false);

  const [createAppoinment] = useCreateAppoinmentMutation();
  const [initPayment] = useInitPaymentMutation();

  const todayName = new Date().toLocaleDateString("bn-BD", { weekday: "long" });
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowName = tomorrowDate.toLocaleDateString("bn-BD", {
    weekday: "long",
  });

  const todayQuery = useMemo(() => {
    const todayStr = new Date().toLocaleDateString("en-CA");
    return {
      doctorId,
      isBooked: false,
      startDate: todayStr,
      endDate: todayStr,
    };
  }, [doctorId]);

  const tomorrowQuery = useMemo(() => {
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    const tomorrowStr = tom.toLocaleDateString("en-CA");
    return {
      doctorId,
      isBooked: false,
      startDate: tomorrowStr,
      endDate: tomorrowStr,
    };
  }, [doctorId]);

  const { data: todayRes, isLoading: todayIsLoading } =
    useGetAllDoctorScheduleQuery({ ...todayQuery });
  const { data: tomorrowRes, isLoading: tomorrowIsLoading } =
    useGetAllDoctorScheduleQuery({ ...tomorrowQuery });

  const todaySchedules = todayRes?.data?.map((s: any) => ({
    ...s.schedule,
    doctorScheduleId: s.id,
  }));
  const tomorrowSchedules = tomorrowRes?.data?.map((s: any) => ({
    ...s.schedule,
    doctorScheduleId: s.id,
  }));

  const handleBook = async () => {
    if (!selectedScheduleId)
      return toast.error("অনুগ্রহ করে একটি সময় নির্বাচন করুন");
    if (!doctor?.id) return toast.error("ডাক্তারের তথ্য পাওয়া যায়নি");

    setBooking(true);
    try {
      const res = await createAppoinment({
        scheduleId: selectedScheduleId,
        doctorId: doctor.id,
      }).unwrap();

      if (res?.id || res?.success) {
        toast.success("অ্যাপয়েন্টমেন্ট সফলভাবে বুক করা হয়েছে!");
        const payment = await initPayment(res?.id || res?.data?.id).unwrap();
        const url = payment?.paymentUrl || payment?.data?.paymentUrl;

        if (url) {
          window.location.href = url;
        } else {
          router.push("/dashboard/patient/appointments");
        }
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "বুকিং করতে সমস্যা হয়েছে");
    } finally {
      setBooking(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-[#F8FAFC] px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <section className="grid gap-6 lg:grid-cols-2">
          <AppointmentBookPatiantCard
            patient={patient}
            patientLoading={patientLoading}
          />
          <AppoinmentBookDoctorCard
            doctor={doctor}
            doctorLoading={doctorLoading}
          />
        </section>
        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">
              আজকের সময় ({todayName})
            </h2>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
              {todaySchedules?.length || 0} টি পাওয়া গেছে
            </span>
          </div>
          <DoctorScheduleSlotCard
            IsLoading={todayIsLoading}
            Schedules={todaySchedules}
            selectedScheduleId={selectedScheduleId}
            setSelectedScheduleId={setSelectedScheduleId}
          />
        </section>

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-800">
              আগামীকালের সময় ({tomorrowName})
            </h2>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
              {tomorrowSchedules?.length || 0} টি পাওয়া গেছে
            </span>
          </div>
          <DoctorScheduleSlotCard
            IsLoading={tomorrowIsLoading}
            Schedules={tomorrowSchedules}
            selectedScheduleId={selectedScheduleId}
            setSelectedScheduleId={setSelectedScheduleId}
          />
        </section>

        <div className="flex justify-center md:justify-end">
          <button
            disabled={!selectedScheduleId || booking}
            onClick={handleBook}
            className="group h-12 w-full rounded-2xl bg-indigo-600 px-10 text-base font-bold text-white shadow-lg shadow-indigo-200 transition-all hover:bg-indigo-700 disabled:opacity-50 md:w-auto"
          >
            {booking ? (
              <span className="flex items-center gap-2">প্রসেসিং হচ্ছে...</span>
            ) : (
              "বুকিং নিশ্চিত করুন"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
