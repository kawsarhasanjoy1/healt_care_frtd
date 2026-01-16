"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi2";
import { AiFillStar } from "react-icons/ai";
import { BsPatchCheckFill } from "react-icons/bs";

type Props = {
  doctors: any[];
};

const PopulerDoctorsSpecialtiesSwiper = ({ doctors }: Props) => {
  return (
    <div className="bg-[#F8FAFC] py-12 px-2">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={3}
        spaceBetween={30}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true, dynamicBullets: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
        className="pb-16"
      >
        {doctors?.map((doctor) => (
          <SwiperSlide key={doctor.id}>
            <div className="group relative my-4 bg-white rounded-[2.5rem]   transition-all duration-500 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.08)] border border-slate-100">
              <div className="flex gap-5">
                <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-3xl bg-slate-100">
                  <Image
                    src={doctor?.profilePhoto || "https://i.pinimg.com/736x/41/2d/e5/412de548542a9d1cff0f2dfcdc21fdaf.jpg"}
                    alt={doctor?.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110 border border-gray-100 rounded-xl"
                  />
                  <div className="absolute top-2 left-2 flex items-center gap-1 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-bold text-orange-500 backdrop-blur-sm shadow-sm">
                    <AiFillStar size={12} />
                    {doctor?.averageRating ?? "5.0"}
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xl font-black text-slate-800 tracking-tight leading-tight">
                      {doctor?.name}
                    </h3>
                    <BsPatchCheckFill className="text-blue-500" size={16} />
                  </div>
                  <p className="text-sm font-bold text-blue-600/80">
                    {doctor?.doctorSpecialties?.[0]?.specialties?.title || "বিশেষজ্ঞ"}
                  </p>
                  <p className="line-clamp-2 text-xs font-medium text-slate-500 leading-relaxed">
                    {doctor?.qualification}
                  </p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl bg-slate-50 p-4">
                <div className="text-center border-r border-slate-200">
                  <p className="text-lg font-black text-slate-800">
                    {doctor?.experience ?? 0}+ বছর
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">অভিজ্ঞতা</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-black text-blue-600">
                    ৳{doctor?.appoinmentFee}
                  </p>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">ফি (ভিজিট)</p>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href={`/doctors/${doctor?.id}`}
                  className="group/btn flex items-center justify-center gap-3 w-full rounded-2xl bg-slate-900 py-4 text-sm font-bold text-white transition-all hover:bg-blue-600 hover:shadow-xl hover:shadow-blue-200"
                >
                  প্রোফাইল দেখুন
                  <div className="bg-white/20 p-1 rounded-lg group-hover/btn:translate-x-2 transition-transform">
                    <HiArrowRight size={18} />
                  </div>
                </Link>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* কাস্টম বুলেটস কালার স্টাইল */}
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #2563eb !important;
          width: 25px !important;
          border-radius: 10px !important;
        }
        .swiper-pagination {
          bottom: 0px !important;
        }
      `}</style>
    </div>
  );
};

export default PopulerDoctorsSpecialtiesSwiper;