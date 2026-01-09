"use client";

import { useGetSpecialtiesQuery } from "@/app/redux/api/specialtiesApi";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { TiArrowRight } from "react-icons/ti";

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

    el.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
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
    <section className="bg-white p-6 md:p-10">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xl font-semibold text-blue-600">Specialties</p>
          <h2 className="mt-2 text-2xl font-extrabold text-slate-900 md:text-3xl">
            Available Specialties
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Choose a department to find the right doctor faster.
          </p>
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <button
            type="button"
            onClick={prevSlide}
            disabled={!items.length}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
            aria-label="Previous"
          >
            <FiChevronLeft className="text-xl" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            disabled={!items.length}
            className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 hover:bg-slate-50 disabled:opacity-50"
            aria-label="Next"
          >
            <FiChevronRight className="text-xl" />
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-2xl bg-white p-4 shadow-sm md:p-6">
        {isLoading ? (
          <div className="text-sm text-slate-500">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-slate-500">No specialties found.</div>
        ) : (
          <>
            <div
              ref={trackRef}
              className="
                flex gap-4 overflow-x-auto scroll-smooth pb-2
                snap-x snap-mandatory
                [-ms-overflow-style:none] [scrollbar-width:none]
                [&::-webkit-scrollbar]:hidden
              "
            >
              {items.map((sp, i) => (
                <button
                  key={sp.id}
                  type="button"
                  onClick={() => {
                    setCurrentSlide(i);
                    scrollToIndex(i);
                  }}
                  className={[
                    "snap-start shrink-0 rounded-2xl border bg-white p-4 shadow-sm transition",
                    "h-[200px] flex flex-col items-center justify-center text-center",
                    "w-[140px] md:w-[220px]",
                    i === currentSlide
                      ? "border-blue-300 ring-2 ring-blue-200"
                      : "border-slate-200 hover:-translate-y-0.5 hover:shadow-md",
                  ].join(" ")}
                >
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue-50 ring-1 ring-blue-100">
                    <Image
                      src={sp.icon}
                      alt={sp.title}
                      width={48}
                      height={48}
                      className="h-12 w-12 object-contain"
                    />
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm font-extrabold text-slate-900">
                    {sp.title}
                  </p>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
     <Link href={'/'} className=" flex justify-end items-end">
      <button className="  bg-black pl-4 pr-2 py-2 rounded-full text-white flex justify-between items-center w-40 mt-4">
        <span>View All</span>
        <span className="  bg-white w-9 h-9 rounded-full text-black flex justify-center items-center"><TiArrowRight size={25} /></span>
      </button>
     </Link>
    </section>
  );
}


export default Specialties