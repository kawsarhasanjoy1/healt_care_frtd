import { formatTime } from "@/app/utils/formatTime";
import formatYYYYMMDD from "@/app/utils/formatYYYYMMDD";
import { FiClock } from "react-icons/fi";

const DoctorScheduleSlotCard = ({IsLoading,Schedules, selectedScheduleId, setSelectedScheduleId}: {IsLoading: boolean, Schedules: any, selectedScheduleId: string, setSelectedScheduleId: any}) => {
    return (
        <div>
               {IsLoading ? (
            <div className="mt-4 text-sm text-slate-600">Loading...</div>
          ) : Schedules?.length === 0 ? (
            <div className="mt-4 text-sm text-slate-600">No schedule found</div>
          ) : (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Schedules?.map((s: any) => {
                const active = s?.id === selectedScheduleId;
                return (
                  <button
                    key={s?.id}
                    onClick={() => setSelectedScheduleId(s.id)}
                    className={[
                      "rounded-2xl border p-4 text-left transition",
                      active
                        ? "border-indigo-300 bg-indigo-50"
                        : "border-slate-200 bg-white hover:bg-slate-50",
                    ].join(" ")}
                  >
                  
                    <p className="mt-1 font-bold text-slate-900">
                      {formatYYYYMMDD(s?.startDateTime)}
                    </p>
                    <p className="mt-1 flex items-center gap-2 text-sm text-slate-600">
                      <FiClock className="h-4 w-4" />
                      {formatTime(s?.startDateTime)} -{" "}
                      {formatTime(s?.endDateTime)}
                    </p>
                  </button>
                );
              })}
            </div>
          )}
        </div>
    )
}

export default DoctorScheduleSlotCard