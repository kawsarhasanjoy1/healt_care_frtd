"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { AiFillStar } from "react-icons/ai";
import { HiOutlineChevronRight } from "react-icons/hi";

type Props = {
  doctors: any[];
};

const PopularSpecialistsSwiper = ({ doctors }: Props) => {
  return (
    <div>
      <div className="max-w-[1400px] mx-auto">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={3}
          spaceBetween={25}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1200: { slidesPerView: 3 },
          }}
          className="!pb-16"
        >
          {doctors?.map((doctor) => (
            <SwiperSlide key={doctor.id}>
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-[#1a73e8] transition-all duration-300 flex flex-col min-h-[300px] w-full">
                <div className="flex gap-5 mb-auto">
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-50 border border-slate-100">
                    <Image
                      src={
                        doctor?.profilePhoto ||
                        "https://i.pinimg.com/736x/41/2d/e5/412de548542a9d1cff0f2dfcdc21fdaf.jpg"
                      }
                      alt={doctor?.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info Right */}
                  <div className="flex flex-col flex-1 text-start">
                    <h3 className="text-lg font-bold text-slate-900 leading-tight mb-1">
                      {doctor?.name}
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mb-3 line-clamp-2 min-h-[32px]">
                      {doctor?.qualification}
                    </p>
                    {/* Badge */}
                    <span className="bg-[#1a73e8] text-white text-[10px] font-bold px-2.5 py-1 rounded-md w-fit shadow-sm">
                      {doctor?.doctorSpecialties?.[0]?.specialties?.title ||
                        "Specialist"}
                    </span>
                  </div>
                </div>

                {/* Rating & Exp Section */}
                <div className="flex items-center gap-6 mt-6 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-1">
                    <AiFillStar className="text-orange-400" size={16} />
                    <span className="text-xs font-bold text-slate-700">
                      {doctor?.averageRating ?? "5"}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      ({doctor?.reviews?.length || "0"})
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[14px] font-bold text-slate-800">
                      {doctor?.experience ?? 0}+ Years
                    </span>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                      Experience
                    </span>
                  </div>
                </div>

                {/* Fee & Action Section */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-1">
                    <span className="text-xl font-bold text-[#1a73e8]">
                      ৳ {doctor?.appoinmentFee}
                    </span>
                  </div>

                  <Link
                    href={`/checkout/${doctor?.id}`}
                    className="text-[13px] font-bold text-[#1a73e8] hover:underline flex items-center gap-1 group"
                  >
                    ডাক্তার দেখান
                    <HiOutlineChevronRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #cbd5e1 !important;
          opacity: 1 !important;
        }
        .swiper-pagination-bullet-active {
          background: #1a73e8 !important;
          width: 25px !important;
          border-radius: 10px !important;
        }
      `}</style>
    </div>
  );
};

export default PopularSpecialistsSwiper;
