import { TSpecialties } from "@/app/types/global";
import { FaArrowRightLong } from "react-icons/fa6";
import SpecialtiesCard from "./SpecialtiesCard";
import Link from "next/link";

const FindSpecialties = async () => {
  const res = await fetch(
    `https://healthcareserver-two.vercel.app/api/v1/specialties?limit=${12}&page=${1}`
  );
  const data = await res.json();
  const specialties = data?.data?.data;
  return (
    <div>
      <div className=" flex justify-between items-center text-black mb-6">
        <p className="text-2xl font-semibold">Find Specialties</p>
        <Link className=" hover:cursor-pointer" href={"/specialties"}>
          <button className="flex items-center gap-2 text-sm font-medium hover:cursor-pointer">
            View all <FaArrowRightLong />
          </button>
        </Link>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-4 justify-items-center md:justify-items-start  gap-5  md:gap-16">
        {specialties?.map((item: TSpecialties) => (
          <SpecialtiesCard key={item?.id} specialties={item} />
        ))}
      </div>
    </div>
  );
};

export default FindSpecialties;
