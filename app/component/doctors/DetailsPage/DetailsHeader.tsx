import Image from "next/image";
import { FiBriefcase, FiCheckCircle, FiMapPin, FiStar } from "react-icons/fi";
import { LuBadgeCheck, LuStethoscope } from "react-icons/lu";

const DetailsHeaders = ({ doctorData }: { doctorData: any }) => {
  return (
    <section className="bg-white border-b border-slate-200 pt-8 pb-12">
      <div className=" w-full mx-auto  ">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Doctor Image */}
          <div className="relative w-full md:w-64 h-64 flex-shrink-0">
            <Image
              src={doctorData?.profilePhoto || ""}
              alt={doctorData?.name}
              fill
              className="rounded-2xl object-cover shadow-lg border-4 border-white"
            />
            <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white p-2 rounded-full border-4 border-white">
              <LuBadgeCheck size={24} />
            </div>
          </div>

          {/* Doctor Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-slate-900">
                {doctorData?.name}
              </h1>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                {doctorData?.designation}
              </span>
            </div>

            <p className="text-lg text-slate-600 mb-4 flex items-center gap-2">
              <LuStethoscope className="text-indigo-500" />{" "}
              {doctorData?.qualification}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm text-slate-500 mb-6">
              <div className="flex items-center gap-2">
                <FiBriefcase className="text-indigo-400" />
                <span>{doctorData?.experience}+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <FiMapPin className="text-indigo-400" />
                <span>{doctorData?.address}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-emerald-500" />
                <span>{doctorData?.currentWorkingPlace}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiStar className="text-amber-400 fill-amber-400" />
                <span className="font-bold text-slate-700">
                  {doctorData?.averageRating}
                </span>
                <span>({doctorData?.reviews.length} Reviews)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-4">
              {doctorData?.doctorSpecialties?.map((s: any, index: number) => {
                console.log(s);
                return (
                  <span
                    key={index}
                    className="flex items-center gap-1 bg-white border border-blue-400 px-4 py-2 rounded-xl text-sm font-medium text-slate-700 shadow-sm hover:border-indigo-300 transition cursor-default"
                  >
                    <span className=" font-bold text-sm  ">
                      {s?.specialties?.title}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsHeaders;
