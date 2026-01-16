"use client";

import { useGetSpecialtiesQuery } from "@/app/redux/api/specialtiesApi";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiArrowNarrowRight } from "react-icons/hi";

type TSpecialty = {
  id: string;
  title: string;
  icon: string;
};

const Specialties = () => {
  const { data, isLoading } = useGetSpecialtiesQuery(undefined);

  const items: TSpecialty[] = useMemo(() => {
    const list: TSpecialty[] = data?.data?.data ?? [];
    return [...list].sort((a, b) => a.title.localeCompare(b.title));
  }, [data]);

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const el = track.children[index] as HTMLElement | undefined;
    if (!el) return;
    el.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  const prevSlide = () => {
    if (!items.length) return;
    const nextIndex = currentSlide === 0 ? items.length - 1 : currentSlide - 1;
    setCurrentSlide(nextIndex);
    scrollToIndex(nextIndex);
  };

  const nextSlide = () => {
    if (!items.length) return;
    const nextIndex = currentSlide === items.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(nextIndex);
    scrollToIndex(nextIndex);
  };

  return (
    <section className="bg-[#F8FAFC] py-16 px-6 md:px-12 lg:px-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="space-y-3">
          <span className="bg-blue-100 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold tracking-wide uppercase">
            ডাক্তারি বিভাগসমূহ
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-800 leading-tight">
            বিশেষজ্ঞ বিভাগ <span className="text-blue-600">খুঁজুন</span>
          </h2>
          <p className="max-w-md text-slate-500 font-medium">
            সঠিক ডাক্তার দ্রুত খুঁজে পেতে নিচের তালিকা থেকে আপনার প্রয়োজনীয়
            বিভাগটি নির্বাচন করুন।
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={prevSlide}
            disabled={!items.length}
            className="group p-3 rounded-2xl border-2 border-white bg-white shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-30"
          >
            <FiChevronLeft className="text-2xl group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            disabled={!items.length}
            className="group p-3 rounded-2xl border-2 border-white bg-white shadow-sm hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-30"
          >
            <FiChevronRight className="text-2xl group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <div className="relative">
        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="h-[220px] w-[200px] animate-pulse rounded-3xl bg-slate-200"
              />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-10 text-slate-400 font-medium">
            কোনো তথ্য পাওয়া যায়নি।
          </div>
        ) : (
          <div
            ref={trackRef}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-8 snap-x snap-mandatory no-scrollbar"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((sp, i) => (
              <button
                key={sp.id}
                onClick={() => {
                  setCurrentSlide(i);
                  scrollToIndex(i);
                }}
                className={`
                  snap-center shrink-0 relative group flex flex-col items-center justify-center
                  w-[160px] md:w-[220px] h-[220px] rounded-[2.5rem] transition-all duration-500
                  ${
                    i === currentSlide
                      ? "bg-blue-600 shadow-2xl shadow-blue-200 scale-105"
                      : "bg-white border border-slate-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-2"
                  }
                `}
              >
                <div
                  className={`
                  mb-5 p-4 rounded-3xl transition-transform duration-500 group-hover:scale-110
                  ${i === currentSlide ? "bg-white/20" : "bg-blue-50"}
                `}
                >
                  <Image
                    src={sp.icon}
                    alt={sp.title}
                    width={50}
                    height={50}
                    className={`h-12 w-12 object-contain ${
                      i === currentSlide ? "brightness-200" : ""
                    }`}
                  />
                </div>

                <span
                  className={`
                  px-4 text-center font-bold text-lg leading-tight transition-colors
                  ${i === currentSlide ? "text-white" : "text-slate-800"}
                `}
                >
                  {sp.title}
                </span>

                {i === currentSlide && (
                  <div className="absolute bottom-4 w-2 h-2 rounded-full bg-white animate-pulse" />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-10 flex justify-center md:justify-end">
        <Link href="/specialties">
          <button className="group relative flex items-center gap-4 bg-slate-900 hover:bg-blue-600 text-white pl-8 pr-2 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-200">
            <span className="font-bold text-base tracking-wide">
              সবগুলো দেখুন
            </span>
            <div className="bg-white/20 p-2 rounded-full group-hover:bg-white transition-colors">
              <HiArrowNarrowRight
                className="text-white group-hover:text-blue-600 transition-colors"
                size={24}
              />
            </div>
          </button>
        </Link>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Specialties;
