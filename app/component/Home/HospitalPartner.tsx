"use client";

import Image from "next/image";

const HospitalPartner = () => {
  const partners = [
    "https://img.freepik.com/premium-vector/popular-diagnostic-logo_636116-307.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRT_VglavgdZpno4V5YjOWRH-xSH0yXW7a74A&s",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsMnyUub-dIjPPNW0EndS6Mzh58UL1r6ta2A&s",
    "https://images.seeklogo.com/logo-png/63/1/praava-health-logo-png_seeklogo-632083.png",
    "https://img.freepik.com/premium-vector/popular-diagnostic-logo_636116-307.jpg", // Repeat for smooth loop
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-sm">
            আমাদের নেটওয়ার্ক
          </span>
          <h2 className="md:text-5xl text-3xl font-[950] text-slate-900 mt-3 tracking-tight">
            পার্টনার <span className="text-blue-600">হাসপাতালসমূহ</span>
          </h2>
          <div className="h-1.5 w-24 bg-blue-600 mx-auto mt-4 rounded-full" />
        </div>

        <div className="relative group">
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent z-10" />

          <div className="flex animate-marquee gap-12 items-center">
            {[...partners, ...partners].map((item, index) => (
              <div
                key={index}
                className="flex-shrink-0 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer p-4 bg-slate-50 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white hover:shadow-xl"
              >
                <Image
                  className="h-16 w-auto object-contain md:h-20"
                  src={item}
                  width={180}
                  height={100}
                  alt="Hospital Partner"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default HospitalPartner;
