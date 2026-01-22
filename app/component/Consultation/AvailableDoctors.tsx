import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import DoctorsSwiperCard from "./DoctorsSwiperCard";

const AvailableDoctors = async () => {
  const res = await fetch("https://healthcareserver-two.vercel.app/api/v1/doctors", {
    next: { revalidate: 30 },
  });

  const data = await res.json();
  const doctors = data?.data?.data || [];

  return (
    <div className="py-10">
      <div className="flex justify-between items-center text-black mb-8">
        {/* টাইটেল */}
        <p className="text-2xl font-bold text-slate-800">এখন অনলাইন আছেন এমন ডাক্তার</p>
        
        {/* সবগুলো দেখুন বাটন - বানান ঠিক করা হয়েছে */}
        <Link href={'/doctors'}>
          <button className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-all duration-300 group">
            সবগুলো দেখুন 
            <FaArrowRightLong className="group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>

      {/* ডক্টর কার্ড সোয়াইপার */}
      <DoctorsSwiperCard doctors={doctors}/>
    </div>
  );
};

export default AvailableDoctors;