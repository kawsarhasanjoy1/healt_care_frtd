"use client";

import Link from "next/link";
import { HiHome, HiArrowLeft } from "react-icons/hi2";

const NotFoundPage = ({
  title = "দুঃখিত! পেজটি পাওয়া যায়নি",
  code = 404,
  description = " আপনি যে লিংকটি খুঁজছেন তা হয়তো সরানো হয়েছে অথবা ডিলিট করা হয়েছে । অনুগ্রহ করে হোম পেজে ফিরে যান।",
}: {
  title?: string;
  code?: number;
  description?: string;
}) => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-6 overflow-hidden relative">
      <div className="absolute top-0 -left-20 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50" />

      <div className="max-w-3xl w-full text-center relative z-10">
        <div className="relative inline-block">
          <h1 className="text-[150px] md:text-[220px] font-black leading-none text-slate-100 select-none">
            {code}
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center mt-6">
            <div className="w-24 h-2 rounded-full bg-blue-600 animate-pulse mb-4" />
            <p className="text-2xl md:text-4xl font-[900] text-slate-900 tracking-tight">
              {title}
            </p>
          </div>
        </div>

        <p className="mt-8 text-lg text-slate-500 font-medium max-w-md mx-auto leading-relaxed">
          {description}
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5">
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 px-8 py-4 rounded-2xl border-2 border-slate-100 font-bold text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-200"
          >
            <HiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            পিছনে যান
          </button>

          <Link href="/">
            <button className="group flex items-center gap-2 px-8 py-4 rounded-2xl bg-blue-600 text-white font-bold transition-all hover:bg-slate-950 hover:shadow-2xl hover:shadow-blue-200 active:scale-95">
              <HiHome size={20} />
              হোম পেজে ফিরে যান
              <div className="ml-1 bg-white/20 p-1 rounded-lg group-hover:translate-x-1 transition-transform">
                <HiHome
                  size={14}
                  className="opacity-0 group-hover:opacity-100 transition-opacity absolute"
                />
              </div>
            </button>
          </Link>
        </div>
      </div>
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-blue-400 rounded-full animate-ping opacity-20" />
      <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-indigo-400 rounded-full animate-bounce opacity-20" />
    </div>
  );
};

export default NotFoundPage;
