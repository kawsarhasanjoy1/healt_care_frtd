"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./PopulerDoctorsSwiper.css"
import Image from "next/image";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { FcRating } from "react-icons/fc";

type Props = {
  doctors: any[];
};

const PopulerDoctorsSpecialtiesSwiper = ({ doctors }: Props) => {
  return (
    <div className="bg-white py-6">
      <Swiper
        slidesPerView={3}
        spaceBetween={24}
        centeredSlides={false}   
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="bg-white overflow-visible"
      >
        {doctors?.map((doctor) => (
          <SwiperSlide key={doctor.id} className="!w-auto">
            <div className="h-full  bg-white border border-gray-300 rounded-md shadow-sm hover:shadow-md transition p-5 space-y-5 max-w-[500px]">

              {/* Top */}
              <div className="flex gap-4">
                <div className="relative h-[140px] w-[140px] shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={doctor?.profilePhoto || "/doctor-placeholder.png"}
                    alt={doctor?.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 w-full bg-white/80 text-center text-sm font-semibold py-1 flex justify-center items-center gap-2">
                    <FcRating size={25}/> {doctor?.averageRating ?? "N/A"}
                  </div>
                </div>

                <div className="flex flex-col text-start space-y-1">
                  <p className="text-lg font-semibold">{doctor?.name}</p>
                  <p className="text-sm text-gray-600">
                    {doctor?.qualification}
                  </p>
                  <p className="text-sm font-semibold text-blue-600">
                    {doctor?.doctorSpecialties?.[0]?.specialties?.title}
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between border-t pt-4">
                <div>
                  <p className="text-lg font-bold">
                    {doctor?.experience ?? 0}+ Years
                  </p>
                  <p className="text-xs text-gray-500 text-md">Experience</p>
                </div>

                <p className="text-lg font-bold text-blue-600">
                  ৳{doctor?.appoinmentFee}
                </p>

                <Link
                  href={`/doctors/${doctor?.id}`}
                  className="flex items-center gap-1 text-sm  font-bold text-blue-600 "
                >
                  See Doctor <FaChevronRight />
                </Link>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopulerDoctorsSpecialtiesSwiper;
