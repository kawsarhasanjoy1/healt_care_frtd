"use client";

import { useMemo, useState } from "react";
import HCForm from "@/app/component/Form/HCForm/HCForm";
import HCDatePicker from "@/app/component/Form/DatePicker/DatePicker";
import { useGetScheduleQuery } from "@/app/redux/api/scheduleApi";
import dayjs from "dayjs";
import HCSelect from "@/app/component/Form/HCInput/HCSelect";
import HCMultiSelect from "@/app/component/Form/HCInput/HCMultiSelect";
import { useCreateDoctorScheduleMutation } from "@/app/redux/api/doctorScheduleApi";
import toast from "react-hot-toast";
import { dateFormatter } from "@/app/utils/dateFormater";

const defaultValues = { scheduleId: [] };

const CreateScheduleDoctor = () => {
  const [selectedDate, setSelectedDate] = useState<any>(new Date());
  const query: Record<string, any> = {};

  if (!!selectedDate) {
  const now = dateFormatter(selectedDate)
  // const todayStr = now.toLocaleDateString('en-CA'); 
    query['startDate'] = now
    query['endDate'] = now
  }
  console.log(query)
  const { data: schedulesRes, isFetching: schedulesLoading } =
    useGetScheduleQuery({ ...query });
  const schedules = schedulesRes?.data ?? schedulesRes ?? [];

  const scheduleOptions = schedules?.map((item: any) => {
    const startTime = dayjs(item?.startDateTime).format("HH:mm");
    const endTime = dayjs(item?.endDateTime).format("HH:mm");

    return {
      label: `${startTime}-${endTime}`,
      value: item?.id,
    };
  });
  const [createDoctorSchedule, {isLoading}] = useCreateDoctorScheduleMutation();
  const handleSubmit = async (values: any) => {
    const scheduleId = values?.scheduleId;
    try {
      const res = await createDoctorSchedule({ scheduleId }).unwrap();
      if (res?.success) {
        toast.success(res?.message)
      }
    } catch (err: any) {
      toast.error(err?.data?.message)
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
      <div className="mb-4">
        <h1 className="text-lg font-bold text-slate-900">
          Create Doctor Schedule
        </h1>
        <p className="text-sm text-slate-500">
          Select date → schedules filter হবে
        </p>
      </div>

      <HCForm onsubmit={handleSubmit} defaultValues={defaultValues}>
        <div className=" mx-auto md:grid w-full md:max-w-2xl grid-cols-2 ">
          <div className=" space-y-4">
            <HCDatePicker
              name="date"
              placeholder="Select date"
              onValueChange={(v) => setSelectedDate(v)}
            />

            <HCMultiSelect  name="scheduleId" options={scheduleOptions} />
            <button
              disabled={isLoading}
              type="submit"
              className="h-10 flex-1 rounded-lg bg-indigo-600 px-4 text-sm text-white disabled:opacity-60"
            >
              {isLoading ? "CREATING..." : "CREATE"}
            </button>
          </div>
        </div>
      </HCForm>
    </div>
  );
};

export default CreateScheduleDoctor;
