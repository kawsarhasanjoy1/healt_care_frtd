"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Ayesha Rahman",
    role: "Patient",
    review:
      "The appointment process was very smooth. Doctors were professional and caring. Highly recommended.",
    image: "https://i.pravatar.cc/150?img=32",
  },
  {
    name: "Mahmud Hasan",
    role: "Patient",
    review:
      "Excellent healthcare service with modern facilities. I felt safe and well-guided throughout.",
    image: "https://i.pravatar.cc/150?img=12",
  },
  {
    name: "Nusrat Jahan",
    role: "Patient",
    review:
      "Very clean environment and supportive staff. Booking tests was fast and convenient.",
    image: "https://i.pravatar.cc/150?img=47",
  },
];

const Review = () => {
  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto w-full px-4">
        <div className="mb-10 text-center">
          <h2 className="text-2xl md:text-5xl font-extrabold leading-tight  tracking-tight text-slate-900">
            What Our Patients Say
          </h2>
          <p className="mt-2 text-md text-slate-600">
            Trusted healthcare experiences from real patients
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          spaceBetween={30}
          effect="fade"
        //   navigation
          pagination={{ clickable: true }}
          modules={[EffectFade, Navigation, Pagination]}
        >
          {reviews.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="rounded-2xl bg-white p-8 shadow-sm flex flex-col justify-center items-center">
                {/* Profile */}
                <div className="mb-4 flex flex-col justify-center items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 rounded-full object-cover border-2 border-t-emerald-500"
                  />
                 <h4 className="text-xl font-semibold text-slate-900">
                      {item.name}
                    </h4>
                </div>

                <div className="mb-4 flex gap-1 text-emerald-500">
                  ★ ★ ★ ★ ★
                </div>

                {/* Review */}
                <p className="text-sm leading-relaxed text-slate-700">
                  “{item.review}”
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Review;
