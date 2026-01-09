import { formatTime } from "@/app/utils/formatTime"
import formatYYYYMMDD from "@/app/utils/formatYYYYMMDD"
import Link from "next/link"
import { FiCalendar, FiClock, FiPhone, FiStar } from "react-icons/fi"
import { LuBadgeCheck, LuGraduationCap } from "react-icons/lu"

const DetailsBottom = ({doctorData}: {doctorData: any}) => {
    return (
        <div className=" w-full mx-auto mt-10 px-2 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Doctor */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <LuBadgeCheck className="text-indigo-600" /> Professional
                Summary
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {doctorData?.name} {doctorData?.currentWorkingPlace}-এ একজন
                অত্যন্ত দক্ষ {doctorData?.designation} হিসেবে কর্মরত আছেন।{" "}
                {doctorData?.experience} বছরেরও বেশি ক্লিনিক্যাল অভিজ্ঞতার সাথে
                তিনি {doctorData?.doctorSpecialties[0]?.specialties?.title}{" "}
                বিষয়ে বিশেষজ্ঞ। তিনি তাঁর রোগীদের উন্নত চিকিৎসা সেবা এবং
                সহানুভূতিশীল সেবা প্রদানে প্রতিশ্রুতিবদ্ধ।
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <LuBadgeCheck className="text-indigo-600" /> Expertise &
                Conditions Treated
              </h3>

              <div className="flex flex-col gap-4 mt-4">
                {doctorData?.dortorSpecialties?.length > 0 ? (
                  <div>
                    {doctorData?.doctorSpecialties?.map(
                      (s: any, index: number) => (
                        <div
                          key={index}
                          className="bg-slate-50 p-4 rounded-xl border border-slate-100"
                        >
                          <h4 className="font-bold text-indigo-700 text-sm mb-1 uppercase tracking-wider">
                            {s?.specialties?.title}
                          </h4>
                          <p className="text-slate-600 text-sm leading-relaxed italic">
                            {s?.specialties?.description}
                          </p>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  "কোন স্পেসিলিটি নেই"
                )}
              </div>
            </div>

            {/* Education & Experience Details */}
            <div className="grid grid-cols-1">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <LuGraduationCap size={20} className="text-indigo-600" />{" "}
                  Education
                </h4>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2">
                    <span>•</span> {doctorData?.qualification}
                  </li>
                  <li className="flex gap-2">
                    <span>•</span> Post Graduation from DMCH
                  </li>
                </ul>
              </div>
            </div>

            {/* Patient Reviews */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
              {doctorData?.reviews?.length > 0 ? (
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <FiStar className="text-amber-400" /> Patient Feedback
                  </h3>
                  <div className="space-y-6">
                    {doctorData?.reviews?.map((rev: any) => (
                      <div
                        key={rev.id}
                        className="border-b border-slate-100 pb-6 last:border-0"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                            {rev?.patient?.name}
                          </div>
                          <div>
                            <h5 className="font-bold text-slate-800 text-sm">
                              {rev?.patient?.name}
                            </h5>
                            <div className="flex text-amber-400 text-xs">
                              {[...Array(rev?.rating)].map((_, i) => (
                                <FiStar key={i} className="fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-slate-600 text-sm italic">
                          "{rev?.comment}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                "Review not found"
              )}
            </div>
          </div>

          {/* Right Column: Appointment Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 font-medium">
                  Consultation Fee
                </span>
                <span className="text-2xl font-black text-indigo-600">
                  ৳ {doctorData?.appoinmentFee}
                </span>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                  <FiCalendar className="text-indigo-600" size={20} />
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">
                      Available Date
                    </p>
                    <p className="text-sm font-bold text-slate-800">
                      {formatYYYYMMDD(
                        doctorData?.doctorSchedules?.[0]?.schedule
                          ?.startDateTime
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl w-full">
                  <FiClock className="text-indigo-600" size={20} />
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold">
                      Time Slot
                    </p>
                    <div className=" flex gap-4 w-full">
                      <p className="text-sm font-bold text-slate-800">
                        {formatTime(
                          doctorData?.doctorSchedules?.[0]?.schedule
                            ?.startDateTime
                        )}{" "}
                        -{" "}
                        {formatTime(
                          doctorData?.doctorSchedules?.[0]?.schedule
                            ?.endDateTime
                        )}
                      </p>
                      <p className=" text-sm text-indigo-600">
                        {doctorData?.doctorSchedules?.length - 1} more
                        appoinment
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Link href={`/checkout/${doctorData?.id}`} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2">
                Book Appointment Now
              </Link>

              <p className="text-center text-xs text-slate-400 mt-4 px-4">
                By booking, you agree to our Terms and Service. No extra charges
                for cancellation.
              </p>

              <hr className="my-6 border-slate-100" />

              <div className="flex items-center justify-center gap-4 text-slate-400">
                <FiPhone />{" "}
                <span className="text-sm font-medium">
                  Need help? Call +880 {doctorData?.contactNumber}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default DetailsBottom