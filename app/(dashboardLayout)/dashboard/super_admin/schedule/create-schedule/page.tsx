"use client";
import HCDatePicker from "@/app/component/Form/DatePicker/DatePicker";
import HCForm from "@/app/component/Form/HCForm/HCForm";
import HCTimeInput from "@/app/component/Form/TimePicker/TimePicker";
import { useCreateScheduleMutation } from "@/app/redux/api/scheduleApi";
import dayjs from "dayjs";
import Link from "next/link";
import toast from "react-hot-toast";
import { FiArrowLeft } from "react-icons/fi";

const CreateSchedule = () => {
  const [CreateSchedule, { isLoading }] = useCreateScheduleMutation();
  const handleCreate = async (values: any) => {
    const formattedData = {
      startDate: dayjs(values.startDate).format("YYYY-MM-DD"),
      endDate: dayjs(values.endDate).format("YYYY-MM-DD"),
      startTime: dayjs(values.startTime).isValid()
        ? dayjs(values.startTime).format("HH:mm")
        : values.startTime,
      endTime: dayjs(values.endTime).isValid()
        ? dayjs(values.endTime).format("HH:mm")
        : values.endTime,
    };
    try {
      const res = await CreateSchedule(formattedData).unwrap();
      if (res?.success) {
        toast.success("শিডিউল সফলভাবে তৈরি হয়েছে!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "বুকিং করতে সমস্যা হয়েছে");
    }
  };
  return (
    <main className="min-h-[calc(100vh-64px)] bg-slate-50 p-4 md:p-6">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="rounded-full bg-indigo-50 px-2 py-0.5 font-medium text-indigo-700">
              Dashboard
            </span>
            <span>/</span>
            <span className="font-medium text-slate-700">Create Schedule</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            Create Schedule Slots
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Pick date range and time range. Slots will be created in 30-minute
            intervals.
          </p>
        </div>

        <Link
          href="#"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
        >
          <FiArrowLeft className="h-4 w-4" />
          Back
        </Link>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5">
          <h2 className="text-lg font-bold text-slate-900">Schedule Info</h2>
          <p className="text-sm text-slate-500">
            Create multiple schedule slots at once.
          </p>
        </div>

        <div className="p-5">
          <HCForm onsubmit={handleCreate}>
            {/* We can show estimate using watch if your HCForm exposes it;
                easiest: show helper text only. */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="">
                <div className="mb-2 text-sm font-semibold text-slate-700">
                  Start Date
                </div>
                <HCDatePicker
                  className=" w-full"
                  name="startDate"
                  placeholder="Start date"
                />
              </div>

              <div>
                <div className="mb-2 text-sm font-semibold text-slate-700">
                  End Date
                </div>
                <HCDatePicker name="endDate" placeholder="End date" />
              </div>

              <div>
                <div className="mb-2 text-sm font-semibold text-slate-700">
                  Start Time
                </div>
                <HCTimeInput name="startTime" />
              </div>

              <div>
                <div className="mb-2 text-sm font-semibold text-slate-700">
                  End Time
                </div>
                <HCTimeInput name="endTime" />
              </div>

              <div className="md:col-span-2 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                Interval: <span className="font-semibold">30 minutes</span>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className="h-11 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-6 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isLoading ? "Submiting..." : "submit"}
              </button>
            </div>
          </HCForm>
        </div>
      </section>
    </main>
  );
};

export default CreateSchedule;
