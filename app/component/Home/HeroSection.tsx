import Image from "next/image";
import { AiOutlineCheck } from "react-icons/ai";
import { FiArrowUpRight, FiPlay, FiUsers, FiActivity } from "react-icons/fi";
import MiniCard from "./Component/Hero/MiniCard";
import getDoctorsData from "@/app/hooks/doctors";
import Link from "next/link";

const Hero = async () => {
  const doctorsData = await getDoctorsData();
  // const doctors = doctorsData?.data?.data;
  const total = (doctorsData?.data?.meta?.total)
  return (
    <section className="mt-6 px-4 md:px-0">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1e293b] via-[#334155] to-[#1e293b] px-6 py-12 md:px-16 md:py-20">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-indigo-500/20 blur-[100px]" />

        <div className="relative z-10 grid items-center gap-12 md:grid-cols-[1.1fr_.9fr]">
          <div className="text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 text-xs font-medium text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              আপনার স্বাস্থ্য, আমাদের অগ্রাধিকার
            </div>

            <h1 className="mt-6 text-4xl font-black leading-[1.2] md:text-6xl">
              সহজেই নিন আপনার <br />
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                পছন্দের ডাক্তার
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-lg text-slate-300/90 leading-relaxed">
              আপনার সুবিধামতো সময়ে অভিজ্ঞ চিকিৎসকদের সাথে পরামর্শ করুন। ঘরে
              বসেই বুকিং দিন এবং ভিডিও কনসালটেশনের মাধ্যমে সেবা নিন।
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <Link href={'/doctors'} className="group inline-flex items-center gap-3 rounded-2xl bg-blue-600 px-8 py-4 text-sm font-bold transition-all hover:bg-blue-700 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                অ্যাপয়েন্টমেন্ট নিন
                <FiArrowUpRight className="text-lg transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <button className="flex items-center gap-3 font-semibold text-white/90 hover:text-white">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20">
                  <FiPlay className="fill-white" />
                </span>
                কিভাবে কাজ করে?
              </button>
            </div>

            {/* Statistics Section */}
            <div className="mt-12 grid gap-4 sm:grid-cols-3">
              <MiniCard>
                <div className="flex items-center gap-2 text-blue-600">
                  <FiUsers className="text-xl" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    ডাক্তারগণ
                  </span>
                </div>
                <div className="mt-2 text-2xl font-black text-slate-800">
                  {total || "৫,০0"}+
                </div>
                <p className="text-[12px] text-slate-500">
                  বিশেষজ্ঞ চিকিৎসক আপনার সেবায় নিয়োজিত
                </p>
              </MiniCard>

              <MiniCard>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-1 rounded">
                    লাইভ কনসাল্ট
                  </span>
                </div>
                <div className="mt-4 flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden relative"
                    >
                      <Image
                        src={`https://i.pravatar.cc/150?u=${i}`}
                        alt="doc"
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-2">
                  <div className="h-1.5 flex-1 rounded-full bg-slate-100 overflow-hidden">
                    <div className="h-full w-[80%] bg-emerald-500" />
                  </div>
                </div>
              </MiniCard>

              <MiniCard>
                <div className="flex items-center gap-2 text-emerald-600">
                  <FiActivity className="text-xl" />
                  <span className="text-sm font-bold uppercase tracking-wider">
                    সফলতা
                  </span>
                </div>
                <div className="mt-2 text-2xl font-black text-slate-800">
                  ৯৮.৫%
                </div>
                <p className="text-[12px] text-slate-500">
                  সফলভাবে রোগ নির্ণয় ও চিকিৎসা সেবা
                </p>
              </MiniCard>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="absolute left-0 top-10 z-20 hidden md:block animate-bounce duration-[3000ms]">
              <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-xl">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-emerald-500 text-white shadow-lg">
                    <AiOutlineCheck />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-white">
                      ১০০% নিরাপদ
                    </div>
                    <div className="text-[10px] text-white/70">
                      ভেরিফাইড ডাক্তার প্রোফাইল
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative h-[500px] w-full md:h-[650px]">
              <Image
                src="https://i.postimg.cc/pXqRLxRj/young-doctor-getting-ready-work-removebg-preview.png"
                alt="বাংলাদেশে অভিজ্ঞ ডাক্তারদের সাথে কথা বলুন"
                fill
                priority
                className="object-contain drop-shadow-[0_35px_60px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
