"use client";

import { useGetDoctorsQuery } from "@/app/redux/api/doctorsApi";
import DoctorCard from "./DoctorsCard";
import Link from "next/link";

const TopRatedDoctors = () => {
  const { data, isLoading, isError } = useGetDoctorsQuery({
    limit: 3,
    page: 1,
    sortBy: "averageRating",
    sortOrder: "desc",
  });

  const doctors = data?.data?.data || [];

  return (
    <section className="bg-[#F8FAFC] py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-5xl">
            সেরা রেটিংপ্রাপ্ত ডাক্তারগণ
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            গুণগত স্বাস্থ্যসেবার জন্য আমাদের বিশ্বস্ত এবং অভিজ্ঞ ডাক্তারদের সাথে আজই যোগাযোগ করুন।
          </p>
        </div>

        {isLoading && (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-[400px] animate-pulse rounded-3xl bg-white shadow-sm border border-slate-100" />
            ))}
          </div>
        )}

        {isError && (
          <div className="text-center py-10 bg-red-50 rounded-2xl border border-dashed border-red-200">
            <p className="text-red-500 font-bold">দুঃখিত! ডাক্তারদের তথ্য লোড করতে সমস্যা হয়েছে।</p>
          </div>
        )}
        {!isLoading && !isError && (
          <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {doctors.length > 0 ? (
              doctors.map((doctor: any) => (
                <DoctorCard key={doctor.id} {...doctor} />
              ))
            ) : (
              <p className="col-span-full text-center text-slate-400">কোনো তথ্য পাওয়া যায়নি।</p>
            )}
          </div>
        )}

        <div className="mt-12 text-center">
            <Link href={'/doctors'} className="rounded-full bg-indigo-600 px-8 py-3 font-bold text-white transition-all hover:bg-indigo-700 hover:shadow-xl active:scale-95">
                সব ডাক্তার দেখুন
            </Link>
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;