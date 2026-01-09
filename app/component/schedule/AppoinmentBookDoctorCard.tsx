import Image from "next/image";
import { FiUser } from "react-icons/fi";

const AppoinmentBookDoctorCard = ({
  doctorLoading,
  doctor,
}: {
  doctorLoading: any;
  doctor: any;
}) => {
    return (
        <div>
             <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900">Doctor</h2>
              {doctorLoading ? (
                <span className="text-sm text-slate-500">Loading...</span>
              ) : null}
            </div>

            <div className="mt-4 flex items-center gap-4">
              <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <Image
                  src={doctor?.profilePhoto || "/placeholder-avatar.png"}
                  alt=""
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-extrabold text-slate-900">
                  {doctor?.name || "—"}
                </p>
                <p className="truncate text-sm text-slate-600">
                  {doctor?.designation || "Doctor"} • Fee:{" "}
                  {doctor?.appoinmentFee || "—"}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiUser className="h-4 w-4" /> EXPERIENCE
                </div>
                <p className="mt-1 font-semibold text-slate-900">
                  {doctor?.experience ?? "—"} Years
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
                  <FiUser className="h-4 w-4" /> RATING
                </div>
                <p className="mt-1 font-semibold text-slate-900">
                  {doctor?.averageRating ?? "—"}
                </p>
              </div>
            </div>
          </div>
        </div>
    )
}

export default AppoinmentBookDoctorCard