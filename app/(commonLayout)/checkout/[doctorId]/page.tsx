"use client";

import React, { useMemo, useState } from "react"; // React ইমপোর্ট করুন use() ব্যবহারের জন্য
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useGetDoctorQuery } from "@/app/redux/api/doctorsApi";
import { useGetMeQuery } from "@/app/redux/api/userApi";
import { useCreateAppoinmentMutation } from "@/app/redux/api/appointmentApi";
import { useInitPaymentMutation } from "@/app/redux/api/paymentApi";

import { useGetAllDoctorScheduleQuery } from "@/app/redux/api/doctorScheduleApi";
import DoctorcheduleCard from "@/app/component/schedule/DoctorScheduleSlotCard";
import AppointmentBookPatiantCard from "@/app/component/schedule/AppoinmentBookPatiantCard";
import AppoinmentBookDoctorCard from "@/app/component/schedule/AppoinmentBookDoctorCard";
import DoctorScheduleSlotCard from "@/app/component/schedule/DoctorScheduleSlotCard";

export default function BookAppointmentPage({ 
  params 
}: { 
  params: Promise<{ doctorId: string }> 
}) {
  const router = useRouter();
  const resolvedParams = React.use(params);
  const doctorId = resolvedParams.doctorId;

  const { data: doctorData, isLoading: doctorLoading } = useGetDoctorQuery(doctorId);
  const { data: patientData, isLoading: patientLoading } = useGetMeQuery(undefined);

  const doctor = doctorData?.data;
  const patient = patientData?.data;

  const [selectedScheduleId, setSelectedScheduleId] = useState("");
  const [booking, setBooking] = useState(false);

  const [createAppoinment] = useCreateAppoinmentMutation();
  const [initPayment] = useInitPaymentMutation();

  const currentDate = new Date();
  const today = currentDate.toLocaleDateString("en-US", { weekday: "long" });

  const nextDate = new Date(currentDate);
  nextDate.setDate(currentDate.getDate() + 1);
  const tomorrow = nextDate.toLocaleDateString("en-US", { weekday: "long" });

  const todayQuery = useMemo(() => {
    const now = new Date();
    const todayStr = now.toLocaleDateString("en-CA");
    return { doctorId, isBooked: false, startDate: todayStr, endDate: todayStr };
  }, [doctorId]);

  const tomorrowQuery = useMemo(() => {
    const tom = new Date();
    tom.setDate(tom.getDate() + 1);
    const tomorrowStr = tom.toLocaleDateString("en-CA");
    return { doctorId, isBooked: false, startDate: tomorrowStr, endDate: tomorrowStr };
  }, [doctorId]);

  const { data: todayRes, isLoading: todayIsLoading } = useGetAllDoctorScheduleQuery({ ...todayQuery });
  const { data: tomorrowRes, isLoading: tomorrowIsLoading } = useGetAllDoctorScheduleQuery({ ...tomorrowQuery });
  
  const todaySchedules = todayRes?.data?.map((s: any) => s?.schedule);
  const tomorrowSchedules = tomorrowRes?.data?.map((s: any) => s?.schedule);

  const handleBook = async () => {
    if (!selectedScheduleId) return toast.error("Please select a schedule");
    if (!doctor?.id) return toast.error("Doctor not loaded");

    setBooking(true);
    try {
      const res = await createAppoinment({
        scheduleId: selectedScheduleId,
        doctorId: doctor.id,
      }).unwrap();

      if (res?.success) {
        const payment = await initPayment(res?.data?.id).unwrap();
        const url = payment?.data?.paymentUrl;
        toast.success(res?.message || "Appointment booked!");
        if (url) window.location.href = url;
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Booking failed");
    } finally {
      setBooking(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 px-4 py-6 md:px-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <section className="grid gap-4 lg:grid-cols-2">
          <AppointmentBookPatiantCard patient={patient} patientLoading={patientLoading} />
          <AppoinmentBookDoctorCard doctor={doctor} doctorLoading={doctorLoading} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">{today} Schedule</h2>
            <span className="text-sm font-semibold text-slate-600">{todaySchedules?.length} available</span>
          </div>
          <DoctorcheduleCard
            IsLoading={todayIsLoading}
            Schedules={todaySchedules}
            selectedScheduleId={selectedScheduleId}
            setSelectedScheduleId={setSelectedScheduleId}
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">{tomorrow} Schedule</h2>
            <span className="text-sm font-semibold text-slate-600">{tomorrowSchedules?.length} available</span>
          </div>
          <DoctorScheduleSlotCard
            IsLoading={tomorrowIsLoading}
            Schedules={tomorrowSchedules}
            selectedScheduleId={selectedScheduleId}
            setSelectedScheduleId={setSelectedScheduleId}
          />
        </section>

        <button
          disabled={!selectedScheduleId || booking}
          onClick={handleBook}
          className="h-11 w-full rounded-xl bg-indigo-600 px-6 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-70 md:w-auto"
        >
          {booking ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </main>
  );
}