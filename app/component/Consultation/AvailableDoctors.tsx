import { FaArrowRightLong } from "react-icons/fa6";
import PopulerDoctorsSwiper from "./PopulerDoctorsSpecialtiesSwiper";
import Link from "next/link";
import DoctorsSwiperCard from "./DoctorsSwiperCard";

const AvailableDoctors = async () => {
  const res = await fetch("http://localhost:4000/api/v1/doctors", {
    next: { revalidate: 30 },
  });

  const data = await res.json();
  const doctors = data?.data?.data || [];

  return (
    <div>
      <div className="flex justify-between items-center text-black">
        <p className="text-2xl font-semibold">Available doctor now</p>
       <Link href={'/doctors'}>
        <button className="flex items-center gap-2 text-md font-medium hover:cursor-pointer hover:text-blue-500 duration-300">
          View all <FaArrowRightLong />
        </button>
       </Link>
      </div>

      {/* Client Component */}
      <DoctorsSwiperCard doctors={doctors}/>
    </div>
  );
};

export default AvailableDoctors;
