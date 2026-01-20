import { TSpecialties } from "@/app/types/global";
import { FaArrowRightLong } from "react-icons/fa6";
import SpecialtiesCard from "./SpecialtiesCard";
import Link from "next/link";

const FindSpecialties = async () => {
  const res = await fetch(
    `http://localhost:4000/api/v1/specialties?limit=${12}&page=${1}`
  );
  const data = await res.json();
  const specialties = data?.data?.data;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center text-black mb-10">
        <p className="text-2xl md:text-3xl font-bold text-slate-800">
          স্পেশালিটি অনুযায়ী ডাক্তার খুঁজুন
        </p>

        <Link
          href={"/specialties"}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-all duration-200 group"
        >
          সবগুলো দেখুন
          <FaArrowRightLong className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-5 md:gap-8">
        {specialties?.map((item: TSpecialties) => (
          <SpecialtiesCard key={item?.id} specialties={item} />
        ))}
      </div>
    </div>
  );
};

export default FindSpecialties;
