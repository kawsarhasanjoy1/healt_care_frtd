"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./PopulerDoctorsSwiper.css";
import Image from "next/image";
import Link from "next/link";
import { FcRating } from "react-icons/fc";
import { MdVideoCall } from "react-icons/md";
import { doctorPhoto } from "@/app/constance/constance";

type Props = {
  doctors: any[];
};

const DoctorsSwiperCard = ({ doctors }: Props) => {
  return (
    <div className="bg-white pt-6">
      <Swiper
        spaceBetween={2}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        className="bg-white"
      >
        {doctors?.map((doctor) => (
          <SwiperSlide key={doctor.id}>
            <div className="h-full bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition duration-300 p-5 flex flex-col">
              {/* Image */}
              <div className="relative w-[300px] h-[200px] rounded-lg overflow-hidden">
                <Image
                  src={doctor?.profilePhoto || doctorPhoto}
                  alt={doctor?.name || "Doctor"}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 mt-4 space-y-2 text-start">
                <h3 className="text-lg font-semibold text-gray-900">
                  {doctor?.name}
                </h3>

                <p className="text-sm text-gray-500">{doctor?.qualification}</p>

                {/* Rating */}
                <div className="flex justify-between items-center gap-1 text-sm">
                  <div className=" flex justify-center items-center gap-1">
                    <FcRating size={20} />
                    <span className="font-medium">
                      {doctor?.rating || "4.8"}
                    </span>
                    <span className="text-gray-400">
                      ({doctor?.reviews?.length || 120})
                    </span>
                  </div>
                  <span className=" border border-r h-[16px] border-gray-400"></span>
                  <span>{doctor?.experience}+ Years</span>
                </div>
                <div className="flex justify-start items-center gap-1 text-sm gap-3">
                  <span className=" text-xl font-bold">
                    {" "}
                    ${doctor?.appoinmentFee}{" "}
                  </span>
                  <span className=" text-sm">(incl.VAT)/Consultation</span>
                </div>
              </div>

              {/* Action */}
              <Link
                href={`/checkout/${doctor.id}`}
                className="mt-4 flex items-center justify-center text-primary font-medium border border-blue-500 gap-2 text-blue-500 p-3 rounded-md hover:bg-blue-600 hover:text-white"
              >
                <MdVideoCall size={30}/>
                See Doctor Now
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DoctorsSwiperCard;
