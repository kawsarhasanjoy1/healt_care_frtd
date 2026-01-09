"use client";

import { useGetDoctorsQuery } from "@/app/redux/api/doctorsApi";
import DoctorCard from "./DoctorsCard";

const TopRatedDoctors = () => {
  const { data, isLoading, isError } = useGetDoctorsQuery({
    limit: 3,
    page: 1,
    sortBy: "averageRating",
    sortOrder: "desc",
  });

  const doctors = data?.data?.data;
  return (
    <section className="bg-gray-50 py-12">
      <div className="mx-auto  px-4">
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Top Rated Doctors
          </h1>
          <p className="mt-3 text-gray-600">
            Connect with trusted, top-rated doctors for quality healthcare
          </p>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
          {doctors?.map((doctor: any) => (
            <DoctorCard key={doctor.id} {...doctor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;
