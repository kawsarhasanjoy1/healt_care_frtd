import { FaArrowRightLong } from "react-icons/fa6";
import PopulerDoctorsSwiper from "./PopulerDoctorsSpecialtiesSwiper";
import Link from "next/link";

const PopulerDoctorsSpecialties = async () => {
  const res = await fetch("http://localhost:4000/api/v1/doctors", {
    next: { revalidate: 30 },
  });

  const data = await res.json();
  const doctors = data?.data?.data || [];

  return (
    <div className="max-w-[1400px] mx-auto px-4">
      <div className="flex justify-between items-center text-black mt-20 mb-10">
        <p className="text-2xl font-bold text-slate-800">জনপ্রিয় বিশেষজ্ঞ ডাক্তারগণ</p>
        <Link href={'/doctors'} className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-all duration-100">
          সবগুলো দেখুন <FaArrowRightLong />
        </Link>
      </div>
      <PopulerDoctorsSwiper doctors={doctors} />
    </div>
  );
};

export default PopulerDoctorsSpecialties;