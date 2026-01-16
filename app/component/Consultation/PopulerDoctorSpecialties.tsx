import { FaArrowRightLong } from "react-icons/fa6";
import PopulerDoctorsSwiper from "./PopulerDoctorsSpecialtiesSwiper";

const PopulerDoctorsSpecialties = async () => {
  const res = await fetch("https://healthcareserver-two.vercel.app/api/v1/doctors", {
    next: { revalidate: 30 },
  });

  const data = await res.json();
  const doctors = data?.data?.data || [];
  console.log(doctors)
  return (
    <div>
      <div className="flex justify-between items-center text-black mt-10">
        <p className="text-2xl font-semibold">Popular Specialties Doctors</p>
        <button className="flex items-center gap-2 text-sm font-medium">
          View all <FaArrowRightLong />
        </button>
      </div>

      {/* Client Component */}
      <PopulerDoctorsSwiper doctors={doctors} />
    </div>
  );
};

export default PopulerDoctorsSpecialties;
