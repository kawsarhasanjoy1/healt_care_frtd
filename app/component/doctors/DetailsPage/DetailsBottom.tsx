import { formatTime } from "@/app/utils/formatTime"
import formatYYYYMMDD from "@/app/utils/formatYYYYMMDD"
import Link from "next/link"
import { FiCalendar, FiClock, FiPhone, FiStar } from "react-icons/fi"
import { LuBadgeCheck, LuGraduationCap } from "react-icons/lu"

const DetailsBottom = ({ doctorData }: { doctorData: any }) => {
  // শিডিউল আছে কিনা তা চেক করার লজিক
  const hasSchedule = doctorData?.doctorSchedules && doctorData?.doctorSchedules?.length > 0;

  return (
    <div className="w-full mx-auto mt-10 px-2 md:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* বাম কলাম: ডাক্তারের তথ্য */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* পেশাদার সারসংক্ষেপ */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <LuBadgeCheck className="text-indigo-600" /> পেশাদার সারসংক্ষেপ
            </h3>
            <p className="text-slate-600 leading-relaxed">
              {doctorData?.name} {doctorData?.currentWorkingPlace}-এ একজন
              অত্যন্ত দক্ষ {doctorData?.designation} হিসেবে কর্মরত আছেন।{" "}
              {doctorData?.experience} বছরেরও বেশি ক্লিনিক্যাল অভিজ্ঞতার সাথে
              তিনি {doctorData?.doctorSpecialties?.[0]?.specialties?.title}{" "}
              বিষয়ে বিশেষজ্ঞ। তিনি তাঁর রোগীদের উন্নত চিকিৎসা সেবা এবং
              সহানুভূতিশীল সেবা প্রদানে প্রতিশ্রুতিবদ্ধ।
            </p>
          </div>

          {/* বিশেষজ্ঞতা ও চিকিৎসা ক্ষেত্র */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <LuBadgeCheck className="text-indigo-600" /> বিশেষজ্ঞতা ও চিকিৎসার ক্ষেত্র
            </h3>

            <div className="flex flex-col gap-4 mt-4">
              {doctorData?.doctorSpecialties?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {doctorData?.doctorSpecialties?.map((s: any, index: number) => (
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
                  ))}
                </div>
              ) : (
                <p className="text-slate-400">কোনো বিশেষজ্ঞতা তথ্য পাওয়া যায়নি</p>
              )}
            </div>
          </div>

          {/* শিক্ষা ও যোগ্যতা */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
              <LuGraduationCap size={20} className="text-indigo-600" /> শিক্ষা ও যোগ্যতা
            </h4>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex gap-2 font-medium">
                <span className="text-indigo-500">•</span> {doctorData?.qualification}
              </li>
              <li className="flex gap-2 font-medium">
                <span className="text-indigo-500">•</span> পোস্ট গ্র্যাজুয়েশন (DMCH)
              </li>
            </ul>
          </div>

          {/* রোগীদের মতামত (Reviews) */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <FiStar className="text-amber-400" /> রোগীদের মতামত
            </h3>
            {doctorData?.reviews?.length > 0 ? (
              <div className="space-y-6">
                {doctorData?.reviews?.map((rev: any) => (
                  <div
                    key={rev.id}
                    className="border-b border-slate-100 pb-6 last:border-0"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold">
                        {rev?.patient?.name?.charAt(0)}
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
            ) : (
              <p className="text-slate-400 text-center py-4">এখনো কোনো রিভিউ দেওয়া হয়নি</p>
            )}
          </div>
        </div>

        {/* ডান কলাম: অ্যাপয়েন্টমেন্ট সাইডবার */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-200 p-6 sticky top-24">
            <div className="flex justify-between items-center mb-6">
              <span className="text-slate-500 font-medium">ভিজিট ফি</span>
              <span className="text-2xl font-black text-indigo-600">
                ৳ {doctorData?.appoinmentFee}
              </span>
            </div>

            <div className="space-y-4 mb-8">
              {hasSchedule ? (
                <>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl">
                    <FiCalendar className="text-indigo-600" size={20} />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">উপলব্ধ তারিখ</p>
                      <p className="text-sm font-bold text-slate-800">
                        {formatYYYYMMDD(doctorData?.doctorSchedules?.[0]?.schedule?.startDateTime)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl w-full">
                    <FiClock className="text-indigo-600" size={20} />
                    <div>
                      <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">সময়</p>
                      <div className="flex flex-col">
                        <p className="text-sm font-bold text-slate-800">
                          {formatTime(doctorData?.doctorSchedules?.[0]?.schedule?.startDateTime)} -{" "}
                          {formatTime(doctorData?.doctorSchedules?.[0]?.schedule?.endDateTime)}
                        </p>
                        {doctorData?.doctorSchedules?.length > 1 && (
                          <p className="text-[11px] text-indigo-600 font-medium">
                            আরও {doctorData?.doctorSchedules?.length - 1} টি শিডিউল আছে
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-center">
                  <p className="text-red-600 font-bold text-sm italic">দুঃখিত! বর্তমানে কোনো শিডিউল নেই।</p>
                </div>
              )}
            </div>

            {/* বুকিং বাটন লজিক */}
            {hasSchedule ? (
              <Link
                href={`/checkout/${doctorData?.id}`}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                অ্যাপয়েন্টমেন্ট নিন
              </Link>
            ) : (
              <button
                disabled
                className="w-full bg-slate-100 text-slate-400 font-bold py-4 rounded-2xl cursor-not-allowed flex items-center justify-center gap-2"
              >
                শিডিউল নেই
              </button>
            )}

            <p className="text-center text-[10px] text-slate-400 mt-4 px-2">
              বুকিং করার মাধ্যমে আপনি আমাদের শর্তাবলীর সাথে একমত পোষণ করছেন।
            </p>

            <hr className="my-6 border-slate-100" />

            <div className="flex items-center justify-center gap-4 text-slate-500">
              <FiPhone className="text-indigo-500" />{" "}
              <span className="text-sm font-bold">
                সহযোগিতার জন্য: +৮৮০ {doctorData?.contactNumber}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailsBottom;